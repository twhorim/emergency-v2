import React, { useState } from 'react';
import { SYMPTOM_CATEGORIES } from '../data/emergencyData';
import { CheckSquare, Square, AlertCircle, AlertTriangle, PhoneCall, RefreshCw, ChevronRight, Stethoscope, Car } from 'lucide-react';

/**
 * Check (상황판단) 자동 분류 알고리즘 컴포넌트
 * - 증상 체크리스트 선택 시 실시간 RED(119 응급) / YELLOW(보건실 준응급) 분류
 * - 보건교사 부재 모드 연동 안내
 */
export default function CheckSection({ selectedSymptoms, setSelectedSymptoms, isAbsenceMode, onOpenAbsenceModal, onOpenVehicleSignModal }) {
  const [activeCategory, setActiveCategory] = useState(SYMPTOM_CATEGORIES[0].id);

  // 선택된 증상 개수 계산
  const selectedCount = Object.keys(selectedSymptoms).filter(key => selectedSymptoms[key]).length;

  // 선택된 증상 중 119 응급(RED) 증상이 있는지 검사
  const hasEmergencySymptom = SYMPTOM_CATEGORIES.some(category => 
    category.symptoms.some(symptom => selectedSymptoms[symptom.id] && symptom.isEmergency)
  );

  // 체크 토글 함수
  const toggleSymptom = (symptomId) => {
    setSelectedSymptoms(prev => ({
      ...prev,
      [symptomId]: !prev[symptomId]
    }));
  };

  // 초기화 함수
  const resetChecklist = () => {
    setSelectedSymptoms({});
  };

  return (
    <section id="check-section" className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* 섹션 타이틀 */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                1단계: Check (상황판단)
              </span>
              <h2 className="text-2xl font-extrabold text-white">관찰 증상 선택 및 실시간 자동 분류</h2>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              목격한 학생/교직원의 증상 항목을 체크하세요. 시스템이 [119 즉시 신고 응급] 및 [보건실 처치 준응급]을 실시간 분류합니다.
            </p>
          </div>

          <button
            onClick={resetChecklist}
            className="self-start md:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all border border-slate-700"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>선택 항목 초기화</span>
          </button>
        </div>

        {/* 메인 레이아웃: 체크리스트 (좌) + 실시간 판단 결과 (우) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 좌측: 카테고리 탭 & 증상 체크리스트 (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 카테고리 탭 버튼 그룹 */}
            <div className="flex flex-wrap gap-2">
              {SYMPTOM_CATEGORIES.map(category => {
                const countInCategory = category.symptoms.filter(s => selectedSymptoms[s.id]).length;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                      activeCategory === category.id
                        ? 'bg-slate-800 text-white border-2 border-red-500 shadow-md shadow-red-500/10'
                        : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    <span>{category.title}</span>
                    {countInCategory > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-red-500 text-white font-extrabold">
                        {countInCategory}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* 활성 카테고리 증상 항목 리스트 */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
              {SYMPTOM_CATEGORIES.find(c => c.id === activeCategory)?.symptoms.map(symptom => {
                const isChecked = !!selectedSymptoms[symptom.id];
                return (
                  <div
                    key={symptom.id}
                    onClick={() => toggleSymptom(symptom.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                      isChecked
                        ? symptom.isEmergency
                          ? 'bg-red-500/15 border-red-500/50 text-white shadow-md shadow-red-500/10'
                          : 'bg-amber-500/15 border-amber-500/50 text-white shadow-md shadow-amber-500/10'
                        : 'bg-slate-900/50 border-slate-800/80 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      {isChecked ? (
                        <CheckSquare className={`w-5 h-5 ${symptom.isEmergency ? 'text-red-400' : 'text-amber-400'}`} />
                      ) : (
                        <Square className="w-5 h-5 text-slate-600" />
                      )}
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-sm font-semibold ${isChecked ? 'text-white' : 'text-slate-200'}`}>
                          {symptom.label}
                        </span>
                        {symptom.isEmergency ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/30 flex-shrink-0">
                            119 응급
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex-shrink-0">
                            준응급/비응급
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400">{symptom.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* 우측: 실시간 판정 결과 카드 (5 cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 space-y-4">
              
              {selectedCount === 0 ? (
                /* 미선택 안내 카트 */
                <div className="glass-panel p-8 rounded-2xl border border-slate-800 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                    <Stethoscope className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">증상을 선택해 주세요</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      좌측 체크리스트에서 관찰된 항목을 클릭하면 3C 의사결정 알고리즘에 따른 판정 및 대처 프로토콜이 자동 출력됩니다.
                    </p>
                  </div>
                </div>
              ) : hasEmergencySymptom ? (
                /* RED: 119 즉시 신고 응급상황 카트 */
                <div className="glass-panel-red p-6 rounded-2xl border-2 border-red-500 shadow-2xl shadow-red-500/20 space-y-5 animate-siren-flash">
                  <div className="flex items-center gap-3 border-b border-red-500/30 pb-4">
                    <div className="p-3 rounded-xl bg-red-600 text-white animate-bounce">
                      <AlertCircle className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-red-600 text-white uppercase tracking-wider">
                        RED ALERT
                      </span>
                      <h3 className="text-xl font-black text-red-100 mt-1">
                        119 즉시 신고 대상 [응급상황]
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-red-200 leading-relaxed">
                    선택한 증상 중 생명이 위급하거나 심각한 장해를 유발할 수 있는 응급 항목이 포함되어 있습니다. 지체 없이 <strong>119에 신고</strong>하고 역할별 프로토콜을 수행하세요.
                  </p>

                  {/* 119 즉시 신고 대형 버튼 */}
                  <a
                    href="tel:119"
                    className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-base shadow-lg shadow-red-600/40 transition-all border border-red-400/40"
                  >
                    <PhoneCall className="w-5 h-5 animate-ping" />
                    <span>지금 즉시 119 신고하기 (터치)</span>
                  </a>

                  {/* 보건교사 부재 시 특수 경고 */}
                  {isAbsenceMode && (
                    <div className="p-4 rounded-xl bg-amber-500/20 border border-amber-500/40 space-y-2">
                      <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                        <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                        <span>보건교사 부재중 비상 이송 수칙</span>
                      </div>
                      <p className="text-[11px] text-amber-200 leading-normal">
                        119 이송 불가 시 학교 자체 지정 차량으로 긴급 이송하며, 교감은 보건·담임 교사의 업무 공백을 메울 <strong>대체 교사를 즉시 지정</strong>하십시오.
                      </p>
                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={onOpenAbsenceModal}
                          className="px-2.5 py-1 rounded text-[11px] font-bold bg-amber-500 text-slate-900 hover:bg-amber-400"
                        >
                          대체교사 지정 매뉴얼
                        </button>
                        <button
                          onClick={onOpenVehicleSignModal}
                          className="px-2.5 py-1 rounded text-[11px] font-bold bg-slate-800 text-amber-300 border border-amber-500/40 hover:bg-slate-700 flex items-center gap-1"
                        >
                          <Car className="w-3 h-3" />
                          <span>이송 차량 표지 인쇄</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 2단계 Call & Care 로 이동 버튼 */}
                  <a
                    href="#call-care-section"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-xs font-bold border border-slate-700 transition-all"
                  >
                    <span>2단계: 역할별 대응 및 응급처치 가이드 보기</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              ) : (
                /* YELLOW: 보건실 처치 및 학부모 인계 준응급 카트 */
                <div className="glass-panel-yellow p-6 rounded-2xl border-2 border-amber-500/60 shadow-xl shadow-amber-500/10 space-y-5">
                  <div className="flex items-center gap-3 border-b border-amber-500/30 pb-4">
                    <div className="p-3 rounded-xl bg-amber-500 text-slate-950 font-bold">
                      <AlertTriangle className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500 text-slate-950 uppercase tracking-wider">
                        YELLOW NOTICE
                      </span>
                      <h3 className="text-xl font-black text-amber-100 mt-1">
                        보건실 처치 및 학부모 인계 [준응급/비응급]
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-amber-200 leading-relaxed">
                    생명에 직접적인 위협은 없으나 보건실 처치, 경과 관찰 및 필요시 학부모 인계 후 병원 진료가 필요한 상황입니다.
                  </p>

                  <div className="space-y-2 text-xs text-slate-200 bg-slate-900/60 p-4 rounded-xl border border-amber-500/20">
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-amber-400">1.</span>
                      <span>환자를 보건실로 안전하게 이동시키고 안정을 취하도록 함</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-amber-400">2.</span>
                      <span>증상별 맞춤 처치(RICE 수칙, 온/냉찜질, 이물 제거 등) 수행</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-amber-400">3.</span>
                      <span>담임교사를 통해 학부모에게 발생 상황 통보 및 병원 진료 안내</span>
                    </div>
                  </div>

                  {isAbsenceMode && (
                    <div className="p-3 rounded-lg bg-amber-500/20 border border-amber-500/30 text-xs text-amber-200">
                      <strong>보건교사 부재 시:</strong> 교무실 상주 비상 구급함(의약외품)을 활용하고, 증상 악화 시 즉시 119로 전환하십시오.
                    </div>
                  )}

                  <a
                    href="#call-care-section"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-xs font-bold border border-slate-700 transition-all"
                  >
                    <span>상황별 응급처치 매뉴얼 보기</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
