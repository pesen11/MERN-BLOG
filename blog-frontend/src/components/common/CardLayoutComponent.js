import Card from "react-bootstrap/Card";
import noImageFound from "../../images/imagenotfound.png";
import { NavLink } from "react-router-dom";
import ActionButtons from "./actionButto";
import { deletePostById } from "../../services/postServices";

const CardLayout = ({ data, type }) => {
  const handleError = (e) => {
    e.target.src = noImageFound;
  };

  //   console.log(data);
  return (
    <>
      <Card style={{ height: "225px", width: "400px", border: "none" }} className="mx-auto">
        <Card.Img
          variant="top"
          src={process.env.REACT_APP_IMAGE_URL + "/" + type + "/" + data.image}
          onError={handleError}
          className="img img-fluid"
          style={{ height: "190px", width: "395px" }}
        />
        <Card.Body className="pb-5">
          <Card.Title className="text-center">
            {data.slug ? (
              <NavLink to={"/posts/" + data.slug} className="nav-link">
                {data.title}
              </NavLink>
            ) : (
              <p>{data.title}</p>
            )}
          </Card.Title>
        </Card.Body>
      </Card>
    </>
  );
};

export default CardLayout;
