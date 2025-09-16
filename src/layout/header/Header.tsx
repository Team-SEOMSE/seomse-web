import { useNavigate } from "react-router-dom";
import Logo from "../../assets/svg/headerLogo.svg";
// import Search from "../../assets/svg/search.svg";
import styles from "./Header.module.css";

const Header = () => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/home");
    };

    return (
        <header className={styles.header}>
            <img
                className={styles.logo}
                onClick={handleLogoClick}
                src={Logo}
                alt="섬세 메인 로고"
            />
            {/* <img
                className={styles.search_icon}
                src={Search}
                alt="검색 아이콘"
            /> */}
        </header>
    );
};

export default Header;
