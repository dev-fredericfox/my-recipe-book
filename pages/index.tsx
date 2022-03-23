import type { NextPage } from "next";
import type { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import prisma from "../lib/prisma";

export const getStaticProps: GetStaticProps = async () => {
  const postFeed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
      category: {
        select: { name: true },
      },
    },
  });
  const modifiedFeed = postFeed.map((el) => {
    el.updatedAt = Date.parse(el.updatedAt);
    el.createdAt = Date.parse(el.createdAt);
    return el;
  });
  return { props: { modifiedFeed } };
};

const Home: NextPage = ({ modifiedFeed }) => {
  console.log(modifiedFeed);
  return (
    <div>
      <Head>
        <title>Welcome to Freds Cooking Corner</title>
        <meta name="description" content="Welcome to Freds Cooking Corner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to Freds Cooking Corner</h1>
        <div>
          {modifiedFeed.map((el) => {
            return (
              <div key={el.id}>
                <p>{el.title}</p>
                <p>In Category: {el.category.name}</p>
                <p>Published: {el.createdAt}</p>
                <p>By: {el.author.name}</p>
              </div>
            );
          })}
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
