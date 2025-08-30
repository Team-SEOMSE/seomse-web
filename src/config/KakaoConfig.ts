interface KakaoConfig {
  readonly CLIENT_ID: string;
  readonly REDIRECT_URI: string;
  readonly AUTH_URL: string;
}

export const KAKAO_CONFIG: KakaoConfig = {
  CLIENT_ID: import.meta.env.VITE_KAKAO_CLIENT_ID ?? "",
  REDIRECT_URI: import.meta.env.VITE_KAKAO_REDIRECT_URI ?? "",

  get AUTH_URL() {
    return `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${this.CLIENT_ID}&redirect_uri=${this.REDIRECT_URI}`;
  },
};

Object.freeze(KAKAO_CONFIG);
