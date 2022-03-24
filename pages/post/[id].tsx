import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { getAllPostIds } from "../../lib/getPostIds";
import { getPost } from "../../lib/getPosts";
import Layout from "../../components/Layout";
import { ArrowSmLeftIcon } from "@heroicons/react/outline";
import Link from "next/link";
import IngredientsList from "../../components/IngredientsList"

const BlogPost: NextPage = ({ postData }) => {
  const post = postData[0];

  return (
    <div>
      <Head>
        <title>Welcome to Freds Cooking Corner</title>
        <meta name="description" content="Welcome to Freds Cooking Corner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main>
          <div className="flex flex-row mt-10 pb-6">
            <div className="bg-white rounded-full">
              <Link href="/" passHref>
                <ArrowSmLeftIcon className="h-8 w-8 text-gray-300" />
              </Link>
            </div>
            <div className="grow">
              <h1 className="text-2xl font-bold text-center pr-10">
                {post.title}
              </h1>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-md">
            <Image
              src={post.coverimg}
              layout="responsive"
              height="427px"
              width="640px"
              alt={post.title}
            />
          </div>
          <div className="mt-6">
            <p className="text-2xl font-bold">
              Ingredients ({post.ingredients.length})
            </p>
            <IngredientsList ingredients={post.ingredients}/>
            <p className="text-2xl mt-2 font-bold">
              Directions
            </p>
          <div>{post.content}</div>
          </div>
        </main>
      </Layout>
    </div>
  );
};

export default BlogPost;

export async function getStaticPaths() {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postId = parseInt(params.id);
  const postData = await getPost(postId);
  return {
    props: {
      postData,
    },
  };
}
