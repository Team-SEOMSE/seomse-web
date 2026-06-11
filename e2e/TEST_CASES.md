# 테스트 케이스 명세서 · 이메일 로그인

- 대상: `src/components/login/EmailLoginSection.tsx` (라우트 `/email-login`)
- 호출 API: `POST https://api.seomse.kro.kr/user/auth/login`
- 방식: Playwright Network Mocking (`page.route`)
- 사전 조건(공통): 프론트엔드 dev server 기동, `/email-login` 진입, 아이디/비밀번호 입력 → 제출

| ID | 테스트 케이스 | Mock 응답 | 입력 | 기대 결과 | 검증 방법 | 결과 |
| ----- | ------------- | --------------------------------------- | ---------------------- | ------------------------------------------ | ----------------------------- | ------- |근데
| TC-01 | 로그인 성공 | `200 OK`<br>`{ data: { accessToken } }` | 유효한 이메일/비밀번호 | 메인 페이지(`/`)로 이동 | `expect(page).toHaveURL("/")` | ✅ Pass |
| TC-02 | 인증 실패 | `401 Unauthorized` | 임의 이메일/비밀번호 | 에러 alert 노출, `/email-login` 유지 | dialog 메시지 + URL 검증 | ✅ Pass |
| TC-03 | 권한 없음 | `403 Forbidden` | 임의 이메일/비밀번호 | 에러 alert 노출, `/email-login` 유지 | dialog 메시지 + URL 검증 | ✅ Pass |
| TC-04 | 서버 오류 | `500 Internal Server Error` | 임의 이메일/비밀번호 | 에러 alert 노출, `/email-login` 유지 | dialog 메시지 + URL 검증 | ✅ Pass |
| TC-05 | 네트워크 장애 | `route.abort("failed")` | 임의 이메일/비밀번호 | 에러 alert 노출, `/email-login` 유지 | dialog 메시지 + URL 검증 | ✅ Pass |
| TC-06 | 응답 지연 | `3s delay` → `200 OK` | 유효한 이메일/비밀번호 | 지연 중 화면 전환 없음 → 응답 후 메인 이동 | URL/버튼 유지 → 최종 URL 검증 | ✅ Pass |

## 기대 문구 (실제 코드 기준)

| 상황                                    | 노출 문구                              | 노출 방식      |
| --------------------------------------- | -------------------------------------- | -------------- |
| 로그인 실패 (401/403/500/네트워크 공통) | `아이디 또는 비밀번호를 확인해주세요.` | `window.alert` |

> 🔍 **발견된 결함**: 현재 프론트엔드는 HTTP status를 구분하지 않아 401·403·500·네트워크 장애가 **모두 동일한 문구**로 표시됩니다.
> 또한 응답 지연 시 **로딩/스피너 UI가 없습니다.** (개선 제안: [`README.md` §8](./README.md))

## 셀렉터 매핑 (실제 DOM 기준)

| 요소          | 셀렉터                                     | 근거                                                             |
| ------------- | ------------------------------------------ | ---------------------------------------------------------------- |
| 아이디 입력   | `getByLabel("아이디", { exact: true })`    | `InputForm`의 `<label htmlFor="아이디">` ↔ `<input id="아이디">` |
| 비밀번호 입력 | `getByLabel("비밀번호", { exact: true })`  | `<label htmlFor="비밀번호">` ↔ `<input id="비밀번호">`           |
| 제출 버튼     | `getByRole("button", { name: "로그인" })`  | `Button` 컴포넌트의 `<button>` 텍스트 "로그인"                   |
| 헤더 타이틀   | `getByRole("heading", { name: "로그인" })` | `BackHeader`의 `<h1>로그인</h1>`                                 |

---

# 테스트 케이스 명세서 · 예약 (메인 기능)

- 대상 흐름: `/reservation` → `/select-service` → `/select-schedule` → 예약 확정 시트
- 방식: **Playwright Network Mocking** (예약 플로우 전 구간이 실시간 API에 의존)

> ℹ️ 샵 목록/상세 조회와 예약 제출이 모두 실시간 API 호출이므로, 결정적인 E2E 테스트를 위해 전 구간을 Mock으로 고정합니다.
> 또한 `Root.tsx` 인증 가드가 활성화되어 있어, 비로그인 시 `/reservation`이 `/kakao-login`으로 리다이렉트됩니다.

| 구분      | 항목      | 값                                                            |
| --------- | --------- | ------------------------------------------------------------- |
| Mock GET  | 샵 목록   | `GET /shops?type=HAIR_SALON` → `{ data: ShopApiItem[] }`      |
| Mock GET  | 샵 상세   | `GET /shops/{shopId}` → `{ data: { ...shop, designers } }`    |
| Mock POST | 일반 예약 | `POST /interaction/appointments/normal`                       |
| 인증      | 가드 통과 | `accessToken` 쿠키 주입 + `GET /security/verify` Mock         |
| 시간 고정 | 결정성    | `page.clock.setFixedTime("2026-06-10T10:00:00")` (11:00 이전) |

| ID     | 테스트 케이스             | Mock               | 기대 결과                                       | 결과    |
| ------ | ------------------------- | ------------------ | ----------------------------------------------- | ------- |
| TC-R01 | 샵 목록 렌더              | 목록 GET           | 샵 카드("라비드 헤어" 등) 노출                  | ✅ Pass |
| TC-R02 | 매장 상세 시트 오픈       | 목록+상세 GET      | 매장명 헤딩 + "섬세한 예약하기"/"그냥 예약하기" | ✅ Pass |
| TC-R03 | '다음' 활성화 규칙        | (없음)             | 시간 미선택 비활성 → 선택 시 활성               | ✅ Pass |
| TC-R04 | 일반 예약 전체 여정(성공) | 목록+상세+POST 201 | 확정 시트에 서비스명·`6월 10일 11:00` 정확 전달 | ✅ Pass |
| TC-R05 | 예약 제출 실패(500)       | POST 500           | **화면 전환·안내 없음**, 일정 페이지 유지       | ✅ Pass |
| TC-R06 | 응답 지연(로딩)           | POST 1.5s 지연     | 제출 중 '다음' 비활성(`isPosting`) → 확정       | ✅ Pass |

### QA 관점 핵심 발견 (예약)

> **제출 실패 시 사용자에게 아무런 피드백이 없습니다.** `SelectSchedule`의 일반 예약은 `onSuccess`만 처리하고 `onError`가 없어,
> 500/네트워크 오류 시 화면이 멈춘 채 안내가 없습니다(TC-R05). 로그인이 모든 실패에 동일 alert를 띄우는 것과 대비되는 **반대 방향의 결함**입니다.
> → `onError` 처리(실패 토스트/재시도 안내)와 status별 메시지가 필요합니다.

## 셀렉터 매핑 · 예약 (실제 DOM 기준)

| 요소            | 셀렉터                                                     | 근거                                                        |
| --------------- | ---------------------------------------------------------- | ----------------------------------------------------------- |
| 샵 카드         | `getByRole("img", { name: 매장명 })`                       | `ShopList`의 `<img alt={shopName}>` (클릭 시 카드로 버블링) |
| 매장 상세 헤딩  | `getByRole("heading", { name: 매장명 })`                   | `BottomSheet`의 `<h2>{title}</h2>`                          |
| 예약 진입(섬세) | `getByRole("button", { name: "섬세한 예약하기" })`         | `BottomSheet`의 `Button`                                    |
| 예약 진입(일반) | `getByText("그냥 예약하기")`                               | `BottomSheet`의 `<p onClick>` (버튼 아님)                   |
| 시간 옵션       | `getByRole("button", { name: "11:00", exact: true })`      | `SelectGroup`의 `<button><span>{HH:MM}</span></button>`     |
| 서비스 항목     | `getByRole("radio", { name: /앞머리 컷/ })`                | `StyleSelect`의 `<li role="radio">`                         |
| 다음 버튼       | `getByRole("button", { name: "다음" })`                    | `Button` 컴포넌트 텍스트 "다음"                             |
| 확정 헤딩       | `getByRole("heading", { name: "예약이 확정되었습니다." })` | `ReservationConfirmedSheet`의 `<h2>`                        |
