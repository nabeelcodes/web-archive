"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import LayoutContainer from "@/components/UI/LayoutContainer";
import FlexBox from "@/components/UI/FlexBox";
import Input from "@/components/UI/Input";
import ListStylePicker from "@/components/Shared/ListStylePicker";
import { Post } from "@/utils/types";
import { Grid } from "@/components/UI/Grid";

const PostsSearch = ({ allPosts }: { allPosts: Post[] }) => {
  const [postStyle, setPostStyle] = useState<"grid" | "list">("grid");

  return (
    <LayoutContainer className='py-2448'>
      <FlexBox className='gap-12 items-center'>
        <Input fullWidth placeholder='Search for articles' shape='pill' suffix={<Search size={20} className='text-neutral-700' role='button' />} />

        <ListStylePicker postStyle={postStyle} setPostStyle={setPostStyle} />
      </FlexBox>

      <Grid
        colConfig={{
          sm: 2,
          lg: 3
        }}
        className='mt-2440'>
        {allPosts &&
          allPosts.map(({ id }) => (
            <div key={id} className='grid-center p-16 rounded-md h-64 w-full bg-neutral-200'>
              CARD {id}
            </div>
          ))}
      </Grid>
    </LayoutContainer>
  );
};

export default PostsSearch;
