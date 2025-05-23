"use client";

import { PAGE_QUERY_KEY, TAGS_QUERY_KEY } from "@/data/globals";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { useEffect, useState, useRef } from "react";
import { signOut } from "next-auth/react";

import PostsSearch from "@/components/PostsSearch";
import Pagination from "@/components/Pagination";
import PostCard from "@/components/PostCard";
import TagList from "@/components/TagList";
import LayoutContainer from "@/components/UI/LayoutContainer";
import H5 from "@/components/UI/Typography/H5";
import { Grid } from "@/components/UI/Grid";
import { matches } from "@/utils/helper";
import { ApiResponsePost } from "@/utils/types";

type SearchAndPostsType = {
  apiData: ApiResponsePost;
  allTags: string[];
  timedOut: string | string[] | undefined;
};

const SearchAndPosts = ({ apiData, allTags, timedOut }: SearchAndPostsType) => {
  const [tags, setTags] = useQueryState(
    TAGS_QUERY_KEY,
    parseAsArrayOf(parseAsString).withDefault([]).withOptions({
      shallow: false
    })
  );
  const [page, setPage] = useQueryState(PAGE_QUERY_KEY, {
    defaultValue: "1",
    shallow: false
  });
  const [expandedCardId, setExpandedCardId] = useState<string>("");
  const [showTagList, setShowTagList] = useState(false);
  const isTagQueryEmpty = tags.length === 0;
  const allPosts = apiData.posts;
  const pageLoadRef = useRef(true);

  // signing user out if the session is expired
  useEffect(() => {
    // If current auth session expired, logout user
    if (timedOut && timedOut === "true") {
      // toast won't work since it's a manual refresh by user
      signOut({ redirect: false });
    }
  }, [timedOut]);

  // Scroll to the top of the main content when the page changes
  useEffect(() => {
    // Track if it's the initial mount
    // to prevent scrolling on the first render
    const isInitialMount = pageLoadRef.current;
    if (isInitialMount) {
      pageLoadRef.current = false;
      return;
    }

    // Add a small delay to ensure scroll happens only when
    // content is loaded
    const scrollTimeout = setTimeout(() => {
      document.getElementsByTagName("main")[0]?.scrollIntoView({ behavior: "smooth" });
    }, 400);

    return () => clearTimeout(scrollTimeout);
  }, [page]);

  return (
    <LayoutContainer tag='main' className='pb-3264 pt-2448'>
      {/* posts search */}
      <PostsSearch allTags={allTags} setPage={setPage} setTags={setTags} />

      {/* clicked tags list */}
      {isTagQueryEmpty ? null : showTagList ? (
        <TagList tags={tags} setTags={setTags} setShowTagList={setShowTagList} />
      ) : null}

      {/* posts grid */}
      {allPosts?.length > 0 ? (
        <Grid
          colConfig={{
            sm: 2,
            lg: 3
          }}
          className='mb-3264 mt-2440 gap-1624'>
          {allPosts.map((post) => {
            const isPostExpanded = matches(post.id, expandedCardId);
            const isInactive = matches(expandedCardId, "");

            return (
              <PostCard
                key={post.id}
                post={post}
                allTags={allTags}
                isInactive={isInactive}
                isPostExpanded={isPostExpanded}
                setExpandedCardId={setExpandedCardId}
                setTags={setTags}
                setPage={setPage}
                setShowTagList={setShowTagList}
              />
            );
          })}
        </Grid>
      ) : (
        // Fallback
        <H5
          tag='p'
          weight='semibold'
          className='grid-center my-2440 h-32 text-center text-neutral-600'>
          No relevant posts found.
        </H5>
      )}

      {/* pagination */}
      <Pagination
        page={page}
        setPage={setPage}
        nextPageExists={apiData.nextPageExists}
        totalPages={apiData.totalPages}
      />
    </LayoutContainer>
  );
};

export default SearchAndPosts;
