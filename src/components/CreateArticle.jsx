import React from "react";
import { Button, Container, Form, Header, Input, TextArea } from "semantic-ui-react";

function CreateArticle() {
  return (
    <Container>
      <Header>Create Article</Header>
      <Form data-cy="article-form">
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
        <Button>Create Article</Button>
      </Form>
    </Container>
  );
}

export default CreateArticle;
