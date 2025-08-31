import { useState } from "react";
import type { ButtonStyles } from "../../../types/common/button";
import Button from "../../common/button/Button";
import InputForm from "../../login/InputForm";
import Logo from "../../../assets/svg/mainLogo.svg";
import styles from "./AdminLoginSection.module.css";

const ACTIVE_STYLE: ButtonStyles = {
  color: "#ffffff",
  fontWeight: 600,
};

const DISABLED_STYLE: ButtonStyles = {
  color: "#787878",
  backgroundColor: "#e6e6e6",
  fontWeight: 600,
};

const AdminLogin = () => {
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [role, setRole] = useState<"shopOwner" | "designer" | null>(
    "shopOwner"
  );
  const buttonElements = { content: "로그인" };
  const isActive = id.trim() !== "" && pw.trim() !== "" && role !== null;

  return (
    <div className={styles.login_section}>
      <img className={styles.logo} src={Logo} alt="섬세 메인 로고" />
      <form className={styles.form}>
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
              checked={role === "shopOwner"}
              onChange={() =>
                setRole(role === "shopOwner" ? null : "shopOwner")
              }
            />
            <span className={styles.custom_checkbox}></span>
            매장점주
          </label>

          <label className={styles.checkbox_label}>
            <input
              type="checkbox"
              checked={role === "designer"}
              onChange={() => setRole(role === "designer" ? null : "designer")}
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

export default AdminLogin;
