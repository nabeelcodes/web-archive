"use client";

import { ChangeEvent, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SEARCH_QUERY_KEY, TAGS_QUERY_KEY } from "@/data/globals";
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

const PostsSearch = ({ allPosts }: { allPosts: Post[] }) => {
  const [postStyle, setPostStyle] = useState<"grid" | "list">("grid");
  const [expandedCardId, setExpandedCardId] = useState<string>("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  // getting all active tags as string[]
  const activeTags = searchParams.get(TAGS_QUERY_KEY)?.split(",") || [];
  // check if there is a empty tag at the beginning
  const isTagQueryEmpty = activeTags.every((tag) => matches(tag, ""));
  // using ref to debounce search input
  const timeoutRef = useRef<NodeJS.Timeout>(undefined);

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const inputIsEmpty = inputValue.trim().length === 0;
    const searchQuery = inputValue.replaceAll(" ", "+");
    // clearing timeout
    clearTimeout(timeoutRef.current);
    // debouncing: 1 second
    timeoutRef.current = setTimeout(() => {
      if (inputIsEmpty && isTagQueryEmpty) {
        // inputValue = empty, activeTags = empty
        router.push(pathname);
        return;
      } else if (inputIsEmpty && !isTagQueryEmpty) {
        // inputValue = empty, activeTags = not empty
        router.push(`${pathname}?${TAGS_QUERY_KEY}=${activeTags}`, { scroll: false });
        return;
      } else if (!inputIsEmpty && isTagQueryEmpty) {
        // inputValue = non empty, activeTags = empty
        router.push(`${pathname}?${SEARCH_QUERY_KEY}=${searchQuery}`, { scroll: false });
        return;
      } else {
        // inputValue = non empty, activeTags = non empty
        router.push(`${pathname}?${SEARCH_QUERY_KEY}=${searchQuery}&&${TAGS_QUERY_KEY}=${activeTags}`, { scroll: false });
      }
    }, 1000);
  };

  return (
    <LayoutContainer className='py-2448'>
      <FlexBox className='items-center gap-12'>
        {/* main search */}
        <Input
          fullWidth
          placeholder='Search for articles'
          shape='pill'
          suffix={<Search size={20} className='text-neutral-700' role='button' />}
          onChange={searchHandler}
        />

        {/* grid vs list picker */}
        <ListStylePicker postStyle={postStyle} setPostStyle={setPostStyle} />
      </FlexBox>

      {/* clicked tags list */}
      {isTagQueryEmpty ? null : <TagList tagArray={activeTags} />}

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
              <PostCard key={post.id} post={post} isPostExpanded={isPostExpanded} setExpandedCardId={setExpandedCardId} isInactive={isInactive} />
            );
          })}
      </Grid>

      {/* pagination */}
      <Pagination />
    </LayoutContainer>
  );
};

export default PostsSearch;
