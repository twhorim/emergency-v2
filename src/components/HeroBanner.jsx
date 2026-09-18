import React from 'react';
import { ShieldAlert, CheckCircle2, PhoneCall, HeartPulse, UserCheck, Sparkles, ChevronDown } from 'lucide-react';

/**
 * 히어로 섹션 컴포넌트
 * - 3C (Check-Call-Care) 수칙 시각적 안내
 * - 사용자 타깃 및 핵심 목적 소개
 */
export default function HeroBanner({ isAbsenceMode, onOpenAbsenceModal }) {
  return (
    <div className="relative overflow-hidden pt-8 pb-12 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/80">
      
      {/* 배경 장식 광원 효과 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-red-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* 상단 뱃지 및 타이틀 */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-semibold text-slate-300 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span>교육부 『학교 응급상황 대응 가이드라인』 100% 반영</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            학교 응급상황 <span className="bg-gradient-to-r from-red-500 via-amber-400 to-emerald-400 bg-clip-text text-transparent">3C 의사결정</span> 시뮬레이터
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            최초 발견 교직원이 <strong>Check(상황판단) - Call(도움요청) - Care(응급처치)</strong> 수칙에 따라 응급상황을 실시간 판정하고, 
            <strong>보건교사 부재 시에도 업무 공백 없이</strong> 대체 교사 지정 및 비상 이송을 수행하도록 돕는 가이드 애플리케이션입니다.
          </p>

          {/* 대상 타깃 교직원 태그 */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2 text-xs text-slate-400">
            <span className="font-bold text-slate-300 mr-1">대상 타깃:</span>
            {['담임/교과교사 (최초발견자)', '보건교사', '교감 (대책반장)', '학교장 (총괄)', '이송담당 교직원', '행정실장/직원'].map((target, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-slate-300">
                {target}
              </span>
            ))}
          </div>
        </div>

        {/* 3C 수칙 카드 3종 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 1. Check Card */}
          <a
            href="#check-section"
            className="group glass-panel p-6 rounded-2xl border border-slate-800 hover:border-red-500/50 hover:bg-slate-900/90 transition-all duration-300 space-y-3 relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 flex items-center justify-center font-black text-lg group-hover:scale-110 transition-transform">
              1
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-red-400">1단계: Check</span>
              <h3 className="text-xl font-bold text-white group-hover:text-red-300 transition-colors">
                상황 판단 & 자동 분류
              </h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              의식, 호흡, 두부손상, 골절, 특수질환 항목 체크 시 [119 즉시 신고 응급: RED] 및 [보건실/학부모 인계: YELLOW]를 실시간 자동 판정합니다.
            </p>
            <div className="flex items-center text-xs font-bold text-red-400 pt-2">
              <span>증상 체크하기</span>
              <ChevronDown className="w-4 h-4 ml-1 group-hover:translate-y-0.5 transition-transform" />
            </div>
          </a>

          {/* 2. Call Card */}
          <a
            href="#call-care-section"
            className="group glass-panel p-6 rounded-2xl border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900/90 transition-all duration-300 space-y-3 relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-black text-lg group-hover:scale-110 transition-transform">
              2
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-400">2단계: Call</span>
              <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                도움 요청 & 역할별 가이드
              </h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              119 신고, 보건교사/교감 보고, 담임교사 학부모 연락, 이송 담당 교직원 차량 배치 등 7개 교직원 역할별 대처 수칙을 제공합니다.
            </p>
            <div className="flex items-center text-xs font-bold text-blue-400 pt-2">
              <span>역할별 가이드 보기</span>
              <ChevronDown className="w-4 h-4 ml-1 group-hover:translate-y-0.5 transition-transform" />
            </div>
          </a>

          {/* 3. Care Card */}
          <a
            href="#call-care-section"
            className="group glass-panel p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900/90 transition-all duration-300 space-y-3 relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-black text-lg group-hover:scale-110 transition-transform">
              3
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-400">3단계: Care</span>
              <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                응급처치 & 타이머 매뉴얼
              </h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              CPR 메트로놈(110bpm), 하임리히 카운터, 경련 5분 측정 타이머, 에피네프린/저혈당 처치 등 인터랙티브 도구를 지원합니다.
            </p>
            <div className="flex items-center text-xs font-bold text-emerald-400 pt-2">
              <span>응급처치 타이머 시작</span>
              <ChevronDown className="w-4 h-4 ml-1 group-hover:translate-y-0.5 transition-transform" />
            </div>
          </a>

        </div>

      </div>
    </div>
  );
}
