import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Root from "./Root";
import EmailLogin from "./pages/emailLogin/EmailLogin";
import Home from "./pages/home/Home";
import Signup from "./pages/signup/Signup";
import KakaoLogin from "./pages/socialLogin/KakaoLogin";
import Splash from "./pages/splash/Splash";
import Trend from "./pages/trend/Trend";
import UserDetails from "./pages/userDetails/UserDetails";
import KakaoCallback from "./pages/socialLogin/KakaoCallback";
import Reservation from "./pages/reservation/Reservation";
import MyPageSection from "./components/myPage/MyPageSection";
import MyPageShell from "./pages/myPage/MyPageShell";
import MyPageWithNav from "./pages/myPage/MyPageWithNav";
import ReviewWrite from "./components/myPage/ReviewWrite";
import ReviewDone from "./components/myPage/ReviewDone";
import ReservationDetails from "./components/myPage/ReservationDetails";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <div>Not Found</div>,
    children: [
      { index: true, element: <Splash /> },
      { path: "splash", element: <Splash /> },
      { path: "kakao-login", element: <KakaoLogin /> },
      { path: "oauth/callback", element: <KakaoCallback /> },
      { path: "email-login", element: <EmailLogin /> },
      { path: "user-details", element: <UserDetails /> },
      { path: "signup", element: <Signup /> },
      { path: "home", element: <Home /> },
      { path: "trend", element: <Trend /> },
      { path: "reservation", element: <Reservation /> },
      { path: "saved-styles", element: <Home /> },
      {
        path: "my-page",
        element: <MyPageShell />,
        children: [
          {
            element: <MyPageWithNav />,
            children: [
              { index: true, element: <MyPageSection /> },
              { path: "reservations", element: <ReservationDetails /> },
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
]);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);

export default App;
