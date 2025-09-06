import { useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import type { ButtonStyles } from "../../types/common/button";
import Button from "../common/button/Button";
import pinkStar from "../../assets/svg/pinkStar.svg";
import grayStar from "../../assets/svg/grayStar.svg";
import preiview from "../../assets/svg/previewImg.svg";
import styles from "./ReviewWrite.module.css";
import usePostApi from "../../api/usePostApi";

type NavState = { salonName?: string };

const ACTIVE_STYLE: ButtonStyles = { color: "#ffffff", fontWeight: 600 };
const DISABLED_STYLE: ButtonStyles = {
  color: "#787878",
  backgroundColor: "#e6e6e6",
  fontWeight: 600,
};

const ReviewWrite = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { state } = useLocation() as { state: NavState };
  const salonName = state?.salonName ?? "매장명";

  const [rating, setRating] = useState<number>(5);
  const [files, setFiles] = useState<File[]>([]);
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [, forceRender] = useState(0);

  const { mutate, isPending } = usePostApi(
    "review",
    "/interaction/reviews",
    true,
    "multipart"
  );

  const has_text = () => {
    const el = editorRef.current;
    if (!el) return false;
    return (el.textContent || "").trim() !== "";
  };

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
      const img = document.createElement("img");
      img.src = url;
      img.alt = "첨부 이미지";
      img.className = styles.inline_img;
      editorRef.current?.appendChild(img);
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
    editorRef.current?.focus();
  };

  const handle_submit = () => {
    if (!id) {
      alert("예약 ID가 없습니다.");
      return;
    }

    const body = {
      appointmentId: id,
      reviewRating: String(rating),
      reviewContent: editorRef.current?.innerText || "",
    };

    const file = files.length > 0 ? files[0] : undefined;

    mutate(
      { body, file, fileKey: "reviewImage" },
      {
        onSuccess: () => {
          navigate("done", { replace: true });
        },
        onError: (error) => {
          console.error("리뷰 등록 실패:", error);
          alert("리뷰 등록에 실패했습니다. 다시 시도해주세요.");
        },
      }
    );
  };

  const is_active = has_text();

  return (
    <div className={styles.screen}>
      <div className={styles.stars}>
        {Array.from({ length: 5 }).map((_, i) => {
          const score = i + 1;
          const filled = score <= rating;
          return (
            <button
              key={score}
              type="button"
              className={styles.star_btn}
              onClick={() => setRating(score)}
              aria-label={`${score}점`}
              aria-pressed={filled}
            >
              <img
                src={filled ? pinkStar : grayStar}
                alt=""
                className={styles.star_img}
              />
            </button>
          );
        })}
      </div>

      <h1 className={styles.title}>
        {salonName}
        <br />
        리뷰를 작성해주세요.
      </h1>
      <p className={styles.desc}>
        작성된 리뷰는 가게와 디자이너에게 기록됩니다.
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
              ex) 요구사항을 디테일하게 들어주셔서
              <br /> 원하던 스타일이 잘 나왔어요!
            </p>
          </div>
        )}

        <div
          ref={editorRef}
          className={styles.editor}
          contentEditable
          onInput={() => forceRender((n) => n + 1)}
          aria-label="리뷰 입력"
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
          elements={{
            content: "리뷰 등록",
            handleClick: handle_submit,
          }}
          style={is_active ? ACTIVE_STYLE : DISABLED_STYLE}
          disabled={!is_active || isPending}
        />
      </div>
    </div>
  );
};

export default ReviewWrite;
