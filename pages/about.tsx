import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import Title from "../components/Title";
const About: NextPage = () => {
  return (
    <div>
      <Head>
        <title>About me</title>
        <meta name="description" content="About me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
          <div className="mt-4">
        <Title title="About me" />
        </div>
        <div className="mt-4">
        <p>Hi, I am Fred and I am a JavaScript developer. I also like to cook and I like React!</p>
        <p>So I made this page as part of my portfolio, but I also actually use it to store my recipes and access them quickly when I want to cook something.</p>
        <p className="mt-2">This page was made with react and next.js. The Database is PostgreSQL.</p>
        <p className="mt-0">Visit my full porfolio at: <a href="https://www.frederic-fox.com">www.frederic-fox.com</a></p>
        <p className="mt-4">So long and thanks for all the fish!</p>
        <p>Fred</p>
        </div>
      </Layout>
    </div>
  );
};

export default About;
