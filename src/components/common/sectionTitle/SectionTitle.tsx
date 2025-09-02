import styles from "./SectionTitle.module.css";

type SectionTitleProps = {
    children: React.ReactNode;
    icon?: React.ReactNode;
    sideSlot?: React.ReactNode;
};

const SectionTitle = ({ children, icon, sideSlot }: SectionTitleProps) => (
    <h2 className={styles.title}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.text}>{children}</span>
        {sideSlot}
    </h2>
);

export default SectionTitle;
