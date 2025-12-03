import { useRef } from "react";
import banner1 from "../../assets/images/banner1.webp";
import banner2 from "../../assets/images/banner2.webp";
import banner3 from "../../assets/images/banner3.webp";
import banner4 from "../../assets/images/banner4.webp";
import banner5 from "../../assets/images/banner5.png";
import type { SwiperHandle } from "../common/swiper/Swiper";
import Swiper from "../common/swiper/Swiper";
import styles from "./EventBanner.module.css";

const EventBanner = () => {
    const swiperRef = useRef<SwiperHandle>(null);

    return (
        <div className={styles.banner}>
            <Swiper
                ref={swiperRef}
                items={[
                    { src: banner5, alt: "new feature" },
                    { src: banner4, alt: "mvp banner" },
                    { src: banner3, alt: "event 3" },
                    { src: banner1, alt: "event 1" },
                    { src: banner2, alt: "event 2" },
                ]}
                autoPlayMs={null}
                aspect="auto"
                fit="contain"
                ariaLabel="이벤트 배너"
                showDots
            />
        </div>
    );
};

export default EventBanner;
