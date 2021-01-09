import React from "react";
import {
  Button,
  Container,
  Form,
  Header,
  Input,
  TextArea,
  Message,
  Dropdown,
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
        <label for="categories">Choose a category:</label>
        <select name="categories" id="categories" data-cy="categories-dropdown">
        <option value={0}>Select</option>
          <option value={1}>Global Politics</option>
          <option value={2}>Sports</option>
          <option value={3}>Self Care</option>
          <option value={4}>News</option>
          <option value={5}>Culture</option>
        </select>
        <br />
        <br />
        <Button
          data-cy="create-article-button"
          type="submit"
          color="teal"
          value="submit"
        >
          Create Article
        </Button>
        {message && (
          <Message color="gray" size="big" data-cy="api-response-message">
            {message}
          </Message>
        )}
      </Form>
    </Container>
  );
}

export default CreateArticleForm;
