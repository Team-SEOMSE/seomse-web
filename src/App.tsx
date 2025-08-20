import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Splash from "./pages/splash/Splash";
// import Trend from "./pages/trend/Trend";
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
            { path: "login", element: <Login /> },
            { path: "home", element: <Home /> },
            { path: "trend", element: <Home /> },
            { path: "reservation", element: <Home /> },
            { path: "saved-styles", element: <Home /> },
            { path: "my-page", element: <Home /> },
        ],
    },
]);

const App = () => <RouterProvider router={router} />;

export default App;
