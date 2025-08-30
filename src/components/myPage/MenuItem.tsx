import styles from "./MenuItem.module.css";
import type { ComponentType, SVGProps } from "react";

type SvgComp = ComponentType<SVGProps<SVGSVGElement>>;

type Props = {
  icon: string | SvgComp;
  title: string;
  onClick?: () => void;
  iconAlt?: string;
  label: string;
};

const MenuItem = ({ icon, title, onClick, iconAlt = "", label }: Props) => {
  const isString = typeof icon === "string";
  const Icon = !isString ? (icon as SvgComp) : null;

  return (
    <div className={styles.wrap}>
      {label && <span className={styles.label}>{label}</span>}

      <button
        type="button"
        className={styles.item}
        onClick={onClick}
        aria-label={title}
      >
        {isString ? (
          <img className={styles.icon} src={icon as string} alt={iconAlt} />
        ) : Icon ? (
          <Icon className={styles.iconSvg} aria-hidden />
        ) : null}

        <span className={styles.title}>{title}</span>
      </button>
    </div>
  );
};

export default MenuItem;
