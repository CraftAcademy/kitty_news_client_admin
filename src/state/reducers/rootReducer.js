const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_ARTICLE_MESSAGE":
      return {
        ...state,
        createArticleMessage: action.payload,
        errorMessage: false
      };
    case "SET_ERROR_MESSAGE":
      return {
        ...state,
        errorMessage: action.payload,
        createArticleMessage: false
      };
    default:
      return state;
  }
};

export default rootReducer;
