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

const DetailedFilter2 = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const buttonElements = {
    content: "다음",
    handleClick: () => {
      navigate("/reservation-request");
    },
  };
  const isActive = gender !== "" && age !== "";

  return (
    <div className={styles.section}>
      <BackHeader />
      <div className={styles.intro}>
        <p className={styles.title}>
          모발 길이와 시술 이력을
          <br />
          알려주세요.
        </p>
        <p className={styles.desc}>저장된 프로필은 디자이너에게 전송됩니다.</p>
      </div>
      <SelectGroup
        label="길이"
        options={["숏컷", "짧은 단발", "미디움", "장발", "가슴아래"]}
        multiple={true}
        onChange={(value) => setGender(value as string)}
      />
      <SelectGroup
        label="시술 여부"
        desc="* 최근 6개월-1년 이내에 염색, 탈색, 펌 등의 시술 이력이 있다면 선택해주세요."
        options={["파마", "매직", "염색", "탈색", "블랙염색", "없음"]}
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

export default DetailedFilter2;
