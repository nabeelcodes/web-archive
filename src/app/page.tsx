import Hero from "@/components/Shared/Hero";
import PostsSearch from "@/components/Shared/PostsSearch";
import Footer from "@/components/Shared/Footer";
import apiEndpoints from "@/data/apiEndpoints";
import { getUrlQueryParams } from "@/utils/helper";
import { ApiResponse } from "@/utils/types";
import type { SearchParams } from "nuqs/server";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Home({ searchParams }: PageProps) {
  const { query, tags, page } = await getUrlQueryParams(searchParams);
  const apiResponse = await fetch(
    apiEndpoints.posts.getPosts({
      query,
      tags,
      page
    })
  );
  const apiData: ApiResponse = await apiResponse.json();

  return (
    <>
      <Hero />

      <PostsSearch apiData={apiData} />

      <Footer />
    </>
  );
}
