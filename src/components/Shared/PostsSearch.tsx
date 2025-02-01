"use client";

import { useState } from "react";
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
  const [tagArray, setTagArray] = useState<string[]>([]);

  return (
    <LayoutContainer className='py-2448'>
      <FlexBox className='items-center gap-12'>
        {/* main search */}
        <Input fullWidth placeholder='Search for articles' shape='pill' suffix={<Search size={20} className='text-neutral-700' role='button' />} />

        {/* grid vs list picker */}
        <ListStylePicker postStyle={postStyle} setPostStyle={setPostStyle} />
      </FlexBox>

      {/* clicked tags list */}
      <TagList tagArray={tagArray} setTagArray={setTagArray} />

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
                tagArray={tagArray}
                setTagArray={setTagArray}
              />
            );
          })}
      </Grid>

      {/* pagination */}
      <Pagination />
    </LayoutContainer>
  );
};

export default PostsSearch;
