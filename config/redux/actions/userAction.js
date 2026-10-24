import fetch, { BASE_URL } from "../../fetch";
import { clearStorage, setStorage } from "../../storage";
import Toast from "../../toast";

export const loginUser = async (payload) => {
  const url = BASE_URL + "/auth/login";
  try {
    const { data } = await fetch.post(url, payload);
    if (data.statusCode === 201) {
      Toast.fire({
        icon: "success",
        title: data.message,
      });
      setStorage(data.data);
    } else {
      Toast.fire({
        icon: "warning",
        title: data.message,
      });
    }
    return data;
  } catch (error) {
    Toast.fire({
      icon: "error",
      title: "Oops...",
      text: "Server error!",
    });
    throw error;
  }
};

export const registerUser = async (payload) => {
  const url = BASE_URL + "/auth/register";
  try {
    const { data } = await fetch.post(url, payload);
    if (data.statusCode === 201) {
      Toast.fire({
        icon: "success",
        title: data.message,
      });
      setStorage(data.data);
    } else {
      Toast.fire({
        icon: "warning",
        title: data.message,
      });
    }
    return data;
  } catch (error) {
    Toast.fire({
      icon: "error",
      title: "Oops...",
      text: "Server error!",
    });
    throw error;
  }
};

export const getUser = (id) => {
  return async (dispatch) => {
    dispatch({ type: "GET_USER_LOADING" });
    const url = id
      ? `${BASE_URL}/user/profile/${id}`
      : `${BASE_URL}/user/profile`;

    try {
      const { data } = await fetch.get(url);
      if (data.statusCode === 200) {
        dispatch({ type: "GET_USER", payload: data.data });
      } else if (data.message === "server need token") {
        dispatch({ type: "GET_USER_FAILED", payload: data.message });
        if (!id) clearStorage();
        Toast.fire({
          icon: "warning",
          title: "Login first to access this page",
        });
      } else {
        const message = data.message || "Unable to retrieve user profile";
        dispatch({ type: "GET_USER_FAILED", payload: message });
        Toast.fire({
          icon: "error",
          title: message,
        });
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Unable to retrieve user profile";
      dispatch({ type: "GET_USER_FAILED", payload: message });

      if (
        !id &&
        (error.response?.status === 401 ||
          error.response?.status === 403 ||
          /token|unauthorized/i.test(message))
      ) {
        clearStorage();
      }

      Toast.fire({
        icon: "error",
        title: message,
      });
    }
  };
};

export const getListWorker = (params) => {
  return async (dispatch) => {
    dispatch({ type: "LIST_WORKER_LOADING" });
    const url = BASE_URL + `/user/allworker`;

    try {
      const { data } = await fetch.get(url, { params });
      dispatch({
        type: "GET_LIST_WORKER",
        payload: data.data,
        meta: data.pagination,
      });
    } catch (error) {
      dispatch({ type: "LIST_WORKER_FAILED", payload: error.message });
      Toast.fire({
        icon: "error",
        title: error,
      });
    }
  };
};

const pickProfileFields = (payload, fields) =>
  fields.reduce((result, field) => {
    const value = payload[field];
    if (typeof value === "string" && value.trim()) {
      result[field] = value;
    }
    return result;
  }, {});

export const updateUser = async (payload, { userId, profileId, role }) => {
  try {
    if (typeof role !== "boolean") {
      throw new Error("A valid user role is required to update the profile");
    }

    const requests = [];
    const username = payload.username ?? payload.name;

    if (typeof username === "string" && username.trim()) {
      if (!userId) {
        throw new Error("User ID is required to update the username");
      }
      requests.push(
        fetch.patch(`${BASE_URL}/user/profile/${userId}`, {
          username: username.trim(),
        }),
      );
    }

    const profileFields = role
      ? ["city", "province", "last_work", "description"]
      : [
          "company_name",
          "company_email",
          "company_phone",
          "company_field",
          "city",
          "province",
          "description",
        ];
    const profilePayload = pickProfileFields(payload, profileFields);

    if (Object.keys(profilePayload).length) {
      if (!profileId) {
        throw new Error("Profile ID is required to update profile details");
      }
      const profileRoute = role ? "worker-profile" : "company-profile";
      requests.push(
        fetch.patch(
          `${BASE_URL}/user/${profileRoute}/${profileId}`,
          profilePayload,
        ),
      );
    }

    if (!requests.length) {
      throw new Error("There are no profile changes to save");
    }

    const responses = await Promise.all(requests);
    const failedResponse = responses.find(
      ({ data }) => data.statusCode !== 200,
    );
    if (failedResponse) {
      throw new Error(
        failedResponse.data.message || "Unable to update profile",
      );
    }

    Toast.fire({
      icon: "success",
      title: "Profile updated successfully",
    });
    return responses.map(({ data }) => data);
  } catch (error) {
    Toast.fire({
      icon: "error",
      title: error.response?.data?.message || error.message,
      text: error.response?.data?.errors?.join(", "),
    });
    return false;
  }
};

export const updateSkill = async (payload, id) => {
  const url = BASE_URL + `/user/skills/${id}`;
  try {
    const { data } = await fetch.put(url, payload);
    if (data.statusCode === 200) {
      Toast.fire({
        icon: "success",
        title: data.message,
      });
    }
  } catch (error) {
    Toast.fire({
      icon: "error",
      title: error.message,
    });
    throw error;
  }
};
