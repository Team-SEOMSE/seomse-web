import { Outlet } from "react-router-dom";

import styles from "./Root.module.css";

const Root = () => {
    return (
        <div className={styles.root}>
            <div className={styles.outlet}>
                <Outlet />
            </div>
        </div>
    );
};

export default Root;
