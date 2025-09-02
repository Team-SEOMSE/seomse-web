import styles from "./WeeklyReservationStatus.module.css";

interface WeeklyReservationStatusProps {
  reservations: { [day: string]: number };
}

const days = ["월", "화", "수", "목", "금", "토", "일"];

const WeeklyReservationStatus = ({
  reservations,
}: WeeklyReservationStatusProps) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>이번주 예약 현황</h3>
      <div className={styles.days}>
        {days.map((day) => {
          const percent = reservations[day] ?? 0;
          const isFull = percent === 100;

          if (isFull) {
            return (
              <div
                key={day}
                className={styles.day_wrapper}
                style={{
                  background: "linear-gradient(135deg, #FF3871, #FFB7CC)",
                }}
              >
                <div className={styles.full_content}>✓</div>
              </div>
            );
          }

          return (
            <div
              key={day}
              className={styles.day_wrapper}
              style={{
                background: `conic-gradient(
                  #FF3871 0%,
                  #FFB7CC ${percent}%,
                  #E0E0E0 ${percent}% 100%
                )`,
              }}
            >
              <div
                className={styles.day_content}
                style={{
                  color: percent === 0 ? "#BDBDBD" : "#575757",
                }}
              >
                {day}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyReservationStatus;
