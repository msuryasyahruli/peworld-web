import fetch, { BASE_URL } from "../../fetch";
import Toast from "../../toast";

export const getExperience = (id) => {
  return async (dispatch) => {
    dispatch({ type: "GET_EXPERIENCE_LOADING" });
    const url = BASE_URL + `/experience/${id}`;

    try {
      const { data } = await fetch.get(url);
      dispatch({
        type: "GET_EXPERIENCE",
        payload: data.data,
        meta: data.pagination,
      });
    } catch (error) {
      dispatch({ type: "GET_EXPERIENCE_FAILED", payload: error.message });
      Toast.fire({
        icon: "error",
        title: error.message,
      });
    }
  };
};

export const getUserExperience = (id, params) => {
  return async (dispatch) => {
    dispatch({ type: "GET_USER_EXPERIENCE_LOADING" });
    const url = BASE_URL + `/experience/user/${id}`;

    try {
      const { data } = await fetch.get(url, { params });
      dispatch({
        type: "GET_USER_EXPERIENCE",
        payload: data.data,
        meta: data.pagination,
      });
    } catch (error) {
      dispatch({ type: "GET_USER_EXPERIENCE_FAILED", payload: error.message });
      Toast.fire({
        icon: "error",
        title: error.message,
      });
    }
  };
};

export const addExperience = async (payload) => {
  const url = BASE_URL + `/experience`;
  try {
    const { data } = await fetch.post(url, payload);
    if (data.statusCode === 201) {
      Toast.fire({
        icon: "success",
        title: data.message,
      });
      return true;
    } else {
      Toast.fire({
        icon: "warning",
        title: data.message,
      });
      return false;
    }
  } catch (error) {
    Toast.fire({
      icon: "error",
      title: error.response?.data?.message || "Server error!",
      text: error.response?.data?.errors?.map((e) => e.msg).join(", "),
    });
    return false;
  }
};

export const updateExperience = async (id, payload) => {
  const url = BASE_URL + `/experience/${id}`;
  try {
    const { data } = await fetch.put(url, payload);
    if (data.statusCode === 200) {
      Toast.fire({
        icon: "success",
        title: data.message,
      });
      return true;
    }
    Toast.fire({
      icon: "warning",
      title: data.message || "Unable to update experience",
    });
    return false;
  } catch (error) {
    Toast.fire({
      icon: "error",
      title: error.response?.data?.message || "Server error!",
      text: error.response?.data?.errors?.map((e) => e.msg).join(", "),
    });
    return false;
  }
};

export const deleteExperience = async (id) => {
  const url = BASE_URL + `/experience/${id}`;
  try {
    const { data } = await fetch.delete(url);
    if (data.statusCode === 200) {
      Toast.fire({
        icon: "success",
        title: data.message,
      });
      return true;
    }
    Toast.fire({
      icon: "warning",
      title: data.message || "Unable to delete experience",
    });
    return false;
  } catch (error) {
    Toast.fire({
      icon: "error",
      title: error.response?.data?.message || "Server error!",
    });
    return false;
  }
};
