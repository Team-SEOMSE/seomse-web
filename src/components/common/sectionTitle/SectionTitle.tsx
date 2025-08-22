import styles from "./SectionTitle.module.css";

type SectionTitleProps = {
    children: React.ReactNode;
};

const SectionTitle = ({ children }: SectionTitleProps) => (
    <h2 className={styles.title}>{children}</h2>
);

export default SectionTitle;
