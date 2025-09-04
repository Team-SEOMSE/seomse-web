import { useEffect, useState } from "react";
import styles from "./DesignerSelect.module.css";

export type DesignerItem = {
    id: string;
    name: string;
    subtitle?: string;
    avatar: string;
};

type Props = {
    items: DesignerItem[];
    title?: string;
    onChange?: (id: string) => void;
};

const DesignerSelect = ({ items, title = "디자이너", onChange }: Props) => {
    const [selected, setSelected] = useState<string>(() => items[0]?.id ?? "");

    useEffect(() => {
        if (!items.length) {
            setSelected("");
            return;
        }
        const exists = items.some((it) => it.id === selected);
        if (!exists) {
            setSelected(items[0].id);
            onChange?.(items[0].id);
        }
    }, [items]);

    const select = (id: string) => {
        setSelected(id);
        onChange?.(id);
    };

    return (
        <section className={styles.designer_section}>
            <h3 className={styles.designer_title}>{title}</h3>

            <div className={styles.designer_list}>
                {items.map((it) => (
                    <button
                        key={it.id}
                        type="button"
                        className={`${styles.designer_item} ${
                            selected === it.id ? styles.is_selected : ""
                        }`}
                        onClick={() => select(it.id)}
                    >
                        <img
                            className={styles.designer_avatar}
                            src={it.avatar}
                            alt={it.name}
                            onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src =
                                    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96'><rect width='100%' height='100%' fill='%23eee'/><text x='50%' y='52%' text-anchor='middle' font-size='12' fill='%23999'>no image</text></svg>";
                            }}
                        />
                        <span className={styles.designer_name}>
                            <span className={styles.designer_name_main}>
                                {it.name}
                            </span>
                            {it.subtitle && <span>{it.subtitle}</span>}
                        </span>
                    </button>
                ))}
            </div>
        </section>
    );
};

export default DesignerSelect;
