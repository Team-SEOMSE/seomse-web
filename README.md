<img width="5760" height="3240" alt="mock" src="https://github.com/user-attachments/assets/d2063ea8-f9ad-44f2-80dd-e43d0eebe230" />


>고객에게 맞춤형 뷰티 혜택을, 디자이너에게 경력 유지 혜택을 주는 뷰티 예약 서비스

</br> 

🔗https://seomse.kro.kr/
</br>
</br>
## 목차
1. [팀원 소개](#1-팀원-소개)
2. [기여도](#2-기여도)
3. [기술 및 개발환경](#3-기술-및-개발환경)
4. [폴더 구조](#4-폴더-구조)
5. [주요 기능](#5-주요-기능)
6. [페이지 기능](#6-페이지-기능)
   - [사용자 인증](#6-1-사용자-인증)
   - [홈 / 탐색](#6-2-홈--탐색)
   - [예약 / 리뷰 / 마이페이지](#6-3-예약--리뷰--마이페이지)
   - [관리자 기능](#6-4-관리자-기능)

</br>


## 1. 팀원 소개
|**김소진**|**민건호**|
| :---------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/kimSojinn"> | <img src="https://avatars.githubusercontent.com/mingeonho1"> |
| [kimSojinn](https://github.com/kimSojinn) | [mingeonho1](https://github.com/mingeonho1) |

</br> 


## 2. 기여도
<img width="5760" height="3240" alt="role" src="https://github.com/user-attachments/assets/f5d64073-cff8-438b-ab94-a77f80fc8862" />

</br>

</br> 

## 3. 기술 및 개발환경

| 분야           | 스택                                                                                                                                                                                                                                                                                                                                                                            |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **프론트엔드**    | ![React](https://img.shields.io/badge/React-19-61DAFB?logo=react\&logoColor=white) ![React Router](https://img.shields.io/badge/React%20Router-v7-CA4245?logo=react-router\&logoColor=white) ![React Query](https://img.shields.io/badge/React%20Query-v5-FF4154?logo=react-query\&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript\&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite\&logoColor=white) ![CSS Modules](https://img.shields.io/badge/CSS%20Modules-000000?logo=css3\&logoColor=1572B6)              |

</br>


</br>

### [개발 환경]
코드 충돌을 줄이고 브랜치 관리가 용이한 **GitHub Flow** 기반의 브랜치 전략을 따릅니다.
기능 단위로 브랜치를 생성하고, Pull Request를 통해 main 브랜치에 병합하는 방식으로 협업을 진행했습니다.

</br>

### [커밋 컨벤션]
| 커밋 유형           | 설명                                 |
| ------------ | ---------------------------------- |
| **feat**     | ✨ 새로운 기능 추가 (예: 새로운 섹션, 인터랙션)      |
| **fix**      | 🐛 버그 수정                           |
| **style**    | 🎨 UI, CSS 수정 (기능 변경 없음)           |
| **refactor** | ♻️ 코드 리팩토링 (기능 변화 없이 구조 개선)        |
| **docs**     | 📝 문서, README 등 수정                 |
| **chore**    | 🔧 빌드 설정, 라이브러리 업데이트 등             |
| **design**   | 💄 디자인 수정 (비기능적, 시각적 변화 강조 시 사용)   |
| **deploy**   | 🚀 배포 관련 설정 변경 (Netlify, Vercel 등) |

</br>

## 4. 폴더 구조

<details>
<summary>📁</summary>
  
```
+---public
└─src
    ├─api
    ├─assets
    │  ├─font
    │  ├─images
    │  └─svg
    ├─components
    │  ├─admin
    │  │  ├─adminLogin
    │  │  ├─layout
    │  │  ├─reservationManagement
    │  │  └─reviewManagement
    │  ├─common
    │  │  ├─button
    │  │  ├─sectionTitle
    │  │  ├─selectGroup
    │  │  └─swiper
    │  ├─home
    │  ├─login
    │  ├─myPage
    │  ├─reservation
    │  ├─selectSchedule
    │  ├─signup
    │  ├─stylistServiceSelect
    │  ├─trend
    │  └─userDetails
    ├─config
    ├─hooks
    ├─layout
    │  ├─backHeader
    │  ├─header
    │  └─navbar
    ├─pages
    │  ├─adminLayout
    │  ├─adminLogin
    │  ├─adminReservationManagement
    │  ├─adminReviewManagement
    │  ├─detailedFilter
    │  ├─emailLogin
    │  ├─home
    │  ├─myPage
    │  ├─reservation
    │  ├─savedStyles
    │  ├─selectSchedule
    │  ├─signup
    │  ├─socialLogin
    │  ├─splash
    │  ├─stylistServiceSelect
    │  ├─trend
    │  └─userDetails
    └─types
        ├─common
        └─reservation
```
</details>


- api/ : API 통신 관련 모듈
- assets/ : 정적 리소스 (이미지, 폰트)
- components/ : 재사용 가능한 컴포넌트
- hook/ : 커스텀 훅
- layout/ : 레이아웃 (header,navbar)
- pages/ : 각 페이지 구현
- types/ : 타입 정의

</br>

## 5. 주요 기능
### 🔒 로그인 / 회원가입

  - 이메일 로그인
  - 카카오 소셜 로그인
  - 회원가입
  - 사용자 정보 입력
  - 토큰 기반 인증

###  🏠 홈

  - 이벤트 배너
  - 메뉴 네비게이션
  - 추천 콘텐츠 표시

 ### 💇 예약 시스템

  - 스타일리스트/서비스 선택
  - 날짜 및 시간 선택
  - 예약 확인 및 관리
  - 예약 상세 정보 조회
  - 예약 취소

### 💈 트렌드

  - 스타일 추천
  - 트렌드 스타일 둘러보기
  - 저장된 스타일 관리

###  🔍 필터링

  - 상세 필터 설정
  - 지역/서비스별 검색
  - 맞춤 요청사항 작성

 ### 👤 마이페이지

  - 프로필 관리
  - 예약 현황 확인
  - 리뷰 작성
  - 로그아웃

 ### 👨‍💼 관리자

  - 관리자 로그인
  - 예약 관리
  - 리뷰 관리
  - 주간 예약 현황 확인

</br>


## 6. 페이지 기능

### 6-1. 사용자 인증

<table>
  <tr>
    <td align="center"><b>스플래시</b></td>
    <td align="center"><b>로그인</b></td>
    <td align="center"><b>회원가입</b></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/f1f0e18b-654a-4079-886c-f6ab766a8434" width="100%"/></td>
    <td><img src="https://github.com/user-attachments/assets/b7e37aed-0e66-4d92-9cdf-16598ab48d44" width="100%"/></td>
    <td><img src="https://github.com/user-attachments/assets/1a579646-2b39-4de9-a37e-307ffab932bf" width="100%"/></td>
  </tr>
</table>

</br>

### 6-2. 홈 / 탐색

<table>
  <tr>
    <td align="center"><b>홈</b></td>
    <td align="center"><b>트렌드 / 요즘</b></td>
    <td align="center"><b>섬세한 예약</b></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/af81def4-4047-4dbf-8e71-7814d98dc001" width="100%"/></td>
    <td><img src="https://github.com/user-attachments/assets/95243441-fa0a-454c-b5cb-e42d47b2cab7" width="100%"/></td>
    <td><img src="https://github.com/user-attachments/assets/6ea7ba26-e80b-43fb-9852-6412cf977b18" width="100%"/></td>
  </tr>
</table>

</br>

### 6-3. 예약 / 리뷰 / 마이페이지

<table>
  <tr>
    <td align="center"><b>일반 예약</b></td>
    <td align="center"><b>마이페이지</b></td>
    <td align="center"><b>리뷰 작성</b></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/c249a9a1-e360-4dab-ba85-fe9250c3a5a6" width="100%"/></td>
    <td><img src="https://github.com/user-attachments/assets/93a691f7-216f-41bc-827f-563936b2fc07" width="100%"/></td>
    <td><img src="https://github.com/user-attachments/assets/92ba1b37-e9fc-40c1-a4ca-d0873d371fec" width="100%"/></td>
  </tr>
</table>

</br>

### 6-4. 관리자 기능

<table>
  <tr>
    <td align="center"><b>어드민 로그인</b></td>
    <td align="center"><b>어드민 예약 현황</b></td>
    <td align="center"><b>어드민 리뷰 리스트</b></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/6d52d24a-19a9-4406-bba0-4b5bf7413581" width="100%"/></td>
    <td><img src="https://github.com/user-attachments/assets/693d9d5b-b7d2-428a-8508-977c30f69b11" width="100%"/></td>
    <td><img src="https://github.com/user-attachments/assets/acb82c55-3f49-4d8a-99e8-908f0cc395c7" width="100%"/></td>
  </tr>
</table>





