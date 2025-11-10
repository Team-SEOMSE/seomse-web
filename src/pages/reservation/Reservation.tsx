import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import ShopList from "../../components/reservation/ShopList";
import Header from "../../layout/header/Header";
import Navbar from "../../layout/navbar/Navbar";
import ReservationConfirmedSheet from "../../components/reservation/ReservationConfirmedSheet";
import styles from "./Reservation.module.css";

const Reservation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSheet, setShowSheet] = useState<boolean>(
    location.state?.confirmed ?? false
  );

  const shopName = location.state?.shopName || "";
  const serviceName = location.state?.serviceName || "";
  const appointmentDate = location.state?.appointmentDate || "";
  const appointmentTime = location.state?.appointmentTime || "";

  const handleCloseSheet = () => {
    setShowSheet(false);
    navigate(location.pathname, { replace: true });
  };

  return (
    <div className={styles.screen}>
      <Header />
      <div className={styles.content}>
        <ShopList />
      </div>
      <Navbar />

      {showSheet && (
        <ReservationConfirmedSheet
          shopName={shopName}
          serviceName={serviceName}
          appointmentDate={appointmentDate}
          appointmentTime={appointmentTime}
          onClose={handleCloseSheet}
        />
      )}
    </div>
  );
};

export default Reservation;
