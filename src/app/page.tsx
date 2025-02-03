import Hero from "@/components/Shared/Hero";
import PostsSearch from "@/components/Shared/PostsSearch";
import apiEndpoints from "@/data/apiEndpoints";
import { Post } from "@/utils/types";

type SearchParamsType = Promise<{ [key: string]: string | string[] | undefined }>;

const getUrlQueryParams = async (searchParams: SearchParamsType) => {
  const { query, tags, page } = await searchParams;
  if (Array.isArray(query) || Array.isArray(tags) || Array.isArray(page)) {
    return {};
  }
  return {
    query: query?.replaceAll(" ", "+"),
    tags: tags?.replaceAll("%2C", ","),
    page
  };
};

export default async function Home({ searchParams }: { searchParams: SearchParamsType }) {
  const { query, tags, page } = await getUrlQueryParams(searchParams);
  const apiResponse = await fetch(apiEndpoints.posts.getPosts({ query, tags, page }));
  const allPosts: Post[] = await apiResponse.json();

  return (
    <main className='min-h-screen'>
      <Hero />

      <PostsSearch allPosts={allPosts.reverse()} />
    </main>
  );
}
