import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetApi from "../../api/useGetApi";
import bestShop from "../../assets/images/bestShop.png";
import bestShop1 from "../../assets/images/bestShop1.png";
import bestShop2 from "../../assets/images/bestShop2.png";
import bestShop3 from "../../assets/images/bestShop3.png";
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
import ReservationConfirmedSheet from "./ReservationConfirmedSheet";
import styles from "./ShopList.module.css";

const shopBestItemsDefault: ShopItem[] = [
    {
        src: bestShop1,
        title: "라비드 헤어",
        serviceName: "헤어 컨설팅",
        subtitle: "헤어 컨설팅 전문, 퍼스널 컬러 상담",
        isBest: true,
        isOpen: true,
        time: "10:00 - 22:00",
        shopInfo: [
            "* 9/20~27일 워크샵 일정으로 휴가입니다.",
            "* 시간에 늦을 경우 미리 30분 전에 알려주세요.",
        ],
    },
    {
        src: bestShop2,
        title: "헤어커커 가산점",
        serviceName: "모카무스 염색",
        subtitle: "가산디지털단지역에 위치한 프라이빗 살롱입니다.",
        isBest: false,
        isOpen: false,
        time: "11:00 - 21:00",
        shopInfo: ["프라이빗 살롱", "* 매주 월,화는 매장 휴무입니다"],
    },
];

const shopBestItems2Default: ShopItem[] = [
    {
        src: bestShop,
        serviceName: "볼륨매직",
        isBest: false,
        isOpen: true,
        time: "10:00 - 22:00",
    },
    {
        src: bestShop3,
        serviceName: "남자커트 + 다운펌",
        isBest: false,
        isOpen: false,
        time: "10:00 - 20:00",
    },
];

function overrideWithApi(
    defaults: ShopItem[],
    apiSlice: readonly ShopApiItem[]
): ShopItem[] {
    return defaults.map((def, i): ShopItem => {
        const api = apiSlice[i];
        if (!api) return def;
        return {
            ...def,
            shopId: api.shopId,
            src: api.shopImage || def.src,
            title: api.shopName || def.title,
            subtitle: api.shopInfo || def.subtitle,
        };
    });
}

const ShopList = () => {
    const [selectedShop, setSelectedShop] = useState<ShopItem | null>(null);
    const [confirmedShop, setConfirmedShop] = useState<ShopItem | null>(null);
    const navigate = useNavigate();

    const { data } = useGetApi("shopList", "/shops?type=HAIR_SALON");

    const apiItems = useMemo(() => {
        const apiResponse = data as ShopApiResponse | undefined;
        return apiResponse?.data ?? [];
    }, [data]);

    const shopBestItems = useMemo(
        () =>
            overrideWithApi(
                shopBestItemsDefault,
                apiItems.slice(0, shopBestItemsDefault.length)
            ),
        [apiItems]
    );

    const shopBestItems2 = useMemo(
        () =>
            overrideWithApi(
                shopBestItems2Default,
                apiItems.slice(
                    shopBestItemsDefault.length,
                    shopBestItemsDefault.length + shopBestItems2Default.length
                )
            ),
        [apiItems]
    );

    const openBottomSheet = (shop: ShopItem) => setSelectedShop(shop);
    const closeBottomSheet = () => setSelectedShop(null);

    const handleSimpleReservation = (shop: ShopItem) => {
        setSelectedShop(null);
        setConfirmedShop(shop);
    };
    const closeConfirmedSheet = () => setConfirmedShop(null);

    // 상세 API 호출
    const { data: shopDetail }: { data?: { data: ShopDetailApi } } = useGetApi(
        "shopDetail",
        selectedShop?.shopId ? `/shops/${selectedShop.shopId}` : "",
        true,
        { enabled: !!selectedShop?.shopId }
    );

    const bottomSheetData:
        | (ShopItem & { designerId?: string; designers?: Designer[] })
        | null = shopDetail?.data
        ? {
              ...selectedShop,
              title: shopDetail.data.shopName,
              subtitle: shopDetail.data.shopType,
              src: shopDetail.data.shopImage,
              shopInfo: [shopDetail.data.shopInfo],
              shopId: selectedShop?.shopId,
              designerId: shopDetail.data.designers?.[0]?.designerId,
              designers: shopDetail.data.designers,
          }
        : selectedShop;

    const renderShopCard = (
        it: ShopItem,
        index?: number,
        isFirstSwiper?: boolean
    ) => (
        <div className={styles.shop_card} onClick={() => openBottomSheet(it)}>
            <div className={styles.shop_media}>
                <img className={styles.shop_img} src={it.src} alt={it.title} />
                {isFirstSwiper && index === 0 && (
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
    );

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
                    onSimpleReservation={() =>
                        handleSimpleReservation(bottomSheetData)
                    }
                    buttonElements={{
                        content: "섬세한 예약하기",
                        handleClick: () => {
                            navigate("/select-service", {
                                state: {
                                    shopName: bottomSheetData.title,
                                    shopId: bottomSheetData.shopId,
                                    designerId: bottomSheetData.designerId,
                                    designers: bottomSheetData.designers,
                                },
                            });
                        },
                    }}
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
