import React from "react";
import { useSelector } from "react-redux";
import CreateArticleForm from "./components/CreateArticleForm";
import LoginForm from "./components/LoginForm";
import Header from "./components/Header";

const App = () => {
  const currentUser = useSelector(state => state.currentUser);
  return (
    <>
      <Header />
      {currentUser ? <CreateArticleForm /> : <LoginForm />}
    </>
  );
};

export default App;
