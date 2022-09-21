import API_ENDPOINTS from "../config/apiEndPoints";

import { postRequest, getRequest, deleteRequest, putRequest } from "./axiosService";

export const createPost = async (data) => {
  try {
    console.log("here");

    let formData = new FormData();
    Object.keys(data).forEach((item) => {
      formData.append(item, data[item]);
    });

    let response = await postRequest(API_ENDPOINTS.POST + "/addPost", formData, true, true);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getPostsByUser = async (authorName) => {
  try {
    let result = await getRequest(API_ENDPOINTS.POST + "/?authorName=" + authorName);
    // console.log(result.result);

    return result.result;
  } catch (err) {
    throw err;
  }
};

export const getAllPosts = async () => {
  try {
    let result = await getRequest(API_ENDPOINTS.POST);
    console.log(result.result);

    return result.result;
  } catch (err) {
    throw err;
  }
};

export const deletePostById = async (id) => {
  try {
    let result = await deleteRequest(API_ENDPOINTS.POST + "/" + id, true);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getPostById = async (id) => {
  try {
    let result = await getRequest(API_ENDPOINTS.POST + "/" + id, true);
    return result;
  } catch (err) {
    throw err;
  }
};

export const updatePostById = async (data, id) => {
  try {
    let formData = new FormData();
    Object.keys(data).forEach((item) => {
      formData.append(item, data[item]);
    });

    let response = await putRequest(API_ENDPOINTS.POST + "/" + id, formData, true, true);
    return response;
  } catch (error) {
    throw error;
  }
};
