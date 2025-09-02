import AdminHeader from "../../components/admin/layout/AdminHeader";
import ReservationList from "../../components/admin/reservationManagement/ReservationList";
import WeeklyReservationStatus from "../../components/admin/reservationManagement/WeeklyReservationStatus";
import styles from "./AdminReservationManagement.module.css";

const AdminReservationManagement = () => {
  return (
    <div className={styles.screen}>
      <AdminHeader title="예약현황" />
      <WeeklyReservationStatus
        reservations={{
          월: 100,
          화: 30,
          수: 70,
          목: 0,
          금: 100,
          토: 50,
          일: 10,
        }}
      />
      <ReservationList />
    </div>
  );
};

export default AdminReservationManagement;
