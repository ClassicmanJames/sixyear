import "@/styles/globals.css";
import Head from "next/head";
import store from "@/redux/store";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import React, { Fragment } from "react";
import MainLayouts from "@/components/layouts/MainLayouts";
import NprogressProvider from "@/components/nprogressProvider";
export default function App(
  { Component, pageProps }: AppProps,
  { children }: any
) {
  return (
    <Fragment>
      <Provider store={store}>
        <Head>
          <title>CMU</title>
        </Head>
        <NprogressProvider>
          <MainLayouts>
            {children}
            <Component {...pageProps} />
          </MainLayouts>
        </NprogressProvider>
      </Provider>
    </Fragment>
  );
}
