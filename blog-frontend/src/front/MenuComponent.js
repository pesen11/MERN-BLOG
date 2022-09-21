import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../images/Expresso.png";
import { NavLink } from "react-router-dom";
import { UserContext } from "../router/routes";
import { useContext } from "react";
import LogOut from "./logout";

const MenuComponent = () => {
  const { state } = useContext(UserContext);
  // console.log(state);

  const RenderMenu = () => {
    if (state) {
      const localUser = JSON.parse(localStorage.getItem("authUser") ?? null);
      return (
        <>
          <Navbar.Text>Signed In as: {localUser.name}</Navbar.Text>
          <NavLink className="nav-link" to={`/author/posts/${localUser.name}`}>
            My Posts
          </NavLink>
          <NavLink className="nav-link" to="/author/write">
            Start Writing
          </NavLink>
          <LogOut />
        </>
      );
    } else {
      return (
        <>
          <NavLink className="nav-link" to="/register">
            SignUp
          </NavLink>
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </>
      );
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand>
          <img
            src={logo}
            width="80"
            height="80"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">
              Expresso
            </NavLink>
          </Nav>
          <Nav>
            <RenderMenu />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MenuComponent;
