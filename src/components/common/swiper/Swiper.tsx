import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import styles from "./Swiper.module.css";

export type SwiperItem = {
    src: string;
    alt?: string;
    title?: string;
    subtitle?: string;
};

export type SwiperHandle = {
    scrollTo: (index: number, opts?: ScrollToOptions) => void;
    getIndex: () => number;
    getTrackEl: () => HTMLDivElement | null;
    getProgress: () => number; // 0 ~ 1
    prev: () => void;
    next: () => void;
};

type SwiperProps = {
    items: SwiperItem[];
    aspect?: string;
    showDots?: boolean;
    showProgress?: boolean;
    ariaLabel?: string;
    onIndexChange?: (i: number) => void;
};

function clamp(n: number, min: number, max: number) {
    return Math.min(max, Math.max(min, n));
}

const Swiper = forwardRef<SwiperHandle, SwiperProps>(function Swiper(
    {
        items,
        aspect = "3 / 4",
        showDots = true,
        showProgress = true,
        ariaLabel = "이미지 스와이퍼",
        onIndexChange,
    },
    ref
) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    const computeIndex = () => {
        const el = trackRef.current;
        if (!el) return 0;
        return Math.round(el.scrollLeft / el.clientWidth);
    };

    const computeProgress = () => {
        const el = trackRef.current;
        if (!el) return 0;
        const max = el.scrollWidth - el.clientWidth;
        return max > 0 ? el.scrollLeft / max : 0;
    };

    const onScroll = () => {
        const i = computeIndex();
        setIndex((prev) => {
            if (prev !== i) onIndexChange?.(i);
            return i;
        });
        setProgress(computeProgress());
    };

    const goTo = (i: number, opts?: ScrollToOptions) => {
        const el = trackRef.current;
        if (!el) return;
        const safe = clamp(i, 0, items.length - 1);
        el.scrollTo({
            left: el.clientWidth * safe,
            behavior: "smooth",
            ...opts,
        });
    };

    useEffect(() => {
        const onResize = () => {
            const el = trackRef.current;
            if (!el) return;
            el.scrollTo({ left: el.clientWidth * index });
            setProgress(computeProgress());
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [index]);

    useImperativeHandle(
        ref,
        () => ({
            scrollTo: goTo,
            getIndex: () => index,
            getTrackEl: () => trackRef.current,
            getProgress: () => progress,
            prev: () => goTo(index - 1),
            next: () => goTo(index + 1),
        }),
        [index, progress]
    );

    return (
        <div className={styles.swiper}>
            {showProgress && (
                <div className={styles.progress} aria-hidden>
                    <div
                        className={styles.progressInner}
                        style={{ transform: `scaleX(${progress || 0})` }}
                    />
                </div>
            )}

            <div
                ref={trackRef}
                className={styles.track}
                onScroll={onScroll}
                aria-roledescription="carousel"
                aria-label={ariaLabel}
            >
                {items.map((it, i) => (
                    <div
                        key={i}
                        className={styles.slide}
                        aria-current={index === i}
                        style={{ aspectRatio: aspect }}
                    >
                        <img
                            className={styles.img}
                            src={it.src}
                            alt={it.alt ?? it.title ?? `slide ${i + 1}`}
                        />
                        <div className={styles.overlay} />
                        {(it.title || it.subtitle) && (
                            <div className={styles.caption}>
                                {it.title && (
                                    <div className={styles.title}>
                                        {it.title}
                                    </div>
                                )}
                                {it.subtitle && (
                                    <div className={styles.subtitle}>
                                        {it.subtitle}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {showDots && (
                <div
                    className={styles.dots}
                    role="tablist"
                    aria-label="슬라이드 이동"
                >
                    {items.map((_, i) => (
                        <button
                            key={i}
                            role="tab"
                            aria-selected={index === i}
                            className={`${styles.dot} ${
                                index === i ? styles.active : ""
                            }`}
                            onClick={() => goTo(i)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
});

export default Swiper;
