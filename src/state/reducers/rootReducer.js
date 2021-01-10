const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_ARTICLE_MESSAGE":
      return {
        ...state,
        createArticleMessage: action.payload,
        errorMessage: ""
      };
    case "SET_ERROR_MESSAGE":
      return {
        ...state,
        errorMessage: action.payload,
        createArticleMessage: ""
      };
    default:
      return state;
  }
};

export default rootReducer;
