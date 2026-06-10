import type { Dialog, Page } from "@playwright/test";

/**
 * 브라우저 네이티브 dialog(window.alert) 메시지 수집 헬퍼.
 *
 * EmailLoginSection 의 onError 는 에러 메시지를 DOM 이 아닌
 * `alert("아이디 또는 비밀번호를 확인해주세요.")` 로 노출한다.
 * 따라서 getByText 가 아닌 dialog 이벤트로 메시지를 검증해야 한다.
 *
 * 인스턴스 생성 시 자동으로 dialog 를 수락(accept)하여 테스트가 멈추지 않게 한다.
 */
export class DialogRecorder {
    /** 노출된 모든 dialog 메시지 (시간순) */
    readonly messages: string[] = [];

    constructor(page: Page) {
        page.on("dialog", async (dialog: Dialog) => {
            this.messages.push(dialog.message());
            await dialog.accept();
        });
    }

    /** 가장 최근에 노출된 dialog 메시지 */
    last(): string | undefined {
        return this.messages.at(-1);
    }

    /** 특정 메시지가 한 번이라도 노출되었는지 여부 */
    has(message: string): boolean {
        return this.messages.includes(message);
    }
}
