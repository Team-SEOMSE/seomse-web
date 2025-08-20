import Banner from "../../components/home/Banner";
import Header from "../../layout/header/Header";
import Navbar from "../../layout/navbar/Navbar";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.screen}>
      <Header />
      <Banner />
      <Navbar />
    </div>
  );
};

export default Home;
