import ReservationCard from "./ReservationCard";
import styles from "./ReservationList.module.css";

const ReservationList = () => {
  return (
    <section className={styles.section}>
      <p className={styles.title}>
        예약리스트 <span>n</span>건
      </p>
      <ReservationCard
        date="06.24 (토)"
        time="오후 6:00"
        status="방문확정"
        tags={["지성두피", "손상모", "탈색모"]}
        name="김섬세"
        description="민감두피인데, 탈색할때마다 두피 상태 고려 안해주시는 미용실 때문에..."
      />

      <ReservationCard date="06.24 (토)" time="오후 6:00" status="대기중" />
    </section>
  );
};

export default ReservationList;
