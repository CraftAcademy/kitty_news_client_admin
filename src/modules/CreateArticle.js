import axios from "axios";

const CreateArticle = {
  async create(event, dispatch) {
    event.preventDefault();
    try {
      let response = await axios.post("/articles", {
        article: {
          title: event.target.title.value,
          lead: event.target.lead.value,
          body: event.target.body.value,
          category_id: parseInt(event.target.categories.value)

        },
      });
      dispatch({
        type: "SET_ARTICLE_MESSAGE",
        payload: response.data.message,
      });
    } catch (error) {
      dispatch({
        type: "SET_ARTICLE_MESSAGE",
        payload: error.response.data.message,
      });
    }
  },
};

export { CreateArticle };
