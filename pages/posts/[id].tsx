import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { getAllPostIds } from "../../lib/getPostIds";
import { getPost } from "../../lib/getPosts";

const BlogPost: NextPage = ({ postData }) => {
  const post = postData[0];

  return (
    <div>
      <Head>
        <title>Welcome to Freds Cooking Corner</title>
        <meta name="description" content="Welcome to Freds Cooking Corner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-2xl">{post.title}</h1>
        <div>
          In: {post.category.name} Cuisine By: {post.author.name}
          Published: {post.createdAt}
        </div>
        <div>
        <Image src={post.coverimg} layout="responsive" height="427px" width="640px" alt={post.title} />
        </div>
        <div>{post.content}</div>
      </main>
    </div>
  );
};

export default BlogPost;

export async function getStaticPaths() {
  const paths = await getAllPostIds();
  console.log(paths);
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
