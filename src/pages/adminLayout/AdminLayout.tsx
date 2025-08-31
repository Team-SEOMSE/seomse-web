import { Outlet, useLocation } from "react-router-dom";
import AdminNavbar from "../../components/admin/layout/AdminNavbar";
import AdminHeader from "../../components/admin/layout/AdminHeader";
import styles from "./AdminLayout.module.css";

const AdminLayout = () => {
  const location = useLocation();

  const isLoginPage = location.pathname === "/admin";

  if (isLoginPage) {
    return (
      <div className={styles.loginLayout}>
        <Outlet />
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <AdminHeader />
      <main className={styles.content}>
        <Outlet />
      </main>
      <AdminNavbar />
    </div>
  );
};

export default AdminLayout;
