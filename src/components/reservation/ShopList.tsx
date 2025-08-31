import { useState } from "react";
import SectionTitle from "../common/sectionTitle/SectionTitle";
import Swiper, { SwiperItem } from "../common/swiper/Swiper";
import Tabs from "../trend/Tabs";
import shopImg from "../../assets/images/shopImg.png";
import { ReactComponent as Tag } from "../../assets/svg/tagIcon.svg";
import BottomSheet from "./BottomSheet";
import ReservationConfirmedSheet from "./ReservationConfirmedSheet";
import styles from "./ShopList.module.css";

interface ShopItem extends SwiperItem {
  isBest?: boolean;
  isOpen?: boolean;
  time?: string;
  shopInfo?: string[];
  details?: string;
  serviceName?: string;
}

const shopBestItems: ShopItem[] = [
  {
    src: shopImg,
    title: "준오헤어샵 압구정점",
    serviceName: "볼륨매직",
    subtitle: "압구정 2번 출구에서 도보 200m 직진...",
    isBest: true,
    isOpen: true,
    time: "10:00 - 22:00",
    shopInfo: [
      "* 9/20~27일 워크샵 일정으로 휴가입니다.",
      "* 시간에 늦을 경우 미리 30분 전에 알려주세요.",
    ],
    details: "임시 매장 상세 설명이 들어갑니다.",
  },
  {
    src: shopImg,
    title: "유이프",
    serviceName: "모카무스 염색",
    subtitle: "자체 볼륨 브러시 개발",
    isBest: false,
    isOpen: false,
    time: "11:00 - 21:00",
    shopInfo: ["프라이빗 살롱", "* 매주 월,화는 매장 휴무입니다"],
    details: "오디헤어 상세 설명",
  },
];

const ShopList = () => {
  const [selectedShop, setSelectedShop] = useState<ShopItem | null>(null);
  const [confirmedShop, setConfirmedShop] = useState<ShopItem | null>(null);

  const openBottomSheet = (shop: ShopItem) => {
    setSelectedShop(shop);
  };

  const closeBottomSheet = () => {
    setSelectedShop(null);
  };

  const handleSimpleReservation = (shop: ShopItem) => {
    setSelectedShop(null); // 기존 시트 닫기
    setConfirmedShop(shop); // 예약 확정 시트 열기
  };

  const closeConfirmedSheet = () => {
    setConfirmedShop(null);
  };

  return (
    <div className={styles.section}>
      <SectionTitle>헤어샵</SectionTitle>
      <Tabs
        items={[
          { key: "all", label: "전체" },
          { key: "best", label: "재예약 BEST" },
          { key: "review", label: "리뷰순" },
          { key: "score", label: "평점순" },
          { key: "price", label: "가격 낮은순" },
        ]}
        defaultValue="all"
      />

      <div className={styles.swiper_box}>
        <Swiper
          items={shopBestItems}
          aspect="auto"
          slideWidth="70%"
          gap={8}
          renderItem={(it, index) => (
            <div
              className={styles.shop_card}
              onClick={() => openBottomSheet(it)}
            >
              <div className={styles.shop_media}>
                <img className={styles.shop_img} src={it.src} alt={it.title} />
                {index === 0 && (
                  <span className={styles.best_tag}>
                    <Tag />
                    재예약 BEST
                  </span>
                )}
              </div>
              <div className={styles.shop_info_below}>
                <div className={styles.title}>{it.title}</div>
                <div className={styles.sub}>{it.subtitle}</div>
              </div>
            </div>
          )}
        />

        <Swiper
          items={shopBestItems}
          aspect="auto"
          slideWidth="70%"
          gap={8}
          renderItem={(it) => (
            <div
              className={styles.shop_card}
              onClick={() => openBottomSheet(it)}
            >
              <div className={styles.shop_media}>
                <img className={styles.shop_img} src={it.src} alt={it.title} />
              </div>
              <div className={styles.shop_info_below}>
                <div className={styles.title}>{it.title}</div>
                <div className={styles.sub}>{it.subtitle}</div>
              </div>
            </div>
          )}
        />
      </div>

      {/* 매장 상세 BottomSheet */}
      {selectedShop && (
        <BottomSheet
          title={selectedShop.title || ""}
          isBest={selectedShop.isBest}
          isOpen={selectedShop.isOpen}
          time={selectedShop.time}
          shopInfo={selectedShop.shopInfo}
          details={selectedShop.details}
          onClose={closeBottomSheet}
          onSimpleReservation={() => handleSimpleReservation(selectedShop)}
        />
      )}

      {/* 예약 확정 시트 */}
      {confirmedShop && (
        <ReservationConfirmedSheet
          shopName={confirmedShop.title || ""}
          serviceName={confirmedShop.serviceName || ""}
          onClose={closeConfirmedSheet}
        />
      )}
    </div>
  );
};

export default ShopList;
