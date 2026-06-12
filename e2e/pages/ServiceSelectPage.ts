import type { Locator, Page } from "@playwright/test";

/**
 * 디자이너 / 서비스 선택 페이지 (라우트 /select-service) Page Object
 *
 * 실제 컴포넌트 기준:
 * - src/pages/stylistServiceSelect/StylistServiceSelectPage.tsx
 *     → 디자이너는 상세 API 의 designers(state)로 렌더, 서비스는 하드코딩(services)
 *     → StyleSelect 의 useEffect 로 첫 서비스("앞머리 컷")가 자동 선택되므로
 *       별도 선택 없이 "다음" 으로 진행 가능 (handleReservation 은 selectedService 만 확인)
 * - 서비스 항목: src/components/stylistServiceSelect/StyleSelect.tsx
 *     → <li role="radio" aria-checked> (기본 카테고리 "커트")
 */
export class ServiceSelectPage {
    readonly page: Page;
    /** 다음 단계(일정 선택)로 이동하는 버튼 */
    readonly nextButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nextButton = page.getByRole("button", { name: "다음" });
    }

    /** 특정 서비스 라디오 항목 (예: "앞머리 컷") */
    serviceOption(name: string): Locator {
        return this.page.getByRole("radio", { name: new RegExp(name) });
    }

    /** 서비스 명시적 선택 */
    async selectService(name: string): Promise<void> {
        await this.serviceOption(name).click();
    }

    /** 일정 선택 페이지로 진행 */
    async goNext(): Promise<void> {
        await this.nextButton.click();
    }
}
