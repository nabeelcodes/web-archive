"use client";

import { PAGE_QUERY_KEY, SEARCH_QUERY_KEY, TAGS_QUERY_KEY } from "@/data/globals";
import { ChangeEvent, useState } from "react";
import { Search } from "lucide-react";
import LayoutContainer from "@/components/UI/LayoutContainer";
import FlexBox from "@/components/UI/FlexBox";
import { Grid } from "@/components/UI/Grid";
import Input from "@/components/UI/Input";
import ListStylePicker from "@/components/Shared/ListStylePicker";
import Pagination from "@/components/Shared/Pagination";
import PostCard from "@/components/Shared/PostCard";
import TagList from "@/components/Shared/TagList";
import { matches } from "@/utils/helper";
import { Post } from "@/utils/types";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";

const PostsSearch = ({ allPosts }: { allPosts: Post[] }) => {
  const [postStyle, setPostStyle] = useState<"grid" | "list">("grid");
  const [expandedCardId, setExpandedCardId] = useState<string>("");
  // const [pageVal, setPageVal] = useState<string>("1");
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

  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const inputIsEmpty = inputValue.trim().length === 0;
    if (inputIsEmpty) {
      setQuery("");
    } else {
      setQuery(inputValue);
      setPage("1");
    }
  };

  return (
    <LayoutContainer className='py-2448'>
      <FlexBox className='items-center gap-12'>
        {/* main search */}
        <Input
          fullWidth
          shape='pill'
          // value={query}
          onChange={searchHandler}
          placeholder='Search for articles'
          suffix={<Search size={20} className='text-neutral-700' role='button' />}
        />

        {/* grid vs list picker */}
        <ListStylePicker postStyle={postStyle} setPostStyle={setPostStyle} />
      </FlexBox>

      {/* clicked tags list */}
      {isTagQueryEmpty ? null : <TagList tags={tags} setTags={setTags} />}

      {/* posts grid */}
      <Grid
        colConfig={{
          sm: 2,
          lg: 3
        }}
        className='my-2440 gap-1624'>
        {allPosts &&
          allPosts.map((post) => {
            const isPostExpanded = matches(post.id, expandedCardId);
            const isInactive = matches(expandedCardId, "");

            return (
              <PostCard
                key={post.id}
                post={post}
                isPostExpanded={isPostExpanded}
                setExpandedCardId={setExpandedCardId}
                isInactive={isInactive}
                setTags={setTags}
                setPage={setPage}
              />
            );
          })}
      </Grid>

      {/* pagination */}
      {isSearchQueryEmpty && isTagQueryEmpty && <Pagination page={page} setPage={setPage} />}
    </LayoutContainer>
  );
};

export default PostsSearch;
