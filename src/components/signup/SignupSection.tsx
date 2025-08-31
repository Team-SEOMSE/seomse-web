import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_PATH } from "../../api/URL";
import useGetApi from "../../api/useGetApi"; // Get 훅 임포트
import usePostApi from "../../api/usePostApi"; // Post 훅 임포트
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

const DUPCHECK_STYLE: ButtonStyles = {
  backgroundColor: "#353535",
  fontSize: 14,
  fontWeight: 500,
  color: "#ffffff",
  width: 120,
  height: 40,
  borderRadius: 12,
};
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignupSection = () => {
  const [id, setId] = useState(""); // 이메일(아이디)
  const [name, setName] = useState("");
  const [pw, setPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const [emailError, setEmailError] = useState<string | null>(null);
  const [pwError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const navigate = useNavigate();

  const { refetch: checkEmailDuplicate } = useGetApi(
    "emailDuplicateCheck",
    `${AUTH_PATH}/check?email=${id}&role=CLIENT`,
    false,
    { enabled: false }
  );

  const { mutate: signup } = usePostApi("signup", `${AUTH_PATH}/signup`, false);

  const handleCheckDuplicate = async () => {
    if (!id || !!emailError) {
      alert("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    try {
      const { data, isError, error } = await checkEmailDuplicate();

      if (isError) {
        throw error;
      }

      if (data.data.duplicate) {
        setEmailError("이미 사용 중인 이메일입니다.");
        setIsEmailChecked(false);
      } else {
        alert("사용 가능한 이메일입니다.");
        setEmailError(null);
        setIsEmailChecked(true);
      }
    } catch (err: any) {
      alert(err.message || "이메일 확인 중 오류가 발생했습니다.");
      setIsEmailChecked(false);
    }
  };

  const handleSignup = () => {
    if (!isActive) return;

    const signupData = {
      email: id,
      password: pw,
      name: name,
      snsType: "NORMAL",
      role: "CLIENT",
    };

    signup(signupData, {
      onSuccess: () => {
        alert("회원가입이 성공적으로 완료되었습니다.");
        navigate(`/email-login?email=${encodeURIComponent(signupData.email)}`);
      },
      onError: (error) => {
        alert(error.message || "회원가입에 실패했습니다.");
      },
    });
  };

  const handleIdChange = (v: string) => {
    setId(v);
    setIsEmailChecked(false);
    if (v === "") setEmailError(null);
    else
      setEmailError(emailRe.test(v) ? null : "올바른 이메일을 입력해주세요.");
  };

  const handlePwChange = (v: string) => {
    setPw(v);
    if (confirmPw) {
      setConfirmError(v === confirmPw ? null : "비밀번호가 일치하지 않습니다.");
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
    !confirmError &&
    isEmailChecked;

  const buttonElements = { content: "회원가입", handleClick: handleSignup };
  const checkButtonElements = {
    content: "중복 확인",
    handleClick: handleCheckDuplicate,
  };

  return (
    <div className={styles.signup_section}>
      <BackHeader title="회원가입" />
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.fields}>
          <div className={styles.field_group}>
            <InputForm
              content="아이디"
              setLoginState={handleIdChange}
              placeholder="seomse@gmail.com"
              defaultValue={id}
              required
              hasError={!!emailError}
              alertMessage={emailError ?? undefined}
            />
            <div className={styles.dup_btn}>
              <Button elements={checkButtonElements} style={DUPCHECK_STYLE} />
            </div>
          </div>

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
