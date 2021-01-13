import axios from "axios";
import toBase64 from './toBase64'

const ArticlesServices = {
  async create(event, dispatch) {
    event.preventDefault();
    let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
    try {
      let encodedImage;
      if (event.target.file_input.files[0]) {
        encodedImage = await toBase64(event.target.file_input.files[0])
      }
      let response = await axios.post(
        "/articles",
        {
          article: {
            title: event.target.title.value,
            lead: event.target.lead.value,
            body: event.target.body.value,
            category_id: parseInt(event.target.categories.value),
            image: encodedImage,
          },
        },
        {
          headers: headers,
        }
      );
      dispatch({
        type: "SET_ARTICLE_MESSAGE",
        payload: response.data.message,
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR_MESSAGE",
        payload: error.response.data.message,
      });
    }
  },
};

export default ArticlesServices;
