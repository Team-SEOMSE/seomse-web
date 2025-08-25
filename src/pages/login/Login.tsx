import LoginSection from "../../components/login/LoginSection";
import styles from "./Login.module.css";

const Login = () => {
    return (
        <div className={styles.login_page}>
            <LoginSection />
        </div>
    );
};

export default Login;
