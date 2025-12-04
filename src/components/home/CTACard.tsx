import { useNavigate } from "react-router-dom";
import faceImg from "../../assets/images/beforeAfter.png";
import designedBg from "../../assets/images/designedBg.png";
import styles from "./CTACard.module.css";

const CTACard = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.card}>
            <img
                className={styles.bg}
                src={designedBg}
                alt="AI 헤어분석 배너"
            />

            <div className={styles.inner}>
                <img
                    className={styles.left_img}
                    src={faceImg}
                    alt="Before After"
                />

                <div className={styles.right_content}>
                    <h2>AI 헤어분석 출시!</h2>
                    <p>
                        AI 얼굴형 분석으로 가장 어울리는 스타일과 컬러를
                        찾아드립니다.
                    </p>

                    <button
                        className={styles.button}
                        onClick={() => navigate("/ai-analysis")}
                    >
                        지금 바로 체험하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CTACard;
