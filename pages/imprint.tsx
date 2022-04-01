import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import Title from "../components/Title";
const Imprint: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Impressum</title>
        <meta name="description" content="Impressum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
          <div className="mt-4">
        <Title title="Imprint/Impressum" />
        </div>
        <div className="mt-4">
        <p>Angaben gemäß § 5 TMG</p>
        <p>Frederic Fox</p>
        <p>Hintere Dorfstr. 6</p>
        <p>79588 Efringen-Kirchen</p>
        <p>Kontakt Telefon: 016092201612</p>
        <p>E-Mail: dev.frederic.fox@gmail.com</p>
        <p>Quelle: eRecht24</p>
        </div>
      </Layout>
    </div>
  );
};

export default Imprint;
