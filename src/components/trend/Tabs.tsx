import { useEffect, useRef, useState } from "react";
import styles from "./Tabs.module.css";

export type TabItem = { key: string; label: string };

type Props = {
    items?: TabItem[];
    value?: string;
    defaultValue?: string;
    onChange?: (key: string) => void;
    className?: string;
};

const DEFAULT_ITEMS: TabItem[] = [
    { key: "all", label: "전체" },
    { key: "short", label: "단발" },
    { key: "long", label: "긴머리" },
    { key: "wave", label: "웨이브" },
    { key: "layer", label: "레이어드컷" },
];

const Tabs = ({
    items = DEFAULT_ITEMS,
    value,
    defaultValue,
    onChange,
    className,
}: Props) => {
    const controlled = value !== undefined;
    const [inner, setInner] = useState<string>(
        value ?? defaultValue ?? items[0]?.key ?? ""
    );
    const current = controlled ? (value as string) : inner;

    useEffect(() => {
        if (!controlled && !inner && items[0]) setInner(items[0].key);
    }, [controlled, inner, items]);

    const activeRef = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        activeRef.current?.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest",
        });
    }, [current]);

    const handleChange = (k: string) => {
        if (!controlled) setInner(k);
        onChange?.(k);
    };

    return (
        <div
            className={`${styles.wrap} ${className ?? ""}`}
            role="tablist"
            aria-orientation="horizontal"
        >
            {items.map((it) => {
                const active = it.key === current;
                return (
                    <button
                        key={it.key}
                        ref={active ? activeRef : undefined}
                        type="button"
                        className={`${styles.chip} ${
                            active ? styles.active : ""
                        }`}
                        role="tab"
                        aria-selected={active}
                        onClick={() => handleChange(it.key)}
                    >
                        {it.label}
                    </button>
                );
            })}
        </div>
    );
};

export default Tabs;
