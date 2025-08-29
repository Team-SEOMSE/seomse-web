import { ReactComponent as AiRecommend } from "../../assets/svg/aiRecommend.svg";
import { ReactComponent as Best } from "../../assets/svg/best.svg";
import { ReactComponent as Popular } from "../../assets/svg/popular.svg";
import SectionTitle from "../common/sectionTitle/SectionTitle";
import styles from "./HomeContent.module.css";

const HomeContent = () => {
    return (
        <div className={styles.section}>
            <SectionTitle icon={<AiRecommend />}>AI 개인화 추천</SectionTitle>
            <SectionTitle icon={<Best />}>우리 동네 헤어샵 BEST</SectionTitle>
            <SectionTitle icon={<Popular />}>인기 디자이너</SectionTitle>
        </div>
    );
};

export default HomeContent;
