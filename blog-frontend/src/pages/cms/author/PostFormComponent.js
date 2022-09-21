import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import ClassicEditor from "./ckEditor";
import { Container, Col, Form, Button, Row } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

const PostFormComponent = ({ handleSubmit, defaultData }) => {
  const postValidationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
  });

  const formik = useFormik({
    initialValues: defaultData,
    validationSchema: postValidationSchema,
    onSubmit: (values) => {
      let { title, content, image } = values;
      let submitValues = { title, content, image };
      // console.log(submitValues);
      handleSubmit(submitValues);
    },
  });

  useEffect(() => {
    if (defaultData) {
      formik.setValues(defaultData);
    }
  }, [defaultData]);
  return (
    <>
      <Container>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="row mb-4" controlId="title">
            <Form.Label className="col-sm-2">Title:</Form.Label>
            <Col sm={10}>
              <Form.Control
                size="md"
                type="text"
                placeholder="TITLE"
                name="title"
                required={true}
                value={formik.values.title}
                onChange={formik.handleChange}
              />
              {formik.errors.title && <em className="text-danger">{formik.errors.title}</em>}
            </Col>
          </Form.Group>

          <Form.Group className="row mb-3" controlId="image">
            <Form.Label className="col-sm-2">Title Image:</Form.Label>
            <Col sm={3}>
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
              {formik.errors.image && <em className="text-danger">{formik.errors.image}</em>}
            </Col>
            <Col sm={3}>
              {formik.values.image && typeof formik.values.image === "object" ? (
                <img
                  className="img img-fluid"
                  alt="frontImage.png"
                  src={formik.values.image && URL.createObjectURL(formik.values.image)}
                />
              ) : (
                <img className="img img-fluid" height="150" width="150" alt="fronImg.png" />
              )}
            </Col>
          </Form.Group>

          <Form.Group className="row mb-3" controlId="content">
            <Form.Label className="col-sm-2">Content:</Form.Label>
            <Col sm={10}>
              <CKEditor
                config={{
                  ckfinder: {
                    uploadUrl: "http://localhost:8080/blogAPI/v1/post/uploadImage",
                  },
                }}
                editor={ClassicEditor}
                data={formik.values.content}
                name="content"
                onChange={(event, editor) => {
                  const data = editor.getData();
                  formik.setValues({ ...formik.values, content: data });
                }}
              />

              {formik.errors.content && <em className="text-danger">{formik.errors.content}</em>}
            </Col>
          </Form.Group>

          <Form.Group className="row mb-3">
            <Col sm={{ offset: 3, span: 9 }}>
              <Button variant="danger" size="sm" type="reset" className="me-2">
                <i className="fa fa-trash"></i> Cancel
              </Button>
              <Button variant="success" size="sm" type="submit" className="me-2">
                <i className="fa fa-paper-plane"></i> Submit
              </Button>
            </Col>
          </Form.Group>
        </Form>

        {/* <div className="App">
          <CKEditor
            editor={ClassicEditor}
            data="<p>Hello from CKEditor 5!</p>"
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />
        </div> */}
      </Container>
    </>
  );
};

export default PostFormComponent;
