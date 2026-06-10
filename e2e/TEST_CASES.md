# 테스트 케이스 명세서 · 이메일 로그인

- 대상: `src/components/login/EmailLoginSection.tsx` (라우트 `/email-login`)
- 호출 API: `POST https://api.seomse.kro.kr/user/auth/login`
- 방식: Playwright Network Mocking (`page.route`)
- 사전 조건(공통): 프론트엔드 dev server 기동, `/email-login` 진입, 아이디/비밀번호 입력 → 제출

| ID | 테스트 케이스 | Mock 응답 | 입력 | 기대 결과 | 검증 방법 | 결과 |
| --- | --- | --- | --- | --- | --- | --- |
| TC-01 | 로그인 성공 | `200 OK`<br>`{ data: { accessToken } }` | 유효한 이메일/비밀번호 | 메인 페이지(`/`)로 이동 | `expect(page).toHaveURL("/")` | ✅ Pass |
| TC-02 | 인증 실패 | `401 Unauthorized` | 임의 이메일/비밀번호 | 에러 alert 노출, `/email-login` 유지 | dialog 메시지 + URL 검증 | ✅ Pass |
| TC-03 | 권한 없음 | `403 Forbidden` | 임의 이메일/비밀번호 | 에러 alert 노출, `/email-login` 유지 | dialog 메시지 + URL 검증 | ✅ Pass |
| TC-04 | 서버 오류 | `500 Internal Server Error` | 임의 이메일/비밀번호 | 에러 alert 노출, `/email-login` 유지 | dialog 메시지 + URL 검증 | ✅ Pass |
| TC-05 | 네트워크 장애 | `route.abort("failed")` | 임의 이메일/비밀번호 | 에러 alert 노출, `/email-login` 유지 | dialog 메시지 + URL 검증 | ✅ Pass |
| TC-06 | 응답 지연 | `3s delay` → `200 OK` | 유효한 이메일/비밀번호 | 지연 중 화면 전환 없음 → 응답 후 메인 이동 | URL/버튼 유지 → 최종 URL 검증 | ✅ Pass |

## 기대 문구 (실제 코드 기준)

| 상황 | 노출 문구 | 노출 방식 |
| --- | --- | --- |
| 로그인 실패 (401/403/500/네트워크 공통) | `아이디 또는 비밀번호를 확인해주세요.` | `window.alert` |

> ⚠️ **알려진 이슈**: 현재 프론트엔드는 HTTP status를 구분하지 않아 401·403·500·네트워크 장애가 **모두 동일한 문구**로 표시됩니다.
> 또한 응답 지연 시 **로딩/스피너 UI가 없습니다.** (개선 제안: [`README.md` §8](./README.md))

## 셀렉터 매핑 (실제 DOM 기준)

| 요소 | 셀렉터 | 근거 |
| --- | --- | --- |
| 아이디 입력 | `getByLabel("아이디", { exact: true })` | `InputForm`의 `<label htmlFor="아이디">` ↔ `<input id="아이디">` |
| 비밀번호 입력 | `getByLabel("비밀번호", { exact: true })` | `<label htmlFor="비밀번호">` ↔ `<input id="비밀번호">` |
| 제출 버튼 | `getByRole("button", { name: "로그인" })` | `Button` 컴포넌트의 `<button>` 텍스트 "로그인" |
| 헤더 타이틀 | `getByRole("heading", { name: "로그인" })` | `BackHeader`의 `<h1>로그인</h1>` |
