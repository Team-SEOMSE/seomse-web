import { useState } from "react";
import { ReactComponent as Arrow } from "../../../assets/svg/upperArrow.svg";
import styles from "./ReservationCard.module.css";

interface ReservationCardProps {
    date: string;
    time: string;
    status: "방문확정" | "대기중";
    tags?: string[];
    name?: string;
    description?: string;
}

const ReservationCard = ({
    date,
    time,
    status,
    tags = [],
    name,
    description,
}: ReservationCardProps) => {
    const [open, setOpen] = useState(false);

    return (
        <div className={styles.card}>
            <div className={styles.header} onClick={() => setOpen(!open)}>
                <span className={styles.date}>
                    {date} {time}
                </span>
                <span
                    className={`${styles.status} ${
                        status === "방문확정"
                            ? styles.confirmed
                            : styles.pending
                    }`}
                >
                    {status}
                </span>
                <Arrow
                    className={`${styles.arrow} ${open ? styles.open : ""}`}
                />
            </div>

            {open && (
                <div className={styles.content}>
                    {tags.length > 0 && (
                        <div className={styles.tags}>
                            {tags.map((tag, idx) => (
                                <span key={idx} className={styles.tag}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {(name || description) && (
                        <div className={styles.info_box}>
                            {name && <p className={styles.name}>{name}</p>}
                            {description && (
                                <p className={styles.description}>
                                    {description
                                        .split(" ")
                                        .map((word, idx) =>
                                            word.startsWith("#") ? (
                                                <span key={idx}>{word} </span>
                                            ) : (
                                                word + " "
                                            )
                                        )}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ReservationCard;
