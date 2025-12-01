import ImgUpload from "../../components/aiAnalysis/ImgUpload";
import Header from "../../layout/header/Header";
import Navbar from "../../layout/navbar/Navbar";
import styles from "./AiAnalysis.module.css";

const AiAnalysis = () => {
    return (
        <div className={styles.screen}>
            <Header />
            <div className={styles.content}>
                <ImgUpload />
            </div>
            <Navbar />
        </div>
    );
};

export default AiAnalysis;
