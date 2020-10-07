import React from "react";
import ReactDOM from "react-dom";

import Throttle from "./Throttle";
import Debounce from "./Debounce";

ReactDOM.render(
  <React.StrictMode>
    <Throttle />
    <Debounce />
  </React.StrictMode>,
  document.getElementById("root")
);
