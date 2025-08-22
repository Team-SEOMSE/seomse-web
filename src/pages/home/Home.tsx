import Banner from "../../components/home/Banner";
import Bubble from "../../components/home/Bubble";
import NearbyShops from "../../components/home/NearbyShops";
import PersonalRecommend from "../../components/home/PersonalRecommend";
import Header from "../../layout/header/Header";
import Navbar from "../../layout/navbar/Navbar";
import styles from "./Home.module.css";

const Home = () => {
    return (
        <div className={styles.screen}>
            <Header />
            <Banner />
            <Bubble ageGroup="20대" userName="김섬세" />
            <PersonalRecommend />
            <NearbyShops />
            <Navbar />
        </div>
    );
};

export default Home;
