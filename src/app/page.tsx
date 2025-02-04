import Hero from "@/components/Shared/Hero";
import PostsSearch from "@/components/Shared/PostsSearch";
import apiEndpoints from "@/data/apiEndpoints";
import { getUrlQueryParams } from "@/utils/helper";
import type { SearchParams } from "nuqs/server";
import { Post } from "@/utils/types";

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
  const allPosts: Post[] = await apiResponse.json();

  return (
    <main className='min-h-screen'>
      <Hero />

      <PostsSearch allPosts={allPosts.reverse()} />
    </main>
  );
}
