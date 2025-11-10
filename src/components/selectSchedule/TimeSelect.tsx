import { useEffect, useMemo, useState } from "react";
import { ReactComponent as ClockIcon } from "../../assets/svg/time.svg";
import { ReactComponent as Arrow } from "../../assets/svg/upperArrow.svg";
import SelectGroup from "../common/selectGroup/SelectGroup";
import styles from "./TimeSelect.module.css";

interface TimeSelectProps {
  onTimeSelect?: (time: string) => void;
  selectedTime?: string;
}

const BUSINESS_START = "11:00";
const BUSINESS_END = "18:00";

function toMinutes(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function getNextHalfHour(date = new Date()) {
  const h = date.getHours();
  const m = date.getMinutes();
  const base = h * 60 + m;
  const remainder = base % 30;
  return remainder === 0 ? base : base + (30 - remainder);
}

function generateBusinessTimeOptions() {
  const times: string[] = [];
  for (let hour = 11; hour <= 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === 18 && minute > 0) continue;
      const hh = String(hour).padStart(2, "0");
      const mm = String(minute).padStart(2, "0");
      times.push(`${hh}:${mm}`);
    }
  }
  return times;
}

const TimeSelect = ({ onTimeSelect, selectedTime }: TimeSelectProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selected, setSelected] = useState<string>(selectedTime || "");

  // 원본 영업시간 옵션
  const baseOptions = useMemo(generateBusinessTimeOptions, []);

  // 현재 시각 기준으로 과거 시간 제거
  const timeOptions = useMemo(() => {
    const now = new Date();
    const startMin = toMinutes(BUSINESS_START);
    const endMin = toMinutes(BUSINESS_END);
    // 다음 30분 단위로 올림(지나간 시각은 선택 불가)
    const threshold = Math.max(getNextHalfHour(now), startMin);

    if (threshold >= endMin) return [];
    return baseOptions.filter((t) => toMinutes(t) >= threshold);
  }, [baseOptions]);

  // 현재 선택이 더 이상 유효하지 않으면 해제
  useEffect(() => {
    if (selected && !timeOptions.includes(selected)) {
      setSelected("");
    }
  }, [timeOptions, selected]);

  const handleTimeSelect = (time: string | string[]) => {
    const picked = typeof time === "string" ? time : time[0];
    setSelected(picked);
    onTimeSelect?.(picked);
  };

  return (
    <div className={styles.time_container}>
      <div className={styles.time_header} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.time_title}>
          <ClockIcon className={styles.time_icon} />
          <span>시간</span>
        </div>
        <Arrow className={`${styles.arrow} ${isOpen ? styles.open : ""}`} />
      </div>

      {isOpen && (
        <div className={styles.time_content}>
          {timeOptions.length > 0 ? (
            <SelectGroup
              label=""
              options={timeOptions}
              multiple={false}
              value={selected}
              onChange={handleTimeSelect}
            />
          ) : (
            <div className={styles.no_slots}>
              오늘 선택 가능한 시간이 없습니다.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TimeSelect;
