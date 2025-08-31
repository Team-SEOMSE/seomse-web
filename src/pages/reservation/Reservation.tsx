import ShopList from "../../components/reservation/ShopList";
import Header from "../../layout/header/Header";
import Navbar from "../../layout/navbar/Navbar";
import styles from "./Reservation.module.css";

const Reservation = () => {
  return (
    <div className={styles.screen}>
      <Header />
      <div className={styles.content}>
        <ShopList />
      </div>
      <Navbar />
    </div>
  );
};

export default Reservation;
