import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import usePostApi from "../../api/usePostApi";
import { setCookie } from "../../hooks/useCookie";

const KakaoCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { mutate, data, isError } = usePostApi(
    "kakaoLogin",
    "/user/auth/oauth/login"
  );

  useEffect(() => {
    const code = searchParams.get("code");

    if (code) {
      mutate({
        code,
        snsType: "KAKAO",
      });
    } else {
      navigate("/kaka-login");
    }
  }, [mutate, searchParams, navigate]);

  useEffect(() => {
    if (data) {
      const { accessToken } = data.data;
      const expires = new Date();
      expires.setDate(expires.getDate() + 1);

      setCookie("accessToken", accessToken, {
        path: "/",
        expires,
        secure: true,
        sameSite: "strict",
      });

      navigate("/home");
    }
  }, [data, navigate]);

  useEffect(() => {
    if (isError) {
      navigate("/kakao-login");
    }
  }, [isError, navigate]);

  return null;
};

export default KakaoCallback;
