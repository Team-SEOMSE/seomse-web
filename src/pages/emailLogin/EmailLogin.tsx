import EmailLoginSection from "../../components/login/EmailLoginSection";
import styles from "./EmailLogin.module.css";

const EmailLogin = () => {
    return (
        <div className={styles.screen}>
            <EmailLoginSection />
        </div>
    );
};

export default EmailLogin;
