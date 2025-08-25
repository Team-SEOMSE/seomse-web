import { SyntheticEvent, useState } from "react";
import { ReactComponent as Invisible } from "../../../assets/svg/invisible.svg";
import { ReactComponent as Visible } from "../../../assets/svg/visible.svg";

import styles from "./InputForm.module.scss";

interface Props {
    content: string;
    setLoginState: React.Dispatch<React.SetStateAction<string>>;
    type?: string;
    placeholder: string;
    alertMessage?: string;
    defaultValue?: string;
}

const InputForm = ({
    type = "text",
    content,
    placeholder,
    setLoginState,
    alertMessage,
}: Props) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible((prev) => !prev);

    const isPasswordField = type === "password";

    return (
        <div className={styles.login_form}>
            <label htmlFor={content}>{content}</label>
            <div className={styles.input_wrapper}>
                <input
                    id={content}
                    name={content}
                    type={isPasswordField && isVisible ? "text" : type}
                    placeholder={placeholder}
                    onChange={(target: SyntheticEvent<HTMLInputElement>) =>
                        setLoginState(target.currentTarget.value)
                    }
                    autoComplete="off"
                />
                {isPasswordField && (
                    <button
                        type="button"
                        className={styles.eye_toggle}
                        onClick={toggleVisibility}
                        aria-label={
                            isVisible ? "비밀번호 숨기기" : "비밀번호 보기"
                        }
                    >
                        {isVisible ? <Visible /> : <Invisible />}
                    </button>
                )}
            </div>
            {alertMessage && (
                <p className={styles.alert_text}>{alertMessage}</p>
            )}
        </div>
    );
};

export default InputForm;
