// 교육부 『학교 응급상황 대응 가이드라인』 및 PRD 100% 반영 데이터베이스

// 1. Check (상황판단) 증상 체크리스트 데이터
export const SYMPTOM_CATEGORIES = [
  {
    id: 'consciousness',
    title: '의식 및 신경계 상태',
    symptoms: [
      { id: 'c1', label: '불러도 눈을 뜨지 못하거나 의식이 명료하지 않음', isEmergency: true, desc: '급성 의식장애로 즉시 119 신고 필요' },
      { id: 'c2', label: '묻는 말에 횡설수설하거나 언어장애/의식 변화', isEmergency: true, desc: '뇌 손상 또는 급성 신경학적 이상 의심' },
      { id: 'c3', label: '경련(발작)을 일으키거나 의식을 잃음', isEmergency: true, desc: '기도 유지 및 안전 확보 후 119 신고' },
      { id: 'c4', label: '가벼운 두통 또는 일시적 어지러움 호소', isEmergency: false, desc: '보건실 안정을 취하며 관찰' },
    ]
  },
  {
    id: 'respiration',
    title: '호흡 및 순환기 상태',
    symptoms: [
      { id: 'r1', label: '급격한 호흡곤란 (분당 20회 이상 가쁘게 숨을 쉬움)', isEmergency: true, desc: '기도 확보 및 산소 제공 준비, 119 신고' },
      { id: 'r2', label: '입술이나 얼굴이 파랗게 변함 (청색증)', isEmergency: true, desc: '체내 산소 부족 위급 상황' },
      { id: 'r3', label: '갑작스러운 심한 가슴 통증 (30분 이상 지속)', isEmergency: true, desc: '심근경색/심혈관 응급 의심' },
      { id: 'r4', label: '일시적 호흡곤란 후 안정을 취하니 증상 완화됨', isEmergency: false, desc: '과호흡 수칙 적용 후 관찰' },
    ]
  },
  {
    id: 'body_neuro',
    title: '신체 기능 및 두부 손상',
    symptoms: [
      { id: 'b1', label: '혼자 서거나 걸을 수 없을 정도의 어지러움으로 쓰러짐/실신', isEmergency: true, desc: '뇌혈류 감소 또는 중증 신경계 이상' },
      { id: 'b2', label: '두부 손상(머리 부상) 후 구토 또는 심한 통증 호소', isEmergency: true, desc: '뇌출혈 또는 뇌손상 의심' },
      { id: 'b3', label: '단순 복통, 구토, 설사 (호흡곤란/저혈압 없음)', isEmergency: false, desc: '보건실 온찜질 및 보호자 인계' },
    ]
  },
  {
    id: 'trauma',
    title: '외상, 출혈 및 골절',
    symptoms: [
      { id: 't1', label: '뼈가 피부 밖으로 돌출된 개방성 골절 또는 다발성 골절', isEmergency: true, desc: '감염 위험 및 대량 출혈 가능성, 즉시 119' },
      { id: 't2', label: '신체 일부의 절단 또는 심각한 훼손', isEmergency: true, desc: '직접 압박 지혈 및 절단 조직 생리식염수 보관' },
      { id: 't3', label: '지혈이 되지 않는 지속적인 대량 출혈', isEmergency: true, desc: '깨끗한 거즈 직접 압박 및 심장보다 높이 유지' },
      { id: 't4', label: '단순 부종 및 통증만 있는 염좌(발목 접질림 등)', isEmergency: false, desc: 'RICE 수칙(휴식, 냉찜질, 압박, 거상)' },
    ]
  },
  {
    id: 'disease_env',
    title: '특수 응급질환 (당뇨, 알레르기, 교상, 화상)',
    symptoms: [
      { id: 'd1', label: '아나필락시스 전신반응 (두드러기+호흡곤란+얼굴 부종)', isEmergency: true, desc: '에피네프린 자가주사 후 즉시 119' },
      { id: 'd2', label: '저혈당 쇼크 (혈당 70 미만, 식은땀, 의식 장애)', isEmergency: true, desc: '의식 있을 시 단순당 15g, 의식 없을 시 입으로 먹이지 말고 119' },
      { id: 'd3', label: '화학물질에 의한 눈 손상 또는 2도 이상 광범위 화상', isEmergency: true, desc: '흐르는 물 세척 후 즉시 병원 이송' },
      { id: 'd4', label: '독뱀에 물리거나 전신 알레르기 반응 동반 교상', isEmergency: true, desc: '환부 심장보다 낮게 고정 후 119' },
      { id: 'd5', label: '단순 벌 쏘임 (국소 부종만 있음) 또는 단순 1도 화상', isEmergency: false, desc: '벌침 제거 카드 밀기, 냉찜질 적용' },
    ]
  }
];

// 2. 역할별 대처 요령 (Call & Care Protocol)
export const ROLE_PROTOCOLS = [
  {
    roleId: 'first_responder',
    roleName: '최초발견자',
    subtitle: '보건교사 외 일반 교직원',
    badgeColor: 'bg-red-500/20 text-red-300 border-red-500/30',
    actions: [
      { title: '현장 안전 확인', desc: '주변 위험 요소(전기, 차량, 날카로운 물건 등) 제거 및 이차 사고 방지' },
      { title: '상황 판단 및 119 신고', desc: '의식 및 호흡 상태 확인 후 위급 시 즉시 119 신고 (스피커폰 전환)' },
      { title: '보건교사 연락 및 초기 대처', desc: '보건교사에 위치와 학생 상태 전달, 보건교사 도착 전까지 현장 관리' },
      { title: '보건교사 부재 시', desc: '교감에게 비상 보고, 비상 구급함 활용 조치 및 이송 담당자 연계' }
    ]
  },
  {
    roleId: 'health_teacher',
    roleName: '보건교사',
    subtitle: '의료전문가 / 응급처치 총괄',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    actions: [
      { title: '환자 전문 사정', desc: '활력징후(체온, 맥박, 호흡, 혈압), 산소포화도 및 필요시 혈당 측정' },
      { title: '응급처치 시행', desc: '심폐소생술, AED 적용, 기도 유지, 에피네프린/글루카곤 투약 등 수행' },
      { title: '119 인계 및 보고', desc: '119 구급대원 도착 시 처치 내역 정확히 인계, 교감 및 담임교사에게 브리핑' },
      { title: '동행 및 기록', desc: '필요시 이송 차량 동행(운전은 제외), 보건일지 및 응급환자 기록지 작성' }
    ]
  },
  {
    roleId: 'homeroom_teacher',
    roleName: '담임교사',
    subtitle: '학생 관리 및 보호자 소통',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    actions: [
      { title: '교감 보고 및 소통', desc: '학생 응급 상황 발생 사실을 교감 및 학부모에게 신속 통보' },
      { title: '학부모(보호자) 연락', desc: '상황 설명, 이동 병원 안내 및 보호자 병원 직접 인계 조치' },
      { title: '병원 이송 동행', desc: '119 구급차 또는 이송 차량에 동행하여 학부모 도착 시까지 학생 보호' },
      { title: '학급 대체 수업', desc: '부재 시 학급 학생 안정을 위해 교감에게 대체 교사 배정 요청' }
    ]
  },
  {
    roleId: 'vice_principal',
    roleName: '교감',
    subtitle: '대책반장 / 현장 총괄 지휘',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    actions: [
      { title: '학교장 보고', desc: '응급 상황 발생 및 초기 조치 내역 학교장에게 보고' },
      { title: '대응 조직 가동', desc: '응급처치반, 환자이송반, 행정지원반 지원 및 교직원 추가 배치' },
      { title: '대체 교사 배정 조치', desc: '보건교사, 담임교사, 이송 교사 부재 시 수업/학급 관리 대체 교사 즉시 지정' },
      { title: '행정 및 언론 관리', desc: '필요시 소방서/보건소 연계 및 보호자 민원/언론 창구 일원화' }
    ]
  },
  {
    roleId: 'principal',
    roleName: '학교장',
    subtitle: '총괄책임자',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    actions: [
      { title: '응급 관리체계 총괄', desc: '학교 응급상황 대응 총괄 지휘 및 관계 기관 비상 연락 체계 가동' },
      { title: '중대 사고 보고', desc: '중상해/사망 등 필요시 교육청 및 관할 교육지원청 비상 보고' },
      { title: '사후 관리 지휘', desc: '재발 방지 대책 수립 및 피공제회 치료비 청구 승인' }
    ]
  },
  {
    roleId: 'transport_staff',
    roleName: '이송담당 교직원',
    subtitle: '환자 이송반',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    actions: [
      { title: '자체 차량 이송', desc: '119 이송 불가 시 학교 자체 지정 차량 운전하여 이송 (보건교사 운전 제외)' },
      { title: '이송 차량 표지 부착', desc: '차량 전면에 "의료기관 환자 이송 차량" 표지 부착 (승용차 요일제 제외)' },
      { title: '동행 및 상태 관찰', desc: '병원 이동 중 환자의 의식/호흡 상태 계속 관찰 및 기록' }
    ]
  },
  {
    roleId: 'admin_staff',
    roleName: '행정담당 / 행정실장',
    subtitle: '행정지원반',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    actions: [
      { title: '출장 처리 및 경비 지원', desc: '이송 동행 교직원의 근무지 내 출장 처리 및 병원 이송 관련 경비 지원' },
      { title: '학교안전공제회 청구', desc: '치료비 및 안전사고 발생 신고, 공제급여 청구 행정 절차 진행' },
      { title: '비상 연락망 관리', desc: '인근 지정 종합병원 및 응급실 연락처 항시 업데이트 및 비치' }
    ]
  }
];

// 3. 상황별 처치 실무 인터랙티브 매뉴얼 (Care Manuals)
export const CARE_MANUALS = [
  {
    id: 'cpr',
    title: '심폐소생술 (CPR) & AED',
    icon: 'HeartPulse',
    steps: [
      { step: 1, title: '현장 안전 및 반응 확인', text: '양쪽 어깨를 가볍게 두드리며 "여보세요, 괜찮으세요?" 반응 확인' },
      { step: 2, title: '119 신고 및 AED 요청', text: '주변 교직원을 지목하여 "119에 신고해주시고, AED(자동제세동기) 가져와주세요!" 요청' },
      { step: 3, title: '호흡 확인 (5~10초)', text: '가슴 움직임과 호흡을 관찰하여 무호흡 또는 헐떡임(심장정지 호흡) 확인' },
      { step: 4, title: '가슴압박 30회 시행', text: '가슴뼈 아래쪽 절반 부위, 깊이 약 5cm(소아 4~5cm), 속도 분당 100~120회' },
      { step: 5, title: '인공호흡 2회 (가능 시)', text: '머리 기울임-턱 들어올리기 기도유지 후 1초 동안 가슴이 올라올 정도로 2회 주입' },
      { step: 6, title: 'AED 부착 및 충격', text: '패드 1(우측 빗장뼈 아래), 패드 2(좌측 젖꼭지 아래). "모두 물러나세요" 후 제세동' }
    ],
    timerType: 'cpr_metronome'
  },
  {
    id: 'choking',
    title: '기도폐쇄 (질식 / 하임리히법)',
    icon: 'AlertCircle',
    steps: [
      { step: 1, title: '상태 판단', text: 'V-sign(목 감싸쥐기), 청색증, 말/기침 못함 확인 -> 완전 기도폐쇄' },
      { step: 2, title: '등 두드리기 5회', text: '환자 뒤에서 견갑골(날개뼈) 사이를 손꿈치로 강하게 5회 두드림' },
      { step: 3, title: '복부 밀어내기 5회 (하임리히법)', text: '배꼽과 명치 중간에 주머쥔 손 대고 후상방으로 강하게 5회 밀쳐올림' },
      { step: 4, title: '교대 반복', text: '이물질이 배출되거나 의식을 잃기 전까지 등 두드리기 5회 ↔ 복부 밀어내기 5회 반복' },
      { step: 5, title: '의식 소실 시', text: '바닥에 바르게 눕히고 즉시 심폐소생술(CPR) 시행 (입안 이물 보일 때만 제거)' }
    ],
    timerType: 'heimlich_counter'
  },
  {
    id: 'seizure',
    title: '경련 (발작)',
    icon: 'Activity',
    steps: [
      { step: 1, title: '환자 주변 위험물 치우기', text: '책상, 의자, 뾰족한 물건을 치워 이차 부상 방지' },
      { step: 2, title: '기도 유지 및 머리 보호', text: '머리 밑에 수건/옷 깔아주기, 목 부위 단추/넥타이 느슨히 하기' },
      { step: 3, title: '절대 금지사항 준수', text: '손가락이나 약을 입에 넣지 말고, 팔다리를 억지로 잡거나 억누르지 않음' },
      { step: 4, title: '경련 시작 시간 기록', text: '발작 시작 시간을 체크하고 양상 관찰. 5분 이상 지속 시 뇌전증 중첩증(위급)' },
      { step: 5, title: '발작 멈춘 후 회복자세', text: '몸을 좌측으로 돌려 눕혀 침이나 토물로 인한 기도 막힘 예방' }
    ],
    timerType: 'seizure_timer'
  },
  {
    id: 'anaphylaxis',
    title: '천식 & 아나필락시스',
    icon: 'Syringe',
    steps: [
      { step: 1, title: '편안한 자세 및 앙승', text: '의자에 앉혀 안정을 취하게 하고 몸을 조이는 옷 단추 풀어줌' },
      { step: 2, title: '천식 흡입제 사용', text: '증상완화제(벤톨린 등) 3~4회 흔든 후 1~2회 흡입. 20분 경과 후 호전 없으면 재흡입' },
      { step: 3, title: '아나필락시스 자가주사', text: '에피네프린 에피펜 주사바늘 아래로 향하게 잡고 허벅지 바깥쪽에 90도로 10초간 강하게 누름' },
      { step: 4, title: '주사 부위 마사지', text: '주사기 떼고 부위를 10초간 마사지. 즉시 119 병원이송 (2차 쇼크 반응 대비)' }
    ],
    timerType: 'epipen_timer'
  },
  {
    id: 'hypoglycemia',
    title: '저혈당 / 고혈당 (당뇨 응급)',
    icon: 'Thermometer',
    steps: [
      { step: 1, title: '혈당 측정 및 상태 확인', text: '70mg/dL 미만 시 저혈당, 180mg/dL 이상 시 고혈당 판단' },
      { step: 2, title: '저혈당 처치 (의식 있음)', text: '15g 단순당 (주스 반 컵, 사탕 3~4알, 요구르트 1병) 섭취 후 15분 대기' },
      { step: 3, title: '15분 후 재측정', text: '15분 후 혈당 재측정, 70 미만 시 단순당 15g 재투여' },
      { step: 4, title: '저혈당 (의식 없음)', text: '입으로 먹이지 말고 옆으로 눕혀 기도 유지 후 즉시 119 & 글루카곤 주사' }
    ],
    timerType: 'glucose_timer'
  },
  {
    id: 'bleeding',
    title: '출혈 및 상처 처치',
    icon: 'Bandage',
    steps: [
      { step: 1, title: '흐르는 물 세척', text: '생리식염수나 흐르는 수돗물로 상처 흙/오염물질 제거' },
      { step: 2, title: '직접 압박 지혈', text: '멸균 거즈로 상처 부위를 손바닥 전체로 10분 이상 강하게 직접 압박' },
      { step: 3, title: '환부 거상', text: '출혈 부위를 심장보다 높은 위치로 올려 혈류 감소' },
      { step: 4, title: '절단 조직 보관법', text: '절단 부위 생리식염수 거즈 감싼 후 밀폐용기 담아 얼음물 용기에 넣어 보관(얼음 직접 금지)' }
    ],
    timerType: 'general'
  }
];

// 4. 교육부 가이드라인 부록: 주요 대법원 판례 & 학교보건법 요약
export const LEGAL_AND_PRECEDENTS = {
  laws: [
    {
      title: '학교보건법 제15조의2 (응급처치 등)',
      content: '보건교사 또는 교직원은 생명이 위급한 학생에게 응급처치(에피네프린, 글루카곤 등 투약 포함)를 제공할 수 있으며, 고의나 중대한 과실이 없는 경우 민·형사상 책임을 감경하거나 면제받음.'
    },
    {
      title: '응급의료에 관한 법률 제5조의2 (선의의 응급의료 면책)',
      content: '생명이 위급한 응급환자에게 응급의료 또는 응급처치를 제공하여 발생한 재산상 손해와 사상에 대하여 고의 또는 중대한 과실이 없는 경우 민사책임과 상해 형사책임을 지지 아니함.'
    }
  ],
  precedents: [
    {
      caseNo: '대법원 2013다37722 판결',
      title: '축구부 합숙 훈련 중 급성 심장사 사건',
      summary: '과격한 운동 중 학생이 쓰러졌을 때 감독/인솔 교사가 심폐소생술 등 신속한 응급구호조치를 취하지 않고 지체하여 교사의 법적 책임(보호·감독 의무 위반) 인정.'
    },
    {
      caseNo: '대법원 2008다5417 판결',
      title: '체육수업 체력검사 중 심장정지 조치 지체 사건',
      summary: '체육수업 중 팔굽혀펴기를 하던 학생이 의식을 잃었으나 5분가량 응급조치 없이 주무르기만 하다 양호실 이송을 지체하여 뇌손상 악화 -> 체육교사 과실 인정.'
    },
    {
      caseNo: '서울고법 94나1328 판결',
      title: '자연시간 비커 알코올 불꽃 화상 사건',
      summary: '실험 수업 중 위험요인이 있는 알코올 비커 실험 시 안전조치를 태만히 한 교원의 과실 인정.'
    }
  ]
};
