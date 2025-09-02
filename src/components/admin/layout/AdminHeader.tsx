import { useNavigate } from "react-router-dom";
import { ReactComponent as Prev } from "../../../assets/svg/prevArrow.svg";
import { ReactComponent as Refresh } from "../../../assets/svg/refresh.svg";
import styles from "../../../layout/backHeader/BackHeader.module.css";

interface AdminHeaderProps {
  title?: string;
}

const AdminHeader = ({ title }: AdminHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className={styles.header} style={{ backgroundColor: "#F8F8F8" }}>
      <Prev onClick={() => navigate(-1)} className={styles.icon} />
      {title && <h1 className={styles.title}>{title}</h1>}
      <Refresh
        onClick={() => window.location.reload()}
        className={styles.icon}
      />
    </header>
  );
};

export default AdminHeader;
