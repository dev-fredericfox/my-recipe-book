import Head from "next/head";
import Layout from "../components/Layout";
import Title from "../components/Title";
import Link from "next/link";

export default function AccessDenied() {
  return (
    <div>
      <Head>
        <title>Unauthorzied</title>
        <meta name="description" content="Add Recipe" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Title title="You are not authorized so see this page." />
        <Link href="/api/auth/signin" passHref>
          <p className="text-center underline cursor-pointer">
            Please sign in.
          </p>
        </Link>
      </Layout>
    </div>
  );
}
