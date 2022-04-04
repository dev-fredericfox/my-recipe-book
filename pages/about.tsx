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
        <p>Hi, I am Fred and I am a JavaScript developer. I also like React and cooking…</p>
        <p>That&apos;s why I made this app as part of my portfolio (but I also use it to quickly access my recipes when I need to cook something)!</p>
        <p className="mt-2">This page was made with React and next.js. The database is PostgreSQL.</p>
        <p className="mt-0">Visit my complete porfolio at: <a href="https://www.frederic-fox.com">www.frederic-fox.com</a></p>
        <p className="mt-4">So long and thanks for all the fish! ;)</p>
        <p>Fred</p>
        </div>
      </Layout>
    </div>
  );
};

export default About;
