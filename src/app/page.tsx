import Hero from "@/components/Shared/Hero";
import PostsSearch from "@/components/Shared/PostsSearch";
import apiEndpoints from "@/data/apiEndpoints";
import { Post } from "@/utils/types";

export default async function Home() {
  const apiResponse = await fetch(apiEndpoints.posts.getPosts({}));
  const allPosts: Post[] = await apiResponse.json();

  return (
    <main className='min-h-screen'>
      <Hero />

      <PostsSearch allPosts={allPosts.reverse()} />
    </main>
  );
}
