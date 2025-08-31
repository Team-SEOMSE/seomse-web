import { useNavigate } from "react-router-dom";
import { ReactComponent as Prev } from "../../../assets/svg/prevArrow.svg";
import styles from "../../../layout/backHeader/BackHeader.module.css";

interface AdminHeaderProps {
  title?: string;
}

const AdminHeader = ({ title }: AdminHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <Prev onClick={() => navigate(-1)} className={styles.prev_icon} />
      {title && <h1 className={styles.title}>{title}</h1>}
    </header>
  );
};

export default AdminHeader;
