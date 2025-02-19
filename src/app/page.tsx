import Hero from "@/components/Hero";
import PostsSearch from "@/components/PostsSearch";
import Footer from "@/components/Footer";
import apiEndpoints from "@/data/apiEndpoints";
import { getUrlQueryParams } from "@/utils/helper";
import { ApiResponsePost } from "@/utils/types";
import type { SearchParams } from "nuqs/server";

type PageProps = {
  urlParams: Promise<SearchParams>;
};

export default async function Home({ urlParams }: PageProps) {
  const { query, tags, page } = await getUrlQueryParams(urlParams);
  const apiResponse = await fetch(
    apiEndpoints.posts.getPosts({
      query,
      tags,
      page
    })
  );
  const apiData: ApiResponsePost = await apiResponse.json();

  return (
    <>
      <Hero />

      <PostsSearch apiData={apiData} />

      <Footer />
    </>
  );
}
