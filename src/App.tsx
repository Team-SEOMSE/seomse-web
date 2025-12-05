import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";

import Home from "./pages/home/Home";
import Splash from "./pages/splash/Splash";
const Trend = lazy(() => import("./pages/trend/Trend"));
const AiAnalysis = lazy(() => import("./pages/aiAnalysis/AiAnalysis"));
const AppliedStylePage = lazy(
    () => import("./pages/aiAnalysis/AppliedStylePage")
);
const Reservation = lazy(() => import("./pages/reservation/Reservation"));
const KakaoLogin = lazy(() => import("./pages/socialLogin/KakaoLogin"));
const KakaoCallback = lazy(() => import("./pages/socialLogin/KakaoCallback"));
const EmailLogin = lazy(() => import("./pages/emailLogin/EmailLogin"));
const Signup = lazy(() => import("./pages/signup/Signup"));
const UserDetails = lazy(() => import("./pages/userDetails/UserDetails"));
const StylistServiceSelectPage = lazy(
    () => import("./pages/stylistServiceSelect/StylistServiceSelectPage")
);
const SelectSchedule = lazy(
    () => import("./pages/selectSchedule/SelectSchedule")
);
const DetailedFilter1 = lazy(
    () => import("./pages/detailedFilter/DetailedFilter1")
);
const DetailedFilter2 = lazy(
    () => import("./pages/detailedFilter/DetailedFilter2")
);
const DetailedRequest = lazy(
    () => import("./pages/detailedFilter/DetailedRequest")
);
const MyPageShell = lazy(() => import("./pages/myPage/MyPageShell"));
const MyPageWithNav = lazy(() => import("./pages/myPage/MyPageWithNav"));
const MyPageSection = lazy(() => import("./components/myPage/MyPageSection"));
const ReservationDetails = lazy(
    () => import("./components/myPage/ReservationDetails")
);
const ReviewWrite = lazy(() => import("./components/myPage/ReviewWrite"));
const ReviewDone = lazy(() => import("./components/myPage/ReviewDone"));
const AdminLayout = lazy(() => import("./pages/adminLayout/AdminLayout"));
const AdminLogin = lazy(() => import("./pages/adminLogin/AdminLogin"));
const AdminReservationManagement = lazy(
    () =>
        import("./pages/adminReservationManagement/AdminReservationManagement")
);
const AdminReviewManagement = lazy(
    () => import("./pages/adminReviewManagement/AdminReviewManagement")
);

// Suspense fallback 컴포넌트
const PageLoader = () => (
    <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
        }}
    >
        <div
            style={{
                width: 40,
                height: 40,
                border: "3px solid #f3f3f3",
                borderTop: "3px solid #FF3871",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
            }}
        />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
);

// lazy 컴포넌트를 Suspense로 감싸는 헬퍼
const withSuspense = (
    Component: React.LazyExoticComponent<React.ComponentType>
) => (
    <Suspense fallback={<PageLoader />}>
        <Component />
    </Suspense>
);

const queryClient = new QueryClient();

const router = createBrowserRouter([
    // --- 일반 유저 전용 ---
    {
        path: "/",
        element: <Root />,
        errorElement: <div>Not Found</div>,
        children: [
            { index: true, element: <Home /> },
            { path: "splash", element: <Splash /> },
            { path: "kakao-login", element: withSuspense(KakaoLogin) },
            { path: "oauth/callback", element: withSuspense(KakaoCallback) },
            { path: "email-login", element: withSuspense(EmailLogin) },
            { path: "user-details", element: withSuspense(UserDetails) },
            {
                path: "select-service",
                element: withSuspense(StylistServiceSelectPage),
            },
            { path: "select-schedule", element: withSuspense(SelectSchedule) },
            {
                path: "reservation-filter",
                element: withSuspense(DetailedFilter1),
            },
            {
                path: "reservation-filter2",
                element: withSuspense(DetailedFilter2),
            },
            {
                path: "reservation-request",
                element: withSuspense(DetailedRequest),
            },
            { path: "signup", element: withSuspense(Signup) },
            { path: "trend", element: withSuspense(Trend) },
            { path: "reservation", element: withSuspense(Reservation) },
            { path: "ai-analysis", element: withSuspense(AiAnalysis) },
            {
                path: "ai-analysis/result",
                element: withSuspense(AppliedStylePage),
            },
            {
                path: "my-page",
                element: withSuspense(MyPageShell),
                children: [
                    {
                        element: withSuspense(MyPageWithNav),
                        children: [
                            {
                                index: true,
                                element: withSuspense(MyPageSection),
                            },
                            {
                                path: "reservations",
                                element: withSuspense(ReservationDetails),
                            },
                        ],
                    },
                    {
                        path: "review/:id",
                        children: [
                            { index: true, element: withSuspense(ReviewWrite) },
                            { path: "done", element: withSuspense(ReviewDone) },
                        ],
                    },
                ],
            },
        ],
    },

    // --- 어드민 전용 ---
    {
        path: "/admin",
        element: withSuspense(AdminLayout),
        children: [
            { index: true, element: withSuspense(AdminLogin) },
            {
                path: "reservations",
                element: withSuspense(AdminReservationManagement),
            },
            { path: "reviews", element: withSuspense(AdminReviewManagement) },
        ],
    },
]);

const App = () => (
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>
);

export default App;
