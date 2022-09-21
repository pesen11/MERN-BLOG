import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../router/routes";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const LogOut = () => {
  const { dispatch } = useContext(UserContext);
  let navigate = useNavigate();

  return (
    <>
      <NavLink
        className="nav-link"
        to="/"
        onClick={(e) => {
          e.preventDefault();
          localStorage.removeItem("authUser");
          localStorage.removeItem("authToken");
          dispatch({ type: "USER", payload: false });
          toast.success("Logged Out.");
          navigate("/");
        }}
      >
        Logout
      </NavLink>
    </>
  );
};

export default LogOut;
