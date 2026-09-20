(() => {
  const params = new URLSearchParams(location.search);
  const korean = params.get("lang") === "ko";
  const menu = document.querySelector(".menu-toggle");
  const switcher = document.querySelector("[data-language-switch]");
  menu.dataset.openLabel = korean ? "메뉴" : "Menu";
  menu.dataset.closeLabel = korean ? "닫기" : "Close";
  if (!korean) return;

  const translations = new Map(Object.entries({
    "Systems": "작업",
    "Research": "연구",
    "Story": "이야기",
    "Contact": "연락처",
    "Menu": "메뉴",
    "Backend · AI Systems engineer": "백엔드 · AI 시스템 엔지니어",
    "I turn complex problems": "복잡한 문제를 구조화하고,",
    "into": "작동하는",
    "working systems.": "시스템으로 구현합니다.",
    "I don't rely on": "의지에 기대지 않고,",
    "willpower — I design": "시스템을 설계해서",
    "systems.": "옳은 방향으로 흘러가게 합니다.",
    "So the right thing happens anyway. I build the habits, workflows, and AI-agent harnesses that make follow-through automatic — not a matter of discipline.": "그래야 의지와 상관없이 옳은 방향으로 흘러갑니다. 실행이 의지가 아니라 구조에서 나오도록, 습관과 워크플로우와 AI 에이전트 하네스를 만듭니다.",
    "I'm a planner by nature — MBTI tests always place me at a full 100% J. In my last year of high school, I didn't trust willpower alone to keep me studying, so I started a group chat with my tutoring classmates to share our study hours every day. I ended up studying 12–15 hours a day.": "저는 원래 계획부터 세우는 성격이라, MBTI 검사를 하면 J가 항상 100%로 나옵니다. 고3 때도 의지만으로는 공부 시간을 못 늘릴 것 같아서 과외 선생님께 부탁해 같이 수업 듣는 학생들과 매일 공부 시간을 공유하는 단톡방을 만들었습니다. 그 뒤로 하루 12~15시간씩 공부했습니다.",
    "I use AI to improve development workflows and systems. With experience in vision research, I am interested in connecting AI technology to real services and platforms.": "AI를 활용해 개발 워크플로우와 시스템을 개선하는 백엔드·AI 시스템 엔지니어입니다. Vision 연구 경험을 바탕으로 AI 기술을 실제 서비스와 플랫폼에 연결하는 데 관심이 있습니다.",
    "Explore selected work": "주요 프로젝트 보기",
    "Start a conversation": "연락하기",
    "Currently": "현재",
    "Kyungpook National University · Global Software Convergence · Junior": "경북대학교 컴퓨터학부 글로벌SW융합전공 · 3학년",
    "Enactus KNU 10th": "인액터스 10기",
    "Likelion 14th · Backend": "멋쟁이사자처럼 14기 · 백엔드",
    "KNU Video Intelligence Lab · 3D Research · On Pause": "KNU Video Intelligence Lab · 3D 연구 · 잠시 쉬는 중",
    "[ 01 — POINT OF VIEW ]": "[ 01 — 관점 ]",
    "“I turn gaps into momentum, then use relentless logic to move past the limits.”": "“기록에서 문제를 찾고, 구조를 바꿔 더 나은 흐름을 만듭니다.”",
    "I found software after taking the long route through another major. That detour taught me to treat constraints as design material: understand the failure mode, build the workflow, measure what changed.": "의지만 믿기보다 목표를 이루기 쉬운 환경과 흐름을 설계합니다. 과정에서 발견한 문제와 판단을 기록하고, 배운 것을 다음 개선에 반영합니다. 반복되는 불편은 자동화하되 중요한 판단은 사람에게 남깁니다.",
    "#resilience": "#회복탄력성",
    "#technical-service": "#기술로문제해결",
    "#human-in-the-loop": "#사람중심AI",
    "[ 02 — SELECTED SYSTEMS ]": "[ 02 — 주요 시스템 ]",
    "Built like a": "주요 프로젝트를",
    "living board.": "한눈에 봅니다.",
    "Tap or hover each pin to reveal the design decision behind the build.": "각 카드를 터치하거나 마우스를 올리면 프로젝트에 담긴 설계 판단을 확인할 수 있습니다.",
    "ONGOING": "진행 중",
    "Project lead / PM · team of 4": "프로젝트 리드·PM · 4인 팀",
    "A multi-agent society simulator where student and professor agents autonomously form relationships, organizations, and emergent narratives.": "학생·교수 에이전트가 자율적으로 관계와 조직을 형성하며 새로운 서사를 만드는 멀티에이전트 소사이어티 시뮬레이터입니다.",
    "DESIGN DECISION": "설계 판단",
    "Made specification readiness a prerequisite after identifying the risk of tests getting ahead of unresolved functional requirements.": "기능 요구사항이 정리되기 전에 테스트가 먼저 작성되는 위험을 발견하고, 명세 확정을 테스트 착수의 선행 조건으로 정했습니다.",
    "SOLO BUILD": "1인 제작",
    "AI hierarchical to-do service": "AI 기반 계층형 할 일 관리 서비스",
    "A four-stage pipeline turns monthly goals into weekly milestones and daily actions.": "월간 목표를 주간 마일스톤과 일일 할 일로 연결하는 4단계 파이프라인입니다.",
    "Restricted LLM calls to parse and decompose; scheduling stays deterministic for lower cost and predictable output.": "비용을 낮추고 결과를 예측할 수 있도록 LLM은 목표 해석과 작업 분해에만 사용하고, 일정 배치는 결정론적 로직으로 구현했습니다.",
    "FEB 2026 · SOLO": "2026.02 · 개인 프로젝트",
    "Video Codec": "비디오 코덱",
    "Analysis": "분석 파이프라인",
    "HEVC / VVC compression pipeline": "HEVC / VVC 압축 분석 파이프라인",
    "A five-stage pipeline connects video analysis, parallel encoding, metric calculation, and result visualization.": "영상 분석부터 병렬 인코딩, 지표 계산, 결과 시각화까지 5단계 파이프라인으로 연결했습니다.",
    "SYSTEM DECISION": "시스템 설계 판단",
    "Threads can't truly parallelize CPU-bound encoding past Python's GIL, so I used ProcessPoolExecutor to spawn separate OS-level processes instead, letting the OS scheduler distribute jobs across CPU cores, then processed completed jobs asynchronously as they finished to cut idle time.": "CPU 중심 인코딩은 스레드로는 GIL 때문에 진짜 병렬화가 안 돼서, ProcessPoolExecutor로 별도의 OS 프로세스를 띄워 운영체제 스케줄러가 여러 CPU 코어에 작업을 분배하도록 했고, 완료된 작업부터 비동기로 처리해 유휴 시간을 줄였습니다.",
    "View on GitHub ↗": "GitHub에서 보기 ↗",
    "Four focused agents + a resumable PM → Engineer → Reviewer → QA development loop.": "역할이 분명한 네 에이전트가 PM → 엔지니어 → 리뷰어 → QA 순서로 협업하며, 중단된 지점부터 작업을 이어갈 수 있는 개발 시스템입니다.",
    "AWARD": "수상작",
    "PM + Backend · team of 2": "PM + Backend · 2인 팀",
    "A multilingual assistant with internal terminology lookup, LLM fallback, and a self-growing knowledge base.": "교내 용어 검색과 LLM 보완 응답, 스스로 확장되는 지식 베이스를 결합한 다국어 AI 도우미입니다.",
    "SECURITY FINDING": "보안 발견",
    "Found missing authentication across chat, memo, and feedback routes; added checks to every personal-data endpoint.": "채팅·메모·피드백 경로에 인증이 빠진 문제를 발견하고 개인정보를 다루는 모든 엔드포인트에 인증 검사를 적용했습니다.",
    "1-WEEK HACKATHON": "1주 해커톤",
    "Ildan-Shim": "일단 쉼",
    "Planning + Frontend · team of 3": "기획·프론트엔드 · 3인 팀",
    "A stress-tagging AI scheduler with secure backend OAuth delegation and real-time SSE notifications.": "스트레스 유형을 태깅해 일정을 제안하고, 백엔드 OAuth 위임과 SSE 실시간 알림을 적용한 AI 스케줄러입니다.",
    "DEBUG NOTE": "디버그 노트",
    "Resolved a calendar day-count mismatch by deriving the true month length from a mid-range date.": "월 중간 날짜를 기준으로 실제 월 길이를 계산해 캘린더의 일수 불일치 문제를 해결했습니다.",
    "CONDITIONALLY ACCEPTED": "조건부 채택",
    "[ 03 — RESEARCH EXPERIENCE ]": "[ 03 — 연구 경험 ]",
    "Restoration Experiment": "복원 모델 실험",
    "Log Analysis & Qualitative Evaluation": "로그 분석 및 정성 평가",
    "Co-author · ACM SIGGRAPH Asia 2026": "공저자 · ACM SIGGRAPH Asia 2026",
    "video codecs": "비디오 코덱",
    "paper benchmarks": "논문 평가 벤치마크",
    "diffusion restoration models": "확산 기반 복원 모델",
    "I analyzed 2D evaluation experiment logs, organized CRF items and diffusion evaluation metrics, and performed worst-case analysis and qualitative evaluation across AVC, HEVC, AV1, and VP9 codec environments.": "2D Evaluation 실험 로그를 분석하고 CRF 작성 항목과 Diffusion 평가 지표를 정리했으며, AVC·HEVC·AV1·VP9 코덱 환경에서 Worst Case 분석과 정성 평가를 수행했습니다.",
    "[ 04 — OPERATING PHILOSOPHY ]": "[ 04 — 개발 철학 ]",
    "AI-native, never": "AI-native, 판단까지",
    "judgment-free.": "맡기지는 않습니다.",
    "Bound the agent.": "에이전트의 경계를 정합니다.",
    "Clear roles, persisted state, explicit handoffs, and limited rework cycles keep multi-agent workflows inspectable.": "역할을 명확히 나누고 작업 상태와 인계 과정을 기록하며, 재작업 횟수를 제한해 멀티에이전트의 작업 흐름을 언제든 추적할 수 있게 합니다.",
    "Design for failure.": "실패를 전제로 설계합니다.",
    "LLM output is treated as fallible input. Defensive parsing, tests, and cross-tool verification are part of the architecture.": "LLM의 출력은 오류가 있을 수 있는 입력으로 다룹니다. 방어적 파싱, 테스트, 여러 도구를 통한 교차 검증까지 아키텍처의 일부입니다.",
    "Keep judgment human.": "판단은 사람에게 남깁니다.",
    "My prompts require evidence and clarification instead of fabricated certainty. The system accelerates decisions; it does not own them.": "근거 없는 확신보다 증거와 확인을 요구하도록 프롬프트를 설계합니다. 시스템은 의사결정을 가속하지만 판단의 주체가 되지는 않습니다.",
    "AI-AGENT AUTOMATION": "AI 에이전트 자동화",
    "Less context upkeep.": "반복 문서화는 줄이고,",
    "More room to build.": "설계와 구현에 집중합니다.",
    "I built an AI-agent development workflow to reduce repetitive documentation and context-maintenance work, leaving more time for design and implementation.": "반복적인 문서화 작업과 프로젝트 컨텍스트 유지 부담을 줄이고, 설계와 구현에 집중할 수 있는 AI 에이전트 기반 개발 환경을 구축했습니다.",
    "Project context managed through": "프로젝트 컨텍스트 관리 —",
    "Automated retrospectives and work logs": "회고 및 작업 기록 자동 생성",
    "Automated documentation of code-analysis results": "코드 분석 결과 문서화 자동화",
    "Automated first drafts of project documents": "프로젝트 문서 초안 생성 자동화",
    "SPEC": "명세",
    "IMPLEMENT": "구현",
    "REVIEW": "리뷰",
    "TEST": "테스트",
    "[ 05 — LIVE SYSTEMS FIELD ]": "[ 05 — 실시간 시스템 필드 ]",
    "A system is a set": "시스템은",
    "of": "움직이는 관계의",
    "moving relations.": "집합입니다.",
    "This WebGL network runs in real time. Its nodes are held together by spring constraints, damped by friction, and disturbed by your pointer or touch.": "이 WebGL 네트워크는 브라우저에서 실시간으로 움직입니다. 노드는 스프링 제약으로 연결되고 마찰에 의해 감쇠되며 포인터와 터치의 힘에 반응합니다.",
    "36 autonomous nodes": "36개의 자율 노드",
    "spring-linked topology": "스프링 연결 토폴로지",
    "drag / touch to perturb": "드래그 / 터치로 흔들기",
    "WEBGL / LIVE": "WEBGL / 실시간",
    "ENERGY 00.0": "에너지 00.0",
    "[ 06 — AI & CODING LESSONS ]": "[ 06 — AI·코딩 수업 ]",
    "RC-Car Coding Lesson": "RC카 코딩 수업",
    "Masan Yongma High School · Assistant Instructor · 2025": "마산용마고등학교 · 보조교사 · 2025",
    "Supported a hands-on mobility coding class using mBlock and Arduino.": "mBlock과 Arduino를 활용한 모빌리티 코딩 실습을 보조했습니다.",
    "Motor control & basic driving": "모터 제어와 기본 주행",
    "Infrared line tracking": "적외선 센서 기반 라인 인식 주행",
    "Ultrasonic obstacle avoidance": "초음파 센서 기반 장애물 회피",
    "Bluetooth remote control": "블루투스 원격 제어 주행",
    "Computational Thinking & SW Engineering": "컴퓨팅사고와 SW공학",
    "Kyungpook National University · Course Tutor · 2025 Fall": "경북대학교 · 과목 튜터 · 2025-2학기",
    "Tutored the Python-based course I'd earned an A+ in myself.": "본인이 A+를 받았던 파이썬 기반 과목의 튜터로 활동했다.",
    "AI Workflow Lesson": "AI 워크플로우 수업",
    "Union Science Academy · 5-week instructor course": "유니온 과학학원 · 강사 대상 5주 과정",
    "Designed a practice-led course around real academy materials and repeatable AI-assisted work.": "실제 학원 자료를 바탕으로 반복 가능한 AI 활용 업무를 만드는 실습 중심 수업을 구성했습니다.",
    "Task selection & student data safety": "AI 적용 업무 선별과 학생 개인정보 보호",
    "Academy standards & workflow documentation": "학원 기준과 업무 절차 문서화",
    "Prompt-to-skill design & testing": "프롬프트에서 AI 스킬 제작·테스트까지",
    "Reliability layers & human approval": "신뢰성 검증과 사람의 최종 승인 구조",
    "Content and textbook-review automation": "콘텐츠·교재 검수 자동화",
    "[ 07 — TRAJECTORY ]": "[ 07 — 여정 ]",
    "The long route": "돌아온 길이",
    "became the edge.": "나만의 강점이 되었습니다.",
    "I moved from Polymer Science & Engineering into Computer Science after discovering the kind of work that makes me lose track of time. A hackathon later became a turning point that brought me back to coding, and I have since explored my interests and grown as a developer through different projects.": "시간 가는 줄 모르고 몰입하게 되는 일을 발견한 뒤 고분자공학과에서 컴퓨터학부로 전공을 바꿨습니다. 힘들었던 시기에 참여한 해커톤은 다시 코드를 시작하게 된 전환점이었고, 이후 여러 프로젝트를 통해 관심 분야와 개발 역량을 넓혀가고 있습니다.",
    "Read my story and development approach ↗": "성장 이야기와 개발에 대한 생각 읽기 ↗",
    "Polymer Science & Engineering": "고분자공학과",
    "Kyungpook National University": "경북대학교",
    "First Prize · Applied Python Data Analysis": "최우수상 · Python 활용 실무 데이터 분석",
    "Global Software Convergence": "글로벌SW융합전공",
    "Department of Computer Science · expected Summer 2028": "경북대학교 컴퓨터학부 · 2028년 여름 졸업 예정",
    "Two encouragement awards": "장려상 2회",
    "AI-conic Hackathon · CES Autonomous Project Competition": "AI-conic Hackathon · CES 자율프로젝트 경진대회",
    "Undergraduate Researcher": "학부연구생",
    "[ 08 — HOW I WORK ]": "[ 08 — 작업 방식 ]",
    "AI-assisted development · Agent workflows · Prompt design · Verification · Documentation · Automation ·": "AI 활용 개발 · 에이전트 워크플로우 · 프롬프트 설계 · 결과 검증 · 문서화 · 자동화 ·",
    "[ 09 — OPEN CHANNELS ]": "[ 09 — 열린 채널 ]",
    "Notes ↗": "블로그 ↗",
    "EUNHYE JEONG © 2026": "정은혜 © 2026",
    "DAEGU, SOUTH KOREA": "대한민국 대구",

    "[ 01 — SELECTED SYSTEMS ]": "[ 01 — 주요 시스템 ]",
    "PM · ONGOING": "PM · 진행 중",
    "PM + backend-leaning full stack · team of 4": "PM + 백엔드 중심 풀스택 · 4인 팀",
    "A multi-agent society simulator where student and professor agents autonomously form relationships, organizations, and emergent narratives. Selected from competing team proposals at a WISET hackerspace mentoring program.": "학생·교수 에이전트가 자율적으로 관계와 조직을 형성하며 새로운 서사를 만드는 멀티에이전트 소사이어티 시뮬레이터입니다. WISET 해커스페이스 멘토링 프로그램에서 여러 팀 제안 중 채택되었습니다.",
    "Split the system into six one-directional layers — Tick Engine, Event Master Agent, Agent Runtime, Policy Engine, Commit Service — so every write to the database goes through one place.": "Tick Engine, Event Master Agent, Agent Runtime, Policy Engine, Commit Service까지 단방향으로 흐르는 6개 레이어로 나눠, 모든 DB 쓰기가 한 곳을 거치도록 설계했습니다.",
    "LEADERSHIP": "리더십",
    "Redesigned how the team collaborates with AI itself — role personas cut from 8 to 3, repeatable workflows turned into skills, a three-question approval gate for anything irreversible.": "팀이 AI와 협업하는 방식 자체를 다시 설계했습니다 — 역할 페르소나를 8개에서 3개로 줄이고, 반복 업무를 스킬로 만들었으며, 되돌릴 수 없는 작업에는 세 가지 질문으로 구성된 승인 절차를 두었습니다.",
    "02 · IN PRODUCTION USE": "02 · 실사용 중",
    "Six always-on agents (blog, reports, briefings, PR review) plus a resumable PM → Engineer → Reviewer → QA loop I use every day — not a shelved side project.": "블로그, 리포트, 브리핑, PR 리뷰까지 상시 작동하는 6개 에이전트와 중단 지점부터 이어갈 수 있는 PM → 엔지니어 → 리뷰어 → QA 루프로, 방치된 사이드 프로젝트가 아니라 매일 쓰는 시스템입니다.",
    "A four-stage pipeline turns monthly goals into weekly milestones and daily actions. Grew out of a weekly to-do habit → a hierarchy prototype → this product.": "월간 목표를 주간 마일스톤과 일일 할 일로 연결하는 4단계 파이프라인입니다. 매주 손으로 정리하던 할 일 관리 습관 → 계층 구조 프로토타입 → 이 제품으로 이어졌습니다.",
    "Team lead + Backend · team of 2": "팀장 + 백엔드 · 2인 팀",
    "AWARD · DATA": "수상작 · 데이터",
    "Semiconductor": "반도체",
    "Yield Analysis": "수율 분석",
    "Data Station Academy · 2024": "데이터스테이션 아카데미 · 2024",
    "Statistical root-cause analysis of process-stage defects, on a team of mostly semiconductor majors — I wasn't one of them.": "대부분 반도체 전공자로 구성된 팀에서, 비전공자로서 공정 단계별 결함의 원인을 통계적으로 분석했습니다.",
    "DATA DECISION": "데이터 분석 판단",
    "Used T-tests and correlation analysis to pin down the variables driving defects, then fed them into a Random Forest model as key features.": "T-검정과 상관분석으로 결함에 영향을 주는 변수를 추려내고, 이를 Random Forest 모델의 핵심 피처로 사용했습니다.",

    "[ 02 — RESEARCH EXPERIENCE ]": "[ 02 — 연구 경험 ]",
    "ACM SIGGRAPH Asia is one of the most prestigious international conferences in computer graphics and interactive techniques.": "ACM SIGGRAPH Asia는 컴퓨터 그래픽스·인터랙티브 기술 분야에서 가장 권위 있는 국제 학회 중 하나입니다.",

    "[ 03 — CREDIBILITY ]": "[ 03 — 수상 및 활동 ]",
    "First Prize": "최우수상",
    "· Semiconductor Yield Analysis · Data Station Academy · 2024": "· 반도체 수율 분석 · 데이터스테이션 아카데미 · 2024",
    "Encouragement Award": "장려상",
    "· KNU MLA · CES Autonomous Project Competition · 2026": "· KNU MLA · CES 자율프로젝트 경진대회 · 2026",
    "· Ildan-Shim · AI-conic Hackathon · 2025": "· 일단 쉼 · AI-conic Hackathon · 2025",

    "[ 04 — AI-NATIVE PHILOSOPHY ]": "[ 04 — AI-네이티브 개발 철학 ]",

    "LIVE FIELD": "실시간 필드",

    "[ 05 — LEADERSHIP ]": "[ 05 — 리더십 ]",
    "Structure,": "구조는,",
    "for people.": "사람을 위해.",
    "Design the structure.": "구조를 설계합니다.",
    "I'm the type who needs a plan before starting anything, and I like doing things fast and thorough at once — systematically. Leading meant scaling that instinct: role personas cut from 8 to 3, repeatable workflows turned into skills, and a three-question approval gate for anything irreversible.": "저는 뭐든 시작하기 전에 계획부터 세워야 하는 성격이고, 빠르면서도 철두철미하게, 체계적으로 하는 걸 좋아합니다. 팀을 이끈다는 건 이 성향을 팀 전체 구조로 확장하는 일이었습니다 — 역할 페르소나를 8개에서 3개로 줄이고, 반복 업무를 스킬로 만들었으며, 되돌릴 수 없는 작업에는 세 가지 질문으로 구성된 승인 절차를 두었습니다.",
    "Understand the people.": "사람을 이해합니다.",
    "Structure alone wasn't enough. I learned to design for different motivations and skill levels on the team, not just for the workflow.": "구조만으로는 부족했습니다. 워크플로우뿐 아니라 팀원마다 다른 동기와 역량 수준까지 고려해 설계하는 법을 배웠습니다.",
    "Structure for people.": "사람을 위한 구조.",
    "I design structure so people can work comfortably, not the other way around. Watching how the team actually worked, and rebuilding role personas around activities instead of owners, changed how I think about leading.": "사람들이 편하게 일하기 위한 구조를 설계합니다. 팀이 실제로 일하는 방식을 지켜보고, 역할 페르소나를 담당자가 아니라 활동 중심으로 다시 짜면서 리더십에 대한 생각이 바뀌었습니다.",

    "[ 06 — TRAJECTORY ]": "[ 06 — 여정 ]",

    "[ 07 — AI & CODING LESSONS ]": "[ 07 — AI·코딩 수업 ]",

    "[ 08 — HOW I WORK / CONTACT ]": "[ 08 — 작업 방식 / 연락처 ]"
  }));

  document.documentElement.lang = "ko";
  document.body.dataset.lang = "ko";
  document.title = "정은혜 — AI 시스템 엔지니어";
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = "AI를 활용해 개발 워크플로우와 시스템을 개선하고, Vision 연구 경험을 실제 서비스와 플랫폼으로 연결하는 데 관심이 있는 정은혜의 포트폴리오입니다.";

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    const leading = node.nodeValue.match(/^\s*/)[0];
    const trailing = node.nodeValue.match(/\s*$/)[0];
    const key = node.nodeValue.trim();
    if (translations.has(key)) node.nodeValue = leading + translations.get(key) + trailing;
  }

  switcher.textContent = "EN";
  switcher.href = "?lang=en";
  document.querySelector(".wordmark").setAttribute("aria-label", "정은혜, 홈");
  document.querySelector("nav").setAttribute("aria-label", "주요 메뉴");
  menu.textContent = "메뉴";
  menu.setAttribute("aria-label", "메뉴 열기");
  document.querySelector(".portrait-card img").alt = "정은혜의 인물 사진";
  document.querySelector(".portrait-stage").setAttribute("aria-label", "움직임에 반응하는 정은혜의 인물 사진");
  document.querySelector(".pin-photo img").alt = "시스템 다이어그램과 컴퓨팅 모듈이 겹쳐진 추상 에디토리얼 콜라주";
  document.querySelector("#systems-canvas").setAttribute("aria-label", "포인터와 터치의 힘에 반응하는 인터랙티브 3D 에이전트 네트워크");
})();
