import React, { useState } from 'react';
import { ROLE_PROTOCOLS, CARE_MANUALS } from '../data/emergencyData';
import InteractiveTimers from './InteractiveTimers';
import { UserCheck, Stethoscope, HeartPulse, Activity, AlertCircle, Syringe, ShieldAlert, ChevronRight, CheckCircle2 } from 'lucide-react';

/**
 * Call & Care (도움요청 & 응급처치) 역할별 수칙 및 실무 매뉴얼 컴포넌트
 */
export default function CallCareSection({ isAbsenceMode, onOpenAbsenceModal }) {
  const [activeRole, setActiveRole] = useState(ROLE_PROTOCOLS[0].roleId);
  const [activeManual, setActiveManual] = useState(CARE_MANUALS[0].id);

  const currentRoleData = ROLE_PROTOCOLS.find(r => r.roleId === activeRole) || ROLE_PROTOCOLS[0];
  const currentManualData = CARE_MANUALS.find(m => m.id === activeManual) || CARE_MANUALS[0];

  return (
    <section id="call-care-section" className="py-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* 섹션 2: Call - 역할별 대처 요령 */}
        <div className="space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                2단계: Call (도움요청)
              </span>
              <h2 className="text-2xl font-extrabold text-white">직직원 역할별 비상 대처 수칙</h2>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              학교 내 응급상황 관리체계에 따른 7개 역할별 업무분장 및 조치 사항을 선택하여 확인하세요.
            </p>
          </div>

          {/* 역할 탭 버튼 리스트 */}
          <div className="flex flex-wrap gap-2">
            {ROLE_PROTOCOLS.map(role => {
              const isSelected = activeRole === role.roleId;
              return (
                <button
                  key={role.roleId}
                  onClick={() => setActiveRole(role.roleId)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105 border border-blue-400'
                      : 'bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>{role.roleName}</span>
                </button>
              );
            })}
          </div>

          {/* 선택된 역할 대처 카트 */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className={`inline-block px-3 py-1 rounded-md text-xs font-extrabold border mb-2 ${currentRoleData.badgeColor}`}>
                  {currentRoleData.roleName}
                </span>
                <h3 className="text-xl font-bold text-white">{currentRoleData.roleName} 주요 대처 가이드</h3>
                <p className="text-xs text-slate-400">{currentRoleData.subtitle}</p>
              </div>

              {isAbsenceMode && (activeRole === 'vice_principal' || activeRole === 'transport_staff' || activeRole === 'health_teacher') && (
                <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-xs text-amber-200 space-y-1">
                  <div className="font-bold flex items-center gap-1">
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    <span>보건교사 부재 시 가동 수칙</span>
                  </div>
                  <p className="text-[11px]">
                    교감은 대체 교사를 지정하고, 이송 담당 교직원은 비상 이송 차량 지침을 준수하십시오.
                  </p>
                </div>
              )}
            </div>

            {/* 역할별 조치 액션 카드 리스트 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentRoleData.actions.map((action, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/40 transition-all flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">{action.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{action.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 섹션 3: Care - 상황별 응급처치 실무 매뉴얼 */}
        <div className="space-y-6 pt-6 border-t border-slate-800">
          <div className="border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                3단계: Care (응급처치)
              </span>
              <h2 className="text-2xl font-extrabold text-white">상황별 응급처치 인터랙티브 매뉴얼</h2>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              CPR 메트로놈, 하임리히 카운터, 경련 측정 타이머 등 현장에서 직접 활용할 수 있는 가이드 도구를 제공합니다.
            </p>
          </div>

          {/* 매뉴얼 선택 서브탭 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {CARE_MANUALS.map(manual => {
              const isSelected = activeManual === manual.id;
              return (
                <button
                  key={manual.id}
                  onClick={() => setActiveManual(manual.id)}
                  className={`p-3 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-2 text-center ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-105 border border-emerald-400'
                      : 'bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  <Stethoscope className="w-5 h-5" />
                  <span className="line-clamp-1">{manual.title}</span>
                </button>
              );
            })}
          </div>

          {/* 선택된 매뉴얼 상세 및 인터랙티브 타이머 통합 구역 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* 좌측: 단계별 처리 절차 (7 cols) */}
            <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>{currentManualData.title} 단계별 처치 순서</span>
                </h3>
              </div>

              <div className="space-y-3">
                {currentManualData.steps.map(step => (
                  <div key={step.step} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {step.step}
                    </span>
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-emerald-300">{step.title}</h4>
                      <p className="text-xs text-slate-200 leading-relaxed">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 우측: 인터랙티브 타이머 도구 (5 cols) */}
            <div className="lg:col-span-5">
              {currentManualData.timerType ? (
                <InteractiveTimers activeType={currentManualData.timerType} />
              ) : (
                <div className="glass-panel p-6 rounded-2xl border border-slate-800 text-center text-slate-400 text-xs">
                  상단 탭에서 CPR, 경련, 하임리히, 당뇨 처치를 선택하시면 실시간 타이머 도구가 표시됩니다.
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
