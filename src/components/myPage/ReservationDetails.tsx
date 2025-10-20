import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetApi from "../../api/useGetApi";
import noneIcon from "../../assets/svg/none.svg";
import SectionTitle from "../common/sectionTitle/SectionTitle";
import Tabs from "../trend/Tabs";
import ReservationCard from "./ReservationCard";
import styles from "./ReservationDetails.module.css";

interface Appointment {
    appointmentId: string;
    shopName: string;
    designerNickname: string;
    serviceName: string;
    appointmentDate: string;
    appointmentTime: string;
    hasReview: boolean;
}

interface AppointmentsResponse {
    data: Appointment[];
}

const formatDateTime = (date: string, time: string) => {
    const d = new Date(`${date}T${time}`);
    return d.toLocaleString("ko-KR", {
        month: "long",
        day: "numeric",
        weekday: "short",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
};

// 날짜만 비교하기 위해 시간을 자정으로 초기화
const toMidnight = (d: Date) => {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
};

// D-Day 계산 (날짜 기준)
const calcDday = (dateStr: string) => {
    const today = toMidnight(new Date());
    const target = toMidnight(new Date(dateStr));
    const diff = Math.floor((target.getTime() - today.getTime()) / 86400000);
    if (diff > 0) return `D-${diff}`;
    if (diff === 0) return "D-Day";
    return "완료";
};

type TabKey = "upcoming" | "past";

const ReservationDetails = () => {
    const [tab, setTab] = useState<TabKey>("upcoming");
    const navigate = useNavigate();

    const { data } = useGetApi("appointments", "/interaction/appointments");
    const list: Appointment[] = (data as AppointmentsResponse)?.data ?? [];

    const today = toMidnight(new Date());

    const upcoming = list
        .filter((a) => toMidnight(new Date(a.appointmentDate)) >= today)
        .sort(
            (a, b) =>
                new Date(a.appointmentDate).getTime() -
                new Date(b.appointmentDate).getTime()
        );

    const past = list
        .filter((a) => toMidnight(new Date(a.appointmentDate)) < today)
        .sort(
            (a, b) =>
                new Date(b.appointmentDate).getTime() -
                new Date(a.appointmentDate).getTime()
        );

    const shownList = tab === "upcoming" ? upcoming : past;
    const isUpcoming = tab === "upcoming";

    return (
        <div className={styles.screen}>
            <SectionTitle>내 예약</SectionTitle>

            <Tabs
                items={[
                    { key: "upcoming", label: "다가오는 예약" },
                    { key: "past", label: "지난 예약" },
                ]}
                value={tab}
                onChange={(k) => setTab(k as TabKey)}
            />

            <div className={styles.card_wrapper}>
                {shownList.length ? (
                    shownList.map((a) => {
                        const dday = calcDday(a.appointmentDate);

                        return (
                            <ReservationCard
                                key={a.appointmentId}
                                dateTime={formatDateTime(
                                    a.appointmentDate,
                                    a.appointmentTime
                                )}
                                title={a.serviceName}
                                subtitle={`${a.designerNickname} 디자이너 | ${a.shopName}`}
                                status={
                                    isUpcoming
                                        ? dday === "완료"
                                            ? "방문완료"
                                            : "방문예정"
                                        : undefined
                                }
                                dday={isUpcoming ? dday : undefined}
                                showReviewButton={!isUpcoming && !a.hasReview}
                                onReviewClick={() =>
                                    navigate(`../review/${a.appointmentId}`, {
                                        state: { salonName: a.shopName },
                                    })
                                }
                            />
                        );
                    })
                ) : (
                    <div className={styles.emptyContainer}>
                        <img
                            src={noneIcon}
                            alt="예약 없음"
                            className={styles.emptyIcon}
                        />
                        <p className={styles.emptyTitle}>
                            등록된 예약이 없습니다.
                        </p>
                        <p className={styles.emptyDesc}>
                            원하는 헤어샵을 찾아 예약해보세요!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReservationDetails;
