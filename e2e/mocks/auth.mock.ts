import type { Page } from "@playwright/test";

/**
 * 로그인 API Mock 핸들러
 *
 * 실제 호출 경로 (src/api/URL.ts + EmailLoginSection.tsx):
 *   API_URL  = "https://api.seomse.kro.kr"
 *   AUTH_PATH = "/user/auth"
 *   → POST https://api.seomse.kro.kr/user/auth/login
 *
 * glob 패턴 `**​/user/auth/login` 으로 해당 절대경로 요청만 가로챈다.
 */
export const LOGIN_ENDPOINT = "**/user/auth/login";

/**
 * 성공 응답 페이로드.
 * EmailLoginSection 의 onSuccess 는 response.data.accessToken 을 읽어
 * 쿠키에 저장 후 "/" 로 이동하므로, 동일한 구조를 반환한다.
 */
export const LOGIN_SUCCESS_PAYLOAD = {
    data: {
        accessToken: "mock.access.token.eyJhbGciOiJIUzI1NiJ9",
    },
} as const;

/** 200 OK - 로그인 성공 */
export async function mockLoginSuccess(page: Page): Promise<void> {
    await page.route(LOGIN_ENDPOINT, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify(LOGIN_SUCCESS_PAYLOAD),
        });
    });
}

/**
 * 4xx / 5xx 에러 응답.
 * usePostApi 는 res.ok 가 false 면 throw → react-query onError 로 전달된다.
 * @param status  HTTP 상태 코드 (401 / 403 / 500 ...)
 * @param message 서버가 내려주는 에러 메시지 (실제 서버 응답 형태 모사)
 */
export async function mockLoginError(
    page: Page,
    status: number,
    message: string
): Promise<void> {
    await page.route(LOGIN_ENDPOINT, async (route) => {
        await route.fulfill({
            status,
            contentType: "application/json",
            body: JSON.stringify({ message }),
        });
    });
}

/**
 * 네트워크 장애.
 * fetch 자체가 reject 되어 onError 로 진입한다.
 * (Chromium 기준 net::ERR_FAILED)
 */
export async function mockLoginNetworkError(page: Page): Promise<void> {
    await page.route(LOGIN_ENDPOINT, async (route) => {
        await route.abort("failed");
    });
}

/**
 * 응답 지연 후 성공 처리.
 * 로딩/스피너 UI 동작 및 지연 중 화면 전환 여부를 검증하기 위해 사용한다.
 * @param delayMs 지연 시간(ms)
 */
export async function mockLoginDelayed(
    page: Page,
    delayMs: number
): Promise<void> {
    await page.route(LOGIN_ENDPOINT, async (route) => {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify(LOGIN_SUCCESS_PAYLOAD),
        });
    });
}
