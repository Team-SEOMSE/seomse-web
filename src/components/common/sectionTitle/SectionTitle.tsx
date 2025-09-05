import styles from "./SectionTitle.module.css";

type SectionTitleProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
};

const SectionTitle = ({ children, icon }: SectionTitleProps) => (
  <h2 className={styles.title}>
    {icon && <span className={styles.icon}>{icon}</span>}
    <span className={styles.text}>{children}</span>
  </h2>
);

export default SectionTitle;
