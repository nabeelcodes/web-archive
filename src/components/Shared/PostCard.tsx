import FlexBox from "@/components/UI/FlexBox";
import H5 from "@/components/UI/Typography/H5";
import P from "@/components/UI/Typography/P";
import { Post } from "@/utils/types";
import Image from "next/image";

const images = [
  "https://cdn.stackoverflow.co/images/jo7n4k8s/production/cdf357e1d2df3af2d771981b5597c1a222b5606b-2400x1260.jpg?w=1200&fm=png&auto=format",
  "https://tkdodo.eu/blog/og-images/practical-react-query.png",
  "https://cdn.stackoverflow.co/images/jo7n4k8s/production/7f309e9e03ddeb3517f2c81fac3db2e390a8868c-12000x6293.jpg?rect=7,0,11987,6293&w=1200&h=630&auto=format&dpr=2",
  "https://cdn.stackoverflow.co/images/jo7n4k8s/production/409d6b453709d6ff545c6099bc430d177bf49e0f-6000x3150.jpg?w=1200&h=630&auto=format&dpr=2"
];

const PostCard = ({ post, index }: { post: Post; index: number }) => {
  const { title, description, tags } = post;

  return (
    <div className='flex cursor-pointer flex-col justify-between overflow-hidden rounded-lg border border-neutral-400 bg-background'>
      <div className='card-image-wrapper relative isolate aspect-[1200/630] w-full'>
        <Image src={images[index]} alt='card-image' fill className='z-1 object-cover' />
      </div>

      <FlexBox className='relative z-5 -mt-24 grow flex-col justify-between gap-16 p-16'>
        <div className='max-h-36'>
          <H5 className='line-clamp-2 text-pretty'>{title}</H5>
          <P size='small' className='mt-4 line-clamp-3 text-neutral-700'>
            {description}
          </P>
        </div>

        <FlexBox className='flex-wrap gap-8 overflow-x-hidden'>
          {tags.map((tag, index) => (
            <P size='tiny' weight='medium' key={index} className='text-nowrap rounded-full border border-neutral-400 bg-background px-10 py-6'>
              {tag}
            </P>
          ))}
        </FlexBox>
      </FlexBox>
    </div>
  );
};

export default PostCard;
