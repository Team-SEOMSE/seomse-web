import DesignerSelect, {
    DesignerItem,
} from "../../components/stylistServiceSelect/DesignerSelect";
import StyleSelect, {
    ServiceItem,
} from "../../components/stylistServiceSelect/StyleSelect";
import BackHeader from "../../layout/backHeader/BackHeader";
import styles from "./StylistServiceSelectPage.module.css";

const designers: DesignerItem[] = [
    { id: "1", name: "섬세", subtitle: "디자이너", avatar: "/img/d1.jpg" },
    { id: "2", name: "수아", subtitle: "디자이너", avatar: "/img/d2.jpg" },
    { id: "3", name: "연우", subtitle: "디자이너", avatar: "/img/d3.jpg" },
    { id: "4", name: "하린", subtitle: "디자이너", avatar: "/img/d4.jpg" },
];

const services: ServiceItem[] = [
    {
        id: "s1",
        name: "앞머리 컷",
        price: 5000,
        discount_percent: 40,
        discounted_price: 3000,
        category: "cut",
    },
    {
        id: "s2",
        name: "여성 디자이너 컷",
        price: 30000,
        discount_percent: 10,
        discounted_price: 27000,
        category: "cut",
    },
    {
        id: "s3",
        name: "남성 컷",
        price: 25000,
        discount_percent: 12,
        discounted_price: 22000,
        category: "cut",
    },
    {
        id: "p1",
        name: "베이직 펌",
        price: 60000,
        discount_percent: 15,
        discounted_price: 51000,
        category: "perm",
    },
    {
        id: "p2",
        name: "셋팅 펌",
        price: 80000,
        discount_percent: 20,
        discounted_price: 64000,
        category: "perm",
    },
    {
        id: "p3",
        name: "볼륨 매직",
        price: 100000,
        discount_percent: 25,
        discounted_price: 75000,
        category: "perm",
    },
];

const StylistServiceSelectPage = () => {
    return (
        <div className={styles.screen}>
            <BackHeader />
            <DesignerSelect items={designers} />
            <StyleSelect items={services} />
        </div>
    );
};

export default StylistServiceSelectPage;
