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
        <Tabs
          items={[
            { key: "all", label: "전체" },
            { key: "short", label: "단발" },
            { key: "long", label: "긴머리" },
            { key: "wave", label: "웨이브" },
            { key: "layer", label: "레이어드컷" },
          ]}
          defaultValue="all"
        />

        <StyleSwiper />
      </div>
      <Navbar />
    </div>
  );
};

export default Trend;
