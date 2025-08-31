import { useState } from "react";
import SelectGroup from "../../components/common/selectGroup/SelectGroup";
import BackHeader from "../../layout/backHeader/BackHeader";
import type { ButtonStyles } from "../../types/common/button";
import Button from "../../components/common/button/Button";
import { useNavigate } from "react-router-dom";
import styles from "./DetailedFilter.module.css";

const ACTIVE_STYLE: ButtonStyles = {
  color: "#ffffff",
  fontWeight: 600,
};

const DISABLED_STYLE: ButtonStyles = {
  color: "#787878",
  backgroundColor: "#e6e6e6",
  fontWeight: 600,
};

const DetailedFilter1 = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const buttonElements = {
    content: "다음",
    handleClick: () => {
      navigate("/reservation-filter2");
    },
  };
  const isActive = gender !== "" && age !== "";

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
        options={["지성", "복합성", "건성", "민감성", " 잘 모르겠음"]}
        multiple={true}
        onChange={(value) => setGender(value as string)}
      />
      <SelectGroup
        label="모발 유형"
        options={["손상모", "건강모", "직모", "곱슬", "반곱슬"]}
        multiple={true}
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

export default DetailedFilter1;
