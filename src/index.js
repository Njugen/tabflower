import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/react-generated/index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { AppContextProvider } from "./components/contexts/AppContextProvider";

ReactDOM.render(
  <HashRouter hashType="noslash">
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </HashRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
