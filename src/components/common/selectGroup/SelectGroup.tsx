import { ReactNode, useState, useEffect } from "react";
import styles from "./SelectGroup.module.css";

interface SelectGroupProps {
  label: string;
  desc?: string;
  options: string[];
  optionIcons?: ReactNode[];
  multiple?: boolean;
  value?: string | string[];
  onChange?: (selected: string[] | string) => void;
}

const SelectGroup = ({
  label,
  desc,
  options,
  optionIcons = [],
  multiple = false,
  value,
  onChange,
}: SelectGroupProps) => {
  const [selected, setSelected] = useState<string[]>([]);
  
  useEffect(() => {
    if (value) {
      if (Array.isArray(value)) {
        setSelected(value);
      } else if (value) {
        setSelected([value]);
      }
    }
  }, [value]);

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
      <p className={styles.desc}>{desc}</p>
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
              <span className={styles.option_icon}>{optionIcons[idx]}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectGroup;
