/**
 * 로그인 테스트용 입력 데이터 및 기대 문구 상수.
 *
 * - 입력 자격증명은 Mock 으로 가로채므로 실제 계정일 필요는 없으나,
 *   서비스 placeholder("seomse@gmail.com") 형식에 맞춰 현실적으로 구성한다.
 * - 기대 문구는 실제 코드(EmailLoginSection.tsx)에 하드코딩된 문자열을 그대로 사용한다.
 */

export const VALID_USER = {
    email: "seomse@gmail.com",
    password: "seomse1234!",
} as const;

export const LOGIN_MESSAGES = {
    /**
     * 로그인 실패 시 노출되는 alert 문구.
     *
     * ⚠️ 실제 코드 기준 중요 사항:
     * usePostApi 는 4xx/5xx/네트워크 오류를 모두 throw 하고,
     * onError 핸들러는 status 코드를 구분하지 않고 항상 아래 동일한 문구만 노출한다.
     * 즉 401 / 403 / 500 / 네트워크 장애가 모두 같은 메시지로 표시된다.
     * (→ QA 개선 제안 포인트. README "발견된 개선 포인트" 참고)
     */
    failure: "아이디 또는 비밀번호를 확인해주세요.",
} as const;
