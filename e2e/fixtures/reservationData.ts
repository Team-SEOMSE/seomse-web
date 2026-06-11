/**
 * 예약 테스트용 Mock 데이터 및 기대값 상수.
 *
 * 예약 플로우는 전 구간이 실시간 API에 의존한다.
 *   - GET  /shops?type=HAIR_SALON   (샵 목록)         → ShopList.tsx
 *   - GET  /shops/{shopId}          (샵 상세/디자이너) → ShopList.tsx
 *   - POST /interaction/appointments/normal  (일반 예약 제출) → SelectSchedule.tsx
 *   - POST /interaction/appointments/special (섬세 예약 제출) → DetailedRequest.tsx
 * 모든 응답 구조는 src/types/reservation/shopList.ts 기준으로 작성한다.
 */
import type { ShopApiItem, Designer } from "../../src/types/reservation/shopList";

/**
 * 테스트 시각 고정값.
 * TimeSelect 는 "현재 시각 이후"의 시간 슬롯만 노출하므로,
 * 영업 시작(11:00) 이전으로 고정해 11:00~18:00 전체를 항상 선택 가능하게 만든다.
 * (날짜는 Calendar 가 마운트 시 '오늘'을 자동 선택 → appointmentDate 로 사용)
 */
export const FIXED_NOW = "2026-06-10T10:00:00";

/** 고정 시각 기준 확정 시트에 표시될 날짜 문구 (formatDate: "M월 D일") */
export const EXPECTED_DATE_LABEL = "6월 10일";
/** 예약에 사용할 시간 슬롯 */
export const RESERVE_TIME = "11:00";
/** 확정 시트에 표시될 날짜+시간 (formatDate + formatTime) */
export const EXPECTED_DATETIME = `${EXPECTED_DATE_LABEL} ${RESERVE_TIME}`;

/** GET /shops 목록 Mock (최소 4개 → ShopList 가 2개씩 두 스와이퍼로 분할) */
export const MOCK_SHOPS: ShopApiItem[] = [
    {
        shopId: "shop-001",
        shopType: "HAIR_SALON",
        shopName: "라비드 헤어",
        shopInfo: "헤어 컨설팅 전문, 퍼스널 컬러 상담",
        shopImage: "",
    },
    {
        shopId: "shop-002",
        shopType: "HAIR_SALON",
        shopName: "헤어커커 가산점",
        shopInfo: "가산디지털단지역 프라이빗 살롱",
        shopImage: "",
    },
    {
        shopId: "shop-003",
        shopType: "HAIR_SALON",
        shopName: "헤어 더웬디",
        shopInfo: "압구정 프리미엄 살롱",
        shopImage: "",
    },
    {
        shopId: "shop-004",
        shopType: "HAIR_SALON",
        shopName: "맨즈 호야",
        shopInfo: "남성 전문 헤어샵",
        shopImage: "",
    },
];

/** GET /shops/{shopId} 상세에 포함될 디자이너 Mock */
export const MOCK_DESIGNERS: Designer[] = [
    { designerId: "designer-1", nickName: "지민" },
    { designerId: "designer-2", nickName: "체리" },
];

/** 테스트의 기준 매장 (라비드 헤어) */
export const PRIMARY_SHOP = MOCK_SHOPS[0];

/** StyleSelect 기본 카테고리(커트)의 첫 서비스 - 진입 시 자동 선택됨 */
export const DEFAULT_SERVICE = "앞머리 컷";
