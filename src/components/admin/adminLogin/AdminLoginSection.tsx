import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ButtonStyles } from "../../../types/common/button";
import Button from "../../common/button/Button";
import InputForm from "../../login/InputForm";
import Logo from "../../../assets/svg/mainLogo.svg";
import styles from "./AdminLoginSection.module.css";
import usePostApi from "../../../api/usePostApi";
import { AUTH_PATH } from "../../../api/URL";
import { setCookie } from "../../../hooks/useCookie";

interface LoginResponse {
  data: {
    accessToken: string;
  };
}

const ACTIVE_STYLE: ButtonStyles = {
  color: "#ffffff",
  fontWeight: 600,
};

const DISABLED_STYLE: ButtonStyles = {
  color: "#787878",
  backgroundColor: "#e6e6e6",
  fontWeight: 600,
};

const AdminLoginSection = () => {
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [role, setRole] = useState<"OWNER" | "DESIGNER" | null>("OWNER");
  const navigate = useNavigate();
  const { mutate: login } = usePostApi(
    "adminLogin",
    AUTH_PATH + "/login",
    false
  );

  const buttonElements = { content: "로그인" };
  const isActive = id.trim() !== "" && pw.trim() !== "" && role !== null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isActive) return;

    login(
      {
        body: {
          email: id,
          password: pw,
          role: role,
        },
      },
      {
        onSuccess: (data: unknown) => {
          const response = data as LoginResponse;
          if (response?.data?.accessToken) {
            setCookie("accessToken", response.data.accessToken);
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
      <img className={styles.logo} src={Logo} alt="섬세 메인 로고" />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <InputForm
            content="아이디"
            setLoginState={setId}
            placeholder="이메일을 입력해주세요."
            defaultValue={id}
          />
          <InputForm
            content="비밀번호"
            setLoginState={setPw}
            placeholder="비밀번호를 입력해주세요."
            type="password"
          />
        </div>

        <div className={styles.checkbox_group}>
          <label className={styles.checkbox_label}>
            <input
              type="checkbox"
              checked={role === "OWNER"}
              onChange={() => setRole(role === "OWNER" ? null : "OWNER")}
            />
            <span className={styles.custom_checkbox}></span>
            매장점주
          </label>

          <label className={styles.checkbox_label}>
            <input
              type="checkbox"
              checked={role === "DESIGNER"}
              onChange={() => setRole(role === "DESIGNER" ? null : "DESIGNER")}
            />
            <span className={styles.custom_checkbox}></span>
            디자이너
          </label>
        </div>

        <div className={styles.btn_wrapper}>
          <Button
            elements={buttonElements}
            style={isActive ? ACTIVE_STYLE : DISABLED_STYLE}
            disabled={!isActive}
          />
        </div>
      </form>
    </div>
  );
};

export default AdminLoginSection;
