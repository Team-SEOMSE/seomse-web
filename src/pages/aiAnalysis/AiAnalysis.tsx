import { useState } from "react";
import ImgUpload from "../../components/aiAnalysis/ImgUpload";
import Header from "../../layout/header/Header";
import Navbar from "../../layout/navbar/Navbar";
import styles from "./AiAnalysis.module.css";

const AiAnalysis = () => {
    const [hideHeader, setHideHeader] = useState(false);

    return (
        <div className={styles.screen}>
            {!hideHeader && <Header />}
            <div className={styles.content}>
                <ImgUpload setHideHeader={setHideHeader} />
            </div>
            <Navbar />
        </div>
    );
};

export default AiAnalysis;
