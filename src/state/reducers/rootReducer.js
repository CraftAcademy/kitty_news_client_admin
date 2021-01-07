const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_ARTICLE_MESSAGE":
      return {
        ...state,
        createArticleMessage: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
