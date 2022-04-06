import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages/Index.js";

import "@/utilities/tools.js";
import "@/utilities/environment.js";
import axios from "axios";

import "@shopify/polaris/dist/styles.css";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import "rc-time-picker/assets/index.css";
import "rc-color-picker/assets/index.css";
import "braft-editor/dist/index.css";
import "braft-extensions/dist/table.css";

window.axios = axios;

ReactDOM.render(<App />, document.getElementById("root"));