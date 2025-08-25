import Logo from "../../assets/images/mainLogo.png";
import { ReactComponent as KakaoIcon } from "../../assets/svg/kakao.svg";
import Button from "../../components/common/button/Button";
import type { ButtonElements, ButtonStyles } from "../../types/common/button";
import styles from "./LoginSection.module.css";

const STYLE: ButtonStyles = {
    width: 300,
    borderRadius: 112,
    color: "#000000",
    backgroundColor: "#fee500",
};

const LoginSection = () => {
    const buttonElements: ButtonElements = { content: "카카오로 로그인" };

    return (
        <div className={styles.login_section}>
            <img className={styles.logo} src={Logo} alt="섬세 메인 로고" />
            <div className={styles.login_box}>
                <Button
                    elements={buttonElements}
                    style={STYLE}
                    icon={<KakaoIcon />}
                />
                <div className={styles.text_wrapper}>
                    <p className={styles.text}>이메일로 로그인</p>|
                    <p className={styles.text}> 이메일로 회원가입</p>
                </div>
            </div>
        </div>
    );
};

export default LoginSection;
