# Portfolio Commit Message Convention & Examples

이 프로젝트는 단순한 '작업의 나열'이 아닌, **'문제 해결과 의사결정의 과정'**을 커밋 로그에 담는 것을 목표로 합니다.

## 1. Commit Message Format
```text
[Type] Subject (한 줄 요약)

Why: (이 변경이 왜 필요한가? 의도와 기획 배경)
What: (무엇을 어떻게 변경했는가? 핵심 구현 내용)
```

## 2. Commit Types
- `feat`: 새로운 기능 구현
- `design`: 사용자 경험(UX) 및 인터페이스 설계
- `refactor`: 코드 구조 개선 (기능 변경 없음)
- `fix`: 버그 및 오류 수정
- `docs`: 문서 작업

---

## 3. Best Practice Examples (Log)

### 1) Initial Feature Implementation
```text
[feat] SVG 기반 원형 시간표(Time Ring) 렌더링 엔진 구현

Why:
- 기존 리스트형 스케줄러는 24시간의 흐름과 '밀도'를 한눈에 파악하기 어려움.
- 사용자가 시간을 '양(Area)'으로 체감할 수 있는 직관적인 시각화가 필요함.

What:
- 도넛 형태가 아닌 Pie Chart(꽉 찬 원형) 형태로 시각화 전략 수립.
- SVG Path `A` 커맨드와 삼각함수(Math.cos/sin)를 활용해 시간을 각도로 변환하는 렌더링 로직 구현.
```

### 2) Core Logic Implementation
```text
[feat] 스케줄 충돌 방지(Overlap Detection) 알고리즘 적용

Why:
- 사용자가 실수로 겹치는 시간에 일정을 등록하면 계획의 신뢰도가 떨어짐.
- 단순 시작/종료 시간 일치 여부만으로는 부분적으로 겹치는 구간을 탐지할 수 없음.

What:
- `(StartA < EndB) && (EndA > StartB)` 교차 검증 공식을 도입하여 O(n)으로 충돌 탐지.
- 충돌 발생 시 저장을 차단하고 Toast 메시지로 즉각 피드백을 주어 UX 안정성 확보.
```

### 3) Architecture & UI Design
```text
[design] 타임라인과 투두리스트의 병렬 인터페이스 구조 설계

Why:
- '언제 할 것인가(Time)'와 '무엇을 할 것인가(Task)'는 상호 의존적인 데이터임.
- 두 정보를 탭으로 분리하지 않고 한 화면에 배치해야 맥락 전환(Context Switching) 비용을 줄일 수 있음.

What:
- Dashboard 레이아웃을 좌우 분할(Flex-Row)로 구성하여 시각 정보(Ring)와 텍스트 정보(List)의 위계를 동등하게 설정.
- 모바일 환경에서는 상하 배치(Column)로 자동 전환되는 반응형 구조 적용.
```

### 4) Refactoring for Scalability
```text
[refactor] 데이터 지속성을 위한 날짜 기반 스토리지 키 관리 전략 변경

Why:
- 단일 Key(`schedule`) 방식은 하루가 지나면 이전 기록이 덮어씌워지는 데이터 유실 문제가 있음.
- 향후 '캘린더 뷰' 확장을 위해 날짜별 데이터 격리가 필수적임.

What:
- LocalStorage Key 생성 로직을 정적 키에서 동적 키(`schedule-${YYYY-MM-DD}`) 생성 전략으로 고도화.
- `useEffect` 의존성 배열에 `currentDate`를 추가하여 날짜 변경 시 자동 동기화되도록 개선.
```
