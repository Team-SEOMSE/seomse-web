import { ButtonProps } from "../../../types/common/button";
import styles from "./Button.module.css";

const Button = ({
    elements,
    style,
    icon,
    iconPosition = "left",
    disabled = false,
}: ButtonProps & {
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    disabled?: boolean;
}) => {
    const { content, handleClick } = elements;
    const width =
        typeof style?.width === "number"
            ? `${style.width}px`
            : style?.width || "100%";

    const height = style?.height ? style.height : 50;
    const fontSize = style?.fontSize ? style.fontSize : 16;
    const fontWeight = style?.fontWeight ? style.fontWeight : 400;
    const lineHeight = style?.lineHeight ? style.lineHeight : 22;
    const color = style?.color ? style.color : "#FFFFFF";
    const bgColor = style?.backgroundColor ? style.backgroundColor : "#ff3871";
    const border = style?.border ? style.border : "none";
    const borderRadius = style?.borderRadius ? style.borderRadius : 0;

    return (
        <button
            disabled={disabled}
            style={{
                width: width,
                height: `${height}px`,
                fontSize: `${fontSize}px`,
                fontWeight: `${fontWeight}`,
                lineHeight: `${lineHeight}px`,
                color: color,
                backgroundColor: bgColor,
                border: border,
                borderRadius: `${borderRadius}px`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                opacity: disabled ? 0.5 : 1,
                cursor: disabled ? "not-allowed" : "pointer",
            }}
            className={styles.common_button}
            onClick={disabled ? undefined : handleClick}
        >
            {icon && iconPosition === "left" && <span>{icon}</span>}
            <span>{content}</span>
            {icon && iconPosition === "right" && <span>{icon}</span>}
        </button>
    );
};

export default Button;
