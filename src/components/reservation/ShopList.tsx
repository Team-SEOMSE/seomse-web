import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetApi from "../../api/useGetApi";
import bestShop from "../../assets/images/bestShop.webp"; // 이미지가 없는 매장 대비
import { ReactComponent as Tag } from "../../assets/svg/tagIcon.svg";
import {
  Designer,
  ShopApiItem,
  ShopApiResponse,
  ShopDetailApi,
  ShopItem,
} from "../../types/reservation/shopList";
import SectionTitle from "../common/sectionTitle/SectionTitle";
import Swiper from "../common/swiper/Swiper";
import Tabs from "../trend/Tabs";
import BottomSheet from "./BottomSheet";
import styles from "./ShopList.module.css";

const ShopList = () => {
  const [selectedShop, setSelectedShop] = useState<ShopItem | null>(null);
  const navigate = useNavigate();

  const { data } = useGetApi("shopList", "/shops?type=HAIR_SALON");

  const apiItems = useMemo(() => {
    const apiResponse = data as ShopApiResponse | undefined;
    return apiResponse?.data ?? [];
  }, [data]);

  const mappedItems: ShopItem[] = useMemo(
    () =>
      (apiItems as readonly ShopApiItem[]).map(
        (api): ShopItem => ({
          shopId: api.shopId,
          src: api.shopImage || bestShop,
          title: api.shopName || "이름 미정",
          subtitle: api.shopInfo || "",
          isBest: false,
          isOpen: undefined,
          time: undefined,
          shopInfo: api.shopInfo ? [api.shopInfo] : [],
        })
      ),
    [apiItems]
  );

  const shopBestItems = useMemo(() => mappedItems.slice(0, 2), [mappedItems]);
  const shopBestItems2 = useMemo(() => mappedItems.slice(2, 4), [mappedItems]);

  const openBottomSheet = (shop: ShopItem) => setSelectedShop(shop);
  const closeBottomSheet = () => setSelectedShop(null);

  // 매장 상세 데이터
  const { data: shopDetail }: { data?: { data: ShopDetailApi } } = useGetApi(
    "shopDetail",
    selectedShop?.shopId ? `/shops/${selectedShop.shopId}` : "",
    true,
    { enabled: !!selectedShop?.shopId }
  );

  const bottomSheetData:
    | (ShopItem & { designerId?: string; designers?: Designer[] })
    | null = selectedShop
    ? (() => {
        const d = shopDetail?.data;

        return {
          ...selectedShop,
          title: d?.shopName ?? selectedShop.title ?? "",
          src: d?.shopImage ?? selectedShop.src,
          shopInfo: d?.shopInfo ? [d.shopInfo] : selectedShop.shopInfo ?? [],
          shopId: selectedShop.shopId,
          designerId: d?.designers?.[0]?.designerId,
          designers: d?.designers,
        };
      })()
    : null;

  const renderShopCard = (
    it: ShopItem,
    index?: number,
    isFirstSwiper?: boolean
  ) => (
    <div className={styles.shop_card} onClick={() => openBottomSheet(it)}>
      <div className={styles.shop_media}>
        <img className={styles.shop_img} src={it.src} alt={it.title} loading="lazy" />
        {isFirstSwiper && index === 0 && (
          <span className={styles.best_tag}>
            <Tag />
            재예약 BEST
          </span>
        )}
      </div>
      <div className={styles.shop_info_below}>
        <div className={styles.title}>{it.title}</div>
        <div className={styles.sub}>{it.shopInfo}</div>
      </div>
    </div>
  );

  // 일반 예약
  const handleNormalReservation = (
    shop: ShopItem & { designerId?: string; designers?: Designer[] }
  ) => {
    setSelectedShop(null);
    navigate("/select-service", {
      state: {
        reservationType: "normal",
        shopName: shop.title,
        shopId: shop.shopId,
        designerId: shop.designerId,
        designers: shop.designers,
      },
    });
  };

  // 섬세 예약
  const handleSpecialReservation = (
    shop: ShopItem & { designerId?: string; designers?: Designer[] }
  ) => {
    setSelectedShop(null);
    navigate("/select-service", {
      state: {
        reservationType: "special",
        shopName: shop.title,
        shopId: shop.shopId,
        designerId: shop.designerId,
        designers: shop.designers,
      },
    });
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
          renderItem={(it, index) => renderShopCard(it, index, true)}
        />
        <Swiper
          items={shopBestItems2}
          aspect="auto"
          slideWidth="70%"
          gap={8}
          renderItem={(it, index) => renderShopCard(it, index, false)}
        />
      </div>

      {/* 매장 상세 시트 */}
      {bottomSheetData && (
        <BottomSheet
          title={bottomSheetData.title || ""}
          subtitle={bottomSheetData.subtitle}
          isBest={bottomSheetData.isBest}
          isOpen={bottomSheetData.isOpen}
          time={bottomSheetData.time}
          shopInfo={bottomSheetData.shopInfo}
          onClose={closeBottomSheet}
          shopId={bottomSheetData.shopId}
          designerId={bottomSheetData.designerId}
          onSimpleReservation={() => handleNormalReservation(bottomSheetData)}
          buttonElements={{
            content: "섬세한 예약하기",
            handleClick: () => handleSpecialReservation(bottomSheetData),
          }}
        />
      )}
    </div>
  );
};

export default ShopList;
