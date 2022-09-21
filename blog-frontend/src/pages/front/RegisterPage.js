import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../services/authServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  let navigate = useNavigate();
  const refreshPage = () => {
    navigate(0);
  };
  const registerValidationSchema = Yup.object().shape({
    name: Yup.string().min(2, "Name too short.").max(50, "Name too long.").required("Enter a name"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password should be 8 characters minimum")
      .required("Passsword is required."),
    about: Yup.string()
      .min(15, "Please write about yourself in atleast 12 characters")
      .max(100, "Too long")
      .required("Your description is required."),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      image: "",
      about: "",
    },

    validationSchema: registerValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        let result = await registerUser(values);
        if (result.status) {
          toast.success("Registered Sucessfully!");
          navigate("/");
          refreshPage();
        }
      } catch (err) {
        toast.error(err.response.data.msg);

        resetForm({ values: "" });
      }
    },
  });

  return (
    <>
      <Container>
        <Row>
          <Col sm={12}>
            <h2 className="text-center">Register Here</h2>
            <hr />
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-2 ">
                <Form.Label htmlFor="email">What is your email?</Form.Label>
                <Form.Control
                  size="sm"
                  type="email"
                  placeholder="Enter email."
                  name="email"
                  required={true}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.errors.email && <em className="text-danger">{formik.errors.email}</em>}
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label htmlFor="password">Enter your password.</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  size="sm"
                  required={true}
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.errors.password && (
                  <em className="text-danger">{formik.errors.password}</em>
                )}
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label htmlFor="name">What should we call you?</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Enter a profile name."
                  name="name"
                  required={true}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                {formik.errors.name && <em className="text-danger">{formik.errors.name}</em>}
              </Form.Group>

              {/* <Form.Group className="mb-2">
                <Form.Label htmlFor="role">What do you want to be?</Form.Label>

                <Form.Select
                  name="role"
                  required
                  onChange={formik.handleChange}
                  size={"sm"}
                  value={formik.values.role}
                >
                  <option>--Select Any One</option>
                  <option value="guest">Guest</option>
                  <option value="author">Author</option>
                </Form.Select>
                {formik.errors.role && <em className="text-danger">{formik.errors.role}</em>}
              </Form.Group> */}

              <Form.Group className="mb-2">
                <Form.Label htmlFor="about">
                  Please write a short description about yourself.
                </Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="About you."
                  name="about"
                  required={true}
                  onChange={formik.handleChange}
                  value={formik.values.about}
                />
                {formik.errors.about && <em className="text-danger">{formik.errors.about}</em>}
              </Form.Group>
              <Row>
                <Col sm={6} md={2}>
                  Upload your profile image:
                </Col>
                <Col sm={6} md={2}>
                  <Form.Control
                    size="sm"
                    type="file"
                    placeholder="Upload an image ."
                    name="image"
                    required={formik.values.image ? false : true}
                    onChange={(e) => {
                      formik.setValues({ ...formik.values, image: e.target.files[0] });
                    }}
                  />
                </Col>
                <Col sm={12} md={8}>
                  {formik.values.image && typeof formik.values.image === "object" ? (
                    <img
                      className="img img-fluid"
                      height="150"
                      width="150"
                      alt="user.png"
                      src={formik.values.image && URL.createObjectURL(formik.values.image)}
                    />
                  ) : (
                    <img className="img img-fluid" height="150" width="150" alt="user.png" />
                  )}
                </Col>
              </Row>

              <Button variant="success" type="submit">
                Register
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegisterPage;
