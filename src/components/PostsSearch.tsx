import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { Options, useQueryState } from "nuqs";

import { SEARCH_QUERY_KEY } from "@/data/globals";
import SearchInput from "@/components/SearchInput";
import SearchByTags from "@/components/SearchByTags";
import AllTagsList from "@/components/AllTagsList";
import FlexBox from "@/components/UI/FlexBox";

type PostsSearchType = {
  allTags: string[];
  setPage: (
    value: string | ((old: string) => string | null) | null,
    options?: Options
  ) => Promise<URLSearchParams>;
  setTags: (
    value: string[] | ((old: string[]) => string[] | null) | null,
    options?: Options
  ) => Promise<URLSearchParams>;
};

const PostsSearch = ({ allTags, setPage, setTags }: PostsSearchType) => {
  const [query, setQuery] = useQueryState(SEARCH_QUERY_KEY, {
    defaultValue: "",
    shallow: false,
    throttleMs: 1000
  });
  const [allTagsShown, setAllTagsShown] = useState(false);
  const isSearchQueryEmpty = query.trim().length === 0;

  return (
    <>
      <FlexBox className='items-center gap-12'>
        {/* main search */}
        <SearchInput
          isSearchQueryEmpty={isSearchQueryEmpty}
          setQuery={setQuery}
          setPage={setPage}
        />

        {/* grid/list picker & createPost */}
        <SearchByTags
          allTags={allTags}
          setTags={setTags}
          allTagsShown={allTagsShown}
          setAllTagsShown={setAllTagsShown}
        />
      </FlexBox>

      {/* all tags list */}
      <AnimatePresence mode='wait'>
        {allTagsShown ? (
          <div className='hidden sm:block'>
            <AllTagsList allTags={allTags} setTags={setTags} />
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default PostsSearch;
