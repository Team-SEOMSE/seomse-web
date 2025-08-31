import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BackHeader from "../../layout/backHeader/BackHeader";
import type { ButtonStyles } from "../../types/common/button";
import Button from "../common/button/Button";
import InputForm from "../login/InputForm";
import styles from "./EmailLoginSection.module.css";
import usePostApi from "../../api/usePostApi";
import { AUTH_PATH } from "../../api/URL";
import { setCookie } from "../../hooks/useCookie";

const ACTIVE_STYLE: ButtonStyles = {
  color: "#ffffff",
  fontWeight: 600,
};

const DISABLED_STYLE: ButtonStyles = {
  color: "#787878",
  backgroundColor: "#e6e6e6",
  fontWeight: 600,
};

const EmailLoginSection = () => {
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const emailFromUrl = searchParams.get("email");
    if (emailFromUrl) {
      setId(emailFromUrl);
    }
  }, [searchParams]);

  const { mutate: login } = usePostApi("login", AUTH_PATH + "/login", false);

  const buttonElements = { content: "로그인" };
  const isActive = id.trim() !== "" && pw.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!isActive) return;

    login(
      {
        email: id,
        password: pw,
        role: "CLIENT",
      },
      {
        onSuccess: (data) => {
          const expires = new Date();
          expires.setDate(expires.getDate() + 1);

          if (data?.data?.accessToken) {
            setCookie("accessToken", data.data.accessToken);
            navigate("/home");
          }
        },
        onError: () => {
          alert("아이디 또는 비밀번호를 확인해주세요.");
        },
      }
    );
  };

  return (
    <div className={styles.login_section}>
      <BackHeader title="로그인" />
      <p className={styles.guide_text}>
        Seomse에 로그인하고, <br />
        간편하게 헤어 예약하세요!
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <InputForm
            content="아이디"
            setLoginState={setId}
            placeholder="seomse@gmail.com"
            defaultValue={id}
            hasError={!!errorMessage}
          />
          <InputForm
            content="비밀번호"
            setLoginState={setPw}
            placeholder="••••••••••"
            type="password"
            hasError={!!errorMessage}
          />
        </div>

        <Button
          elements={buttonElements}
          style={isActive ? ACTIVE_STYLE : DISABLED_STYLE}
          disabled={!isActive}
        />
      </form>

      <p className={styles.signup_text}>
        아직 가입하지 않으셨나요?
        <span className={styles.to_signup} onClick={() => navigate("/signup")}>
          회원가입
        </span>
      </p>
    </div>
  );
};

export default EmailLoginSection;
