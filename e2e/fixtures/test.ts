import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ReservationPage } from "../pages/ReservationPage";
import { SchedulePage } from "../pages/SchedulePage";
import { ServiceSelectPage } from "../pages/ServiceSelectPage";
import { DialogRecorder } from "../utils/dialog";

/**
 * 프로젝트 공용 커스텀 fixture.
 *
 * - loginPage         : 로그인 페이지 Page Object
 * - reservationPage   : 예약 메인(/reservation) Page Object
 * - serviceSelectPage : 디자이너/서비스 선택(/select-service) Page Object
 * - schedulePage      : 일정 선택(/select-schedule) Page Object
 * - dialog            : alert 메시지를 수집하는 DialogRecorder
 *
 * dialog fixture 는 page 생성 직후 dialog 리스너를 등록하므로,
 * 어떤 액션보다 먼저 alert 캡처가 보장된다.
 */
type Fixtures = {
    loginPage: LoginPage;
    reservationPage: ReservationPage;
    serviceSelectPage: ServiceSelectPage;
    schedulePage: SchedulePage;
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
    reservationPage: async ({ page }, use) => {
        await use(new ReservationPage(page));
    },
    serviceSelectPage: async ({ page }, use) => {
        await use(new ServiceSelectPage(page));
    },
    schedulePage: async ({ page }, use) => {
        await use(new SchedulePage(page));
    },
});

export { expect };
