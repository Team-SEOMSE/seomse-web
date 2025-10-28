export interface Appointment {
    appointmentId: string;
    shopName: string;
    designerNickname: string;
    serviceName: string;
    appointmentDate: string;
    appointmentTime: string;
    hasReview: boolean;
}

export interface AppointmentsResponse {
    data: Appointment[];
}
