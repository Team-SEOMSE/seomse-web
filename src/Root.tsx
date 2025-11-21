import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getCookie, removeCookie } from "./hooks/useCookie";

import styles from "./Root.module.css";
import useGetApi from "./api/useGetApi";

const Root = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isAuthPage = [
        "/",
        "/splash",
        "/email-login",
        "/signup",
        "/kakao-login",
        "/oauth/callback",
    ].includes(location.pathname);

    const token = getCookie("accessToken");

    const { data, isError } = useGetApi("verify", "/security/verify", true, {
        enabled: !isAuthPage && !!token,
    });

    useEffect(() => {
        if (!token && !isAuthPage) {
            navigate("/kakao-login");
        }
    }, [token, isAuthPage, navigate]);

    useEffect(() => {
        if (data) {
            if (isAuthPage) {
                navigate("/");
            }
        }
    }, [data, isAuthPage, navigate]);

    useEffect(() => {
        if (isError) {
            removeCookie("accessToken");
            navigate("/kakao-login");
        }
    }, [isError, navigate]);

    return (
        <div className={styles.root}>
            <div className={styles.outlet}>
                <Outlet />
            </div>
        </div>
    );
};

export default Root;
