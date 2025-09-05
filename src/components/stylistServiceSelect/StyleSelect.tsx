import { useEffect, useMemo, useState } from "react";
import Tabs from "../trend/Tabs";
import styles from "./StyleSelect.module.css";

export type ServiceItem = {
    id: string;
    name: string;
    price: number;
    discount_percent?: number;
    discounted_price?: number;
    category: "cut" | "perm" | string;
};

type Props = {
    items: ServiceItem[];
    title?: string;
    defaultCategory?: "cut" | "perm" | string;
    onChange?: (item: ServiceItem) => void;
};

const formatWon = (n: number) => `${n.toLocaleString("ko-KR")}원`;

const calcDiscount = (item: ServiceItem) => {
    if (typeof item.discounted_price === "number") return item.discounted_price;
    if (typeof item.discount_percent === "number")
        return (
            Math.round((item.price * (1 - item.discount_percent / 100)) / 10) *
            10
        );
    return item.price;
};

const StyleSelect = ({
    items,
    title = "스타일",
    defaultCategory = "cut",
    onChange,
}: Props) => {
    const [category, setCategory] = useState<string>(defaultCategory);
    const filtered = useMemo(
        () => items.filter((i) => i.category === category),
        [items, category]
    );
    const [selected, setSelected] = useState<string>("");

    useEffect(() => {
        const first = filtered[0] ?? null;
        setSelected(first?.id ?? "");
        if (first) onChange?.(first);
    }, [category, filtered]);

    const select = (item: ServiceItem) => {
        setSelected(item.id);
        onChange?.(item);
    };

    return (
        <div className={styles.section}>
            <h3 className={styles.title}>{title}</h3>
            <Tabs
                items={[
                    { key: "cut", label: "커트" },
                    { key: "perm", label: "펌" },
                ]}
                defaultValue={category}
                onChange={(key: string) => setCategory(key)}
            />

            <ul
                className={styles.service_list}
                role="radiogroup"
                aria-label={title}
            >
                {filtered.map((it) => {
                    const isSelected = selected === it.id;
                    const discounted = calcDiscount(it);
                    const hasDiscount = discounted < it.price;

                    return (
                        <li
                            key={it.id}
                            className={`${styles.service_item} ${
                                isSelected ? styles.is_selected : ""
                            }`}
                            role="radio"
                            aria-checked={isSelected}
                            onClick={() => select(it)}
                        >
                            <span
                                className={styles.service_check}
                                aria-hidden="true"
                            />
                            <div className={styles.service_body}>
                                <div className={styles.service_name}>
                                    {it.name}
                                </div>
                                <div className={styles.service_price_row}>
                                    {hasDiscount && (
                                        <span
                                            className={
                                                styles.service_discount_percent
                                            }
                                        >
                                            {it.discount_percent ?? ""}%
                                        </span>
                                    )}
                                    <span
                                        className={
                                            styles.service_discount_price
                                        }
                                    >
                                        {formatWon(discounted)}
                                    </span>
                                    {hasDiscount && (
                                        <span
                                            className={
                                                styles.service_original_price
                                            }
                                        >
                                            {formatWon(it.price)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default StyleSelect;
