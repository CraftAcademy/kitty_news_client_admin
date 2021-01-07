import axios from "axios";

const createArticle = {
  async create(event, dispatch) {
    event.preventDefault();
    try {
      let response = await axios.post(`/articles`, {
        article: {
          title: event.target.title.value,
          lead: event.target.lead.value,
          body: event.target.body.value,
        },
      });
      dispatch({
        type: "SET_ARTICLE_MESSAGE",
        payload: response.data.message,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

export { createArticle };
