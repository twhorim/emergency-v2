import React from 'react';
import { PhoneCall, X, AlertTriangle, MapPin, CheckSquare, Building } from 'lucide-react';

/**
 * 빠른 119 비상 신고 & 비상 연락망 모달
 */
export default function DirectCallModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
      <div className="glass-panel-red max-w-lg w-full rounded-2xl border-2 border-red-500 shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* 모달 헤더 */}
        <div className="flex items-center justify-between border-b border-red-500/30 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-red-600 text-white animate-pulse">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-red-600 text-white uppercase">
                EMERGENCY CALL
              </span>
              <h3 className="text-xl font-black text-red-100 mt-0.5">
                119 긴급 신고 및 비상 연락망
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 119 직통 버튼 */}
        <a
          href="tel:119"
          className="w-full flex items-center justify-center gap-3 py-4 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-lg shadow-xl shadow-red-600/40 border border-red-400/40 transform active:scale-98 transition-all"
        >
          <PhoneCall className="w-6 h-6 animate-bounce" />
          <span>119 다이렉트 통화 연결 (터치)</span>
        </a>

        {/* 119 신고 시 상황 전달 체크리스트 */}
        <div className="space-y-2 bg-slate-900/80 p-4 rounded-xl border border-red-500/30 text-xs text-slate-200">
          <h4 className="font-bold text-red-300 flex items-center gap-1.5 mb-2">
            <MapPin className="w-4 h-4" />
            <span>119 상담원 연결 시 핵심 전달 사항</span>
          </h4>
          <div className="space-y-1.5 leading-relaxed">
            <div className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <span><strong>정확한 위치:</strong> 학교명, 동/층수, 구체적 장소(예: 체육관, 2학년 3반 복도)</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <span><strong>환자 상태:</strong> 의식 여부, 호흡 상태, 경련/출혈 여부</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <span><strong>스피커폰 전환:</strong> 전화기 스피커폰 키고 구급 대원 지시에 따라 처치 수행</span>
            </div>
          </div>
        </div>

        {/* 교내 비상 연락망 목록 */}
        <div className="space-y-2 text-xs">
          <h4 className="font-bold text-slate-300 flex items-center gap-1.5">
            <Building className="w-4 h-4 text-amber-400" />
            <span>교내 비상 대책반 연락처</span>
          </h4>

          <div className="grid grid-cols-2 gap-2 text-slate-200">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between">
              <span>교무실</span>
              <span className="font-mono text-amber-400">내선 101</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between">
              <span>보건실</span>
              <span className="font-mono text-emerald-400">내선 119</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between">
              <span>행정실</span>
              <span className="font-mono text-cyan-400">내선 102</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between">
              <span>교감실</span>
              <span className="font-mono text-purple-400">내선 103</span>
            </div>
          </div>
        </div>

        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700"
        >
          닫기
        </button>

      </div>
    </div>
  );
}
