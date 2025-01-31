import FlexBox from "@/components/UI/FlexBox";
import H5 from "@/components/UI/Typography/H5";
import P from "@/components/UI/Typography/P";
import { Post } from "@/utils/types";
import Image from "next/image";

const PostCard = ({ post }: { post: Post }) => {
  const { title, description, image, tags } = post;

  return (
    <div className='flex cursor-pointer flex-col justify-between overflow-hidden rounded-lg border border-neutral-400 bg-background'>
      {/* image wrapper */}
      <div className='card-image-wrapper relative isolate aspect-[1200/630] w-full'>
        <Image src={image} alt='card-image' fill className='z-1 object-cover' />
      </div>

      <FlexBox className='relative z-5 -mt-24 grow flex-col justify-between gap-16 p-16'>
        {/* title and description */}
        <div className='max-h-36'>
          <H5 className='line-clamp-2 text-pretty'>{title}</H5>
          <P size='small' className='mt-4 line-clamp-3 text-neutral-700'>
            {description}
          </P>
        </div>

        {/* tags */}
        <FlexBox className='flex-wrap gap-8 overflow-x-hidden'>
          {tags.map((tag, index) => (
            <P
              size='tiny'
              weight='medium'
              key={index}
              className='min-w-12 text-nowrap rounded-full border border-neutral-400 bg-background px-10 py-6 text-center'>
              {tag}
            </P>
          ))}
        </FlexBox>
      </FlexBox>
    </div>
  );
};

export default PostCard;
