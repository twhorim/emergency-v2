import React, { useState, useEffect, useRef } from 'react';
import { HeartPulse, Timer, Play, Pause, RotateCcw, Volume2, VolumeX, AlertCircle, CheckCircle2, Syringe } from 'lucide-react';

/**
 * 인터랙티브 응급처치 타이머 및 가이드 도구 모음
 * - CPR 메트로놈 (Web Audio API 110bpm 사운드 + 비주얼 메트로놈)
 * - 경련 시작/완화 기록 타이머 (5분 경과 시 뇌전증 중첩증 비상 경고)
 * - 기도폐쇄 등두드리기 5회 ↔ 복부밀어내기 5회 카운터
 * - 저혈당 15분 재측정 타이머
 * - 에피네프린 10초 유지 타이머
 */
export default function InteractiveTimers({ activeType }) {
  // ----------------------------------------------------
  // 1. CPR 메트로놈 상태 및 로직 (110 BPM)
  // ----------------------------------------------------
  const [cprActive, setCprActive] = useState(false);
  const [cprCount, setCprCount] = useState(0); // 1~30 압박 카운트
  const [cprCycles, setCprCycles] = useState(0); // 30:2 주기 카운트
  const [cprSoundOn, setCprSoundOn] = useState(true);
  const audioCtxRef = useRef(null);

  // Web Audio API로 110bpm 삐 소리 재생
  const playBeep = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime); // A5 노트 (880Hz)
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    let interval = null;
    if (cprActive) {
      // 110 bpm = 약 545.45 ms 인터벌
      interval = setInterval(() => {
        setCprCount(prev => {
          const next = prev + 1;
          if (next > 30) {
            setCprCycles(c => c + 1);
            return 1;
          }
          return next;
        });
        if (cprSoundOn) {
          playBeep();
        }
      }, 545);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [cprActive, cprSoundOn]);

  const resetCpr = () => {
    setCprActive(false);
    setCprCount(0);
    setCprCycles(0);
  };

  // ----------------------------------------------------
  // 2. 경련(발작) 지속시간 기록 타이머
  // ----------------------------------------------------
  const [seizureSeconds, setSeizureSeconds] = useState(0);
  const [seizureActive, setSeizureActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (seizureActive) {
      interval = setInterval(() => {
        setSeizureSeconds(s => s + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [seizureActive]);

  const formatSeizureTime = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetSeizure = () => {
    setSeizureActive(false);
    setSeizureSeconds(0);
  };

  // ----------------------------------------------------
  // 3. 하임리히 기도폐쇄 카운터 (등두드리기 5 ↔ 복부밀어내기 5)
  // ----------------------------------------------------
  const [heimlichMode, setHeimlichMode] = useState('back'); // 'back' | 'thrust'
  const [heimlichCount, setHeimlichCount] = useState(0);

  const handleHeimlichClick = () => {
    const next = heimlichCount + 1;
    if (next >= 5) {
      setHeimlichCount(0);
      setHeimlichMode(prev => (prev === 'back' ? 'thrust' : 'back'));
    } else {
      setHeimlichCount(next);
    }
  };

  const resetHeimlich = () => {
    setHeimlichMode('back');
    setHeimlichCount(0);
  };

  // ----------------------------------------------------
  // 4. 저혈당 15분 재측정 카운트다운 타이머
  // ----------------------------------------------------
  const [glucoseSec, setGlucoseSec] = useState(15 * 60);
  const [glucoseActive, setGlucoseActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (glucoseActive && glucoseSec > 0) {
      interval = setInterval(() => {
        setGlucoseSec(s => s - 1);
      }, 1000);
    } else if (glucoseSec === 0) {
      setGlucoseActive(false);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [glucoseActive, glucoseSec]);

  const formatGlucoseTime = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // ----------------------------------------------------
  // 5. 에피네프린 10초 유지 타이머
  // ----------------------------------------------------
  const [epiSec, setEpiSec] = useState(10);
  const [epiActive, setEpiActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (epiActive && epiSec > 0) {
      interval = setInterval(() => {
        setEpiSec(s => s - 1);
      }, 1000);
    } else if (epiSec === 0) {
      setEpiActive(false);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [epiActive, epiSec]);

  // ----------------------------------------------------
  // 렌더링 파트
  // ----------------------------------------------------
  if (activeType === 'cpr_metronome') {
    return (
      <div className="glass-panel-red p-6 rounded-2xl border border-red-500/40 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-red-200 font-bold text-base">
            <HeartPulse className="w-6 h-6 text-red-400 animate-pulse" />
            <span>CPR 가슴압박 메트로놈 (속도: 110회/분)</span>
          </div>
          <button
            onClick={() => setCprSoundOn(!cprSoundOn)}
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs flex items-center gap-1"
          >
            {cprSoundOn ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            <span className="hidden sm:inline">{cprSoundOn ? '소리 켜짐' : '음소거'}</span>
          </button>
        </div>

        {/* 비주얼 메트로놈 박스 */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className={`p-5 rounded-2xl border transition-all ${
            cprActive ? 'bg-red-600/30 border-red-500 animate-cpr-beat' : 'bg-slate-900/60 border-slate-800'
          }`}>
            <span className="text-xs text-slate-400 block font-semibold">현재 압박 횟수</span>
            <span className="text-4xl sm:text-5xl font-black text-white tracking-wider">
              {cprCount} <span className="text-xl text-red-400 font-bold">/ 30</span>
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs text-slate-400 block font-semibold">완료 주기 (30:2)</span>
            <span className="text-4xl sm:text-5xl font-black text-amber-400 tracking-wider">
              {cprCycles} <span className="text-xl text-amber-200 font-bold">주기</span>
            </span>
          </div>
        </div>

        {/* 30회 도달 시 인공호흡 안내 */}
        {cprCount >= 28 && (
          <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/50 text-amber-200 text-xs font-bold text-center animate-pulse">
            곧 30회 압박 완료! 기도 유지 후 <strong>인공호흡 2회</strong>를 시행하세요.
          </div>
        )}

        {/* 조작 버튼 */}
        <div className="flex gap-3">
          <button
            onClick={() => setCprActive(!cprActive)}
            className={`flex-1 py-3 px-4 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
              cprActive
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                : 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/30'
            }`}
          >
            {cprActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            <span>{cprActive ? '메트로놈 일시정지' : 'CPR 박자 시작 (110 BPM)'}</span>
          </button>
          
          <button
            onClick={resetCpr}
            className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1"
          >
            <RotateCcw className="w-4 h-4" />
            <span>초기화</span>
          </button>
        </div>
      </div>
    );
  }

  if (activeType === 'seizure_timer') {
    return (
      <div className="glass-panel p-6 rounded-2xl border border-purple-500/40 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-purple-200 font-bold text-base">
            <Timer className="w-6 h-6 text-purple-400" />
            <span>경련(발작) 지속시간 체크 타이머</span>
          </div>
          <span className="text-xs text-slate-400">5분 이상 지속 시 뇌전증 중첩증</span>
        </div>

        {/* 디스플레이 */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
          <span className="text-xs text-slate-400 block font-semibold mb-1">경련 진행 시간</span>
          <span className={`text-5xl font-black tracking-widest ${
            seizureSeconds >= 300 ? 'text-red-400 animate-pulse' : 'text-purple-300'
          }`}>
            {formatSeizureTime(seizureSeconds)}
          </span>
        </div>

        {/* 5분 초과 위급 경고 */}
        {seizureSeconds >= 300 && (
          <div className="p-4 rounded-xl bg-red-600/30 border-2 border-red-500 text-red-100 text-xs space-y-1 animate-bounce">
            <div className="flex items-center gap-1.5 font-black text-sm">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <span>경련 5분 초과 경고 (뇌전증 중첩증)</span>
            </div>
            <p>발작이 5분 이상 지속되고 있습니다. 즉시 119에 재신고하고 응급실 이송을 진행해야 합니다!</p>
          </div>
        )}

        {/* 조작 버튼 */}
        <div className="flex gap-3">
          <button
            onClick={() => setSeizureActive(!seizureActive)}
            className={`flex-1 py-3 px-4 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
              seizureActive
                ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/30'
                : 'bg-purple-500 hover:bg-purple-400 text-slate-950 shadow-purple-500/20'
            }`}
          >
            {seizureActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            <span>{seizureActive ? '타이머 일시정지' : '경련 시작 시간 측정'}</span>
          </button>
          
          <button
            onClick={resetSeizure}
            className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1"
          >
            <RotateCcw className="w-4 h-4" />
            <span>초기화</span>
          </button>
        </div>
      </div>
    );
  }

  if (activeType === 'heimlich_counter') {
    return (
      <div className="glass-panel p-6 rounded-2xl border border-amber-500/40 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-200 font-bold text-base">
            <AlertCircle className="w-6 h-6 text-amber-400" />
            <span>기도폐쇄 교대 카운터 (5회 ↔ 5회)</span>
          </div>
          <button
            onClick={resetHeimlich}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>초기화</span>
          </button>
        </div>

        {/* 카운터 클릭 영역 */}
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-5 rounded-2xl border text-center transition-all ${
            heimlichMode === 'back' ? 'bg-amber-500/25 border-amber-400 scale-105' : 'bg-slate-900/40 border-slate-800 opacity-60'
          }`}>
            <span className="text-xs font-bold text-amber-300 block">1단계: 등 두드리기</span>
            <span className="text-3xl font-black text-white mt-1 block">
              {heimlichMode === 'back' ? `${heimlichCount} / 5` : '완료'}
            </span>
            <span className="text-[11px] text-slate-400 mt-1 block">날개뼈 사이 손꿈치 강타</span>
          </div>

          <div className={`p-5 rounded-2xl border text-center transition-all ${
            heimlichMode === 'thrust' ? 'bg-red-500/25 border-red-400 scale-105' : 'bg-slate-900/40 border-slate-800 opacity-60'
          }`}>
            <span className="text-xs font-bold text-red-300 block">2단계: 복부 밀어내기</span>
            <span className="text-3xl font-black text-white mt-1 block">
              {heimlichMode === 'thrust' ? `${heimlichCount} / 5` : '대기'}
            </span>
            <span className="text-[11px] text-slate-400 mt-1 block">명치 아래 후상방 밀쳐올림</span>
          </div>
        </div>

        <button
          onClick={handleHeimlichClick}
          className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-base shadow-lg shadow-amber-500/20 active:scale-98 transition-all"
        >
          {heimlichMode === 'back' ? `등 두드리기 1회 쳐올림 (${heimlichCount + 1}/5)` : `복부 밀어내기 1회 시행 (${heimlichCount + 1}/5)`}
        </button>
      </div>
    );
  }

  if (activeType === 'glucose_timer') {
    return (
      <div className="glass-panel p-6 rounded-2xl border border-emerald-500/40 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-200 font-bold text-base">
            <Timer className="w-6 h-6 text-emerald-400" />
            <span>저혈당 15g 단순당 섭취 후 15분 재측정 타이머</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
          <span className="text-xs text-slate-400 block font-semibold mb-1">혈당 재측정 남은 시간</span>
          <span className="text-4xl font-black text-emerald-300 tracking-wider">
            {formatGlucoseTime(glucoseSec)}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setGlucoseActive(!glucoseActive)}
            className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
          >
            {glucoseActive ? '일시정지' : '15분 타이머 시작'}
          </button>
          <button
            onClick={() => { setGlucoseActive(false); setGlucoseSec(15 * 60); }}
            className="px-3 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
          >
            리셋
          </button>
        </div>
      </div>
    );
  }

  if (activeType === 'epipen_timer') {
    return (
      <div className="glass-panel p-6 rounded-2xl border border-rose-500/40 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-rose-200 font-bold text-base">
            <Syringe className="w-6 h-6 text-rose-400" />
            <span>에피네프린 허벅지 주사 10초 유지 타이머</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
          <span className="text-xs text-slate-400 block mb-1">허벅지 바깥쪽 수직 주약 강하게 유지</span>
          <span className="text-5xl font-black text-rose-400">{epiSec} 초</span>
        </div>

        <button
          onClick={() => { setEpiSec(10); setEpiActive(true); }}
          className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-600/30"
        >
          10초 주사 타이머 시작
        </button>
      </div>
    );
  }

  return null;
}
