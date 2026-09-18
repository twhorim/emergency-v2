import React from 'react';
import { AlertTriangle, X, ShieldAlert, Cross, Car, UserCheck, CheckCircle2, Printer } from 'lucide-react';

/**
 * 보건교사 부재 시 비상 대응 프로토콜 모달
 */
export default function AbsenceNoticeModal({ isOpen, onClose, onOpenVehicleSignModal }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="glass-panel-yellow max-w-2xl w-full rounded-2xl border-2 border-amber-500/70 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6">
        
        {/* 모달 상단 헤더 */}
        <div className="flex items-start justify-between gap-4 border-b border-amber-500/30 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-500 text-slate-950 font-black">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-black bg-amber-500 text-slate-950 uppercase">
                비상 프로토콜
              </span>
              <h3 className="text-xl font-extrabold text-amber-100 mt-0.5">
                보건교사 부재 시 업무대행 및 대응 지침
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. 교감의 대체 교사 지정 매뉴얼 */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
            <UserCheck className="w-4 h-4" />
            <span>1. 교감(대책반장) 대체 교사 배정 지침</span>
          </h4>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-500/30 text-xs text-slate-200 space-y-2 leading-relaxed">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span><strong>보건실 대체 교사 배치:</strong> 보건교사가 응급 이송 동행 또는 출장 시, 보건실 업무 공백을 방지하기 위해 대체 교사를 즉시 지정 배치합니다.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span><strong>담임교사 수업 대체:</strong> 담임교사가 병원 이송 및 학부모 인계를 위해 동행할 경우 해당 학급의 자습/수업 보결 대체 교사를 수립합니다.</span>
            </div>
          </div>
        </div>

        {/* 2. 교무실 비상 구급함 위치 및 의약외품 안내 */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
            <Cross className="w-4 h-4" />
            <span>2. 비상 구급함(의약외품) 위치 및 활용 지침</span>
          </h4>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-500/30 text-xs text-slate-200 space-y-2 leading-relaxed">
            <p><strong>비상 구급함 비치 장소:</strong> 교무실, 행정실, 체육관 기구실 등 교직원 상주 장소</p>
            <p><strong>취급 가능 물품:</strong> 붕대, 거즈, 소독약, 반창고, 밴드 등 <strong>의약외품</strong>만 취급 가능 (간호사 면허 미소지자는 전문 의약품 투약 불가)</p>
          </div>
        </div>

        {/* 3. 비상 차량 이송 수칙 */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
            <Car className="w-4 h-4" />
            <span>3. 비상 이송 차량 지침 & 환자 이송 표지</span>
          </h4>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-500/30 text-xs text-slate-200 space-y-3 leading-relaxed">
            <p>
              119 구급대 이송이 불가한 경우 학교 지정 차량으로 이송합니다. <strong>(단, 보건교사는 운전자에서 제외)</strong>
            </p>
            <div className="flex items-center justify-between gap-4 pt-2 border-t border-slate-800">
              <span className="text-xs text-amber-300 font-semibold">차량 전면 부착용 "의료기관 환자 이송 차량" 표지판</span>
              <button
                onClick={() => {
                  onClose();
                  onOpenVehicleSignModal();
                }}
                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>표지판 출력 모달 열기</span>
              </button>
            </div>
          </div>
        </div>

        {/* 닫기 버튼 */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700"
          >
            지침 확인 완료 및 모달 닫기
          </button>
        </div>

      </div>
    </div>
  );
}
