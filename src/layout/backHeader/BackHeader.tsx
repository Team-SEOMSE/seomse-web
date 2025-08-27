import { useNavigate } from "react-router-dom";
import { ReactComponent as Prev } from "../../assets/svg/prevArrow.svg";
import styles from "./BackHeader.module.css";

interface BackHeaderProps {
    title?: string;
}

const BackHeader = ({ title }: BackHeaderProps) => {
    const navigate = useNavigate();

    return (
        <header className={styles.header}>
            <Prev onClick={() => navigate(-1)} className={styles.prev_icon} />
            {title && <h1 className={styles.title}>{title}</h1>}
        </header>
    );
};

export default BackHeader;
