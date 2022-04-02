import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
const Debug: NextPage = () => {
  const [debugInfo, setDebugInfo] = useState("");
  const [errorInfo, seterrorInfo] = useState("");
  const doFetch = async () => {
    try {
      let response = await fetch("/api/debug", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      let e = await response.json()
      setDebugInfo(JSON.stringify(e));
      return response;
    } catch (error) {
      seterrorInfo(JSON.stringify(error));
    }
  };
  return (
    <div>
      <Head>
        <title>DEBUG</title>
        <meta name="description" content="Impressum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <button onClick={doFetch}>FETCH</button>
        <div>debugInfo:</div>
        <div>{debugInfo}</div>
        <div>errorInfo:</div>
        <div>{errorInfo}</div>
      </Layout>
    </div>
  );
};

export default Debug;
