import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";

// --- User pages ---
import MyPageSection from "./components/myPage/MyPageSection";
import ReservationDetails from "./components/myPage/ReservationDetails";
import ReviewDone from "./components/myPage/ReviewDone";
import ReviewWrite from "./components/myPage/ReviewWrite";
import AiAnalysis from "./pages/aiAnalysis/AiAnalysis";
import DetailedFilter1 from "./pages/detailedFilter/DetailedFilter1";
import DetailedFilter2 from "./pages/detailedFilter/DetailedFilter2";
import DetailedRequest from "./pages/detailedFilter/DetailedRequest";
import EmailLogin from "./pages/emailLogin/EmailLogin";
import Home from "./pages/home/Home";
import MyPageShell from "./pages/myPage/MyPageShell";
import MyPageWithNav from "./pages/myPage/MyPageWithNav";
import Reservation from "./pages/reservation/Reservation";
import Signup from "./pages/signup/Signup";
import KakaoCallback from "./pages/socialLogin/KakaoCallback";
import KakaoLogin from "./pages/socialLogin/KakaoLogin";
import Splash from "./pages/splash/Splash";
import Trend from "./pages/trend/Trend";
import UserDetails from "./pages/userDetails/UserDetails";

// --- Admin pages ---
import AdminLayout from "./pages/adminLayout/AdminLayout";
import AdminLogin from "./pages/adminLogin/AdminLogin";
import AdminReservationManagement from "./pages/adminReservationManagement/AdminReservationManagement";
import AdminReviewManagement from "./pages/adminReviewManagement/AdminReviewManagement";
import SelectSchedule from "./pages/selectSchedule/SelectSchedule";
import StylistServiceSelectPage from "./pages/stylistServiceSelect/StylistServiceSelectPage";

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
            { path: "kakao-login", element: <KakaoLogin /> },
            { path: "oauth/callback", element: <KakaoCallback /> },
            { path: "email-login", element: <EmailLogin /> },
            { path: "user-details", element: <UserDetails /> },
            { path: "select-service", element: <StylistServiceSelectPage /> },
            { path: "select-schedule", element: <SelectSchedule /> },
            { path: "reservation-filter", element: <DetailedFilter1 /> },
            { path: "reservation-filter2", element: <DetailedFilter2 /> },
            { path: "reservation-request", element: <DetailedRequest /> },
            { path: "signup", element: <Signup /> },
            { path: "trend", element: <Trend /> },
            { path: "reservation", element: <Reservation /> },
            { path: "ai-analysis", element: <AiAnalysis /> },
            {
                path: "my-page",
                element: <MyPageShell />,
                children: [
                    {
                        element: <MyPageWithNav />,
                        children: [
                            { index: true, element: <MyPageSection /> },
                            {
                                path: "reservations",
                                element: <ReservationDetails />,
                            },
                        ],
                    },
                    {
                        path: "review/:id",
                        children: [
                            { index: true, element: <ReviewWrite /> },
                            { path: "done", element: <ReviewDone /> },
                        ],
                    },
                ],
            },
        ],
    },

    // --- 어드민 전용 ---
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            { index: true, element: <AdminLogin /> },
            { path: "reservations", element: <AdminReservationManagement /> },
            { path: "reviews", element: <AdminReviewManagement /> },
        ],
    },
]);

const App = () => (
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>
);

export default App;
