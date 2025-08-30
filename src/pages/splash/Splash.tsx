import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/svg/mainLogo.svg";
import styles from "./Splash.module.css";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/kakao-login");
    }, 2200);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles.screen}>
      <img className={styles.logo} src={Logo} alt="섬세 메인 로고" />
      <p className={styles.corp}>© Seomse corp.</p>
    </div>
  );
};

export default Splash;
