import { Outlet } from "react-router-dom";
import MenuComponent from "../../front/MenuComponent";
// import "../../assets/css/home.css";

const HomeLayout = () => {
  return (
    <>
      <MenuComponent></MenuComponent>
      <Outlet />
    </>
  );
};

export default HomeLayout;
