/*
  Import Dependencies
*/
import React from "react";
import { hydrate } from "react-dom";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter } from "react-router-dom";
import client from "./apolloClient";
import App from "./containers/App";
import { Route, Switch } from "react-router-dom";
import LoginView from "./containers/LoginView";
import "isomorphic-fetch";
/*
  Rendering
  This is where we hook up the Store with our actual component and the router
*/

const app = (
    <BrowserRouter>
        <ApolloProvider client={client}>
            <Switch>
                <App />
            </Switch>
        </ApolloProvider>
    </BrowserRouter>
);

hydrate(app, document.getElementById("app"));
