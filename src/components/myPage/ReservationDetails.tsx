import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetApi from "../../api/useGetApi";
import noneIcon from "../../assets/svg/none.svg";
import SectionTitle from "../common/sectionTitle/SectionTitle";
import Tabs from "../trend/Tabs";
import ReservationCard from "./ReservationCard";
import styles from "./ReservationDetails.module.css";

interface Appointment {
    appointmentId: number;
    appointmentDate: string;
    serviceName: string;
    designerNickname: string;
    shopName: string;
}

interface AppointmentsResponse {
    data: Appointment[];
}

const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString("ko-KR", {
        month: "long",
        day: "numeric",
        weekday: "short",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });
};

const calcDday = (isoString: string) => {
    const today = new Date();
    const target = new Date(isoString);
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);
    const diff = Math.floor(
        (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diff > 0) return `D-${diff}`;
    if (diff === 0) return "D-Day";
    return "완료";
};

const ReservationDetails = () => {
    const [tab, setTab] = useState<"all">("all");
    const navigate = useNavigate();
    const { data } = useGetApi("appointments", "/interaction/appointments");
    const list: Appointment[] = (data as AppointmentsResponse)?.data ?? [];

    return (
        <div className={styles.screen}>
            <SectionTitle>내 예약</SectionTitle>
            <Tabs
                items={[{ key: "all", label: "전체" }]}
                value={tab}
                onChange={(k) => setTab(k as typeof tab)}
            />
            <div className={styles.card_wrapper}>
                {list.length ? (
                    list.map((it) => (
                        <ReservationCard
                            key={it.appointmentId}
                            dateTime={formatDateTime(it.appointmentDate)}
                            title={it.serviceName}
                            subtitle={`${it.designerNickname} 디자이너 | ${it.shopName}`}
                            status={
                                calcDday(it.appointmentDate) === "완료"
                                    ? "방문완료"
                                    : "방문예정"
                            }
                            dday={calcDday(it.appointmentDate)}
                            onClick={
                                calcDday(it.appointmentDate) === "완료"
                                    ? () =>
                                          navigate(
                                              `../review/${it.appointmentId}`,
                                              {
                                                  state: {
                                                      salonName: it.shopName,
                                                  },
                                              }
                                          )
                                    : undefined
                            }
                        />
                    ))
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
