import { useEffect, useMemo, useState } from "react";
import { ReactComponent as CalendarIcon } from "../../assets/svg/date.svg";
import { ReactComponent as Arrow } from "../../assets/svg/upperArrow.svg";
import styles from "./Calendar.module.css";

interface CalendarProps {
  onDateSelect?: (date: Date) => void;
  selectedDate?: Date;
}

const startOfDay = (d: Date) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

const Calendar = ({ onDateSelect, selectedDate }: CalendarProps) => {
  const initialDate = useMemo(
    () => startOfDay(selectedDate ?? new Date()),
    [selectedDate]
  );

  const [currentDate, setCurrentDate] = useState<Date>(initialDate);
  const [selected, setSelected] = useState<Date | undefined>(initialDate);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setCurrentDate(initialDate);
    setSelected(initialDate);
    onDateSelect?.(initialDate);
  }, [initialDate, onDateSelect]);

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const getFirstDayOfMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const handlePrevMonth = () => {
    const today = startOfDay(new Date());
    const prevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );

    if (
      prevMonth.getFullYear() < today.getFullYear() ||
      (prevMonth.getFullYear() === today.getFullYear() &&
        prevMonth.getMonth() < today.getMonth())
    ) {
      return;
    }
    setCurrentDate(prevMonth);
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const today = startOfDay(new Date());
    const chosen = startOfDay(newDate);

    if (chosen < today) return;

    setSelected(chosen);
    onDateSelect?.(chosen);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const prevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1
    );
    const daysInPrevMonth = getDaysInMonth(prevMonth);

    const days = [];

    // 이전 달 날짜
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <div
          key={`prev-${i}`}
          className={`${styles.calendar_day} ${styles.other_month}`}
        >
          {daysInPrevMonth - i}
        </div>
      );
    }

    // 이번 달 날짜
    for (let day = 1; day <= daysInMonth; day++) {
      const currentLoopDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const today = startOfDay(new Date());
      const loop = startOfDay(currentLoopDate);

      const isPastDate = loop < today;
      const dayOfWeek = loop.getDay();

      const isSelected = selected && selected.getTime() === loop.getTime(); // ✅ 날짜 비교 안정화

      const isToday = loop.getTime() === today.getTime();

      let className = styles.calendar_day;
      if (dayOfWeek === 0) className += ` ${styles.calendar_day_sunday}`;
      if (dayOfWeek === 6) className += ` ${styles.calendar_day_saturday}`;
      if (isSelected) className += ` ${styles.selected}`;
      if (isToday) className += ` ${styles.today}`;
      if (isPastDate) className += ` ${styles.disabled}`;

      days.push(
        <div
          key={day}
          className={className}
          onClick={() => !isPastDate && handleDateClick(day)}
        >
          {day}
        </div>
      );
    }

    // 다음 달 날짜(6주 그리드 유지)
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push(
        <div
          key={`next-${day}`}
          className={`${styles.calendar_day} ${styles.other_month}`}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className={styles.calendar_container}>
      <div
        className={styles.calendar_header}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles.calendar_title}>
          <CalendarIcon />
          <span>날짜</span>
        </div>
        <Arrow className={`${styles.arrow} ${isOpen ? styles.open : ""}`} />
      </div>

      {isOpen && (
        <>
          <div className={styles.calendar_navigation}>
            <h2 className={styles.current_month}>
              {currentDate.getMonth() + 1}월 {currentDate.getFullYear()}년
            </h2>
            <div className={styles.nav_buttons}>
              <button onClick={handlePrevMonth} className={styles.nav_btn}>
                ‹
              </button>
              <button onClick={handleNextMonth} className={styles.nav_btn}>
                ›
              </button>
            </div>
          </div>

          <div className={styles.calendar_weekdays}>
            {dayNames.map((day, index) => (
              <div
                key={day}
                className={`${styles.weekday} ${
                  index === 0
                    ? styles.weekday_sunday
                    : index === 6
                    ? styles.weekday_saturday
                    : ""
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          <div className={styles.calendar_days}>{renderCalendarDays()}</div>
        </>
      )}
    </div>
  );
};

export default Calendar;
