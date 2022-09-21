import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getPostsByUser } from "../../../services/postServices";
import CardLayout from "../../../components/common/CardLayoutComponent";
import ActionButtons from "../../../components/common/actionButto";
import { deletePostById } from "../../../services/postServices";
import { toast } from "react-toastify";

const ListPost = () => {
  const params = useParams();
  const [posts, setPosts] = useState();

  const getPosts = async () => {
    try {
      let allPostsUser = await getPostsByUser(params.authorName);
      if (allPostsUser) {
        setPosts(allPostsUser);
      }
    } catch (err) {}
  };

  const deletePost = async (id) => {
    try {
      let response = await deletePostById(id);
      if (response.status) {
        getPosts();
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      console.error(error);
    }
    // console.log("product gone", id);
  };

  useEffect(() => {
    getPosts();

    // console.log(posts);
  }, []);

  return (
    <>
      <Container>
        {posts && posts.length ? (
          <>
            <Row className="mt-3">
              <Col>
                <h1 className="text-center">Your Posts</h1>
                <hr />
              </Col>
            </Row>
            <Row className="mt-3 ">
              {posts &&
                posts.map((item, index) => (
                  <Col
                    sm={12}
                    md={{ span: 5, offset: 1 }}
                    className="mt-3 mb-5 shadow p-3 mb-5 bg-white rounded "
                    key={index}
                  >
                    {/* <SingleProductView data={item} type={"product"} /> */}
                    <CardLayout data={item} type="post" />
                    <ActionButtons
                      id={item._id}
                      onDeleteClick={deletePost}
                      updatePath={"/author/posts/" + item.authorName + "/" + item._id}
                    />
                  </Col>
                ))}
            </Row>
          </>
        ) : (
          <>
            <Row className="mt-3">
              <Col>
                <h1 className="text-center">You have not written any posts.</h1>
                <hr />
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default ListPost;
