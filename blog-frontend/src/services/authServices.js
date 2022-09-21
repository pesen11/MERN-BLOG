import API_ENDPOINTS from "../config/apiEndPoints";

import { postRequest } from "./axiosService";

export const registerUser = async (data) => {
  try {
    let form_data = new FormData();
    if (data.image) {
      form_data.append("image", data.image, data.image.name);
      delete data.image;
    }

    Object.keys(data).forEach((item) => {
      form_data.append(item, data[item]);
    });

    let response = await postRequest(API_ENDPOINTS.REGISTER_URL, form_data, false, true);
    return response;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (data) => {
  try {
    let loginResponse = await postRequest(API_ENDPOINTS.LOGIN_URL, data);

    if (loginResponse.result.accessToken) {
      localStorage.setItem("authToken", loginResponse.result.accessToken);
      let userInfo = {
        name: loginResponse.result.user.name,
        email: loginResponse.result.user.email,
        _id: loginResponse.result.user._id,
        role: loginResponse.result.user.role,
      };

      localStorage.setItem("authUser", JSON.stringify(userInfo));

      return loginResponse;
    } else {
      return loginResponse;
    }
  } catch (err) {
    throw err.response.data.msg;
  }
};
