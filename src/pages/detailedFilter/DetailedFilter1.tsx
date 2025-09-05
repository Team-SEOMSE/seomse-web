import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/common/button/Button";
import SelectGroup from "../../components/common/selectGroup/SelectGroup";
import BackHeader from "../../layout/backHeader/BackHeader";
import type { ButtonStyles } from "../../types/common/button";
import styles from "./DetailedFilter.module.css";

const ACTIVE_STYLE: ButtonStyles = { color: "#ffffff", fontWeight: 600 };
const DISABLED_STYLE: ButtonStyles = {
    color: "#787878",
    backgroundColor: "#e6e6e6",
    fontWeight: 600,
};

// ENUM 파싱 함수
const parseScaleType = (val: string): string => {
    switch (val) {
        case "지성":
            return "OILY";
        case "복합성":
            return "NEUTRAL";
        case "건성":
            return "DRY";
        case "민감성":
            return "SENSITIVE";
        case "잘 모르겠음":
            return "UNKNOWN";
        default:
            return "UNKNOWN";
    }
};

const parseHairType = (val: string): string => {
    switch (val) {
        case "손상모":
            return "DAMAGED";
        case "극손상모":
            return "EXTREMELY_DAMAGED";
        case "곱슬":
            return "CURLY";
        case "직모":
            return "STRAIGHT";
        case "반곱슬":
            return "WAVY";
        default:
            return "UNKNOWN";
    }
};

const DetailedFilter1 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [scale, setScale] = useState<string>("");
    const [hair, setHair] = useState<string>("");

    const isActive = scale !== "" && hair !== "";

    const buttonElements = {
        content: "다음",
        handleClick: () => {
            navigate("/reservation-filter2", {
                state: {
                    ...location.state,
                    scaleType: parseScaleType(scale),
                    hairType: parseHairType(hair),
                },
            });
        },
    };

    return (
        <div className={styles.section}>
            <BackHeader />
            <div className={styles.intro}>
                <p className={styles.title}>
                    두피 타입과 모발 유형을
                    <br />
                    선택해주세요.
                </p>
                <p className={styles.desc}>
                    선택하신 정보는 담당 디자이너에게 전달됩니다.
                </p>
            </div>

            <SelectGroup
                label="두피 타입"
                options={["지성", "복합성", "건성", "민감성", "잘 모르겠음"]}
                onChange={(value) => setScale(value as string)}
            />

            <SelectGroup
                label="모발 유형"
                options={["손상모", "극손상모", "직모", "곱슬", "반곱슬"]}
                onChange={(value) => setHair(value as string)}
            />

            <div className={styles.button_wrapper}>
                <Button
                    elements={buttonElements}
                    style={isActive ? ACTIVE_STYLE : DISABLED_STYLE}
                    disabled={!isActive}
                />
            </div>
        </div>
    );
};

export default DetailedFilter1;
