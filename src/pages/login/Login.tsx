import styles from "./Login.module.css";

const Login = () => {
  return (
    <div>
      <h1 className={styles.login_title}>로그인</h1>
      <p className="kakao_login">3초 카카오 로그인</p>
      <p className="normal_login">일반 로그인 | 일반 회원가입</p>
    </div>
  );
};

export default Login;
