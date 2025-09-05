import { SwiperItem } from "../../components/common/swiper/Swiper";

// 샵 종류
export type ShopType = "HAIR_SALON" | string;

// 샵 리스트 API 아이템
export interface ShopApiItem {
    shopId: string;
    shopType: ShopType;
    shopName: string;
    shopInfo: string;
    shopImage: string;
}

// 샵 리스트 API 응답
export interface ShopApiResponse {
    data: ShopApiItem[];
}

// 샵 상세 API 응답
export interface ShopDetailApi {
    shopType: string;
    shopName: string;
    shopInfo: string;
    shopImage: string;
    designers: Designer[];
}

// 디자이너
export interface Designer {
    designerId: string;
    nickName: string;
}

// ShopItem
export interface ShopItem extends SwiperItem {
    shopId?: string;
    serviceName?: string;
    isBest?: boolean;
    isOpen?: boolean;
    time?: string;
    shopInfo?: string[];
}
