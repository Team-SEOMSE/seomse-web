import { ReactNode, useState } from "react";
import styles from "./SelectGroup.module.css";

interface SelectGroupProps {
    label: string;
    options: string[];
    optionIcons?: ReactNode[];
    multiple?: boolean;
    onChange?: (selected: string[] | string) => void;
}

const SelectGroup = ({
    label,
    options,
    optionIcons = [],
    multiple = false,
    onChange,
}: SelectGroupProps) => {
    const [selected, setSelected] = useState<string[]>([]);

    const handleClick = (option: string) => {
        let newSelected: string[];

        if (multiple) {
            newSelected = selected.includes(option)
                ? selected.filter((v) => v !== option)
                : [...selected, option];
        } else {
            newSelected = [option];
        }

        setSelected(newSelected);
        if (onChange) {
            onChange(multiple ? newSelected : newSelected[0]);
        }
    };

    return (
        <div className={styles.group}>
            <p className={styles.label}>{label}</p>
            <div
                className={`${styles.options} ${
                    options.length >= 3 ? styles.threeOrMore : ""
                }`}
            >
                {options.map((option, idx) => (
                    <button
                        key={option}
                        type="button"
                        className={`${styles.option} ${
                            selected.includes(option) ? styles.selected : ""
                        }`}
                        onClick={() => handleClick(option)}
                    >
                        <span>{option}</span>
                        {optionIcons[idx] && (
                            <span className={styles.option_icon}>
                                {optionIcons[idx]}
                            </span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SelectGroup;
