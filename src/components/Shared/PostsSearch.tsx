"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import LayoutContainer from "@/components/UI/LayoutContainer";
import FlexBox from "@/components/UI/FlexBox";
import Input from "@/components/UI/Input";
import ListStylePicker from "@/components/Shared/ListStylePicker";
import { Post } from "@/utils/types";
import { Grid } from "@/components/UI/Grid";
import PostCard from "@/components/Shared/PostCard";
import Pagination from "@/components/Shared/Pagination";

const PostsSearch = ({ allPosts }: { allPosts: Post[] }) => {
  const [postStyle, setPostStyle] = useState<"grid" | "list">("grid");

  return (
    <LayoutContainer className='py-2448'>
      <FlexBox className='items-center gap-12'>
        {/* main search */}
        <Input fullWidth placeholder='Search for articles' shape='pill' suffix={<Search size={20} className='text-neutral-700' role='button' />} />

        {/* grid vs list picker */}
        <ListStylePicker postStyle={postStyle} setPostStyle={setPostStyle} />
      </FlexBox>

      {/* posts grid */}
      <Grid
        colConfig={{
          sm: 2,
          lg: 3
        }}
        className='my-2440 gap-1624'>
        {allPosts && allPosts.map((post) => <PostCard key={post.id} post={post} />)}
      </Grid>

      {/* pagination */}
      <Pagination />
    </LayoutContainer>
  );
};

export default PostsSearch;
