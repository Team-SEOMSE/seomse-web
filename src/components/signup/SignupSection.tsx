import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackHeader from "../../layout/backHeader/BackHeader";
import type { ButtonStyles } from "../../types/common/button";
import Button from "../common/button/Button";
import InputForm from "../login/InputForm";
import styles from "./SignupSection.module.css";

const ACTIVE_STYLE: ButtonStyles = { color: "#ffffff", fontWeight: 600 };
const DISABLED_STYLE: ButtonStyles = {
    color: "#787878",
    backgroundColor: "#e6e6e6",
    fontWeight: 600,
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignupSection = () => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [pw, setPw] = useState("");
    const [confirmPw, setConfirmPw] = useState("");
    const [emailError, setEmailError] = useState<string | null>(null);
    const [pwError] = useState<string | null>(null);
    const [confirmError, setConfirmError] = useState<string | null>(null);
    const navigate = useNavigate();

    const buttonElements = {
        content: "회원가입",
        handleClick: () => {
            navigate("/user-details");
        },
    };

    const handleIdChange = (v: string) => {
        setId(v);
        if (v === "") setEmailError(null);
        else
            setEmailError(
                emailRe.test(v) ? null : "올바른 이메일을 입력해주세요."
            );
    };

    const handlePwChange = (v: string) => {
        setPw(v);
        if (confirmPw) {
            setConfirmError(
                v === confirmPw ? null : "비밀번호가 일치하지 않습니다."
            );
        }
    };

    const handleConfirmChange = (v: string) => {
        setConfirmPw(v);
        if (v === "") setConfirmError(null);
        else setConfirmError(v === pw ? null : "비밀번호가 일치하지 않습니다.");
    };

    const isActive =
        id.trim() !== "" &&
        name.trim() !== "" &&
        pw.trim() !== "" &&
        confirmPw.trim() !== "" &&
        !emailError &&
        !pwError &&
        !confirmError;

    return (
        <div className={styles.signup_section}>
            <BackHeader title="회원가입" />
            <form className={styles.form}>
                <div className={styles.fields}>
                    <InputForm
                        content="아이디"
                        setLoginState={handleIdChange}
                        placeholder="seomse@gmail.com"
                        defaultValue={id}
                        required
                        hasError={!!emailError}
                        alertMessage={emailError ?? undefined}
                    />
                    <InputForm
                        content="이름"
                        setLoginState={setName}
                        placeholder="김섬세"
                        defaultValue={name}
                        required
                    />
                    <InputForm
                        content="비밀번호"
                        setLoginState={handlePwChange}
                        placeholder="••••••••••"
                        type="password"
                        required
                        hasError={!!pwError}
                        alertMessage={pwError ?? undefined}
                    />
                    <InputForm
                        content="비밀번호 확인"
                        setLoginState={handleConfirmChange}
                        placeholder="••••••••••"
                        type="password"
                        required
                        hasError={!!confirmError}
                        alertMessage={confirmError ?? undefined}
                    />
                </div>

                <div className={styles.button_wrapper}>
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

export default SignupSection;
