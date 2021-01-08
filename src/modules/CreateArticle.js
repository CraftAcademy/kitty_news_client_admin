import axios from "axios";

const CreateArticle = {
  async create(event, dispatch) {
    event.preventDefault();
    try {
      debugger
      let response = await axios.post("/articles", {
        article: {
          title: event.target.title.value,
          lead: event.target.lead.value,
          body: event.target.body.value,
          category_id: event.target.category2.value
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

export { CreateArticle };
