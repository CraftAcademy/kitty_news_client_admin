import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
  Header,
  Input,
  TextArea,
  Message,
  Divider,
  Item,
} from "semantic-ui-react";

import { useDispatch, useSelector } from "react-redux";
import ArticlesServices from "../modules/ArticlesServices";

const CreateArticleForm = () => {
  const dispatch = useDispatch();
  const { createArticleMessage, errorMessage } = useSelector((state) => state);
  const [image, setImage] = useState();
  const [title, setTitle] = useState();
  const [lead, setLead] = useState();
  const [body, setBody] = useState();
  const [category, setCategory] = useState();

  return (
    <Container>
      <Header>Create Article</Header>
      <Form
        data-cy="article-form"
        onSubmit={(event) => ArticlesServices.create(event, dispatch)}
      >
        <Form.Field
          data-cy="title-field"
          label="Article title:"
          control={Input}
          name="title"
          placeholder="Title"
          onChange={(event) => setTitle(event.target.value)}
        />
        <Form.Field
          data-cy="lead-field"
          label="Article lead:"
          control={Input}
          name="lead"
          placeholder="Lead"
          onChange={(event) => setLead(event.target.value)}
        />
        <Form.Field
          data-cy="body-field"
          label="Article body:"
          control={TextArea}
          name="body"
          placeholder="Body"
          onChange={(event) => setBody(event.target.value)}
        />
        <Form.Field>
          <label for="categories">Choose a category:</label>
          <select
            name="categories"
            id="categories"
            data-cy="categories-dropdown"
            onChange={(event) =>
              setCategory(event.target[event.target.value].innerText)
            }
          >
            <option value={0}>Select</option>
            <option value={1}>Global Politics</option>
            <option value={2}>Sports</option>
            <option value={3}>Self Care</option>
            <option value={4}>News</option>
            <option value={5}>Culture</option>
          </select>
        </Form.Field>
        <Form.Input
          name="file_input"
          placeholder="Image"
          type="file"
          label="Image:"
          data-cy="file-input"
          onChange={(event) => setImage(event.target.files[0])}
        />
        <Button
          data-cy="create-article-button"
          type="submit"
          color="teal"
          value="submit"
        >
          Create Article
        </Button>
        {createArticleMessage && (
          <Message
            color="green"
            size="big"
            data-cy="api-response-success-message"
          >
            {createArticleMessage}
          </Message>
        )}
        {errorMessage && (
          <Message color="red" size="big" data-cy="api-response-error-message">
            {errorMessage}
          </Message>
        )}
      </Form>
      <Divider horizontal>Article Preview</Divider>
      <Item.Group>
        <Item data-cy="preview-article-item">
          {image && (
            <Item.Image size="small" src={URL.createObjectURL(image)} />
          )}
          <Item.Content>
            <Item.Header>Title: {title}</Item.Header>
            <Item.Meta>Lead: {lead}</Item.Meta>
            <Item.Description>Body: {body}</Item.Description>
            <Item.Meta>Category: {category}</Item.Meta>
          </Item.Content>
        </Item>
      </Item.Group>
    </Container>
  );
};

export default CreateArticleForm;
