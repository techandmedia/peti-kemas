import React from "react";
import App from "next/app";
import { useContext, useState } from "react";
import GlobalProvider, {
  UserContext,
  MenuContext
} from "utils/context/Global-Context";
import Layout from "components/Layout";

function MainApp(props) {
  const { menu } = useContext(MenuContext);
  const { user } = useContext(UserContext);
  const { isUserLoggedIn } = user;

  const { Component, pageProps } = props;

  return (
    <Layout isUserLoggedIn={isUserLoggedIn}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default class MyApp extends App {
  render() {
    return (
      <GlobalProvider>
        <MainApp {...this.props} />
        {/* <Component {...pageProps} /> */}
      </GlobalProvider>
    );
  }
}
