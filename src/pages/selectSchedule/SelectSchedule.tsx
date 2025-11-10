import { useNavigate, useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import Button from "../../components/common/button/Button";
import Calendar from "../../components/selectSchedule/Calendar";
import TimeSelect from "../../components/selectSchedule/TimeSelect";
import BackHeader from "../../layout/backHeader/BackHeader";
import type { ButtonStyles } from "../../types/common/button";
import usePostApi from "../../api/usePostApi";
import styles from "./SelectSchedule.module.css";

const STYLE: ButtonStyles = { color: "#ffffff", fontWeight: 500 };

type ReservationType = "normal" | "special";

interface LocationState {
  reservationType?: ReservationType;
  shopId?: string;
  shopName?: string;
  serviceName?: string;
  designerId?: string;
  appointmentDate?: string;
  appointmentTime?: string;
}

interface NormalAppointmentRequest {
  shopId: string;
  designerId: string;
  appointmentDate: string; // "YYYY-MM-DD"
  appointmentTime: string; // "HH:mm:ss"
  serviceName: string;
}

const SelectSchedule = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    reservationType = "normal",
    shopId = "",
    shopName = "",
    serviceName = "",
    designerId = "",
  } = (location.state ?? {}) as LocationState;

  // 로컬 상태: 문자열로 보관
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  const isDisabled = useMemo(() => !date || !time, [date, time]);

  // 일반예약 POST
  const { mutate: createNormalAppointment, isPending: isPosting } = usePostApi(
    "normalAppointment",
    "/interaction/appointments/normal",
    true
  );

  // YYYY-MM-DD 포맷터
  const toYyyyMmDd = (d: Date) => {
    const y = d.getFullYear();
    const m = `${d.getMonth() + 1}`.padStart(2, "0");
    const dd = `${d.getDate()}`.padStart(2, "0");
    return `${y}-${m}-${dd}`;
  };

  const handleNext = () => {
    if (!date || !time) return;

    if (reservationType === "normal") {
      const payload: NormalAppointmentRequest = {
        shopId,
        designerId,
        appointmentDate: date,
        appointmentTime: `${time}:00`,
        serviceName,
      };

      const body: Record<string, unknown> = { ...payload };

      createNormalAppointment(
        { body },
        {
          onSuccess: () => {
            navigate("/reservation", {
              replace: true,
              state: {
                confirmed: true,
                shopName,
                serviceName,
                appointmentDate: date,
                appointmentTime: time,
              },
            });
          },
        }
      );
    } else {
      // 섬세 예약: 필터 페이지로 진행
      navigate("/reservation-filter", {
        state: {
          reservationType,
          shopId,
          shopName,
          serviceName,
          designerId,
          appointmentDate: date,
          appointmentTime: `${time}:00`,
        } as LocationState,
      });
    }
  };

  const buttonElements = {
    content: "다음",
    handleClick: handleNext,
  };

  return (
    <div className={styles.screen}>
      <BackHeader />
      <div className={styles.content}>
        <p className={styles.title}>
          원하시는 예약 시간을
          <br />
          선택해주세요.
        </p>
        <div className={styles.flex_box}>
          <Calendar
            onDateSelect={(d: Date) => setDate(toYyyyMmDd(d))}
            selectedDate={date ? new Date(date) : undefined}
          />
          <TimeSelect
            onTimeSelect={(hhmm: string) => setTime(hhmm)}
            selectedTime={time || undefined}
          />
        </div>
      </div>

      <div className={styles.button_group}>
        <Button
          elements={buttonElements}
          style={STYLE}
          disabled={isDisabled || isPosting}
        />
      </div>
    </div>
  );
};

export default SelectSchedule;
