import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import EmailLogin from "./pages/emailLogin/EmailLogin";
import Home from "./pages/home/Home";
import MyPage from "./pages/myPage/MyPage";
import Signup from "./pages/signup/Signup";
import KakaoLogin from "./pages/socialLogin/KakaoLogin";
import Splash from "./pages/splash/Splash";
import Trend from "./pages/trend/Trend";
import UserDetails from "./pages/userDetails/UserDetails";
// import MyPage from "./pages/myPage/MyPage";
// import Reservation from "./pages/reservation/Reservation";
// import Heart from "./pages/savedStyles/SavedStyles";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <div>Not Found</div>,
        children: [
            { index: true, element: <Splash /> },
            { path: "splash", element: <Splash /> },
            { path: "kakao-login", element: <KakaoLogin /> },
            { path: "email-login", element: <EmailLogin /> },
            { path: "user-details", element: <UserDetails /> },
            { path: "signup", element: <Signup /> },
            { path: "home", element: <Home /> },
            { path: "trend", element: <Trend /> },
            { path: "reservation", element: <Home /> },
            { path: "saved-styles", element: <Home /> },
            { path: "my-page", element: <MyPage /> },
        ],
    },
]);

const App = () => <RouterProvider router={router} />;

export default App;
