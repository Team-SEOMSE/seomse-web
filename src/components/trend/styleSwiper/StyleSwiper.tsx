import { useRef } from "react";
import styling from "../../../assets/images/homeStyling.png";
import styling2 from "../../../assets/images/homeStyling2.png";
import trend1 from "../../../assets/images/trend.png";
import trend2 from "../../../assets/images/trend2.png";
import SectionTitle from "../../common/sectionTitle/SectionTitle";
import type { SwiperHandle } from "../../common/swiper/Swiper";
import Swiper from "../../common/swiper/Swiper";
import styles from "./StyleSwiper.module.css";

const StyleSwiper = () => {
    const ref = useRef<SwiperHandle>(null);

    return (
        <section className={styles.swiper_section}>
            <h1 className={styles.title}>K-뷰티 트렌드 따라잡기</h1>
            <SectionTitle>요즘 연예인이 픽한 스타일</SectionTitle>
            <Swiper
                ref={ref}
                items={[
                    {
                        src: trend1,
                        title: "체리레드 염색 🍒",
                        subtitle: "엔믹스 해원",
                    },
                    {
                        src: trend2,
                        title: "하이레이어드 컷 열풍",
                        subtitle: "제니",
                    },
                    {
                        src: trend1,
                        title: "댄디 컷",
                        subtitle: "남성 인기",
                    },
                ]}
                aspect="3 / 4"
                showDots
                showProgress
            />

            <SectionTitle>요즘 가장 인기있는 K-뷰티 스타일</SectionTitle>
            <Swiper
                ref={ref}
                items={[
                    {
                        src: styling,
                        title: "2025 팬톤컬러 모카무스",
                        subtitle: "자연스러운 브라운 염색",
                    },
                    {
                        src: styling2,
                        title: "꾸준히 사랑받는! 히피펌",
                        subtitle: "제니",
                    },
                    {
                        src: styling2,
                        title: "댄디 컷",
                        subtitle: "남성 인기",
                    },
                ]}
                aspect="3 / 4"
                showDots
                showProgress
            />
        </section>
    );
};

export default StyleSwiper;
