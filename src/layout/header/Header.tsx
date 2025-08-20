import Search from "../../assets/svg/search.svg";
// 모바일로 로고 화질 확인해볼 것!
import Logo from "../../assets/svg/svgHeader.svg";

import styles from "./Header.module.css";

const Header = () => {
    return (
        <header className={styles.header}>
            <img className={styles.logo} src={Logo} alt="섬세 메인 로고" />
            <img
                className={styles.search_icon}
                src={Search}
                alt="검색 아이콘"
            />
        </header>
    );
};

export default Header;
