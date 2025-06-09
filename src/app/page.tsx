import type { SearchParams } from "nuqs/server";

import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import LoadingPosts from "@/components/LoadingPosts";
import SearchAndPosts from "@/components/SearchAndPosts";
import { getUrlQueryParams } from "@/utils/helper";
import { FETCH_TAGS } from "@/data/globals";
import apiEndpoints from "@/data/apiEndpoints";
import { Suspense } from "react";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

const Posts = async ({ searchParams }: PageProps) => {
  const { query, tags, page, timedOut } = await getUrlQueryParams(searchParams);

  // Fetch initial data concurrently using Promise.all
  const [apiDataPosts, apiDataTags] = await Promise.all([
    fetch(apiEndpoints.posts.getPosts({ query, tags, page }), {
      next: {
        revalidate: 3600,
        tags: [FETCH_TAGS.posts]
      }
    }).then((res) => res.json()),
    fetch(apiEndpoints.tags.getAllTags()).then((res) => res.json())
  ]);

  return (
    <SearchAndPosts apiData={apiDataPosts} allTags={apiDataTags.allTags} timedOut={timedOut} />
  );
};

export default async function Home({ searchParams }: PageProps) {
  return (
    <>
      <Hero />

      <Suspense fallback={<LoadingPosts />}>
        <Posts searchParams={searchParams} />
      </Suspense>

      <Footer />
    </>
  );
}
