import { SyntheticEvent, useState, useEffect } from "react";
import { ReactComponent as Invisible } from "../../assets/svg/invisible.svg";
import { ReactComponent as Visible } from "../../assets/svg/visible.svg";
import styles from "./InputForm.module.css";

interface Props {
  content: string;
  setLoginState: (value: string) => void;
  type?: string;
  placeholder: string;
  alertMessage?: string;
  defaultValue?: string;
  required?: boolean;
  hasError?: boolean;
}

const InputForm = ({
  type = "text",
  content,
  placeholder,
  setLoginState,
  alertMessage,
  defaultValue = "",
  required = false,
  hasError = false,
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [touched, setTouched] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue);

  useEffect(() => {
    setInputValue(defaultValue);
  }, [defaultValue]);

  const toggleVisibility = () => setIsVisible((prev) => !prev);
  const isPasswordField = type === "password";

  const showError = (alertMessage || hasError) && touched;

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setInputValue(value);
    setLoginState(value);
  };

  return (
    <div className={styles.input_form}>
      <label htmlFor={content}>
        {content}
        {required && (
          <span style={{ color: "#FF2B2B", marginLeft: "2px" }}>*</span>
        )}
      </label>

      <div className={styles.input_row}>
        <input
          id={content}
          name={content}
          className={showError ? styles.input_error : undefined}
          type={isPasswordField && isVisible ? "text" : type}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          onBlur={() => setTouched(true)}
          autoComplete="off"
        />

        {isPasswordField && (
          <button
            type="button"
            className={styles.eye_toggle}
            onClick={toggleVisibility}
            aria-label={isVisible ? "비밀번호 숨기기" : "비밀번호 보기"}
          >
            {isVisible ? <Visible /> : <Invisible />}
          </button>
        )}
      </div>

      {showError && <p className={styles.alert_text}>{alertMessage}</p>}
    </div>
  );
};

export default InputForm;
