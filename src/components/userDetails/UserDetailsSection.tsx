import { useState } from "react";
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

const UserDetailsSection = () => {
    const [gender, setGender] = useState<string>("");
    const [age, setAge] = useState<string>("");
    const buttonElements = { content: "다음" };
    const isActive = gender !== "" && age !== "";

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
