import { NavLink } from "react-router-dom";
import { ReactComponent as CalendarIcon } from "../../../assets/svg/booking.svg";
import { ReactComponent as ReviewIcon } from "../../../assets/svg/review.svg";
import styles from "../../../layout/navbar/Navbar.module.css";

const TABS = [
  { to: "/admin/reservations", label: "예약", Icon: CalendarIcon },
  { to: "/trend", label: "리뷰", Icon: ReviewIcon },
];

const AdminNavbar = () => {
  return (
    <nav className={styles.nav} aria-label="하단 내비게이션">
      <ul className={styles.list}>
        {TABS.map(({ to, label, Icon }) => (
          <li key={to} className={styles.item}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
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

export default AdminNavbar;
