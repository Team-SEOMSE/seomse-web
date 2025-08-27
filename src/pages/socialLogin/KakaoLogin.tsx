import KakaoLoginSection from "../../components/login/KakaoLoginSection";
import styles from "./KakaoLogin.module.css";

const KakaoLogin = () => {
    return (
        <div className={styles.login_page}>
            <KakaoLoginSection />
        </div>
    );
};

export default KakaoLogin;
