import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DialogRecorder } from "../utils/dialog";

/**
 * 프로젝트 공용 커스텀 fixture.
 *
 * - loginPage : LoginPage(Page Object) 인스턴스
 * - dialog    : alert 메시지를 수집하는 DialogRecorder
 *
 * dialog fixture 는 page 생성 직후 dialog 리스너를 등록하므로,
 * 어떤 액션보다 먼저 alert 캡처가 보장된다.
 */
type Fixtures = {
    loginPage: LoginPage;
    dialog: DialogRecorder;
};

export const test = base.extend<Fixtures>({
    dialog: async ({ page }, use) => {
        const recorder = new DialogRecorder(page);
        await use(recorder);
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
});

export { expect };
