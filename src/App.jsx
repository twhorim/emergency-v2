import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import CheckSection from './components/CheckSection';
import CallCareSection from './components/CallCareSection';
import AbsenceNoticeModal from './components/AbsenceNoticeModal';
import EmergencyVehicleSign from './components/EmergencyVehicleSign';
import LegalAndFormsModal from './components/LegalAndFormsModal';
import DirectCallModal from './components/DirectCallModal';
import { Shield, HeartPulse, Scale, PhoneCall, ChevronUp } from 'lucide-react';

/**
 * 학교 응급상황 3C 대응 및 의사결정 시뮬레이터 메인 앱 컴포넌트
 */
export default function App() {
  // 1. 보건교사 부재중 모드 상태
  const [isAbsenceMode, setIsAbsenceMode] = useState(false);

  // 2. 비상 경보음 소리 상태
  const [isAlarmActive, setIsAlarmActive] = useState(false);
  const audioContextRef = useRef(null);
  const alarmIntervalRef = useRef(null);

  // 3. 증상 선택 상태 (Check 섹션)
  const [selectedSymptoms, setSelectedSymptoms] = useState({});

  // 4. 모달 열림 상태 관리
  const [isAbsenceModalOpen, setIsAbsenceModalOpen] = useState(false);
  const [isVehicleSignModalOpen, setIsVehicleSignModalOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [isDirectCallModalOpen, setIsDirectCallModalOpen] = useState(false);

  // 비상 알람 사운드 제어 (Web Audio API)
  useEffect(() => {
    if (isAlarmActive) {
      alarmIntervalRef.current = setInterval(() => {
        try {
          if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
          }
          const ctx = audioContextRef.current;
          if (ctx.state === 'suspended') {
            ctx.resume();
          }
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(600, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.25);
          gain.gain.setValueAtTime(0.1, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.3);
        } catch (e) {
          console.error(e);
        }
      }, 600);
    } else {
      if (alarmIntervalRef.current) {
        clearInterval(alarmIntervalRef.current);
      }
    }
    return () => {
      if (alarmIntervalRef.current) {
        clearInterval(alarmIntervalRef.current);
      }
    };
  }, [isAlarmActive]);

  const toggleAlarm = () => {
    setIsAlarmActive(prev => !prev);
  };

  // 맨 위로 스크롤
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      
      {/* 상단 헤더 */}
      <Header
        isAbsenceMode={isAbsenceMode}
        setIsAbsenceMode={setIsAbsenceMode}
        isAlarmActive={isAlarmActive}
        toggleAlarm={toggleAlarm}
        onOpenAbsenceModal={() => setIsAbsenceModalOpen(true)}
        onOpenLegalModal={() => setIsLegalModalOpen(true)}
        onOpenDirectCallModal={() => setIsDirectCallModalOpen(true)}
      />

      {/* 메인 콘텐츠 구역 */}
      <main className="flex-1">
        
        {/* 히어로 섹션 */}
        <HeroBanner
          isAbsenceMode={isAbsenceMode}
          onOpenAbsenceModal={() => setIsAbsenceModalOpen(true)}
        />

        {/* 1단계: Check (상황판단 & 실시간 자동 분류) */}
        <CheckSection
          selectedSymptoms={selectedSymptoms}
          setSelectedSymptoms={setSelectedSymptoms}
          isAbsenceMode={isAbsenceMode}
          onOpenAbsenceModal={() => setIsAbsenceModalOpen(true)}
          onOpenVehicleSignModal={() => setIsVehicleSignModalOpen(true)}
        />

        {/* 2단계 & 3단계: Call & Care (역할별 가이드 & 인터랙티브 처치 매뉴얼) */}
        <CallCareSection
          isAbsenceMode={isAbsenceMode}
          onOpenAbsenceModal={() => setIsAbsenceModalOpen(true)}
        />

      </main>

      {/* 푸터 영역 */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 font-bold text-slate-200">
              <Shield className="w-4 h-4 text-red-500" />
              <span>학교 응급상황 3C 대응 및 의사결정 시뮬레이터</span>
            </div>
            <p>참고자료: 교육부 『학교 응급상황 대응 가이드라인』 (발행일: 2025.04.25)</p>
            <p className="text-[11px] text-slate-500">
              본 웹 애플리케이션은 학교 현장에서 신속 정확한 응급 의사결정 지원을 위해 제작되었습니다.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLegalModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold border border-slate-700 transition-all flex items-center gap-1"
            >
              <Scale className="w-3.5 h-3.5 text-emerald-400" />
              <span>면책 법령 및 판례</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700"
              title="맨 위로 스크롤"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>

        </div>
      </footer>

      {/* 모달 레이어 들 */}
      <AbsenceNoticeModal
        isOpen={isAbsenceModalOpen}
        onClose={() => setIsAbsenceModalOpen(false)}
        onOpenVehicleSignModal={() => setIsVehicleSignModalOpen(true)}
      />

      <EmergencyVehicleSign
        isOpen={isVehicleSignModalOpen}
        onClose={() => setIsVehicleSignModalOpen(false)}
      />

      <LegalAndFormsModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
      />

      <DirectCallModal
        isOpen={isDirectCallModalOpen}
        onClose={() => setIsDirectCallModalOpen(false)}
      />

    </div>
  );
}
