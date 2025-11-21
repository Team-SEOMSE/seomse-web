import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CLIENT_PATH } from "../../api/URL";
import usePatchApi from "../../api/usePatch";
import { ReactComponent as FemaleIcon } from "../../assets/svg/female.svg";
import { ReactComponent as MaleIcon } from "../../assets/svg/male.svg";
import SelectGroup from "../../components/common/selectGroup/SelectGroup";
import BackHeader from "../../layout/backHeader/BackHeader";
import type { ButtonStyles } from "../../types/common/button";
import Button from "../common/button/Button";
import styles from "./UserDetailsSection.module.css";

const ACTIVE_STYLE: ButtonStyles = {
    color: "#ffffff",
    fontWeight: 600,
};

const DISABLED_STYLE: ButtonStyles = {
    color: "#787878",
    backgroundColor: "#e6e6e6",
    fontWeight: 600,
};

const GENDER_MAP: { [key: string]: string } = {
    남자: "MALE",
    여자: "FEMALE",
};

const AGE_MAP: { [key: string]: string } = {
    "10대": "TEENS",
    "20대": "TWENTIES",
    "30대": "THIRTIES",
    "40대": "FORTIES",
    "50대": "FIFTIES",
    "60대 이상": "SIXTY_PLUS",
};

const UserDetailsSection = () => {
    const [gender, setGender] = useState<string>("");
    const [age, setAge] = useState<string>("");
    const navigate = useNavigate();
    const { mutate, isPending } = usePatchApi(
        "patchProfile",
        CLIENT_PATH + "/me"
    );

    const isActive = gender !== "" && age !== "" && !isPending;

    const handleSubmit = () => {
        if (isActive) {
            const body = {
                gender: GENDER_MAP[gender],
                age: AGE_MAP[age],
            };
            mutate(body, {
                onSuccess: () => {
                    navigate("/");
                },
            });
        }
    };

    const buttonElements = { content: "다음", handleClick: handleSubmit };

    return (
        <div className={styles.section}>
            <BackHeader />
            <div className={styles.intro}>
                <p className={styles.title}>
                    섬세님,
                    <br />
                    정보를 조금 더 알려주세요.
                </p>
                <p className={styles.desc}>
                    입력하신 정보는 인사이트 개선에 사용되며, <br /> 안전하게
                    보호됩니다.
                </p>
            </div>
            <SelectGroup
                label="성별"
                options={["남자", "여자"]}
                optionIcons={[<MaleIcon />, <FemaleIcon />]}
                multiple={false}
                onChange={(value) => setGender(value as string)}
            />
            <SelectGroup
                label="연령대"
                options={["10대", "20대", "30대", "40대", "50대", "60대 이상"]}
                multiple={false}
                onChange={(value) => setAge(value as string)}
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

export default UserDetailsSection;
