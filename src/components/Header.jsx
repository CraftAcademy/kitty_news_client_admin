import React from "react";
import { useSelector } from "react-redux";
import { Segment, Icon } from "semantic-ui-react";

const Header = () => {
  const currentUser = useSelector((state) => state.currentUser);
  return (
    <Segment.Group horizontal>
      <Segment>
        <h3 data-cy="header-user-email">
          {currentUser
            ? `Meow! Welcome back ${currentUser.uid}`
            : "Woof! You're not logged in yet."}
        </h3>
      </Segment>
      <Segment>
        <h1>Kitty News ADMIN PAGE</h1>
      </Segment>
      <Segment>
          <Icon name="paw" size="big" color="pink"/>
      </Segment>
    </Segment.Group>
  );
};

export default Header;
