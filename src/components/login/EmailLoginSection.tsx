import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Prev } from "../../assets/svg/prevArrow.svg";
import type { ButtonElements, ButtonStyles } from "../../types/common/button";
import Button from "../common/button/Button";
import InputForm from "../login/InputForm";
import styles from "./EmailLoginSection.module.css";

const ACTIVE_STYLE: ButtonStyles = {
    borderRadius: 112,
    color: "#ffffff",
};

const DISABLED_STYLE: ButtonStyles = {
    borderRadius: 112,
    color: "#787878",
    backgroundColor: "#e6e6e6",
};

const EmailLoginSection = () => {
    const [id, setId] = useState<string>("");
    const [pw, setPw] = useState<string>("");
    const buttonElements: ButtonElements = { content: "로그인" };
    const navigate = useNavigate();

    const isActive = id.trim() !== "" && pw.trim() !== "";

    return (
        <div className={styles.login_section}>
            <div className={styles.header}>
                <Prev onClick={() => navigate(-1)} />
                <h1 className={styles.title}>로그인</h1>
            </div>

            <p className={styles.guide_text}>
                Seomse에 로그인하고, <br />
                간편하게 헤어 예약하세요!
            </p>

            <form className={styles.form}>
                <div>
                    <InputForm
                        content="아이디"
                        setLoginState={setId}
                        placeholder="seomse@gmail.com"
                        defaultValue={id}
                    />
                    <InputForm
                        content="비밀번호"
                        setLoginState={setPw}
                        placeholder="••••••••••"
                        type="password"
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
                <span
                    className={styles.to_signup}
                    onClick={() => navigate("/signup")}
                >
                    회원가입
                </span>
            </p>
        </div>
    );
};

export default EmailLoginSection;
