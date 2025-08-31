import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ButtonStyles } from "../../types/common/button";
import Button from "../../components/common/button/Button";
import preiview from "../../assets/svg/previewImg.svg";
import styles from "./DetailedRequest.module.css";
import BackHeader from "../../layout/backHeader/BackHeader";

const STYLE: ButtonStyles = { color: "#ffffff", fontWeight: 600 };

const DetailedRequest = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [, forceRender] = useState(0);

  const is_empty_for_placeholder = () => {
    const el = editorRef.current;
    if (!el) return true;
    const no_text = (el.textContent || "").trim() === "";
    const no_img = !el.querySelector("img");
    return no_text && no_img;
  };

  const place_caret_at_end = (el: HTMLElement) => {
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
  };

  const ensure_caret_in_editor = () => {
    const el = editorRef.current;
    if (!el) return;
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || !el.contains(sel.anchorNode)) {
      el.focus();
      place_caret_at_end(el);
    }
  };

  const insert_image_at_cursor = (url: string) => {
    const el = editorRef.current;
    if (!el) return;
    ensure_caret_in_editor();

    const img = document.createElement("img");
    img.src = url;
    img.alt = "첨부 이미지";
    img.className = styles.inline_img;

    const sel = window.getSelection();
    const range = sel && sel.rangeCount > 0 ? sel.getRangeAt(0) : null;
    if (range) {
      range.collapse(false);
      range.insertNode(img);
      const spacer = document.createElement("div");
      spacer.appendChild(document.createElement("br"));
      img.after(spacer);
      const next = document.createRange();
      next.setStart(spacer, 0);
      next.collapse(true);
      sel!.removeAllRanges();
      sel!.addRange(next);
    } else {
      el.appendChild(img);
    }
    forceRender((n) => n + 1);
  };

  // ✅ 파일 업로드 처리
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

  // ✅ 제출 + 이동
  const handle_submit = async () => {
    const fd = new FormData();
    fd.append("contentHtml", editorRef.current?.innerHTML || "");
    fd.append("contentText", editorRef.current?.innerText || "");
    files.forEach((f, i) => fd.append("images", f, f.name || `img-${i}`));

    try {
      await fetch("/api/reservation/request", {
        method: "POST",
        body: fd,
      });
      navigate("/reservation", {
        replace: true,
        state: {
          confirmed: true,
          shopName: "박승철 헤어샵 강남점",
          serviceName: "볼륨매직",
        },
      });
    } catch (err) {
      console.error("제출 실패:", err);
      alert("제출에 실패했습니다. 다시 시도해주세요.");
    }
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
          onInput={() => forceRender((n) => n + 1)}
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
          elements={{
            content: "다음",
            handleClick: handle_submit,
          }}
          style={STYLE}
        />
      </div>
    </div>
  );
};

export default DetailedRequest;
