import {
    forwardRef,
    ReactNode,
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
    name?: string;
    avatarSrc?: string;
};

export type SwiperHandle = {
    scrollTo: (index: number, opts?: ScrollToOptions) => void;
    getIndex: () => number;
    getTrackEl: () => HTMLDivElement | null;
    getProgress: () => number;
    prev: () => void;
    next: () => void;
};

type SwiperProps = {
    items: SwiperItem[];
    aspect?: "auto" | string;
    fit?: "cover" | "contain" | "none";
    ariaLabel?: string;
    onIndexChange?: (i: number) => void;
    loop?: boolean;
    autoPlayMs?: number | null;
    renderItem?: (item: SwiperItem, index: number) => ReactNode;
    slideWidth?: string | number;
    gap?: string | number;
    showDots?: boolean;
};

function clamp(n: number, min: number, max: number) {
    return Math.min(max, Math.max(min, n));
}

const Swiper = forwardRef<SwiperHandle, SwiperProps>(function Swiper(
    props,
    ref
) {
    const {
        items,
        aspect = "auto",
        fit = "contain",
        ariaLabel = "swiper",
        onIndexChange,
        loop = false,
        autoPlayMs = null,
        renderItem,
        slideWidth,
        gap,
        showDots = false,
    } = props;

    const trackRef = useRef<HTMLDivElement>(null);

    const withClones = loop && items.length > 1;
    const renderItems = withClones
        ? [items[items.length - 1], ...items, items[0]]
        : items;

    const [vIndex, setVIndex] = useState(withClones ? 1 : 0);
    const [progress, setProgress] = useState(0);

    const vIndexRef = useRef(vIndex);
    useEffect(() => {
        vIndexRef.current = vIndex;
    }, [vIndex]);

    const realFromVirtual = (vi: number) => {
        if (!withClones) return vi;
        if (vi === 0) return items.length - 1;
        if (vi === renderItems.length - 1) return 0;
        return vi - 1;
    };
    const virtualFromReal = (ri: number) => (withClones ? ri + 1 : ri);

    const computeVIndex = () => {
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

    const snapToVirtual = (vi: number, opts?: ScrollToOptions) => {
        const el = trackRef.current;
        if (!el) return;
        const safe = clamp(vi, 0, renderItems.length - 1);
        el.scrollTo({
            left: el.clientWidth * safe,
            behavior: "smooth",
            ...opts,
        });
    };

    const onScroll = () => {
        const vi = computeVIndex();
        if (vi !== vIndex) {
            setVIndex(vi);
            onIndexChange?.(realFromVirtual(vi));
        }
        setProgress(computeProgress());

        if (withClones) {
            const lastVi = renderItems.length - 1;
            if (vi === 0) snapToVirtual(items.length, { behavior: "auto" });
            else if (vi === lastVi) snapToVirtual(1, { behavior: "auto" });
        }
    };

    useEffect(() => {
        snapToVirtual(vIndex, { behavior: "auto" });
        setProgress(computeProgress());
    }, []);

    useEffect(() => {
        if (!autoPlayMs || autoPlayMs <= 0) return;
        const id = setInterval(() => {
            const cur = vIndexRef.current;
            if (withClones) {
                snapToVirtual(cur + 1);
            } else {
                const real = realFromVirtual(cur);
                const nextReal = (real + 1) % items.length;
                const vi = virtualFromReal(nextReal);
                snapToVirtual(vi, {
                    behavior: nextReal === 0 ? "auto" : "smooth",
                });
            }
        }, autoPlayMs);
        return () => clearInterval(id);
    }, [autoPlayMs, withClones, items.length]);

    useImperativeHandle(
        ref,
        () => ({
            scrollTo: (realIndex, opts) =>
                snapToVirtual(virtualFromReal(realIndex), opts),
            getIndex: () => realFromVirtual(vIndex),
            getTrackEl: () => trackRef.current,
            getProgress: () => progress,
            prev: () => snapToVirtual(vIndexRef.current - 1),
            next: () => snapToVirtual(vIndexRef.current + 1),
        }),
        [progress, withClones]
    );

    return (
        <div className={styles.swiper}>
            <div
                ref={trackRef}
                className={styles.track}
                onScroll={onScroll}
                aria-roledescription="carousel"
                aria-label={ariaLabel}
                style={{
                    gridAutoColumns:
                        slideWidth == null
                            ? "100%"
                            : typeof slideWidth === "number"
                            ? `${slideWidth}px`
                            : slideWidth,
                    gap:
                        gap == null
                            ? 0
                            : typeof gap === "number"
                            ? `${gap}px`
                            : gap,
                }}
            >
                {renderItems.map((it, i) => (
                    <div
                        key={i}
                        className={styles.slide}
                        aria-current={vIndex === i}
                        style={
                            aspect === "auto"
                                ? undefined
                                : { aspectRatio: aspect }
                        }
                    >
                        {renderItem ? (
                            renderItem(it, i)
                        ) : (
                            <img
                                className={`${styles.img} ${
                                    fit === "none"
                                        ? styles.imgNone
                                        : fit === "contain"
                                        ? styles.imgContain
                                        : styles.imgCover
                                }`}
                                src={it.src}
                                alt={it.alt ?? it.title ?? `slide ${i + 1}`}
                            />
                        )}
                    </div>
                ))}
            </div>

            {showDots && (
                <div className={styles.dots}>
                    {items.map((_, i) => {
                        const realIndex = realFromVirtual(vIndex);
                        return (
                            <span
                                key={i}
                                className={`${styles.dot} ${
                                    realIndex === i ? styles.activeDot : ""
                                }`}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
});

export default Swiper;
export type { SwiperProps };
