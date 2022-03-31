import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPostIds } from "../../lib/getPostIds";
import { getPost } from "../../lib/getPost";
import Layout from "../../components/Layout";
import { ArrowSmLeftIcon } from "@heroicons/react/outline";
import Link from "next/link";
import IngredientsList from "../../components/IngredientsList";
import { Post } from "../../lib/interfaces";

interface Props {
  postData: Post[];
}

const BlogPost: NextPage<Props> = ({ postData }) => {
  const post = postData[0];
  const [checkedBox, setCheckedBox] = useState([]);

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
            <IngredientsList ingredients={post.ingredients} />
            <p className="text-2xl mt-2 mb-2 font-bold">Recipe</p>
            {
              /* Maybe render Markdown? */
              <div className="text-xl">
                <ReactMarkdown
                  components={{
                    h1: ({node, ...props}) => <h1 className="text-4xl" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-3xl" {...props} />,
                    h3: ({node, ...props}) => <h2 className="text-2xl" {...props} />,
                    li: ({ node, ordered, checked, index, ...props }) => (
                      <label className="cursor-pointer">
                        <li {...props} />
                      </label>
                    ),
                    input: ({
                      node,
                      disabled = false,
                      checked = false,
                      ...props
                    }) => <input {...props} />,
                    table: (node, ...props) => <table className="w-full text-lg text-left text-gray-500 dark:text-gray-400" onClick={() => console.log(node, ...props)}>{node.children}</table>,
                    thead: (node, ...props) => <thead className="text-lg text-gray-700 uppercase bg-slate-200 dark:bg-gray-700 dark:text-gray-400" >{node.children}</thead>,
                    tbody: (node, ...props) => <tbody className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">{node.children}</tbody>,
                    img: (node, ...props) =>   <Image src={node.src as string}  layout="responsive" height="427px" width="640px" alt={node.alt}/>
                  }}
                  remarkPlugins={[remarkGfm]}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            }
            {/* <div className="mt-3">{post.content}</div> */}
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

interface Params {
  params: Id;
}
interface Id {
  id: string;
}

export async function getStaticProps({ params }: Params) {
  const postId = parseInt(params.id);
  const postData = await getPost(postId);
  return {
    props: {
      postData,
    },
  };
}
