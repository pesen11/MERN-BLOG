import { useEffect, useState } from "react";
import { getAllPosts } from "../../services/postServices";
import { Container, Row, Col } from "react-bootstrap";
import CardLayout from "../../components/common/CardLayoutComponent";

const PostsPage = () => {
  const [posts, setPosts] = useState();

  const getPosts = async () => {
    try {
      console.log("eh");
      let allPosts = await getAllPosts();
      if (allPosts) {
        setPosts(allPosts);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Container>
        {posts && posts.length ? (
          <>
            <Row className="mt-3">
              <Col>
                <h1 className="text-center">Posts</h1>
                <hr />
              </Col>
            </Row>
            <Row className="mt-3 ">
              {posts &&
                posts.map((item, index) => (
                  <Col sm={12} md={6} className="mt-3 mb-5 " key={index}>
                    {/* <SingleProductView data={item} type={"product"} /> */}
                    <CardLayout data={item} type="post" />
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

export default PostsPage;
