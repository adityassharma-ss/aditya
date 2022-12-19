import React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga";
import "@styles/index.scss";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));

ReactGA.initialize("UA-170076691-3");
ReactGA.pageview(window.location.pathname + window.location.search);
