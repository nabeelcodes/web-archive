"use client";

import LayoutContainer from "@/components/UI/LayoutContainer";
import { Grid } from "@/components/UI/Grid";

const LoadingPosts = () => {
  return (
    <LayoutContainer
      tag='main'
      className='z-modal pb-3264 pt-2448'
      aria-hidden='false'
      data-aria-hidden='false'>
      <div className='animate-pulse'>
        {/* Skeleton for search */}
        <div className='mb-8 h-12 rounded-lg bg-neutral-300' />

        {/* Skeleton for posts grid */}
        <Grid
          colConfig={{
            sm: 2,
            lg: 3
          }}
          className='mb-3264 mt-2440 gap-1624'>
          {[...Array(9)].map((_, i) => (
            <div key={i} className='h-64 rounded-lg bg-neutral-300' />
          ))}
        </Grid>
      </div>
    </LayoutContainer>
  );
};

export default LoadingPosts;
