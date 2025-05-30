# frontier

swyp-2-team-frontend

# 프로젝트 개요

Frontier는 장애 관리 및 모니터링을 위한 웹 애플리케이션 noticore의 프론트엔드 파트입니다.

# 팀 정보

SWYP 9기 2팀 (Noticore - FrontEnd Part)

- 강진수
- 강영훈
- 박재호

# 주요 기능

- 장애 관리: 장애 등록, 조회, 수정 및 삭제
- 실시간 알림: 장애 등록 시 즉각적인 알림 제공
- 상태 추적: 장애 처리 상태 실시간 모니터링
- 인증 관리: 안전한 사용자 인증 및 권한 부여

# 기술 스택

- 프레임워크/언어: React, TypeScript
- 상태 관리: TanStack Query (React Query)
- 라우팅: React Router
- 스타일링: Tailwind CSS, shadcn/ui
- API 통신: Axios
- 빌드 도구: Vite

# 프로젝트 구조

프로젝트는 Feature-Sliced Design(FSD) 아키텍쳐를 따르되, classic 구조도 일부 활용하고 있습니다.

```
frontier
├─ public
├─ src
│  ├─ app
│  │  ├─ App.tsx
│  │  ├─ main.tsx         # 앱 진입점
│  │  ├─ providers/       # 프로바이더
│  │  └─ styles/          # 글로벌 스타일
│  ├─ assets              # 이미지, 아이콘, 기타 정적 파일
│  │  └─ icons/
│  ├─ features            # 기능별 모듈
│  │  ├─ auth/            # 인증 관련 기능
│  │  ├─ incident/        # 장애 관리 기능
│  │  └─ user/            # 사용자 관련 기능
│  ├─ pages/              # 페이지 컴포넌트
│  ├─ router
│  │  ├─ protected.tsx    # 인증이 필요한 페이지 보호 컴포넌트
│  │  └─ routes.tsx       # 라우터 컴포넌트
│  ├─ shared              # 공유 컴포넌트
│  │  ├─ api/             # API 클라이언트, 기본 설정
│  │  ├─ components/      # 공통 UI 컴포넌트
│  │  ├─ lib/             # 유틸리티 함수
│  │  └─ types/           # 공통 타입스크립트 정의
│  └─ svg.d.ts            # svg 파일 정의

```
