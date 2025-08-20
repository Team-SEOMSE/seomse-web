import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Splash from "./pages/splash/Splash";

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
        ],
    },
]);

const App = () => <RouterProvider router={router} />;

export default App;
