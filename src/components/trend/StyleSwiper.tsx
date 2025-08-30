import { useRef } from "react";
import styling from "../../assets/images/homeStyling.png";
import styling2 from "../../assets/images/homeStyling2.png";
import trend1 from "../../assets/images/trend.png";
import trend2 from "../../assets/images/trend2.png";
import SectionTitle from "../common/sectionTitle/SectionTitle";
import type { SwiperHandle, SwiperItem } from "../common/swiper/Swiper";
import Swiper from "../common/swiper/Swiper";
import Tabs from "./Tabs";
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
  <article className={styles.card}>
    <img
      className={styles.cardImg}
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
      <Tabs
        items={[
          { key: "all", label: "전체" },
          { key: "short", label: "단발" },
          { key: "long", label: "긴머리" },
          { key: "wave", label: "웨이브" },
          { key: "layer", label: "레이어드컷" },
        ]}
        defaultValue="all"
      />
      <div className={styles.swiper_section}>
        <SectionTitle>요즘 연예인</SectionTitle>
        <Swiper
          ref={ref}
          items={[
            { src: trend1, title: "에스파 윈터", subtitle: "단발 허쉬컷" },
            { src: trend2, title: "수지", subtitle: "하이 레이어드 컷" },
            { src: trend1, title: "정유미", subtitle: "아웃 C컬펌" },
            { src: trend2, title: "뉴진스 민지", subtitle: "히메컷" },
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
            { src: trend1, title: "에스파 윈터", subtitle: "단발 허쉬컷" },
            { src: trend2, title: "수지", subtitle: "하이 레이어드 컷" },
            { src: trend1, title: "정유미", subtitle: "아웃 C컬펌" },
            { src: trend2, title: "뉴진스 민지", subtitle: "히메컷" },
          ]}
          renderItem={card}
          aspect="3 / 4"
          fit="cover"
          slideWidth={"clamp(220px, 40vw, 300px)"}
          gap={8}
          ariaLabel="요즘 스타일 카드 스와이퍼"
        />

        <SectionTitle>요즘 인플루언서</SectionTitle>
        <Swiper
          ref={ref}
          items={[
            { src: styling, name: "yes_die", avatarSrc: styling2 },
            { src: styling2, name: "hair_jelly", avatarSrc: styling },
            { src: styling2, name: "cut_studio", avatarSrc: styling2 },
          ]}
          renderItem={influencerCard}
          aspect="3 / 4"
          fit="cover"
          slideWidth={"clamp(220px, 40vw, 300px)"}
          gap={16}
          ariaLabel="인플루언서 스타일"
        />
        <Swiper
          ref={ref}
          items={[
            { src: styling2, name: "perm_daily", avatarSrc: styling },
            { src: styling, name: "brown_mocha", avatarSrc: styling2 },
            { src: styling2, name: "layer_cut", avatarSrc: styling },
          ]}
          renderItem={influencerCard}
          aspect="3 / 4"
          fit="cover"
          slideWidth={"clamp(220px, 40vw, 300px)"}
          gap={16}
          ariaLabel="인플루언서 스타일"
        />
      </div>
    </section>
  );
};

export default StyleSwiper;
