import { ButtonProps } from "../../../types/common/button";
import styles from "./Button.module.css";

const Button = ({
    elements,
    style,
    icon,
    iconPosition = "left",
}: ButtonProps & {
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
}) => {
    const { content, handleClick } = elements;
    const width = style?.width ? style.width : 400;
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
            style={{
                width: `${width}px`,
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
            }}
            className={styles.common_button}
            onClick={handleClick}
        >
            {icon && iconPosition === "left" && <span>{icon}</span>}
            <span>{content}</span>
            {icon && iconPosition === "right" && <span>{icon}</span>}
        </button>
    );
};

export default Button;
