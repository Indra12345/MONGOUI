import React from "react";
import ReactDOM from "react-dom";
import Store from "./store";
import { Provider } from "react-redux";

import App from "./components/App.jsx";

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
