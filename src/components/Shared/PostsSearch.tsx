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
import Button from "@/components/UI/Button";
import H5 from "@/components/UI/Typography/H5";

const PostsSearch = ({ allPosts }: { allPosts: Post[] }) => {
  const [postStyle, setPostStyle] = useState<"grid" | "list">("grid");

  return (
    <LayoutContainer className='py-2448'>
      <FlexBox className='items-center gap-12'>
        <Input fullWidth placeholder='Search for articles' shape='pill' suffix={<Search size={20} className='text-neutral-700' role='button' />} />

        <ListStylePicker postStyle={postStyle} setPostStyle={setPostStyle} />
      </FlexBox>

      <Grid
        colConfig={{
          sm: 2,
          lg: 3
        }}
        className='my-2440 gap-1624'>
        {allPosts && allPosts.map((post, index) => <PostCard key={post.id} post={post} index={index} />)}
      </Grid>

      {/* pagination */}
      <FlexBox className='items-center justify-between gap-32'>
        <FlexBox className='items-center gap-12'>
          <H5 className='font-geistMono'>1</H5>
        </FlexBox>

        <FlexBox className='items-center gap-16'>
          <Button variant='secondary' className='bg-neutral-900 text-background'>
            Previous
          </Button>

          <Button variant='secondary' className='bg-neutral-900 text-background'>
            Next
          </Button>
        </FlexBox>
      </FlexBox>
    </LayoutContainer>
  );
};

export default PostsSearch;
