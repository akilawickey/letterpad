/*
  Import Dependencies
*/
import React from "react";
import { render } from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter } from "react-router-dom";
import client from "../shared/apolloClient";
import Routes from "./Routes";
import "isomorphic-fetch";
import config from "../config";

const isAdmin = true;

const App = (
  <BrowserRouter basename={config.baseName}>
    <ApolloProvider client={client(isAdmin)}>
      <Routes />
    </ApolloProvider>
  </BrowserRouter>
);

render(App, document.getElementById("app"));
