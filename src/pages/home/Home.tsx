import SectionTitle from "../../components/common/sectionTitle/SectionTitle";
import Banner from "../../components/home/Banner";
import Bubble from "../../components/home/Bubble";
import Header from "../../layout/header/Header";
import Navbar from "../../layout/navbar/Navbar";
import styles from "./Home.module.css";

const Home = () => {
    return (
        <div className={styles.screen}>
            <Header />
            <Banner />
            <Bubble ageGroup="20대" userName="김섬세" />
            <SectionTitle>AI 개인화 추천</SectionTitle>
            <SectionTitle>우리 동네 인기 헤어샵</SectionTitle>
            <Navbar />
        </div>
    );
};

export default Home;
