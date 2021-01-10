import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon, Segment, Form, Message } from 'semantic-ui-react';
// import { performAuthentication } from '../modules/auth';

const LoginForm = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(state => state.errorMessage);

  return (
    <Segment placeholder>
      <Form
        className="loginForm"
        data-cy="login-form"
        // onSubmit={(event) => performAuthentication(event, dispatch)}
      >
        <Form.Input
          icon="at"
          type="text"
          label="Email"
          name="email"
          data-cy="email"
          placeholder="Email"
          iconPosition="left"
        />
        <Form.Input
          icon="key"
          type="password"
          label="Password"
          name="password"
          data-cy="password"
          placeholder="password"
          iconPosition="left"
        />

        <Button data-cy="submit-btn" icon labelPosition="left">
          <Icon name="user"></Icon>
          Submit
        </Button>
        {errorMessage &&
        <Message data-cy="error-message">{errorMessage}</Message> }
      </Form>
    </Segment>
  );
};

export default LoginForm;
