import type { Locator, Page } from "@playwright/test";

/**
 * 이메일 로그인 페이지(Page Object Model)
 *
 * 실제 컴포넌트 기준:
 * - 라우트: /email-login (src/App.tsx)
 * - 폼: src/components/login/EmailLoginSection.tsx
 * - 입력 필드: src/components/login/InputForm.tsx
 *     → <label htmlFor={content}> 와 <input id={content}> 가 연결되어 있어
 *       접근성 기반 getByLabel 로 안전하게 선택 가능
 * - 제출 버튼: src/components/common/button/Button.tsx
 *     → 텍스트 "로그인" 을 가진 <button> (role=button)
 *
 * 하드코딩된 CSS 클래스 셀렉터 대신 role / label 기반 셀렉터만 사용한다.
 */
export class LoginPage {
    readonly page: Page;

    /** 아이디(이메일) 입력 - <input id="아이디"> */
    readonly emailInput: Locator;
    /** 비밀번호 입력 - <input id="비밀번호"> ("비밀번호 보기" 토글과 구분 위해 exact) */
    readonly passwordInput: Locator;
    /** 제출 버튼 - 텍스트 "로그인" */
    readonly submitButton: Locator;
    /** 상단 헤더 타이틀 - <h1>로그인</h1> */
    readonly headerTitle: Locator;
    /** 회원가입 이동 텍스트 */
    readonly signupLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.getByLabel("아이디", { exact: true });
        this.passwordInput = page.getByLabel("비밀번호", { exact: true });
        this.submitButton = page.getByRole("button", { name: "로그인" });
        this.headerTitle = page.getByRole("heading", { name: "로그인" });
        this.signupLink = page.getByText("회원가입");
    }

    /** 로그인 페이지로 이동 */
    async goto(): Promise<void> {
        await this.page.goto("/email-login");
        await this.headerTitle.waitFor({ state: "visible" });
    }

    /** 아이디 / 비밀번호 입력 (제출은 하지 않음) */
    async fillCredentials(email: string, password: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
    }

    /** 제출 버튼 클릭 (입력값이 모두 채워지면 활성화됨) */
    async submit(): Promise<void> {
        await this.submitButton.click();
    }

    /** 입력 + 제출을 한 번에 수행 */
    async login(email: string, password: string): Promise<void> {
        await this.fillCredentials(email, password);
        await this.submit();
    }
}
