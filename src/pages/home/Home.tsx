import EventBanner from "../../components/home/EventBanner";
import HomeContent from "../../components/home/HomeContent";
import Menu from "../../components/home/Menu";
import Header from "../../layout/header/Header";
import Navbar from "../../layout/navbar/Navbar";
import styles from "./Home.module.css";

const Home = () => {
    return (
        <div className={styles.screen}>
            <Header />
            <div className={styles.content}>
                <EventBanner />
                <Menu />
                <div className={styles.devider}></div>
                <HomeContent />
            </div>
            <Navbar />
        </div>
    );
};

export default Home;
