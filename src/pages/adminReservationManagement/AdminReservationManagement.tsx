import ReservationStatusSection from "../../components/admin/reservationManagement/ReservationStatusSection";
import styles from "./AdminReservationManagement.module.css";

const AdminReservationManagement = () => {
  return (
    <div className={styles.screen}>
      <ReservationStatusSection />
    </div>
  );
};

export default AdminReservationManagement;
