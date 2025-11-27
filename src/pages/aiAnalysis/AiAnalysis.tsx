import exampleFace from "../../assets/images/exampleFace.png";
import ImgUpload from "../../components/aiAnalysis/ImgUpload";
import Header from "../../layout/header/Header";
import Navbar from "../../layout/navbar/Navbar";
import styles from "./AiAnalysis.module.css";

const AiAnalysis = () => {
    return (
        <div className={styles.screen}>
            <Header />
            <div className={styles.content}>
                <img
                    className={styles.example_img}
                    src={exampleFace}
                    alt="example face"
                />
                <ImgUpload />
            </div>
            <Navbar />
        </div>
    );
};

export default AiAnalysis;
