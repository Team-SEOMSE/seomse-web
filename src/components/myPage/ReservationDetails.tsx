import { useState } from "react";
import SectionTitle from "../common/sectionTitle/SectionTitle";
import Tabs from "../trend/Tabs";
import ReservationCard from "./ReservationCard";
import { useNavigate } from "react-router-dom";
import styles from "./ReservationDetails.module.css";

type CardData = {
  id: string;
  dateTime: string;
  title: string;
  subtitle: string;
  status: string;
  dday: string;
};

const MOCK: Record<"upcoming" | "done", CardData[]> = {
  upcoming: [
    {
      id: "1",
      dateTime: "9월 15일 토요일 AM 11:30",
      title: "볼륨매직, 기장추가",
      subtitle: "섬세 디자이너 | 준오헤어 압구정점",
      status: "방문확정",
      dday: "D-4",
    },
  ],
  done: [
    {
      id: "3",
      dateTime: "8월 30일 금요일 PM 5:30",
      title: "뿌리염색",
      subtitle: "이지은 디자이너 | 샵XYZ",
      status: "방문완료",
      dday: "완료",
    },
  ],
};

const ReservationDetails = () => {
  const [tab, setTab] = useState<"upcoming" | "done">("upcoming");
  const navigate = useNavigate();

  const list = MOCK[tab];

  return (
    <div className={styles.screen}>
      <SectionTitle>내 예약</SectionTitle>

      <Tabs
        items={[
          { key: "upcoming", label: "다가오는 예약" },
          { key: "done", label: "지난 예약" },
        ]}
        value={tab}
        onChange={(k) => setTab(k as typeof tab)}
      />

      <div className={styles.card_wrapper}>
        {list.length ? (
          list.map((it) => (
            <ReservationCard
              key={it.id}
              dateTime={it.dateTime}
              title={it.title}
              subtitle={it.subtitle}
              status={it.status}
              dday={it.dday}
              onClick={
                tab === "done"
                  ? () =>
                      navigate(`../review/${it.id}`, {
                        state: { salonName: "준오헤어 강남점" },
                      })
                  : undefined
              }
            />
          ))
        ) : (
          <p className={styles.empty}>표시할 예약이 없어요.</p>
        )}
      </div>
    </div>
  );
};

export default ReservationDetails;
