import axios from "axios";
import "bulma/css/bulma.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ApiGateway } from "./api/ApiGateway";
import { configureStore } from "./configureStore";
import "./global.css";
import registerServiceWorker from "./registerServiceWorker";
import { Root } from "./screen/Root";

const api = new ApiGateway(
  axios.create({
    baseURL: `${process.env.API_URL}`
  })
);
const store = configureStore(undefined, { api });

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root") as HTMLElement
);

registerServiceWorker();
