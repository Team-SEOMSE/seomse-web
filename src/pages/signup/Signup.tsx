import SignupSection from "../../components/signup/SignupSection";
import styles from "./Signup.module.css";

const Signup = () => {
    return (
        <div className={styles.signup_page}>
            <SignupSection />
        </div>
    );
};

export default Signup;
