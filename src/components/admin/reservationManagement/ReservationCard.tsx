import { useState } from "react";
import { ReactComponent as Arrow } from "../../../assets/svg/upperArrow.svg";
import useGetApi from "../../../api/useGetApi";
import styles from "./ReservationCard.module.css";

interface ReservationCardProps {
  appointmentId: string;
  date: string;
  time: string;
  designerNickname: string;
  status: "방문확정" | "대기중";
}

interface DetailResponse {
  hairLength: string;
  hairTreatmentType: string;
  hairType: string;
  scaleType: string;
  requirements: string | null;
  requirementsImage?: string | null;
}

const normalizeUrl = (url?: string | null) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `https://${url}`;
};

const translateScaleType = (value: string): string => {
  const mapping: Record<string, string> = {
    OILY: "지성",
    NEUTRAL: "복합성",
    DRY: "건성",
    SENSITIVE: "민감성",
    UNKNOWN: "잘 모르겠음",
  };
  return mapping[value] || value;
};

const translateHairType = (value: string): string => {
  const mapping: Record<string, string> = {
    DAMAGED: "손상모",
    EXTREMELY_DAMAGED: "극손상모",
    CURLY: "곱슬",
    STRAIGHT: "직모",
    WAVY: "반곱슬",
    UNKNOWN: "알 수 없음",
  };
  return mapping[value] || value;
};

const translateHairLength = (value: string): string => {
  const mapping: Record<string, string> = {
    SHORT_CUT: "숏컷",
    SHORT: "짧은 단발",
    MEDIUM: "미디움",
    LONG: "장발",
    VERY_LONG: "가슴아래",
  };
  return mapping[value] || value;
};

const translateTreatmentType = (value: string): string => {
  const mapping: Record<string, string> = {
    PERM: "파마",
    MAGIC: "매직",
    DYE: "염색",
    BLEACH: "탈색",
    BLACK_DYE: "블랙염색",
    NONE: "없음",
  };
  return mapping[value] || value;
};

const ReservationCard = ({
  appointmentId,
  date,
  time,
  designerNickname,
  status,
}: ReservationCardProps) => {
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useGetApi(
    ["appointmentDetails", appointmentId].join("-"),
    `/interaction/appointments/${appointmentId}/details`,
    true,
    { enabled: open }
  );
  console.log(data);

  const detail: DetailResponse | undefined = (data as { data: DetailResponse })
    ?.data;

  const tags = detail
    ? [
        translateHairLength(detail.hairLength),
        translateTreatmentType(detail.hairTreatmentType),
        translateHairType(detail.hairType),
        translateScaleType(detail.scaleType),
      ].filter(Boolean)
    : [];

  const images =
    detail?.requirementsImage && detail.requirementsImage !== null
      ? [normalizeUrl(detail.requirementsImage)]
      : [];

  return (
    <div className={styles.card}>
      <div className={styles.header} onClick={() => setOpen(!open)}>
        <span className={styles.date}>
          {date} {time}
        </span>
        <span
          className={`${styles.status} ${
            status === "방문확정" ? styles.confirmed : styles.pending
          }`}
        >
          {status}
        </span>
        <Arrow className={`${styles.arrow} ${open ? styles.open : ""}`} />
      </div>

      {open && (
        <div className={styles.content}>
          {isLoading && <p>불러오는 중...</p>}

          {!isLoading && detail && (
            <>
              <div className={styles.tags_container}>
                <span className={styles.designer_name}>
                  {designerNickname} 디자이너
                </span>
                {tags.length > 0 && (
                  <>
                    <div className={styles.tags}>
                      {tags.map((tag, idx) => (
                        <span key={idx} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {images.length > 0 && (
                <div className={styles.image_container}>
                  {images.map((img, idx) => (
                    <div key={idx} className={styles.image_wrapper}>
                      <img
                        src={img}
                        alt={`예약 이미지 ${idx + 1}`}
                        className={styles.reservation_image}
                      />
                    </div>
                  ))}
                </div>
              )}

              {detail.requirements && (
                <div className={styles.info_box}>
                  <p className={styles.description}>
                    {detail.requirements.split(" ").map((word, idx) =>
                      word.startsWith("#") ? (
                        <span key={idx} className={styles.hashtag}>
                          {word}{" "}
                        </span>
                      ) : (
                        word + " "
                      )
                    )}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ReservationCard;
