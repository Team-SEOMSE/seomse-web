import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/common/button/Button";
import Calendar from "../../components/selectSchedule/Calendar";
import TimeSelect from "../../components/selectSchedule/TimeSelect";
import BackHeader from "../../layout/backHeader/BackHeader";
import type { ButtonStyles } from "../../types/common/button";
import styles from "./SelectSchedule.module.css";

const STYLE: ButtonStyles = { color: "#ffffff", fontWeight: 500 };

const SelectSchedule = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const buttonElements = {
        content: "다음",
        handleClick: () => {
            navigate("/reservation-filter", { state: location.state });
        },
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
                    <Calendar />
                    <TimeSelect />
                </div>
            </div>

            <div className={styles.button_group}>
                <Button elements={buttonElements} style={STYLE} />
            </div>
        </div>
    );
};

export default SelectSchedule;
