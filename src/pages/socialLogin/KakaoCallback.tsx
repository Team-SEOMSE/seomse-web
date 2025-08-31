import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import usePostApi from "../../api/usePostApi";
import { setCookie } from "../../hooks/useCookie";
import { AUTH_PATH } from "../../api/URL";

const KakaoCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { mutate, data, isError } = usePostApi(
    "kakaoLogin",
    AUTH_PATH + "/oauth/login",
    false
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
      setCookie("accessToken", accessToken);

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
