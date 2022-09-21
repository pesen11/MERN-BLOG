import { Outlet } from "react-router-dom";
import AuthorMenuComponent from "../../front/AuthorMenuComponent";
// import "../../assets/css/home.css";

const AuthorLayout = () => {
  return (
    <>
      <AuthorMenuComponent></AuthorMenuComponent>
      <Outlet />
    </>
  );
};

export default AuthorLayout;
