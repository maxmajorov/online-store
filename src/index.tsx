import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app/App";

const rerenderEntireTree = () => {
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,

    document.getElementById("root")
  );
};

serviceWorker.unregister();
rerenderEntireTree();

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./app/App", () => {
    rerenderEntireTree();
  });
}
