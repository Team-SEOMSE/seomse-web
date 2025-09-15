import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Calendar } from "../../assets/svg/calendar.svg";
import { ReactComponent as Logout } from "../../assets/svg/logout.svg";
import { removeCookie } from "../../hooks/useCookie";
import MenuItem from "./MenuItem";
import styles from "./MyPageSection.module.css";

const MyPageSection = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const handleLogout = () => {
        removeCookie("accessToken");
        queryClient.clear();
        navigate("/kakao-login");
    };

    return (
        <div className={styles.section}>
            <div className={styles.wrap}>
                <MenuItem
                    icon={Calendar}
                    title="예약 내역"
                    label="예약"
                    onClick={() => navigate("reservations")}
                />
                <MenuItem
                    icon={Logout}
                    title="로그아웃"
                    label="이용"
                    onClick={handleLogout}
                />
            </div>
        </div>
    );
};

export default MyPageSection;
