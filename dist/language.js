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
    "AI-native backend / systems engineer": "AI 기반 백엔드 · 시스템 엔지니어",
    "I turn complex problems": "복잡한 문제를 구조화하고,",
    "into": "작동하는",
    "working systems.": "시스템으로 구현합니다.",
    "From personal developer tooling to production automation for real organizations, I design multi-agent systems where human judgment stays in the loop.": "개인 개발 도구부터 실제 조직을 위한 프로덕션 자동화까지, 사람의 판단이 중심에 남는 멀티에이전트 시스템을 설계합니다.",
    "Explore selected work": "주요 프로젝트 보기",
    "Start a conversation": "연락하기",
    "Currently": "현재",
    "Global Software Convergence · Junior": "경북대학교 컴퓨터학부 글로벌SW융합전공 · 3학년",
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
    "Built like a": "살아 움직이는",
    "living board.": "보드처럼.",
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
    "[ 03 — RESEARCH LENS ]": "[ 03 — 연구 관점 ]",
    "Validated 2D restoration results": "2D 복원 결과를 검증하고,",
    "for 3D evaluation.": "3D 평가 기준을 정리했습니다.",
    "Co-author · ACM SIGGRAPH Asia 2026": "공저자 · ACM SIGGRAPH Asia 2026",
    "video codecs": "비디오 코덱",
    "benchmarks": "벤치마크",
    "diffusion restoration models": "확산 기반 복원 모델",
    "As a co-author, I analyzed 2D evaluation logs, selected and visualized worst cases from CODiff and DiQP, and compared restoration quality across AVC, HEVC, AV1, and VP9 under different QP settings. I cross-checked quantitative results and drafted CRF documentation for 2D stages 1–2 and 3D evaluation.": "공저자로서 2D 평가 실험 로그를 분석하고, CODiff와 DiQP의 worst case를 선별·시각화했습니다. AVC·HEVC·AV1·VP9 코덱과 다양한 QP 조건에서 복원 성능을 정성 평가하고 정량 결과를 교차 검증했으며, 2D stage 1·2와 3D 평가를 위한 CRF 초안을 작성했습니다.",
    "View codec analysis on GitHub ↗": "GitHub에서 코덱 분석 보기 ↗",
    "[ 04 — OPERATING PHILOSOPHY ]": "[ 04 — 개발 철학 ]",
    "AI-native, never": "AI-native, 판단까지",
    "judgment-free.": "맡기지는 않습니다.",
    "Bound the agent.": "에이전트의 경계를 정합니다.",
    "Clear roles, persisted state, explicit handoffs, and limited rework cycles keep multi-agent workflows inspectable.": "역할을 명확히 나누고 작업 상태와 인계 과정을 기록하며, 재작업 횟수를 제한해 멀티에이전트의 작업 흐름을 언제든 추적할 수 있게 합니다.",
    "Design for failure.": "실패를 전제로 설계합니다.",
    "LLM output is treated as fallible input. Defensive parsing, tests, and cross-tool verification are part of the architecture.": "LLM의 출력은 오류가 있을 수 있는 입력으로 다룹니다. 방어적 파싱, 테스트, 여러 도구를 통한 교차 검증까지 아키텍처의 일부입니다.",
    "Keep judgment human.": "판단은 사람에게 남깁니다.",
    "My prompts require evidence and clarification instead of fabricated certainty. The system accelerates decisions; it does not own them.": "근거 없는 확신보다 증거와 확인을 요구하도록 프롬프트를 설계합니다. 시스템은 의사결정을 가속하지만 판단의 주체가 되지는 않습니다.",
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
    "[ 06 — FIELD NOTES / IMPACT ]": "[ 06 — 현장 기록 / 성과 ]",
    "Process signals": "공정 변수 분석",
    "DEFECT ANALYSIS": "불량 원인 분석",
    "Used t-tests and correlation analysis to identify critical process variables, visualize failure patterns, and select key features for a Random Forest prediction model.": "T-test와 상관관계 분석으로 수율에 영향을 미치는 핵심 공정 변수를 규명하고, 불량 패턴을 시각화해 Random Forest 예측 모델의 주요 피처를 선별했습니다.",
    "6h → 30–60m": "6시간 → 30–60분",
    "Time per curriculum unit for open-response science questions after introducing an AI-assisted workflow.": "AI 보조 워크플로우를 도입해 서술형 과학 문항의 단원별 제작 시간을 단축했습니다.",
    "9 agents": "9개 역할",
    "An academy-tailored content pipeline spanning planning, research, writing, editing, proofreading, illustration, and review.": "기획·조사·작성·편집·교정·삽화·검수를 아우르는 학원 맞춤형 콘텐츠 파이프라인입니다.",
    "5 weeks": "5주",
    "A custom AI curriculum for science-academy instructors: prompt design, output evaluation, data safety, and subagent automation.": "프롬프트 설계, 결과 평가, 데이터 안전, 서브에이전트 자동화를 다룬 학원 강사 맞춤형 AI 교육 과정입니다.",
    "[ 07 — TRAJECTORY ]": "[ 07 — 여정 ]",
    "The long route": "돌아온 길이",
    "became the edge.": "나만의 강점이 되었습니다.",
    "I moved from Polymer Science & Engineering into Computer Science after discovering the kind of work that makes me lose track of time. A hackathon later became a restorative turning point: I returned to code by shipping under pressure, then kept building systems that remove friction for other people.": "시간 가는 줄 모르고 몰입하게 되는 일을 발견한 뒤 고분자공학과에서 컴퓨터학부로 전공을 바꿨습니다. 힘들었던 시기에 스스로를 던진 해커톤은 다시 코드를 손에 쥐게 한 회복의 변곡점이 되었고, 그 뒤로 다른 사람의 마찰을 줄이는 시스템을 계속 만들고 있습니다.",
    "Polymer Science & Engineering": "고분자공학과",
    "Kyungpook National University": "경북대학교",
    "First Prize · Applied Python Data Analysis": "최우수상 · Python 활용 실무 데이터 분석",
    "Global Software Convergence": "글로벌SW융합전공",
    "Department of Computer Science · expected Summer 2028": "경북대학교 컴퓨터학부 · 2028년 여름 졸업 예정",
    "Two encouragement awards": "장려상 2회",
    "AI-conic Hackathon · CES Autonomous Project Competition": "AI-conic Hackathon · CES 자율프로젝트 경진대회",
    "Undergraduate Researcher": "학부연구생",
    "[ 08 — TOOLBOX ]": "[ 08 — 기술 스택 ]",
    "[ 09 — OPEN CHANNEL ]": "[ 09 — 열린 채널 ]",
    "Let’s make the": "복잡한 것을 함께",
    "complex feel clear.": "명료하게 만듭니다.",
    "Email ↗": "이메일 ↗",
    "Notes ↗": "블로그 ↗",
    "EUNHYE JEONG © 2026": "정은혜 © 2026",
    "BUILT WITH CURIOSITY + SYSTEMS THINKING": "호기심과 시스템적 사고로 만들었습니다"
  }));

  document.documentElement.lang = "ko";
  document.body.dataset.lang = "ko";
  document.title = "정은혜 — AI 시스템 엔지니어";
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = "멀티에이전트 워크플로우와 연구 도구, 실용적인 자동화 시스템을 설계하고 구축하는 정은혜의 포트폴리오입니다.";

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
