import { GetServerSideProps } from "next";
import { getAllPostsIncludingDrafts } from "../../lib/getAllPostsIncludingDrafts";
import type { NextPage } from "next";
import { Post } from "../../lib/interfaces";
import Head from "next/head";
import Title from "../../components/Title";
import AccessDenied from "../../components/AccessDenied";
import Layout from "../../components/Layout";
import DashboardPosts from "../../components/DashboardPosts";
import { useSession, getSession } from "next-auth/react";

export const getServerSideProps: GetServerSideProps<any> = async (context) => {
  try {
    const posts = await getAllPostsIncludingDrafts();
    return {
      props: { posts, session: await getSession(context) },
    };
  } catch (error) {
    return {
      props: "Error",
    };
  }
};

interface Props {
  posts: Post[];
}

const Dashboard: NextPage<Props> = ({ posts }) => {
  const { data: session } = useSession();
  if (typeof window === "undefined") return null;

  if (session) {
    return (
      <div>
        <Head>
          <title>Add Recipe</title>
          <meta name="description" content="Add Recipe" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
          <div>
            <div className="mt-6">
              <Title title="Admin Dashboard" />
            </div>
            <p className="text-2xl font-bold">Recipes</p>
            <DashboardPosts post={posts} />
          </div>
        </Layout>
      </div>
    );
  }
  return <AccessDenied/>
};

export default Dashboard;
