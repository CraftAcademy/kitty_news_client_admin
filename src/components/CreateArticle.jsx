import React from "react";
import { Container, Form, Input } from "semantic-ui-react";

function CreateArticle() {
  return (
    <Container>
      <Form>
        <Form.Field required data-cy="title-field">
          <label>Article Title</label>
          <input type="text" placeholder='Title' />
        </Form.Field>
      </Form>
    </Container>
  );
}

export default CreateArticle;
