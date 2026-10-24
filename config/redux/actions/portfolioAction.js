import fetch, { BASE_URL } from "../../fetch";
import Toast from "../../toast";

export const getPortfolio = (id) => {
  return async (dispatch) => {
    dispatch({ type: "GET_PORTFOLIO_LOADING" });
    const url = BASE_URL + `/portfolio/${id}`;

    try {
      const { data } = await fetch.get(url);
      dispatch({
        type: "GET_PORTFOLIO",
        payload: data.data,
        meta: data.pagination,
      });
    } catch (error) {
      dispatch({ type: "GET_PORTFOLIO_FAILED", payload: error.message });
      Toast.fire({
        icon: "error",
        title: error.message,
      });
    }
  };
};

export const getUserPortfolio = (id, params) => {
  return async (dispatch) => {
    dispatch({ type: "GET_USER_PORTFOLIO_LOADING" });
    const url = BASE_URL + `/portfolio/user/${id}`;

    try {
      const { data } = await fetch.get(url, { params });
      dispatch({
        type: "GET_USER_PORTFOLIO",
        payload: data.data,
        meta: data.pagination,
      });
    } catch (error) {
      if (error.response?.status === 404) {
        dispatch({
          type: "GET_USER_PORTFOLIO",
          payload: [],
          meta: {},
        });
        return;
      }

      dispatch({ type: "GET_USER_PORTFOLIO_FAILED", payload: error.message });
      Toast.fire({
        icon: "error",
        title: error.response?.data?.message || error.message,
      });
    }
  };
};

export const addPortfolio = async (payload) => {
  const url = BASE_URL + `/portfolio`;
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
      text: error.response?.data?.errors?.join(", "),
    });
    return false;
  }
};

export const updatePortfolio = async (id, payload) => {
  const url = BASE_URL + `/portfolio/${id}`;
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
      title: data.message || "Unable to update portfolio",
    });
    return false;
  } catch (error) {
    Toast.fire({
      icon: "error",
      title: error.response?.data?.message || "Server error!",
      text: error.response?.data?.errors?.join(", "),
    });
    return false;
  }
};

export const deletePortfolio = async (id) => {
  const url = BASE_URL + `/portfolio/${id}`;
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
      title: data.message || "Unable to delete portfolio",
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
