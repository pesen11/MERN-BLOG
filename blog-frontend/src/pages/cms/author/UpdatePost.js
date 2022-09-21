import { useEffect, useCallback } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, updatePostById } from "../../../services/postServices";
import PostFormComponent from "./PostFormComponent";
import { toast } from "react-toastify";

const defaultData = {
  title: "",
  content: "",
  image: "",
};

const UpdatePost = () => {
  const localUser = JSON.parse(localStorage.getItem("authUser"));
  let [data, setData] = useState(defaultData);
  const params = useParams();
  let navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      // console.log("Final", data);
      console.log(data);

      let response = await updatePostById(data, params.id);
      // console.log(response);

      if (response.status) {
        toast.success(response.msg);
        navigate(`/author/posts/${localUser.name}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getPostDetail = useCallback(async () => {
    try {
      let id = params.id;
      let response = await getPostById(id);
      // console.log(response);
      if (response.status) {
        setData(response.result);
      }
    } catch (error) {
      console.log(error);
    }
  }, [params.id]);

  useEffect(() => {
    getPostDetail();
  }, [getPostDetail]);

  return (
    <>
      <PostFormComponent defaultData={data} handleSubmit={handleSubmit} />
    </>
  );
};

export default UpdatePost;
