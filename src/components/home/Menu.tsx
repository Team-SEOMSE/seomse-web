import iconDesigner from "../../assets/svg/designer.svg";
import iconEvent from "../../assets/svg/events.svg";
import iconShop from "../../assets/svg/hairshop.svg";
import iconOpen from "../../assets/svg/open.svg";
import iconReserve from "../../assets/svg/reservation.svg";
import styles from "./Menu.module.css";

type MenuItem = { label: string; icon: string; to?: string };

const ITEMS: MenuItem[] = [
    { label: "예약", icon: iconReserve, to: "/reserve" },
    { label: "헤어샵", icon: iconShop, to: "/shops" },
    { label: "디자이너", icon: iconDesigner, to: "/designers" },
    { label: "이벤트", icon: iconEvent, to: "/events" },
    { label: "새로오픈", icon: iconOpen, to: "/new" },
];

const Menu = () => {
    return (
        <div className={styles.menu}>
            {ITEMS.map(({ label, icon }) => (
                <div
                    key={label}
                    className={styles.item}
                    // onClick={() => to && navigate(to)}
                >
                    <img className={styles.icon} src={icon} alt={label} />
                    <span className={styles.label}>{label}</span>
                </div>
            ))}
        </div>
    );
};

export default Menu;
