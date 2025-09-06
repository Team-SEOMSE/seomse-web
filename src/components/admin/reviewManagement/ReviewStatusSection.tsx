import AdminHeader from "../../../components/admin/layout/AdminHeader";
import ReviewList from "../../../components/admin/reviewManagement/ReviewList";
import styles from "./ReviewStatusSection.module.css";

const ReviewStatusSection = () => {
  return (
    <div className={styles.section}>
      <AdminHeader title="리뷰" />

      <div className={styles.content}>
        <ReviewList />
      </div>
    </div>
  );
};

export default ReviewStatusSection;