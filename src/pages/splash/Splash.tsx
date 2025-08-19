import Logo from "../../assets/images/mainLogo.png";

import styles from "./Splash.module.css";

const Splash = () => {
    return (
        <div className={styles.screen}>
            <img className={styles.logo} src={Logo} alt="섬세 메인 로고" />
            <p className={styles.corp}>© Seomse corp.</p>
        </div>
    );
};

export default Splash;
