import styles from "./ResultSection.module.css";

type ResultSectionProps = {
    title: string;
    name: string;
    description: string;
};

const ResultSection = ({ title, name, description }: ResultSectionProps) => {
    return (
        <section className={styles.result_section}>
            <h2 className={styles.result_subtitle}>{title}</h2>
            <p className={styles.result_name}>{name}</p>
            <p className={styles.result_description}>{description}</p>
        </section>
    );
};

export default ResultSection;
