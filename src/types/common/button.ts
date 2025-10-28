export interface ButtonElements {
    content: string;
    handleClick?: () => void;
}

export interface ButtonStyles {
    width?: number;
    height?: number;
    fontSize?: number;
    fontWeight?: number;
    lineHeight?: number;
    color?: string;
    backgroundColor?: string;
    border?: string;
    borderRadius?: number;
}

export interface ButtonProps {
    elements: ButtonElements;
    style?: ButtonStyles;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
}
