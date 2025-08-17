import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import Login from "./pages/login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <div>Not Found</div>,
    children: [{ path: "/login", element: <Login /> }],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
