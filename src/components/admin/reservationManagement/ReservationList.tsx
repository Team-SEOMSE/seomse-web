import useGetApi from "../../../api/useGetApi";
import ReservationCard from "./ReservationCard";
import styles from "./ReservationList.module.css";

interface Appointment {
    appointmentId: string;
    appointmentDate: string;
    shopName: string;
    designerNickname: string;
    serviceName: string;
}

interface AppointmentsResponse {
    data: Appointment[];
}

const formatDate = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleDateString("ko-KR", {
        month: "2-digit",
        day: "2-digit",
        weekday: "short",
    });
};

const formatTime = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleTimeString("ko-KR", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
};

const ReservationList = () => {
    const { data } = useGetApi("appointments", "/interaction/appointments");
    const list: Appointment[] = (data as AppointmentsResponse)?.data ?? [];

    return (
        <section className={styles.section}>
            <p className={styles.title}>
                예약리스트 <span>{list.length}</span>건
            </p>

            {list.map((it) => (
                <ReservationCard
                    key={it.appointmentId}
                    appointmentId={it.appointmentId}
                    date={formatDate(it.appointmentDate)}
                    time={formatTime(it.appointmentDate)}
                    designerNickname={it.designerNickname}
                    serviceName={it.serviceName}
                    status="방문확정"
                />
            ))}
        </section>
    );
};

export default ReservationList;
