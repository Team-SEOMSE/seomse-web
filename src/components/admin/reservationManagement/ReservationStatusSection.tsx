import AdminHeader from "../../../components/admin/layout/AdminHeader";
import ReservationList from "../../../components/admin/reservationManagement/ReservationList";
import WeeklyReservationStatus from "../../../components/admin/reservationManagement/WeeklyReservationStatus";
import styles from "./ReservationStatusSection.module.css";

const ReservationStatusSection = () => {
  return (
    <div className={styles.section}>
      <AdminHeader title="예약현황" />

      <div className={styles.content}>
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
    </div>
  );
};

export default ReservationStatusSection;
