import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import designer from "../../assets/images/designer.png";
import designer2 from "../../assets/images/designer2.png";
import designer3 from "../../assets/images/designer3.png";
import designer4 from "../../assets/images/designer4.png";
import Button from "../../components/common/button/Button";
import DesignerSelect, {
  DesignerItem,
} from "../../components/stylistServiceSelect/DesignerSelect";
import StyleSelect, {
  ServiceItem,
} from "../../components/stylistServiceSelect/StyleSelect";
import BackHeader from "../../layout/backHeader/BackHeader";
import type { ButtonStyles } from "../../types/common/button";
import styles from "./StylistServiceSelectPage.module.css";

interface Designer {
  designerId: string;
  nickname?: string;
}

// 기본 디자이너 이미지 배열 (현재 api에서 이미지는 보내주지 않아서 남겨둠)
const defaultAvatars = [designer, designer2, designer3, designer4];

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

const STYLE: ButtonStyles = { color: "#ffffff", fontWeight: 500 };

const StylistServiceSelectPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const shopId = location.state?.shopId || "";
  const shopName = location.state?.shopName || "";
  const designerId = location.state?.designerId || "";
  const apiDesigners = location.state?.designers as Designer[] | undefined;
  const reservationType = location.state?.reservationType || "normal";

  const [selectedService, setSelectedService] = useState<string>("");

  // API 데이터를 DesignerItem 형식으로 변환
  const designers = useMemo<DesignerItem[]>(() => {
    if (apiDesigners && apiDesigners.length > 0) {
      return apiDesigners.map((d, index) => ({
        id: d.designerId,
        name: d.nickname || "디자이너",
        subtitle: "디자이너",
        avatar: defaultAvatars[index % defaultAvatars.length],
      }));
    }
    return [];
  }, [apiDesigners]);

  const [selectedDesigner, setSelectedDesigner] = useState<string>("");

  useEffect(() => {
    if (designers.length === 0) return;

    const validDesigner = designers.find((d) => d.id === designerId);

    if (validDesigner) {
      setSelectedDesigner(designerId);
    } else {
      setSelectedDesigner("");
    }
  }, [designers, designerId]);

  const handleReservation = () => {
    if (!selectedService) return;
    const service = services.find((s) => s.id === selectedService);

    navigate("/select-schedule", {
      state: {
        reservationType,
        shopId,
        shopName,
        serviceName: service?.name ?? "",
        designerId: selectedDesigner,
      },
    });
  };

  const buttonElements = {
    content: "다음",
    handleClick: handleReservation,
  };

  return (
    <div className={styles.screen}>
      <BackHeader />
      <DesignerSelect
        items={designers}
        value={selectedDesigner}
        onChange={(id) => setSelectedDesigner(id)}
      />
      <StyleSelect
        items={services}
        onChange={(item) => setSelectedService(item.id)}
      />

      <div className={styles.button_group}>
        <Button elements={buttonElements} style={STYLE} />
      </div>
    </div>
  );
};

export default StylistServiceSelectPage;
