import type { Page } from "@playwright/test";
import { MOCK_DESIGNERS, MOCK_SHOPS } from "../fixtures/reservationData";
import type { ShopApiItem } from "../../src/types/reservation/shopList";

/**
 * 예약 플로우 API Mock 핸들러 (예약 플로우는 전 구간 실시간 API 의존).
 *
 * 실제 호출 경로 (src/api/URL.ts + 각 컴포넌트):
 *   GET  /shops?type=HAIR_SALON              (ShopList)
 *   GET  /shops/{shopId}                     (ShopList 상세)
 *   POST /interaction/appointments/normal    (SelectSchedule 일반 예약)
 *   POST /interaction/appointments/special   (DetailedRequest 섬세 예약)
 *
 * 경로 구분을 위해 glob 대신 정규식으로 매칭한다.
 * (목록은 `/shops?...`, 상세는 `/shops/{id}` 로 형태가 달라 서로 겹치지 않는다)
 */
export const SHOP_LIST_ROUTE = /\/shops\?type=HAIR_SALON/;
export const SHOP_DETAIL_ROUTE = /\/shops\/[\w-]+$/;
export const NORMAL_APPOINTMENT_ROUTE = /\/interaction\/appointments\/normal$/;
export const SPECIAL_APPOINTMENT_ROUTE = /\/interaction\/appointments\/special$/;

/** 예약 성공 응답(예시 계약) */
export const APPOINTMENT_SUCCESS_PAYLOAD = {
    data: { appointmentId: "mock-appointment-0001", status: "CONFIRMED" },
} as const;

/** GET /shops?type=HAIR_SALON → 샵 목록 */
export async function mockShopList(
    page: Page,
    shops: ShopApiItem[] = MOCK_SHOPS
): Promise<void> {
    await page.route(SHOP_LIST_ROUTE, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ data: shops }),
        });
    });
}

/** GET /shops/{shopId} → 요청된 shopId 의 상세 + 디자이너 목록 */
export async function mockShopDetail(page: Page): Promise<void> {
    await page.route(SHOP_DETAIL_ROUTE, async (route) => {
        const url = route.request().url();
        const shopId = url.split("/shops/")[1]?.split(/[?#]/)[0] ?? "";
        const shop =
            MOCK_SHOPS.find((s) => s.shopId === shopId) ?? MOCK_SHOPS[0];
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
                data: { ...shop, designers: MOCK_DESIGNERS },
            }),
        });
    });
}

/** POST /interaction/appointments/normal → 성공(201) */
export async function mockNormalAppointmentSuccess(page: Page): Promise<void> {
    await page.route(NORMAL_APPOINTMENT_ROUTE, async (route) => {
        await route.fulfill({
            status: 201,
            contentType: "application/json",
            body: JSON.stringify(APPOINTMENT_SUCCESS_PAYLOAD),
        });
    });
}

/**
 * POST /interaction/appointments/normal → 실패(예: 409 시간대 중복 / 500 서버 오류).
 * ⚠️ SelectSchedule 에는 onError 핸들러가 없어, 실패 시 화면 전환/안내가 전혀 없다.
 */
export async function mockNormalAppointmentError(
    page: Page,
    status: number,
    message = "appointment failed"
): Promise<void> {
    await page.route(NORMAL_APPOINTMENT_ROUTE, async (route) => {
        await route.fulfill({
            status,
            contentType: "application/json",
            body: JSON.stringify({ message }),
        });
    });
}

/** POST /interaction/appointments/normal → 지연 후 성공 (isPosting 로딩 상태 검증용) */
export async function mockNormalAppointmentDelayed(
    page: Page,
    delayMs: number
): Promise<void> {
    await page.route(NORMAL_APPOINTMENT_ROUTE, async (route) => {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        await route.fulfill({
            status: 201,
            contentType: "application/json",
            body: JSON.stringify(APPOINTMENT_SUCCESS_PAYLOAD),
        });
    });
}

/** POST /interaction/appointments/special → 성공(201, multipart 요청에 대한 응답) */
export async function mockSpecialAppointmentSuccess(page: Page): Promise<void> {
    await page.route(SPECIAL_APPOINTMENT_ROUTE, async (route) => {
        await route.fulfill({
            status: 201,
            contentType: "application/json",
            body: JSON.stringify(APPOINTMENT_SUCCESS_PAYLOAD),
        });
    });
}

/**
 * 일반 예약 해피패스에 필요한 3개 엔드포인트(목록/상세/제출 성공)를 한 번에 등록.
 */
export async function mockReservationHappyPath(page: Page): Promise<void> {
    await mockShopList(page);
    await mockShopDetail(page);
    await mockNormalAppointmentSuccess(page);
}
