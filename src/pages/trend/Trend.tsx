import StyleSwiper from "../../components/trend/StyleSwiper";
import Tabs from "../../components/trend/Tabs";
import Header from "../../layout/header/Header";
import Navbar from "../../layout/navbar/Navbar";
import styles from "./Trend.module.css";

const Trend = () => {
    return (
        <div className={styles.screen}>
            <Header />
            <div className={styles.content}>
                <Tabs />
                <StyleSwiper />
            </div>
            <Navbar />
        </div>
    );
};

export default Trend;
