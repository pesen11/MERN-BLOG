import { Container, Row, Col } from "react-bootstrap";
import "../../assets/css/homeStyle.css";

const HomePage = () => {
  return (
    <>
      <div className="bg-warning homeTitles">
        <Container>
          <Row>
            <Col sm={12} md={6}>
              <h1 className="mt-5 mb-5 mainTitle">Express It!</h1>
              <h5 className="subTitle">Express your story, experiences and look through what </h5>
              <h5 className="mb-4 subTitle">people have in their mind.</h5>
              <h1 className="mb-4">Let's get this started.</h1>
            </Col>
            <Col sm={0} md={6}></Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default HomePage;
