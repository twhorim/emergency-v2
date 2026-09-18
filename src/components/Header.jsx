import React, { useState } from 'react';
import { Shield, Siren, PhoneCall, Volume2, VolumeX, AlertTriangle, FileText, Scale } from 'lucide-react';

/**
 * 상단 헤더 컴포넌트
 * - 보건교사 부재중 토글 (ON/OFF)
 * - 비상 알람 소리 토글 (Web Audio API 기반)
 * - 빠른 119 신고 모달 및 비상 연락망, 법령/서식 모달 연동
 */
export default function Header({ 
  isAbsenceMode, 
  setIsAbsenceMode, 
  isAlarmActive, 
  toggleAlarm,
  onOpenAbsenceModal,
  onOpenLegalModal,
  onOpenDirectCallModal
}) {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* 로고 및 브랜딩 */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 shadow-lg shadow-red-500/20 text-white">
            <Shield className="w-7 h-7" />
            {isAbsenceMode && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500"></span>
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                학교 응급상황 3C 시뮬레이터
              </h1>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
                Check · Call · Care
              </span>
            </div>
            <p className="text-xs text-slate-400">교육부 학교 응급상황 대응 가이드라인 기반</p>
          </div>
        </div>

        {/* 오른쪽 조작 버튼 그룹 */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* 보건교사 부재중 토글 버튼 */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all ${
            isAbsenceMode 
              ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-lg shadow-amber-500/10' 
              : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
          }`}>
            <span className="text-xs font-semibold hidden md:inline">
              {isAbsenceMode ? '보건교사 부재중' : '보건교사 상주중'}
            </span>
            <button
              onClick={() => {
                const nextState = !isAbsenceMode;
                setIsAbsenceMode(nextState);
                if (nextState) {
                  onOpenAbsenceModal();
                }
              }}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isAbsenceMode ? 'bg-amber-500' : 'bg-slate-700'
              }`}
              title="보건교사 부재중 토글 (비상 프로토콜 전환)"
            >
              <span className="sr-only">보건교사 부재 여부 토글</span>
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  isAbsenceMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* 비상 사운드 토글 */}
          <button
            onClick={toggleAlarm}
            className={`p-2.5 rounded-xl border transition-all ${
              isAlarmActive 
                ? 'bg-red-500/20 border-red-500/50 text-red-400 animate-pulse' 
                : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
            title={isAlarmActive ? '비상 경보음 끄기' : '비상 경보음 켜기'}
          >
            {isAlarmActive ? <Volume2 className="w-5 h-5 text-red-400" /> : <VolumeX className="w-5 h-5" />}
          </button>

          {/* 법령 & 판례 모달 버튼 */}
          <button
            onClick={onOpenLegalModal}
            className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:text-white transition-all hidden sm:flex items-center gap-1.5 text-xs font-medium"
            title="관련 법령 및 대법원 판례 보기"
          >
            <Scale className="w-4 h-4 text-emerald-400" />
            <span>법령·판례</span>
          </button>

          {/* 빠른 119 신고 비상 버튼 */}
          <button
            onClick={onOpenDirectCallModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm shadow-lg shadow-red-600/30 transition-all transform active:scale-95 border border-red-400/30"
          >
            <PhoneCall className="w-4 h-4 animate-bounce" />
            <span>119 신고</span>
          </button>

        </div>

      </div>

      {/* 부재 모드 경고 배너 */}
      {isAbsenceMode && (
        <div className="bg-amber-500/15 border-t border-b border-amber-500/30 px-4 py-2 text-xs text-amber-200 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 animate-pulse" />
            <span>
              <strong>[비상] 보건교사 부재 모드가 활성화되었습니다.</strong> 교감 대체교사 지정 수칙, 교무실 비상구급함 지침 및 차량이송 지정 담당자 비상 프로토콜이 가동됩니다.
            </span>
            <button 
              onClick={onOpenAbsenceModal}
              className="ml-auto underline font-semibold text-amber-300 hover:text-amber-100 flex-shrink-0"
            >
              대응 지침 상세보기
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
