import { useEffect, useRef } from "react";
import banner1 from "../../assets/images/banner1.png";
import banner2 from "../../assets/images/banner2.png";
import banner3 from "../../assets/images/banner3.png";
import type { SwiperHandle } from "../common/swiper/Swiper";
import Swiper from "../common/swiper/Swiper";
import styles from "./EventBanner.module.css";

const EventBanner = () => {
    const swiperRef = useRef<SwiperHandle>(null);

    const items = [
        { src: banner1, alt: "event 1" },
        { src: banner2, alt: "event 2" },
        { src: banner3, alt: "event 3" },
    ];

    useEffect(() => {
        const tick = () => {
            const h = swiperRef.current;
            if (!h) return;
            const idx = h.getIndex();
            const last = items.length - 1;

            if (idx >= last) {
                // 마지막 → 첫 번째는 애니메이션 없이 순간 이동
                h.scrollTo(0, { behavior: "auto" });
            } else {
                // 나머지는 부드럽게
                h.scrollTo(idx + 1);
            }
        };

        const id = setInterval(tick, 3000);
        return () => clearInterval(id);
    }, [items.length]);

    return (
        <div className={styles.banner}>
            <Swiper
                items={[
                    { src: banner1, alt: "event 1" },
                    { src: banner2, alt: "event 2" },
                    { src: banner3, alt: "event 3" },
                ]}
                loop
                autoPlayMs={3000}
                aspect="auto"
                fit="contain"
                ariaLabel="이벤트 배너"
            />
        </div>
    );
};

export default EventBanner;
