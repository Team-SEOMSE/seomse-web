import type { Page } from "@playwright/test";

/**
 * 인증 가드(Root.tsx) 통과 헬퍼.
 *
 * Root.tsx 인증 가드는 비-인증 페이지(/reservation, /select-* 등)에서
 *   1) accessToken 쿠키가 없으면 → /kakao-login 으로 리다이렉트
 *   2) 토큰이 있으면 GET /security/verify 로 검증
 * 하므로, 예약 플로우를 테스트하려면 인증 상태를 먼저 주입해야 한다.
 *
 * - accessToken 쿠키 주입(react-cookie 가 document.cookie 로 읽음)
 * - GET /security/verify 를 200 으로 Mock (실제 서버 호출 차단 + 가드 통과)
 */
export const VERIFY_ROUTE = /\/security\/verify/;

export async function authenticate(page: Page): Promise<void> {
    await page.context().addCookies([
        {
            name: "accessToken",
            value: "mock-access-token-e2e",
            url: "http://localhost:5173",
            sameSite: "Lax",
        },
    ]);

    await page.route(VERIFY_ROUTE, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ data: { valid: true } }),
        });
    });
}
