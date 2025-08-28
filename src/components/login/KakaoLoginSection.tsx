import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/mainLogo.png";
import { ReactComponent as KakaoIcon } from "../../assets/svg/kakao.svg";
import type { ButtonElements, ButtonStyles } from "../../types/common/button";
import Button from "../common/button/Button";
import styles from "./KakaoLoginSection.module.css";

const STYLE: ButtonStyles = {
    color: "#000000",
    backgroundColor: "#fee500",
};

const KakaoLoginSection = () => {
    const navigate = useNavigate();
    const buttonElements: ButtonElements = {
        content: "카카오로 로그인",
        handleClick: () => {
            // 카카오 로그인 개발 전 임시로 페이지 이동
            navigate("/user-details");
        },
    };

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
                    <p
                        className={styles.text}
                        onClick={() => navigate("/email-login")}
                    >
                        이메일로 로그인
                    </p>
                    |
                    <p
                        className={styles.text}
                        onClick={() => navigate("/signup")}
                    >
                        이메일로 회원가입
                    </p>
                </div>
            </div>
        </div>
    );
};

export default KakaoLoginSection;
