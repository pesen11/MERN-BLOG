import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { loginUser } from "../../services/authServices";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../../router/routes";

const LoginPage = () => {
  let navigate = useNavigate();
  const { dispatch } = useContext(UserContext);

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password should be 8 characters minimum")
      .required("Passsword is required."),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        let response = await loginUser(values);
        dispatch({ type: "USER", payload: true });
        toast.success(response.msg);
        // navigate("/author")
        navigate("/");
        // <Navigate to="/"></Navigate>;
      } catch (err) {
        toast.error(err);
        resetForm({ values: "" });
      }
    },
  });
  return (
    <>
      <Container>
        <Row>
          <Col sm={12}>
            <h2 className="text-center">Login</h2>
            <hr />

            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="row mb-4 my-auto">
                <Form.Label htmlFor="email" className="col col-md-1 col-xs-12">
                  Email:
                </Form.Label>
                <Col md={6} xs={12}>
                  <Form.Control
                    size="sm"
                    type="email"
                    placeholder="Enter email."
                    name="email"
                    required={true}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                </Col>
                {formik.errors.email && <em className="text-danger">{formik.errors.email}</em>}
              </Form.Group>

              <Form.Group className="row mb-5 my-auto">
                <Form.Label htmlFor="password" className="col col-md-1 col-xs-2">
                  Passsword:
                </Form.Label>
                <Col md={6} xs={10}>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    size="sm"
                    required={true}
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                </Col>
                {formik.errors.password && (
                  <em className="text-danger">{formik.errors.password}</em>
                )}
              </Form.Group>
              <Row>
                <Col xs={2}>
                  <Button variant="success" type="submit">
                    Login
                  </Button>
                </Col>
                <Col xs={2}>
                  <NavLink className="btn btn-info" to="/register">
                    SignUp
                  </NavLink>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;
