import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";

import store from "./redux/store";

import "./scss/app.scss";
import App from "./App";

const queryClient = new QueryClient();

ReactDOM.render(
    <QueryClientProvider client={queryClient}>
        <Router>
            <Provider store={store}>
                <App />
            </Provider>
        </Router>
    </QueryClientProvider>,
    document.getElementById("root")
);
