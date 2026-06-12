import { expect, test } from "../fixtures/test";
import {
    DEFAULT_SERVICE,
    EXPECTED_DATETIME,
    PRIMARY_SHOP,
    RESERVE_TIME,
} from "../fixtures/reservationData";
import {
    mockNormalAppointmentDelayed,
    mockNormalAppointmentError,
    mockReservationHappyPath,
    mockShopDetail,
    mockShopList,
} from "../mocks/reservation.mock";
import { authenticate } from "../utils/auth";

/**
 * 예약 기능 - Network Mocking 기반 QA 자동화
 *
 * 예약 플로우는 전 구간이 실시간 API에 의존한다.
 *   - GET  /shops?type=HAIR_SALON            (샵 목록)
 *   - GET  /shops/{shopId}                   (샵 상세/디자이너)
 *   - POST /interaction/appointments/normal  (일반 예약 제출, onSuccess 에서만 확정 이동)
 * API 서버가 중단된 상태이므로 page.route 로 위 응답을 Mock 하여
 * 예약 여정과 다양한 응답(성공/실패/지연)에서의 동작을 검증한다.
 *
 * 시간 결정성: TimeSelect 가 "현재 시각 이후" 슬롯만 노출하므로
 * page.clock 으로 시각을 11:00 이전으로 고정한다(SchedulePage.freezeClock).
 */
test.describe("예약 기능", () => {
    test.beforeEach(async ({ page, schedulePage }) => {
        // 인증 가드(Root.tsx) 통과: accessToken 쿠키 주입 + verify Mock
        await authenticate(page);
        // 모든 페이지 이동 전에 시각을 고정해야 첫 렌더부터 슬롯이 결정적이다.
        await schedulePage.freezeClock();
    });

    test("TC-R01 | 샵 목록 API 응답을 받아 헤어샵 카드가 렌더된다", async ({
        page,
        reservationPage,
    }) => {
        await mockShopList(page);

        await reservationPage.goto();

        await expect(
            reservationPage.shopCard(PRIMARY_SHOP.shopName).first()
        ).toBeVisible();
        await expect(
            page.getByRole("img", { name: "헤어 더웬디" }).first()
        ).toBeVisible();
    });

    test("TC-R02 | 샵 카드 클릭 시 상세 시트가 열리고 예약 진입 버튼이 보인다", async ({
        page,
        reservationPage,
    }) => {
        await mockShopList(page);
        await mockShopDetail(page);

        await reservationPage.goto();
        await reservationPage.openShop(PRIMARY_SHOP.shopName);

        await expect(
            reservationPage.sheetHeading(PRIMARY_SHOP.shopName)
        ).toBeVisible();
        await expect(reservationPage.specialBookingButton).toBeVisible();
        await expect(reservationPage.simpleBookingButton).toBeVisible();
    });

    test("TC-R03 | 일정 선택: 시간 미선택 시 '다음' 비활성, 선택 시 활성화된다", async ({
        schedulePage,
    }) => {
        await schedulePage.goto();

        // 달력은 마운트 시 '오늘'이 자동 선택되지만 시간은 미선택 → 비활성
        await expect(schedulePage.nextButton).toBeDisabled();

        await schedulePage.selectTime(RESERVE_TIME);

        await expect(schedulePage.nextButton).toBeEnabled();
    });

    test("TC-R04 | 일반 예약 전체 여정(성공): 샵 → 서비스 → 일정 → 예약 확정", async ({
        page,
        reservationPage,
        serviceSelectPage,
        schedulePage,
    }) => {
        await mockReservationHappyPath(page); // 목록 + 상세 + 제출 성공

        // 1) 예약 페이지 → 샵 선택 → 상세 시트
        await reservationPage.goto();
        await reservationPage.openShop(PRIMARY_SHOP.shopName);

        // 2) "그냥 예약하기"(normal) → 서비스 선택 페이지
        await reservationPage.startSimpleBooking();
        await expect(page).toHaveURL(/select-service/);

        // 3) 서비스 자동 선택 상태 → 다음
        await serviceSelectPage.goNext();
        await expect(page).toHaveURL(/select-schedule/);

        // 4) 시간 선택 → 다음 (POST /appointments/normal → 성공)
        await schedulePage.selectTime(RESERVE_TIME);
        await schedulePage.goNext();

        // 5) 예약 확정 시트: 선택 데이터가 확정 화면까지 정확히 전달되는지 검증
        await expect(reservationPage.confirmedHeading).toBeVisible();
        await expect(page.getByText(DEFAULT_SERVICE)).toBeVisible();
        await expect(page.getByText(EXPECTED_DATETIME)).toBeVisible();
    });

    test("TC-R05 | 일반 예약 제출 실패(500) 시 화면 전환 없이 머무른다 [개선 포인트]", async ({
        page,
        schedulePage,
        reservationPage,
    }) => {
        await mockNormalAppointmentError(page, 500);

        await schedulePage.goto();
        await schedulePage.selectTime(RESERVE_TIME);
        await schedulePage.goNext();

        // SelectSchedule 에는 onError 가 없어, 실패 시 이동/안내가 전혀 없다.
        // → 확정 시트가 뜨지 않고 일정 페이지에 그대로 머무름을 검증.
        await expect(page).toHaveURL(/select-schedule/);
        await expect(reservationPage.confirmedHeading).toBeHidden();
        // 제출 종료 후 버튼은 다시 활성화되어(재시도 가능) 있지만 피드백은 없음
        await expect(schedulePage.nextButton).toBeEnabled();
    });

    test("TC-R06 | 응답 지연 동안 '다음' 버튼이 비활성(로딩)되었다가 확정된다", async ({
        page,
        schedulePage,
        reservationPage,
    }) => {
        await mockNormalAppointmentDelayed(page, 1500);

        await schedulePage.goto();
        await schedulePage.selectTime(RESERVE_TIME);
        await schedulePage.goNext();

        // 제출 중(isPosting): 중복 제출 방지를 위해 버튼 비활성화
        await expect(schedulePage.nextButton).toBeDisabled();

        // 지연 응답 도착 후: 예약 확정 시트 노출
        await expect(reservationPage.confirmedHeading).toBeVisible({
            timeout: 7000,
        });
    });

    test("TC-R07 | [결함] 미래 날짜를 선택해도 현재 시각 이전 슬롯이 노출되지 않는다", async ({
        schedulePage,
    }) => {
        // Known issue: TimeSelect가 선택 날짜 없이 현재 시각 기준으로 슬롯을 필터링한다.
        // 수정되면 이 테스트는 "expected to fail but passed"로 알려준다.
        test.fail();

        await schedulePage.freezeClock("2026-06-10T15:00:00");
        await schedulePage.goto();
        await schedulePage.selectDate(25);

        await expect(schedulePage.timeOption("11:00")).toBeVisible();
    });
});
