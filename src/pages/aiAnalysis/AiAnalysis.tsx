import Header from "../../layout/header/Header";
import Navbar from "../../layout/navbar/Navbar";
import styles from "./AiAnalysis.module.css";

const AiAnalysis = () => {
    return (
        <div className={styles.screen}>
            <Header />
            <div className={styles.content}>
                <p className={styles.notice}>
                    AI 분석 기능을 준비 중입니다.
                    <br /> 곧 업데이트될 예정입니다!
                </p>
            </div>
            <Navbar />
        </div>
    );
};

export default AiAnalysis;
