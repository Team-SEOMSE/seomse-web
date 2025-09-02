import exampleShop from "../../assets/images/exampleShop.png";
import sample1 from "../../assets/images/homeStyling.png";
import shopImg from "../../assets/images/shopImg.png";
import sample from "../../assets/images/trend.png";
import sample2 from "../../assets/images/trend2.png";
import { ReactComponent as AiRecommend } from "../../assets/svg/aiRecommend.svg";
import { ReactComponent as Best } from "../../assets/svg/best.svg";
import { ReactComponent as Popular } from "../../assets/svg/popular.svg";
import SectionTitle from "../common/sectionTitle/SectionTitle";
import Swiper, { SwiperItem } from "../common/swiper/Swiper";
import styles from "./HomeContent.module.css";

const recommendItems: SwiperItem[] = [
  { src: sample, title: "볼륨매직", alt: "볼륨매직" },
  { src: sample2, title: "긴생머리", alt: "긴생머리" },
  { src: sample, title: "단발C컬", alt: "단발C컬" },
  { src: sample2, title: "단발C컬", alt: "단발C컬" },
  { src: sample, title: "단발C컬", alt: "단발C컬" },
];

const shopBestItems: SwiperItem[] = [
  {
    src: shopImg,
    title: "준오헤어샵",
    subtitle: "첫방문 할인 진행",
    alt: "선호도 70",
  },
  {
    src: sample1,
    title: "오디헤어",
    subtitle: "볼륨매직 강점",
    alt: "선호도 80",
  },
];

const designerItems: SwiperItem[] = [
  {
    src: exampleShop,
    avatarSrc: sample1,
    alt: "압구정점",
    title: "안나스토리 헤어샵",
    name: "차은우 디자이너",
    subtitle: "#남성 픽 #펌 전문",
  },
  {
    src: exampleShop,
    avatarSrc: sample,
    alt: "노원점",
    title: "준오 헤어샵",
    name: "김수진 디자이너",
    subtitle: "#커트전문가",
  },
];

const HomeContent = () => {
  return (
    <div className={styles.section}>
      <SectionTitle icon={<AiRecommend />}>AI 개인화 추천</SectionTitle>
      <Swiper
        items={recommendItems}
        aspect="auto"
        slideWidth="50%"
        gap={8}
        renderItem={(it) => (
          <div
            className={`${styles.cardFill} ${styles["cardFill--recommend"]}`}
          >
            <img className={styles.cardImg} src={it.src} alt={it.alt} />
            <span className={styles.recBadge}>#{it.title}</span>
          </div>
        )}
      />

      <div className={styles.gap_box}>
        <SectionTitle icon={<Best />}>우리 동네 헤어샵 BEST</SectionTitle>
        <Swiper
          items={shopBestItems}
          aspect="auto"
          slideWidth="70%"
          gap={8}
          renderItem={(it) => (
            <div className={styles.shopCard}>
              <div className={styles.shopMedia}>
                <img className={styles.shopImg} src={it.src} alt={it.title} />
              </div>
              <div className={styles.shopInfoBelow}>
                <span className={styles.pref}>
                  선호도 {it.alt?.replace(/\D/g, "")}%
                </span>
                <div className={styles.title}>{it.title}</div>
                <div className={styles.sub}>{it.subtitle}</div>
              </div>
            </div>
          )}
        />
      </div>

      <div className={styles.gap_box}>
        <SectionTitle icon={<Popular />}>인기 디자이너</SectionTitle>
        <Swiper
          items={designerItems}
          aspect="auto"
          slideWidth="70%"
          gap={8}
          renderItem={(it) => (
            <div className={styles.designerCard}>
              <div className={styles.designerMedia}>
                <img
                  className={styles.designerImg}
                  src={it.src}
                  alt={it.title}
                />

                <div className={styles.designerTop}>
                  <div className={styles.branch}>{it.alt}</div>
                  <div className={styles.shopName}>{it.title}</div>
                </div>

                <div className={styles.designerBubble}>
                  <img
                    className={styles.avatar}
                    src={it.avatarSrc ?? it.src}
                    alt=""
                  />
                  <div className={styles.bubbleText}>
                    <div className={styles.designerName}>{it.name}</div>
                    <div className={styles.designerTags}>{it.subtitle}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default HomeContent;
