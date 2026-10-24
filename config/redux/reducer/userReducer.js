const initialState = {
  user: { data: [], isLoading: false, isError: false },
  listWorker: { data: [], isLoading: false, isError: false, pagination: {} },
};

const userReducer = (state = initialState, action) => {
  const { meta, type, payload } = action;
  switch (type) {
    case "GET_USER":
      return {
        ...state,
        user: { data: payload, isLoading: false },
      };

    case "GET_USER_LOADING":
      return { ...state, user: { isLoading: true } };

    case "GET_USER_FAILED":
      return { ...state, user: { isLoading: false, isError: payload } };

    case "GET_LIST_WORKER":
      return {
        ...state,
        listWorker: { data: payload, isLoading: false, pagination: meta },
      };

    case "LIST_WORKER_LOADING":
      return { ...state, listWorker: { isLoading: true } };

    case "LIST_WORKER_FAILED":
      return { ...state, listWorker: { isLoading: false, isError: payload } };

    default:
      return state;
  }
};

export default userReducer;
