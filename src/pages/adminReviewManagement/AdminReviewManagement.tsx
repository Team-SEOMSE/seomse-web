import ReviewStatusSection from "../../components/admin/reviewManagement/ReviewStatusSection";
import styles from "./AdminReviewManagement.module.css";

const AdminReviewManagement = () => {
  return (
    <div className={styles.screen}>
      <ReviewStatusSection />
    </div>
  );
};

export default AdminReviewManagement;
