import { expect, test } from "../fixtures/test";
import { LOGIN_MESSAGES, VALID_USER } from "../fixtures/loginData";
import {
    mockLoginDelayed,
    mockLoginError,
    mockLoginNetworkError,
    mockLoginSuccess,
} from "../mocks/auth.mock";

/**
 * 이메일 로그인 - Network Mocking 기반 QA 자동화
 *
 * 백엔드 API 서버 중단 상태에서 프론트엔드만 기동한 뒤,
 * 로그인 API 응답을 Mock 으로 가로채 다양한 장애 시나리오를 검증한다.
 *
 * 검증 대상: src/components/login/EmailLoginSection.tsx (라우트 /email-login)
 */
test.describe("이메일 로그인", () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
    });

    test("TC-01 | 로그인 성공(200) 시 메인 페이지로 이동한다", async ({
        page,
        loginPage,
    }) => {
        await mockLoginSuccess(page);

        await loginPage.login(VALID_USER.email, VALID_USER.password);

        // onSuccess 에서 accessToken 확인 후 navigate("/") → 메인 이동
        await expect(page).toHaveURL("/");
        await expect(page).not.toHaveURL(/email-login/);
    });

    test("TC-02 | 인증 실패(401) 시 에러 메시지를 노출하고 페이지에 머무른다", async ({
        page,
        loginPage,
        dialog,
    }) => {
        await mockLoginError(page, 401, "Unauthorized");

        await loginPage.login(VALID_USER.email, VALID_USER.password);

        await expect.poll(() => dialog.last()).toBe(LOGIN_MESSAGES.failure);
        await expect(page).toHaveURL(/email-login/);
    });

    test("TC-03 | 권한 없음(403) 시 에러 메시지를 노출하고 페이지에 머무른다", async ({
        page,
        loginPage,
        dialog,
    }) => {
        await mockLoginError(page, 403, "Forbidden");

        await loginPage.login(VALID_USER.email, VALID_USER.password);

        await expect.poll(() => dialog.last()).toBe(LOGIN_MESSAGES.failure);
        await expect(page).toHaveURL(/email-login/);
    });

    test("TC-04 | 서버 오류(500) 시 에러 메시지를 노출하고 페이지에 머무른다", async ({
        page,
        loginPage,
        dialog,
    }) => {
        await mockLoginError(page, 500, "Internal Server Error");

        await loginPage.login(VALID_USER.email, VALID_USER.password);

        await expect.poll(() => dialog.last()).toBe(LOGIN_MESSAGES.failure);
        await expect(page).toHaveURL(/email-login/);
    });

    test("TC-05 | 네트워크 장애 시 에러 메시지를 노출하고 페이지에 머무른다", async ({
        page,
        loginPage,
        dialog,
    }) => {
        await mockLoginNetworkError(page);

        await loginPage.login(VALID_USER.email, VALID_USER.password);

        await expect.poll(() => dialog.last()).toBe(LOGIN_MESSAGES.failure);
        await expect(page).toHaveURL(/email-login/);
    });

    test("TC-06 | 응답 지연(3s) 동안 화면 전환 없이 처리 후 메인으로 이동한다", async ({
        page,
        loginPage,
    }) => {
        await mockLoginDelayed(page, 3000);

        await loginPage.login(VALID_USER.email, VALID_USER.password);

        // 응답 도착 전: 로그인 페이지에 그대로 머무르며 폼이 유지되어야 한다.
        // (현재 컴포넌트에는 스피너/로딩 UI 가 없음 → README "개선 포인트" 문서화)
        await expect(page).toHaveURL(/email-login/);
        await expect(loginPage.submitButton).toBeVisible();

        // 지연 응답 도착 후: 정상적으로 메인 페이지로 이동
        await expect(page).toHaveURL("/", { timeout: 7000 });
    });
});
