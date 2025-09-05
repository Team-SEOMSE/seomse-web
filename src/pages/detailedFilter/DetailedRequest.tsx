import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import usePostApi from "../../api/usePostApi";
import preiview from "../../assets/svg/previewImg.svg";
import Button from "../../components/common/button/Button";
import BackHeader from "../../layout/backHeader/BackHeader";
import type { ButtonStyles } from "../../types/common/button";
import styles from "./DetailedRequest.module.css";

const STYLE: ButtonStyles = { color: "#ffffff", fontWeight: 600 };

const DetailedRequest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [files, setFiles] = useState<File[]>([]);
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [, forceRender] = useState(0);

  const { mutate: createReservation } = usePostApi(
    "createReservation",
    "/interaction/appointments"
  );

  const {
    shopId,
    shopName,
    serviceName,
    designerId,
    scaleType,
    hairType,
    hairLength,
    hairTreatmentType,
  } = location.state || {};

  const is_empty_for_placeholder = () => {
    const el = editorRef.current;
    if (!el) return true;
    const no_text = (el.textContent || "").trim() === "";
    const no_img = !el.querySelector("img");
    return no_text && no_img;
  };

  const handle_files = (list: FileList | null) => {
    if (!list || !list.length) return;
    const arr = Array.from(list);
    setFiles((prev) => [...prev, ...arr]);
    arr.forEach((f) => {
      const url = URL.createObjectURL(f);
      insert_image_at_cursor(url);
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
    editorRef.current?.focus();
  };

  const insert_image_at_cursor = (url: string) => {
    const el = editorRef.current;
    if (!el) return;
    const img = document.createElement("img");
    img.src = url;
    img.alt = "첨부 이미지";
    img.className = styles.inline_img;
    el.appendChild(img);
    forceRender((n) => n + 1);
  };

  const handle_submit = () => {
    const requirements = editorRef.current?.innerText || "";

    // body 생성
    const body: Record<string, unknown> = {
      shopId,
      designerId,
      serviceName,
      scaleType,
      hairType,
      hairLength,
      hairTreatmentType,
      requirements,
    };

    // ❗ 빈 값 제거
    Object.keys(body).forEach((key) => {
      if (body[key] === undefined || body[key] === null || body[key] === "") {
        delete body[key];
      }
    });

    createReservation(
      { body, file: files[0] },
      {
        onSuccess: (data) => {
          console.log(data);
          navigate("/reservation", {
            replace: true,
            state: { confirmed: true, shopName, serviceName },
          });
        },
        onError: (err) => {
          console.error(err);
        },
      }
    );
  };

  return (
    <div className={styles.screen}>
      <BackHeader />
      <h1 className={styles.title}>
        더 자세한 요청사항과 함께
        <br /> 원하는 스타일 이미지를 넣어주세요.
      </h1>
      <p className={styles.desc}>
        작성해주신 내용은 담당 디자이너에게 전달됩니다.
      </p>

      <div className={styles.editor_box}>
        {is_empty_for_placeholder() && (
          <div className={styles.placeholder}>
            <img
              src={preiview}
              alt=""
              className={styles.hint_img}
              onClick={() => fileInputRef.current?.click()}
            />
            <p className={styles.hint_text}>
              ex) 짧은 앞머리를 선호하지 않아서
              <br /> 눈썹 아래 기장으로 부탁드립니다!
            </p>
          </div>
        )}
        <div
          ref={editorRef}
          className={styles.editor}
          contentEditable
          aria-label="요청사항 입력"
          suppressContentEditableWarning
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className={styles.file_input}
          onChange={(e) => handle_files(e.target.files)}
        />
      </div>

      <div className={styles.button_wrapper}>
        <Button
          elements={{ content: "다음", handleClick: handle_submit }}
          style={STYLE}
        />
      </div>
    </div>
  );
};

export default DetailedRequest;
