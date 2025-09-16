import { useRef } from "react";
import influencer from "../../assets/images/influencer.png";
import influencer2 from "../../assets/images/influencer2.png";
import influencer3 from "../../assets/images/influencer3.png";
import influencer4 from "../../assets/images/influencer4.png";
import influencer5 from "../../assets/images/influencer5.png";
import influencer6 from "../../assets/images/influencer6.png";
import instaProfile from "../../assets/images/instaProfile.png";
import instaProfile2 from "../../assets/images/instaProfile2.png";
import instaProfile3 from "../../assets/images/instaProfile3.png";
import instaProfile4 from "../../assets/images/instaProfile4.png";
import instaProfile5 from "../../assets/images/instaProfile5.png";
import instaProfile6 from "../../assets/images/instaProfile6.png";
import styling from "../../assets/images/styling.png";
import styling2 from "../../assets/images/styling2.png";
import styling3 from "../../assets/images/styling3.png";
import styling4 from "../../assets/images/styling4.png";
import styling5 from "../../assets/images/styling5.png";
import styling6 from "../../assets/images/styling6.png";
// import Tabs from "./Tabs";
import SectionTitle from "../common/sectionTitle/SectionTitle";
import type { SwiperHandle, SwiperItem } from "../common/swiper/Swiper";
import Swiper from "../common/swiper/Swiper";
import styles from "./StyleSwiper.module.css";

const card = (it: SwiperItem) => (
    <article className={styles.card}>
        <img
            className={styles.cardImg}
            src={it.src}
            alt={it.alt ?? it.title ?? ""}
        />
        <div className={styles.grad} />
        <div className={styles.meta}>
            {it.title && <h3 className={styles.title}>{it.title}</h3>}
            {it.subtitle && <p className={styles.subtitle}>{it.subtitle}</p>}
        </div>
    </article>
);

const influencerCard = (it: SwiperItem) => (
    <article className={styles.influencerCard}>
        <img
            className={styles.influencerImg}
            src={it.src}
            alt={it.alt ?? it.name ?? ""}
        />
        <div className={styles.grad} />
        <div className={styles.infMeta}>
            {it.avatarSrc && (
                <span className={styles.badge}>
                    <img
                        className={styles.badgeImg}
                        src={it.avatarSrc}
                        alt={it.name ?? "avatar"}
                    />
                </span>
            )}
            {it.name && <span className={styles.name}>{it.name}</span>}
        </div>
    </article>
);

const StyleSwiper = () => {
    const ref = useRef<SwiperHandle>(null);

    return (
        <section className={styles.section}>
            {/* <Tabs
                items={[
                    { key: "all", label: "전체" },
                    { key: "hippie", label: "히피펌" },
                    { key: "wave", label: "물결펌" },
                    { key: "c-curl", label: "C컬펌" },
                    { key: "hime", label: "히메컷" },
                    { key: "hush", label: "허쉬컷" },
                    { key: "layered", label: "레이어드컷" },
                ]}
                defaultValue="all"
            /> */}

            <div className={styles.swiper_section}>
                <SectionTitle>요즘 핫한 스타일</SectionTitle>
                <Swiper
                    ref={ref}
                    items={[
                        {
                            src: styling,
                            title: "단발 허쉬컷",
                            subtitle: "가볍고 세련된 무드",
                        },
                        {
                            src: styling2,
                            title: "하이 레이어드 컷",
                            subtitle: "둥근 얼굴을 슬림하게",
                        },
                        {
                            src: styling3,
                            title: "히피펌",
                            subtitle: "볼륨감 있는 스타일",
                        },
                    ]}
                    renderItem={card}
                    aspect="3 / 4"
                    fit="cover"
                    slideWidth={"clamp(220px, 40vw, 300px)"}
                    gap={8}
                    ariaLabel="요즘 스타일 카드 스와이퍼"
                />
                <Swiper
                    ref={ref}
                    items={[
                        {
                            src: styling4,
                            title: "아웃 C컬펌",
                            subtitle: "청순하면서 성숙한 C컬",
                        },
                        {
                            src: styling5,
                            title: "히메컷",
                            subtitle: "핫한 스타일 따라하기",
                        },
                        {
                            src: styling6,
                            title: "물결펌",
                            subtitle: "드라이 없이도 유지",
                        },
                    ]}
                    renderItem={card}
                    aspect="3 / 4"
                    fit="cover"
                    slideWidth={"clamp(220px, 40vw, 300px)"}
                    gap={8}
                    ariaLabel="요즘 스타일 카드 스와이퍼"
                />

                <SectionTitle>요즘 인플루언서</SectionTitle>
                <div className={styles.influencerGrid}>
                    {[
                        {
                            src: influencer,
                            name: "yes_die",
                            avatarSrc: instaProfile,
                        },
                        {
                            src: influencer2,
                            name: "westlife051",
                            avatarSrc: instaProfile2,
                        },
                        {
                            src: influencer3,
                            name: "monsite",
                            avatarSrc: instaProfile3,
                        },
                        {
                            src: influencer4,
                            name: "happy_1293",
                            avatarSrc: instaProfile4,
                        },
                        {
                            src: influencer5,
                            name: "minzizizizi",
                            avatarSrc: instaProfile5,
                        },
                        {
                            src: influencer6,
                            name: "happy_l293",
                            avatarSrc: instaProfile6,
                        },
                    ].map((item, index) => (
                        <div key={index} className={styles.gridItem}>
                            {influencerCard(item)}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StyleSwiper;
