import React, { useState } from 'react';
import { LEGAL_AND_PRECEDENTS } from '../data/emergencyData';
import { Scale, X, FileText, Gavel, ShieldCheck, Download } from 'lucide-react';

/**
 * 관련 법령, 대법원 판례 및 교육부 서식 안내 모달
 */
export default function LegalAndFormsModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('precedents'); // 'precedents' | 'laws' | 'forms'

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
      <div className="glass-panel max-w-4xl w-full rounded-2xl border border-slate-700 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6">
        
        {/* 모달 헤더 */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white">법률, 판례 및 표준 서식 가이드</h3>
              <p className="text-xs text-slate-400">교직원 응급처치 선의의 면책 조항 및 대법원 주요 판례</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 탭 네비게이션 */}
        <div className="flex border-b border-slate-800 gap-4">
          <button
            onClick={() => setActiveTab('precedents')}
            className={`pb-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'precedents'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Gavel className="w-4 h-4" />
            <span>대법원 주요 판례</span>
          </button>

          <button
            onClick={() => setActiveTab('laws')}
            className={`pb-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'laws'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>응급처치 면책 법령</span>
          </button>

          <button
            onClick={() => setActiveTab('forms')}
            className={`pb-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'forms'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>교육부 표준 서식</span>
          </button>
        </div>

        {/* 1. 대법원 판례 파트 */}
        {activeTab === 'precedents' && (
          <div className="space-y-4">
            {LEGAL_AND_PRECEDENTS.precedents.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {item.caseNo}
                  </span>
                  <span className="text-xs text-slate-500">대법원 판례</span>
                </div>
                <h4 className="text-sm font-bold text-white">{item.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* 2. 법령 조항 파트 */}
        {activeTab === 'laws' && (
          <div className="space-y-4">
            {LEGAL_AND_PRECEDENTS.laws.map((law, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-slate-900/80 border border-emerald-500/30 space-y-2">
                <h4 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{law.title}</span>
                </h4>
                <p className="text-xs text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-lg border border-slate-800">
                  {law.content}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* 3. 표준 서식 파트 */}
        {activeTab === 'forms' && (
          <div className="space-y-4 text-xs text-slate-300">
            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h4 className="font-bold text-white text-sm">교육부 가이드라인 권장 표준 서식 안내</h4>
              <p className="text-slate-400">
                응급 상황 처리 후 보건일지 및 공제회 제출을 위해 아래 서식을 작성하여 보관해야 합니다.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span className="font-semibold text-white">응급환자 기록지 (사고보고서)</span>
                  </div>
                  <span className="text-[10px] text-slate-500">부록 97p</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <span className="font-semibold text-white">학생 응급처치 및 투약 동의서</span>
                  </div>
                  <span className="text-[10px] text-slate-500">부록 81p</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 닫기 버튼 */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs"
          >
            닫기
          </button>
        </div>

      </div>
    </div>
  );
}
