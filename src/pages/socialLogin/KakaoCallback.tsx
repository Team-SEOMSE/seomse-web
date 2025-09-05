import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import usePostApi from "../../api/usePostApi";
import { setCookie } from "../../hooks/useCookie";
import { AUTH_PATH } from "../../api/URL";

interface KakaoLoginResponse {
  data: {
    accessToken: string;
    isNew: boolean;
  };
}

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
        body: {
          code,
          snsType: "KAKAO",
        }
      });
    } else {
      navigate("/kaka-login");
    }
  }, [mutate, searchParams, navigate]);

  useEffect(() => {
    if (data) {
      const response = data as KakaoLoginResponse;
      const { accessToken, isNew } = response.data;
      setCookie("accessToken", accessToken);

      if (isNew) {
        navigate("/user-details");
      } else {
        navigate("/home");
      }
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
