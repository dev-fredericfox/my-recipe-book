import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import Title from "../components/Title";
const Unauthorzied: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Unauthorzied</title>
        <meta name="description" content="Add Recipe" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Title title="You are not authorized so see this page. Please sign in."></Title>
      </Layout>
    </div>
  );
};

export default Unauthorzied;
