import React, { useState } from 'react';
import { Car, X, Printer, CheckCircle } from 'lucide-react';

/**
 * 의료기관 환자 이송 차량 표지판 출력용 모달
 * - 교육부 가이드라인 서식에 따른 차량 전면 부착 표지판
 */
export default function EmergencyVehicleSign({ isOpen, onClose }) {
  const [schoolName, setSchoolName] = useState('○○초등학교');
  const [vehicleNo, setVehicleNo] = useState('12가 3456');
  const [driverName, setDriverName] = useState('홍길동 (이송담당 교직원)');
  const [destination, setDestination] = useState('○○지정 응급병원');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
      <div className="glass-panel max-w-3xl w-full rounded-2xl border border-slate-700 shadow-2xl p-6 sm:p-8 max-h-[95vh] overflow-y-auto space-y-6">
        
        {/* 모달 헤더 */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <Car className="w-6 h-6 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">의료기관 환자 이송 차량 표지판 출력</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 차량 정보 입력 폼 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs">
          <div>
            <label className="block text-slate-400 font-bold mb-1">학교명</label>
            <input
              type="text"
              value={schoolName}
              onChange={e => setSchoolName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label className="block text-slate-400 font-bold mb-1">차량 번호</label>
            <input
              type="text"
              value={vehicleNo}
              onChange={e => setVehicleNo(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label className="block text-slate-400 font-bold mb-1">운전자 (이송 교직원)</label>
            <input
              type="text"
              value={driverName}
              onChange={e => setDriverName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label className="block text-slate-400 font-bold mb-1">목적지 병원</label>
            <input
              type="text"
              value={destination}
              onChange={e => setDestination(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* 인쇄 대상 표지판 영역 (printable-area 클래스 지정) */}
        <div className="printable-area bg-white text-slate-900 p-8 rounded-xl border-4 border-red-600 text-center space-y-6 shadow-inner">
          <div className="border-b-4 border-red-600 pb-4">
            <span className="text-xs font-black text-red-600 tracking-widest block uppercase">
              [학교 응급환자 긴급 이송 차량]
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
              의료기관 환자 이송 차량
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-4 text-left text-sm sm:text-base border-b-2 border-slate-300 pb-6">
            <div>
              <span className="text-slate-500 font-bold block text-xs">학교명</span>
              <span className="font-black text-slate-900">{schoolName}</span>
            </div>
            <div>
              <span className="text-slate-500 font-bold block text-xs">차량 번호</span>
              <span className="font-black text-red-600">{vehicleNo}</span>
            </div>
            <div>
              <span className="text-slate-500 font-bold block text-xs">운전자 (이송 담당)</span>
              <span className="font-bold text-slate-900">{driverName}</span>
            </div>
            <div>
              <span className="text-slate-500 font-bold block text-xs">목적지 의료기관</span>
              <span className="font-bold text-slate-900">{destination}</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 font-semibold leading-relaxed">
            본 차량은 학교보건법 및 교육부 『학교 응급상황 대응 가이드라인』에 따라 응급환자를 의료기관으로 긴급 이송 중인 차량입니다. (승용차 요일제 적용 제외 차량)
          </p>
        </div>

        {/* 하단 버튼 */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={handlePrint}
            className="flex-1 py-3 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/30"
          >
            <Printer className="w-5 h-5" />
            <span>표지판 인쇄하기 (A4)</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700"
          >
            닫기
          </button>
        </div>

      </div>
    </div>
  );
}
