import UserDetailsSection from "../../components/userDetails/UserDetailsSection";
import styles from "./UserDetails.module.css";

const UserDetails = () => {
    return (
        <div className={styles.screen}>
            <UserDetailsSection />
        </div>
    );
};

export default UserDetails;
