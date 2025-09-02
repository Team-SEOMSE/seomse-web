import AdminHeader from "../../components/admin/layout/AdminHeader";
import ReviewList from "../../components/admin/reviewManagement/ReviewList";
import styles from "./AdminReviewManagement.module.css";

const AdminReviewManagement = () => {
    return (
        <div className={styles.screen}>
            <AdminHeader title="리뷰" />
            <div className={styles.content}>
                <ReviewList />
            </div>
        </div>
    );
};

export default AdminReviewManagement;
