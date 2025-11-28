import { useRef, useState } from "react";
import { CLIENT_PATH } from "../../api/URL";
import useGetApi from "../../api/useGetApi";
import usePostApi from "../../api/usePostApi";
import exampleFace from "../../assets/images/exampleFace.png";
import { ReactComponent as Edit } from "../../assets/svg/edit.svg";
import { ReactComponent as Loading } from "../../assets/svg/loading.svg";
import type {
    AnalysisResponse,
    UserResponse,
} from "../../types/aiAnalysis/imageUpload";
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
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [analysisResult, setAnalysisResult] =
        useState<AnalysisResponse | null>(null);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);

    const { data: userData } = useGetApi("userInfo", `${CLIENT_PATH}/me`);
    const userName = (userData as UserResponse)?.data?.name || "고객";

    const { mutate, isPending } = usePostApi(
        "aiAnalysis",
        "/interaction/styles/analysis",
        true,
        "multipart"
    );

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const imageUrl = URL.createObjectURL(file);
        setUploadedImage(imageUrl);

        mutate(
            {
                body: {},
                file,
                fileKey: "image",
            },
            {
                onSuccess: (data) => {
                    console.log("AI 분석 응답:", data);
                    setAnalysisResult(data as AnalysisResponse);
                },
                onError: (error) => {
                    console.error("AI 분석 에러:", error);
                },
            }
        );

        e.target.value = "";
    };

    const buttonElements: ButtonElements = {
        content: "이미지 업로드 하기",
        handleClick: handleButtonClick,
    };

    if (isPending) {
        return (
            <div className={styles.container}>
                {uploadedImage && (
                    <img
                        className={styles.example_img}
                        src={uploadedImage}
                        alt="uploaded face"
                    />
                )}
                <div className={styles.loading_container}>
                    <Loading className={styles.loading_icon} />
                    <p className={styles.loading_text}>
                        잠시만 기다려주세요!
                        <br />곧 분석 결과가 제공됩니다.
                    </p>
                </div>
            </div>
        );
    }

    if (analysisResult) {
        const { analysis, recommendations } = analysisResult.data;
        return (
            <div className={styles.result_container}>
                {uploadedImage && (
                    <img
                        className={styles.example_img}
                        src={uploadedImage}
                        alt="uploaded face"
                    />
                )}
                <h1>
                    {userName}님, {analysis.faceShape}에{" "}
                    {analysis.personalColor}!
                </h1>
                <div className={styles.result_section}>
                    <h2 className={styles.result_subtitle}>추천 헤어 컬러</h2>
                    <p className={styles.result_name}>
                        {recommendations.hairColor.name}
                    </p>
                    <p className={styles.result_description}>
                        {recommendations.hairColor.reason}
                    </p>
                </div>
                <div className={styles.result_section}>
                    <h2 className={styles.result_subtitle}>추천 헤어 스타일</h2>
                    <p className={styles.result_name}>
                        {recommendations.hairstyle.name}
                    </p>
                    <p className={styles.result_description}>
                        {recommendations.hairstyle.reason}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <img
                className={styles.example_img}
                src={exampleFace}
                alt="example face"
            />
            <GuideCard />
            <div className={styles.section}>
                <h1>섬세의 헤어 AI분석</h1>
                <p>헤어스타일 분석을 위해 이미지를 업로드해주세요</p>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    style={{ display: "none" }}
                />
                <Button
                    elements={buttonElements}
                    style={STYLE}
                    icon={<Edit />}
                    disabled={isPending}
                />
            </div>
        </div>
    );
};

export default ImgUpload;
