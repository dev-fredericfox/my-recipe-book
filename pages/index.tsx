import type { NextPage } from "next";
import { useEffect, useState } from "react";
import type { GetStaticProps } from "next";
import Head from "next/head";
import { getAllPosts } from "../lib/getAllPosts";
import Tab from "../components/Tab";
import Search from "../components/Search";
import Tile from "../components/Tile";
import Title from "../components/Title";
import NoRecpie from "../components/NoRecipe";
import Layout from "../components/Layout";
import { Post } from "../lib/interfaces";
export const getStaticProps: GetStaticProps = async () => {
  const feed = await getAllPosts();
  return { props: { feed } };
};

interface Props {
  feed: Post[];
}

const Home: NextPage<Props> = ({ feed }) => {
  const [filteredFeed, setFilteredFeed] = useState(feed);
  const [filter, setFilter] = useState<string | null>(null);
  const [search, setSearch] = useState<string | null>(null);

  useEffect(() => {
    const globalFilter = (filter: string | null, search: string | null) => {
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
      setFilteredFeed(cache);
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
        <div className="pt-12 pb-6">
          <Title title="Freds Cooking Corner" />
        </div>
        <Search searchFunction={setSearch} />
        <div className="flex flex-row">
          <Tab
            filterFunction={setFilter}
            categories={filteredFeed}
            selected={filter}
          />
        </div>
        <div>
          {filteredFeed.length > 0 && <Tile feed={filteredFeed} />}
          {filteredFeed.length === 0 && <NoRecpie />}
        </div>
      </Layout>
    </div>
  );
};

export default Home;
