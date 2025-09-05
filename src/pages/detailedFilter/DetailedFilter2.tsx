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
const parseHairLength = (val: string): string => {
    switch (val) {
        case "숏컷":
            return "SHORT_CUT";
        case "짧은 단발":
            return "SHORT";
        case "미디움":
            return "MEDIUM";
        case "장발":
            return "LONG";
        case "가슴아래":
            return "VERY_LONG";
        default:
            return "";
    }
};

const parseTreatmentType = (val: string): string => {
    switch (val) {
        case "파마":
            return "PERM";
        case "매직":
            return "MAGIC";
        case "염색":
            return "DYE";
        case "탈색":
            return "BLEACH";
        case "블랙염색":
            return "BLACK_DYE";
        default:
            return "";
    }
};

const DetailedFilter2 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [length, setLength] = useState<string>("");
    const [treatment, setTreatment] = useState<string>("");

    const isActive = length !== "" && treatment !== "";

    const buttonElements = {
        content: "다음",
        handleClick: () => {
            navigate("/reservation-request", {
                state: {
                    ...location.state,
                    hairLength: parseHairLength(length),
                    hairTreatmentType: parseTreatmentType(treatment),
                },
            });
        },
    };

    return (
        <div className={styles.section}>
            <BackHeader />
            <div className={styles.intro}>
                <p className={styles.title}>
                    모발 길이와 시술 이력을
                    <br />
                    알려주세요.
                </p>
                <p className={styles.desc}>
                    저장된 프로필은 디자이너에게 전송됩니다.
                </p>
            </div>

            <SelectGroup
                label="길이"
                options={["숏컷", "짧은 단발", "미디움", "장발", "가슴아래"]}
                onChange={(value) => setLength(value as string)}
            />

            <SelectGroup
                label="시술 여부"
                desc="* 최근 6개월-1년 이내에 염색, 탈색, 펌 등의 시술 이력이 있다면 선택해주세요."
                options={["파마", "매직", "염색", "탈색", "블랙염색", "없음"]}
                onChange={(value) => setTreatment(value as string)}
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

export default DetailedFilter2;
