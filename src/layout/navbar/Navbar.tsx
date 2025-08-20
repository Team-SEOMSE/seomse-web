import { NavLink } from "react-router-dom";
import { ReactComponent as CalendarIcon } from "../../assets/svg/booking.svg";
import { ReactComponent as HeartIcon } from "../../assets/svg/heart.svg";
import { ReactComponent as HomeIcon } from "../../assets/svg/home.svg";
import { ReactComponent as UserIcon } from "../../assets/svg/my.svg";
import { ReactComponent as FireIcon } from "../../assets/svg/trend.svg";
import styles from "./Navbar.module.css";

const TABS = [
    { to: "/home", label: "홈", Icon: HomeIcon },
    { to: "/trend", label: "요즘", Icon: FireIcon },
    { to: "/reservation", label: "예약", Icon: CalendarIcon },
    { to: "/saved-styles", label: "찜", Icon: HeartIcon },
    { to: "/my-page", label: "마이", Icon: UserIcon },
];

const Navbar = () => {
    return (
        <nav className={styles.nav} aria-label="하단 내비게이션">
            <ul className={styles.list}>
                {TABS.map(({ to, label, Icon }) => (
                    <li key={to} className={styles.item}>
                        <NavLink
                            to={to}
                            className={({ isActive }) =>
                                isActive
                                    ? `${styles.link} ${styles.active}`
                                    : styles.link
                            }
                        >
                            <Icon className={styles.icon} aria-hidden="true" />
                            <span className={styles.label}>{label}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
