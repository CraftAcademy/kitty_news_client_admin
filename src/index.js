import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import configureStore from "./state/store/configureStore";
import { Provider } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api";

const store = configureStore();
window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
