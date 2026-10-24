const initialState = {
  experience: { data: [], isLoading: false, isError: false },
  userExperience: {
    data: [],
    isLoading: false,
    isError: false,
    pagination: {},
  },
};

const experienceReducer = (state = initialState, action) => {
  const { meta, type, payload } = action;
  switch (type) {
    case "GET_EXPERIENCE":
      return {
        ...state,
        experience: { data: payload, isLoading: false },
      };

    case "GET_EXPERIENCE_LOADING":
      return { ...state, experience: { isLoading: true } };

    case "GET_EXPERIENCE_FAILED":
      return { ...state, experience: { isLoading: false, isError: payload } };

    case "GET_USER_EXPERIENCE":
      return {
        ...state,
        userExperience: { data: payload, isLoading: false, pagination: meta },
      };

    case "GET_USER_EXPERIENCE_LOADING":
      return { ...state, userExperience: { isLoading: true } };

    case "GET_USER_EXPERIENCE_FAILED":
      return {
        ...state,
        userExperience: { isLoading: false, isError: payload },
      };

    default:
      return state;
  }
};

export default experienceReducer;
