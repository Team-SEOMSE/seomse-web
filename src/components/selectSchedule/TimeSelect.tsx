import { useState } from "react";
import { ReactComponent as ClockIcon } from "../../assets/svg/time.svg";
import { ReactComponent as Arrow } from "../../assets/svg/upperArrow.svg";
import SelectGroup from "../common/selectGroup/SelectGroup";
import styles from "./TimeSelect.module.css";

interface TimeSelectProps {
    onTimeSelect?: (time: string) => void;
    selectedTime?: string;
}

const TimeSelect = ({ onTimeSelect, selectedTime }: TimeSelectProps) => {
    const [isOpen, setIsOpen] = useState(true);
    const [selected, setSelected] = useState<string>(selectedTime || "");

    const generateTimeOptions = () => {
        const times: string[] = [];
        for (let hour = 11; hour <= 18; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                if (hour === 18 && minute > 0) continue;

                const hourStr = hour.toString().padStart(2, "0");
                const minuteStr = minute.toString().padStart(2, "0");
                times.push(`${hourStr}:${minuteStr}`);
            }
        }
        return times;
    };

    const timeOptions = generateTimeOptions();

    const handleTimeSelect = (time: string | string[]) => {
        const selectedTime = typeof time === "string" ? time : time[0];
        setSelected(selectedTime);
        onTimeSelect?.(selectedTime);
    };

    return (
        <div className={styles.time_container}>
            <div
                className={styles.time_header}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className={styles.time_title}>
                    <ClockIcon className={styles.time_icon} />
                    <span>시간</span>
                </div>
                <Arrow
                    className={`${styles.arrow} ${isOpen ? styles.open : ""}`}
                />
            </div>

            {isOpen && (
                <div className={styles.time_content}>
                    <SelectGroup
                        label=""
                        options={timeOptions}
                        multiple={false}
                        value={selected}
                        onChange={handleTimeSelect}
                    />
                </div>
            )}
        </div>
    );
};

export default TimeSelect;
