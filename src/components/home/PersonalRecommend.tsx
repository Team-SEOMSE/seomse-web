import styling from "../../assets/images/homeStyling.png";
import styling2 from "../../assets/images/homeStyling2.png";
import SectionTitle from "../common/sectionTitle/SectionTitle";

import styles from "./PersonalRecommend.module.css";

const PersonalRecommend = () => {
    return (
        <div className={styles.recommend_section}>
            <SectionTitle>AI 개인화 추천</SectionTitle>

            <div className={styles.styling_container}>
                <img className={styles.styling} src={styling} />
                <img className={styles.styling} src={styling2} />
            </div>
        </div>
    );
};

export default PersonalRecommend;
