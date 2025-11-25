import { ReactComponent as Edit } from "../../assets/svg/edit.svg";
import type { ButtonElements, ButtonStyles } from "../../types/common/button";
import Button from "../common/button/Button";
import GuideCard from "./GuideCard";
import styles from "./ImgUpload.module.css";

const STYLE: ButtonStyles = {
    backgroundColor: "#ffffff",
    border: "1px solid #FF3871",
    fontWeight: 600,
    color: "#FF3871",
};

const ImgUpload = () => {
    const buttonElements: ButtonElements = {
        content: "이미지 업로드 하기",
    };
    return (
        <div>
            <GuideCard />
            <div className={styles.section}>
                <h1>섬세의 헤어 AI분석</h1>
                <p>헤어스타일 분석을 위해 이미지를 업로드해주세요</p>
                <Button
                    elements={buttonElements}
                    style={STYLE}
                    icon={<Edit />}
                />
            </div>
        </div>
    );
};

export default ImgUpload;
