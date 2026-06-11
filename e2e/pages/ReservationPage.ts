import type { Locator, Page } from "@playwright/test";

/**
 * 예약 메인 페이지 (라우트 /reservation) Page Object
 *
 * 실제 컴포넌트 기준 (예약 플로우 = API 의존):
 * - src/pages/reservation/Reservation.tsx
 * - 헤어샵 목록: src/components/reservation/ShopList.tsx
 *     → GET /shops?type=HAIR_SALON 결과를 카드로 렌더 (<img alt={shopName}>)
 *     → 카드 클릭 시 GET /shops/{shopId} 후 BottomSheet 오픈
 * - 매장 상세 시트: src/components/reservation/BottomSheet.tsx
 *     → "섬세한 예약하기"(button) / "그냥 예약하기"(p) 두 진입점
 * - 예약 확정 시트: src/components/reservation/ReservationConfirmedSheet.tsx
 *     → 예약 제출 성공(onSuccess) 후 confirmed 상태로 진입 시 노출
 */
export class ReservationPage {
    readonly page: Page;

    /** 매장 상세 시트의 "섬세한 예약하기" 버튼 (special 예약) */
    readonly specialBookingButton: Locator;
    /** 매장 상세 시트의 "그냥 예약하기" 텍스트 (normal 예약, <p onClick>) */
    readonly simpleBookingButton: Locator;
    /** 예약 확정 시트 헤더 */
    readonly confirmedHeading: Locator;

    constructor(page: Page) {
        this.page = page;
        this.specialBookingButton = page.getByRole("button", {
            name: "섬세한 예약하기",
        });
        this.simpleBookingButton = page.getByText("그냥 예약하기");
        this.confirmedHeading = page.getByRole("heading", {
            name: "예약이 확정되었습니다.",
        });
    }

    async goto(): Promise<void> {
        await this.page.goto("/reservation");
    }

    /** 샵 카드 이미지 (alt = 매장명) - 클릭 시 카드 onClick 으로 버블링 */
    shopCard(shopName: string): Locator {
        return this.page.getByRole("img", { name: shopName });
    }

    /** 매장 상세 BottomSheet 의 제목 헤딩 (<h2>{매장명}</h2>) */
    sheetHeading(shopName: string): Locator {
        return this.page.getByRole("heading", { name: shopName });
    }

    /** 샵 카드 클릭 → (상세 GET) → 매장 상세 시트 오픈 대기 */
    async openShop(shopName: string): Promise<void> {
        await this.shopCard(shopName).first().click();
        await this.sheetHeading(shopName).waitFor({ state: "visible" });
    }

    /** 매장 상세 시트에서 "그냥 예약하기"(normal) 진입 → /select-service */
    async startSimpleBooking(): Promise<void> {
        await this.simpleBookingButton.click();
    }

    /** 매장 상세 시트에서 "섬세한 예약하기"(special) 진입 → /select-service */
    async startSpecialBooking(): Promise<void> {
        await this.specialBookingButton.click();
    }
}
