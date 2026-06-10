import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright 설정 - Seomse Web 로그인 QA 자동화
 *
 * 현재 백엔드 API 서버가 중단된 상태이므로, 프론트엔드(Vite dev server)만
 * 기동한 뒤 Playwright Network Mocking(page.route)으로 로그인 API 응답을
 * 가로채 다양한 장애 시나리오를 검증한다.
 *
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
    testDir: "./e2e/specs",

    /* 모든 테스트는 독립적으로 병렬 실행 */
    fullyParallel: true,

    /* CI에서 test.only 가 커밋되면 실패 처리 */
    forbidOnly: !!process.env.CI,

    /* 불안정 테스트 방지를 위한 재시도 (CI에서만) */
    retries: process.env.CI ? 2 : 0,

    /* CI에서는 워커 수 제한 */
    workers: process.env.CI ? 1 : undefined,

    /* 리포터: 터미널(list) + HTML 리포트 */
    reporter: [["list"], ["html", { open: "never" }]],

    use: {
        /* 모든 page.goto / 상대 경로의 기준 URL (Vite 기본 포트) */
        baseURL: "http://localhost:5173",

        /* 실패한 테스트 1차 재시도 시에만 트레이스 수집 */
        trace: "on-first-retry",

        /* 실패 시에만 스크린샷 / 비디오 보존 */
        screenshot: "only-on-failure",
        video: "retain-on-failure",
    },

    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
    ],

    /**
     * 테스트 실행 전 프론트엔드 dev server 자동 기동.
     * 이미 떠 있으면(reuseExistingServer) 재사용한다.
     * 백엔드는 띄우지 않으며, 로그인 API는 전부 Mock으로 대체된다.
     */
    webServer: {
        command: "npm run dev",
        url: "http://localhost:5173",
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
    },
});
