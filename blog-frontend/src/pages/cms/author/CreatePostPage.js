import PostFormComponent from "./PostFormComponent";
import { createPost } from "../../../services/postServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  let navigate = useNavigate();
  const defaultData = {
    title: "",
    content: "",
    image: "",
  };

  const handleSubmit = async (data) => {
    try {
      let response = await createPost(data);
      if (response.status) {
        toast.success("Post created succesfully.");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  return <PostFormComponent defaultData={defaultData} handleSubmit={handleSubmit} />;
};

export default CreatePost;
