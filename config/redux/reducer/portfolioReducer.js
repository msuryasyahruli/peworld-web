const initialState = {
  portfolio: { data: [], isLoading: false, isError: false },
  userPortfolio: {
    data: [],
    isLoading: false,
    isError: false,
    pagination: {},
  },
};

const portfolioReducer = (state = initialState, action) => {
  const { meta, type, payload } = action;
  switch (type) {
    case "GET_PORTFOLIO":
      return {
        ...state,
        portfolio: { data: payload, isLoading: false },
      };

    case "GET_PORTFOLIO_LOADING":
      return { ...state, portfolio: { isLoading: true } };

    case "GET_PORTFOLIO_FAILED":
      return { ...state, portfolio: { isLoading: false, isError: payload } };

    case "GET_USER_PORTFOLIO":
      return {
        ...state,
        userPortfolio: { data: payload, isLoading: false, pagination: meta },
      };

    case "GET_USER_PORTFOLIO_LOADING":
      return { ...state, userPortfolio: { isLoading: true } };

    case "GET_USER_PORTFOLIO_FAILED":
      return {
        ...state,
        userPortfolio: { isLoading: false, isError: payload },
      };

    default:
      return state;
  }
};

export default portfolioReducer;
