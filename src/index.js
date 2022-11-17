import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import reportWebVitals from "./reportWebVitals";
import { store } from "./store";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
