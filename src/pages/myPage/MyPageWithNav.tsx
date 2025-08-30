import { Outlet } from "react-router-dom";
import Navbar from "../../layout/navbar/Navbar";

export default function MyPageWithNav() {
  return (
    <>
      <Outlet />
      <Navbar />
    </>
  );
}
