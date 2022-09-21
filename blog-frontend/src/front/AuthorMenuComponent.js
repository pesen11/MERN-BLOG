import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../images/Expresso.png";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const AuthorMenuComponent = () => {
  let navigate = useNavigate();
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home">
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
            <NavLink className="nav-link" to="/author">
              Expresso
            </NavLink>
          </Nav>
          <Nav>
            <NavLink className="nav-link" to="#deets">
              Start Writing
            </NavLink>

            <NavLink
              className="nav-link"
              to="/"
              onClick={(e) => {
                e.preventDefault();
                localStorage.removeItem("authUser");
                localStorage.removeItem("authToken");
                toast.success("Logged Out.");
                navigate("/");
              }}
            >
              Logout
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AuthorMenuComponent;
