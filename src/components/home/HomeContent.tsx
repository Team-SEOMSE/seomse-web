import bestShop from "../../assets/images/bestShop.png";
import bestShop1 from "../../assets/images/bestShop1.png";
import bestShop2 from "../../assets/images/bestShop2.png";
import bestShop3 from "../../assets/images/bestShop3.png";
import popular1 from "../../assets/images/popular1.png";
import popular2 from "../../assets/images/popular2.png";
import popular3 from "../../assets/images/popular3.png";
import profile from "../../assets/images/profile.png";
import profile2 from "../../assets/images/profile2.png";
import profile3 from "../../assets/images/profile3.png";
import recommend1 from "../../assets/images/recommend.png";
import recommend2 from "../../assets/images/recommend2.png";
import recommend3 from "../../assets/images/recommend3.png";
import { ReactComponent as AiRecommend } from "../../assets/svg/aiRecommend.svg";
import { ReactComponent as Best } from "../../assets/svg/best.svg";
import { ReactComponent as Popular } from "../../assets/svg/popular.svg";
import { CLIENT_PATH } from "../../api/URL";
import useGetApi from "../../api/useGetApi";
import SectionTitle from "../common/sectionTitle/SectionTitle";
import Swiper, { SwiperItem } from "../common/swiper/Swiper";
import styles from "./HomeContent.module.css";

const recommendItems: SwiperItem[] = [
  { src: recommend1, title: "옴브레 염색", alt: "옴브레 염색" },
  { src: recommend2, title: "히피펌", alt: "히피펌" },
  { src: recommend3, title: "볼륨매직", alt: "볼륨매직" },
];

const shopBestItems: SwiperItem[] = [
  {
    src: bestShop,
    title: "헤어 더웬디",
    subtitle: "첫방문 30% 할인",
    alt: "선호도 70",
  },
  {
    src: bestShop1,
    title: "라비드 헤어",
    subtitle: "헤어 컨설팅 전문",
    alt: "선호도 80",
  },
  {
    src: bestShop3,
    title: "맨즈호야",
    subtitle: "남자머리 전문",
    alt: "선호도 90",
  },
  {
    src: bestShop2,
    title: "헤어커커 가산점",
    subtitle: "볼륨매직 강점",
    alt: "선호도 75",
  },
];

const designerItems: SwiperItem[] = [
  {
    src: popular1,
    avatarSrc: profile,
    alt: "압구정점",
    title: "안나스토리 헤어샵",
    name: "이창섭 디자이너",
    subtitle: "#남성 픽 #펌 전문",
  },
  {
    src: popular2,
    avatarSrc: profile2,
    alt: "노원점",
    title: "준오 헤어샵",
    name: "고채아 수석 디자이너",
    subtitle: "#커트전문가 #로레알",
  },
  {
    src: popular3,
    avatarSrc: profile3,
    alt: "강남점",
    title: "현헤어 살롱",
    name: "체리 디자이너",
    subtitle: "#시술 맛집 #가성비",
  },
];

const HomeContent = () => {
  const { data } = useGetApi("personal-recommend", `${CLIENT_PATH}/me`);

  const translateRecommendationText = (age: string, gender: string) => {
    const ageMap: { [key: string]: string } = {
      TEENS: "10대",
      TWENTIES: "20대",
      THIRTIES: "30대",
      FORTIES: "40대",
      FIFTIES: "50대",
      SIXTY_PLUS: "60대 이상",
    };
    const genderMap: { [key: string]: string } = {
      MALE: "남성",
      FEMALE: "여성",
    };

    return `${ageMap[age]} ${genderMap[gender]}을 위한 추천`;
  };

  return (
    <div className={styles.section}>
      <SectionTitle
        icon={<AiRecommend />}
        sideSlot={
          data && (
            <div className={styles.recInfo}>
              {translateRecommendationText(data.data.age, data.data.gender)}
            </div>
          )
        }
      >
        AI 개인화 추천
      </SectionTitle>
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
