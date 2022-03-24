import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import type { GetStaticProps } from "next";
import Head from "next/head";
import { getAllPosts } from "../lib/getAllPosts";
import Tab from "../components/Tab";
import Search from "../components/Search";
import Tile from "../components/Tile";
import Layout from "../components/Layout";
import { ModifiedFeed } from "../lib/interfaces";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await getAllPosts();
  return { props: { feed } };
};

const Home: NextPage<ModifiedFeed> = ({ feed }) => {
  const [filteredFeed, setFilteredFeed] = useState(feed);
  const [filter, setFilter] = useState<string | null>(null);
  const [search, setSearch] = useState<string | null>(null);

  // useEffect(() => {
  //   const filterFeed = (term?: string | null) => {
  //     if (term !== null && term !== "All") {
  //       return feed.filter((feedElement) => feedElement.category.name === term);
  //     }
  //     return feed;
  //   };
  //   const filtered = filterFeed(filter);
  //   setFilteredFeed(filtered);
  // }, [filter, feed]);

  // useEffect(() => {
  //   const searchFeed = (term: string | null = "") => {
  //     if (term !== null && term !== "") {
  //       return feed.filter((feedElement) =>
  //         feedElement.title.toLowerCase().includes(term.toLowerCase())
  //       );
  //     }
  //     return feed;
  //   };
  //   const query = searchFeed(search);
  //   setFilteredFeed(query);
  // }, [search, feed]);

  useEffect(() => {
    const globalFilter = (filter, search) => {
      let cache = feed;
      if (filter !== null && filter !== "All") {
        cache = feed.filter(
          (feedElement) => feedElement.category.name === filter
        );
      }
      if (search !== null && search !== "") {
        cache = cache.filter((feedElement) =>
          feedElement.title.toLowerCase().includes(search.toLowerCase())
        );
      }
      setFilteredFeed(cache)
    };
    globalFilter(filter, search);
  }, [filter, search, feed]);

  return (
    <div>
      <Head>
        <title>Welcome to Freds Cooking Corner</title>
        <meta name="description" content="Welcome to Freds Cooking Corner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1 className="text-2xl text-center font-bold pt-12 pb-6">
          Freds Cooking Corner
        </h1>
        <Search searchFunction={setSearch} />
        <div className="flex flex-row">
          <Tab
            filterFunction={setFilter}
            categories={filteredFeed}
            selected={filter}
          />
        </div>
        <div>
          <Tile feed={filteredFeed} />
        </div>
      </Layout>
    </div>
  );
};

export default Home;
