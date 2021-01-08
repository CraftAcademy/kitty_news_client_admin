import React from "react";
import {
  Button,
  Container,
  Form,
  Header,
  Input,
  TextArea,
  Message,
  Checkbox,
} from "semantic-ui-react";

import { useDispatch, useSelector } from "react-redux";
import { CreateArticle } from "../modules/CreateArticle";

function CreateArticleForm() {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.createArticleMessage);

  return (
    <Container>
      <Header>Create Article</Header>
      <Form
        data-cy="article-form"
        onSubmit={(event) => CreateArticle.create(event, dispatch)}
      >
        <Form.Field
          data-cy="title-field"
          label="Article title"
          control={Input}
          name="title"
          placeholder="Title"
        />
        <Form.Field
          data-cy="lead-field"
          label="Article lead"
          control={Input}
          name="lead"
          placeholder="Lead"
        />
        <Form.Field
          data-cy="body-field"
          label="Article body"
          control={TextArea}
          name="body"
          placeholder="Body"
        />
        <div>
        <br />
          <input type="checkbox" name="global_politics" id="global_politics" data-cy='categories-global-politics'/>
          <label for="global_politics">Global Politics</label>
          <br />
          <input type="checkbox" name="sports" id="sports" data-cy='categories-sports'/>
          <label for="sports">Sports</label>
          <br />
          <input type="checkbox" name="self_care" id="self_care" data-cy='categories-self-care'/>
          <label for="self_care">Self Care</label>
          <br />
          <input type="checkbox" name="news" id="news" data-cy='categories-news'/>
          <label for="news">News</label>
          <br />
          <input type="checkbox" name="culture" id="culture" data-cy='categories-culture'/>
          <label for="culture">Culture</label>
          <br />
        </div>


        <br/>
        <br/>
        <Button
          data-cy="create-article-button"
          type="submit"
          color="teal"
          value="submit"
        >
          Create Article
        </Button>
        {message && (
          <Message color="green" size="big" data-cy="api-response-message">
            {message}
          </Message>
        )}
      </Form>
    </Container>
  );
}

export default CreateArticleForm;
