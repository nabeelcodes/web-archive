import type { SearchParams } from "nuqs/server";
import Hero from "@/components/Hero";
import PostsSearch from "@/components/PostsSearch";
import Footer from "@/components/Footer";
import apiEndpoints from "@/data/apiEndpoints";
import { FETCH_TAGS } from "@/data/globals";
import { getUrlQueryParams } from "@/utils/helper";
import { ApiResponsePost, ApiResponseTags } from "@/utils/types";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Home({ searchParams }: PageProps) {
  const { query, tags, page, timedOut } = await getUrlQueryParams(searchParams);
  // Fetching all posts
  const apiResponsePosts = await fetch(
    apiEndpoints.posts.getPosts({
      query,
      tags,
      page
    }),
    { cache: "force-cache", next: { revalidate: 3600, tags: [FETCH_TAGS.posts] } }
  );

  const apiDataPosts: ApiResponsePost = await apiResponsePosts.json();
  // Fetching all tags
  const apiResponseTags = await fetch(apiEndpoints.tags.getAllTags());
  const apiDataTags: ApiResponseTags = await apiResponseTags.json();

  return (
    <>
      <Hero />

      <PostsSearch apiData={apiDataPosts} allTags={apiDataTags.allTags} timedOut={timedOut} />

      <Footer />
    </>
  );
}
