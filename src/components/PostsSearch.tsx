"use client";

import { PAGE_QUERY_KEY, SEARCH_QUERY_KEY, TAGS_QUERY_KEY } from "@/data/globals";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

import ListStylePicker from "@/components/ListStylePicker";
import Pagination from "@/components/Pagination";
import PostCard from "@/components/PostCard";
import TagList from "@/components/TagList";
import SearchInput from "@/components/SearchInput";
import LayoutContainer from "@/components/UI/LayoutContainer";
import FlexBox from "@/components/UI/FlexBox";
import { Grid } from "@/components/UI/Grid";
import H5 from "@/components/UI/Typography/H5";
import { matches } from "@/utils/helper";
import { ApiResponsePost } from "@/utils/types";

type PostsSearchType = {
  apiData: ApiResponsePost;
  allTags: string[];
  timedOut: string | string[] | undefined;
};

const PostsSearch = ({ apiData, allTags, timedOut }: PostsSearchType) => {
  useEffect(() => {
    // If current auth session expired, logout user
    if (timedOut && timedOut === "true") {
      // toast won't work since it's a manual refresh by user
      signOut({ redirect: false });
    }
  }, [timedOut]);

  const [postStyle, setPostStyle] = useState<"grid" | "list">("grid");
  const [expandedCardId, setExpandedCardId] = useState<string>("");
  const [query, setQuery] = useQueryState(SEARCH_QUERY_KEY, {
    defaultValue: "",
    shallow: false,
    throttleMs: 1000
  });
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
  const isSearchQueryEmpty = query.trim().length === 0;
  const isTagQueryEmpty = tags.length === 0;
  const allPosts = apiData.posts;

  return (
    <LayoutContainer tag='main' className='pb-3264 pt-2448'>
      <FlexBox className='items-center gap-12'>
        {/* main search */}
        <SearchInput
          isSearchQueryEmpty={isSearchQueryEmpty}
          setQuery={setQuery}
          setPage={setPage}
        />

        {/* grid/list picker & createPost */}
        <ListStylePicker postStyle={postStyle} allTags={allTags} setPostStyle={setPostStyle} />
      </FlexBox>

      {/* clicked tags list */}
      {isTagQueryEmpty ? null : <TagList tags={tags} setTags={setTags} />}

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
              />
            );
          })}
        </Grid>
      ) : (
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

export default PostsSearch;
