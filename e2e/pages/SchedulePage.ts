import type { Locator, Page } from "@playwright/test";
import { FIXED_NOW } from "../fixtures/reservationData";

/**
 * 일정(날짜/시간) 선택 페이지 (라우트 /select-schedule) Page Object
 *
 * 실제 컴포넌트 기준:
 * - src/pages/selectSchedule/SelectSchedule.tsx
 *     → reservationType "normal" 일 때 "다음" 클릭 시
 *       POST /interaction/appointments/normal 을 호출하고 onSuccess 에서만 확정 이동
 *     → 버튼은 disabled = (!date || !time) || isPosting
 * - 달력: src/components/selectSchedule/Calendar.tsx
 *     → 마운트 시 useEffect 로 "오늘"이 자동 선택됨 → 실제로는 "시간"만 고르면 활성화
 * - 시간: src/components/selectSchedule/TimeSelect.tsx
 *     → "현재 시각 이후"의 슬롯만 노출(영업 11:00~18:00, 30분).
 *       그래서 테스트는 page.clock 으로 시각을 11:00 이전(FIXED_NOW)으로 고정해
 *       모든 슬롯을 결정적으로 선택 가능하게 만든다.
 *     → 각 옵션은 SelectGroup 의 <button><span>{HH:MM}</span></button>
 */
export class SchedulePage {
    readonly page: Page;
    /** 일정 확정/다음 버튼 */
    readonly nextButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nextButton = page.getByRole("button", { name: "다음" });
    }

    /**
     * 브라우저 시각을 고정한다(기본값 FIXED_NOW = 영업 시작 전).
     * 반드시 첫 페이지 이동 전에 호출해야 첫 렌더부터 결정적인 시간 슬롯이 노출된다.
     * 특정 시각 검증이 필요한 케이스는 ISO 문자열을 넘겨 덮어쓴다.
     */
    async freezeClock(isoTime: string = FIXED_NOW): Promise<void> {
        await this.page.clock.setFixedTime(new Date(isoTime));
    }

    /**
     * 달력에서 특정 '일(day)'을 선택한다.
     * 현재 달의 12~30일은 이전/다음 달 스필오버(1~11, 31)와 겹치지 않아 exact 텍스트로 고유 식별된다.
     */
    async selectDate(day: number): Promise<void> {
        await this.page.getByText(String(day), { exact: true }).click();
    }

    /** 일정 선택 페이지 직접 진입 (state 없이 = normal 기본값) */
    async goto(): Promise<void> {
        await this.page.goto("/select-schedule");
    }

    /** 특정 시간 옵션 버튼 (예: "11:00") */
    timeOption(hhmm: string): Locator {
        return this.page.getByRole("button", { name: hhmm, exact: true });
    }

    /** 시간 선택 */
    async selectTime(hhmm: string): Promise<void> {
        await this.timeOption(hhmm).click();
    }

    /** 일정 확정(다음) → 일반 예약 POST 발생 */
    async goNext(): Promise<void> {
        await this.nextButton.click();
    }
}
