import { Dispatch, SetStateAction, useRef, useState, MouseEvent } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import FlexBox from "@/components/UI/FlexBox";
import H5 from "@/components/UI/Typography/H5";
import P from "@/components/UI/Typography/P";
import { Post } from "@/utils/types";
import { cn } from "@/utils/helper";

type PostCardProps = {
  post: Post;
  isPostExpanded: boolean;
  isInactive: boolean;
  tagArray: string[];
  setTagArray: Dispatch<SetStateAction<string[]>>;
  setExpandedCardId: Dispatch<SetStateAction<string>>;
};

const PostCard = ({ post, isPostExpanded, setExpandedCardId, isInactive, tagArray, setTagArray }: PostCardProps) => {
  const { title, description, link, image, tags, id } = post;
  const [isExpanded, setIsExpanded] = useState(false);
  const postCardRef = useRef<HTMLDivElement | null>(null);

  const clickHandler = (e: MouseEvent<HTMLDivElement>) => {
    const currentElement = e.target as HTMLElement;
    // checking if the clicked element is a tag?
    if (currentElement.id === "tag") {
      // preventing duplicate tags in tagArray
      if (!tagArray.includes(currentElement.innerText)) {
        setTagArray((prev) => [currentElement.innerText, ...prev]);
      }
      return;
    }

    // setting other states
    setExpandedCardId(id);
    setIsExpanded((prev) => !prev);
    // preventing overflow on the body due to DOM changes
    document.querySelector("body")?.classList.toggle("overflow-hidden");

    if (isExpanded) {
      setTimeout(() => {
        setExpandedCardId("");
      }, 510);
    }
  };

  return (
    <>
      {/* fake component */}
      {isExpanded ? <div style={{ width: `${postCardRef.current?.offsetWidth}px`, height: `${postCardRef.current?.offsetHeight}px` }} /> : null}

      {/* backdrop */}
      {isExpanded ? <div className='fixed inset-0 z-40 bg-black/70 backdrop-blur-[2px]' onClick={clickHandler} /> : null}

      {/* PostCard component */}
      <motion.div
        ref={postCardRef}
        className={cn(
          "flex flex-col justify-between overflow-hidden rounded-lg border border-neutral-400 bg-background",
          { "fixed inset-0 z-modal m-auto h-fit w-[90%] max-w-[650px]": isExpanded },
          { "pointer-events-none": !isExpanded },
          { "z-50": isPostExpanded },
          { "pointer-events-auto": isInactive || isPostExpanded }
        )}
        layout
        role={isExpanded ? "div" : "button"}
        title={title}
        onClick={isExpanded ? () => null : (e) => clickHandler(e)}
        transition={{ duration: 0.5, ease: "anticipate" }}>
        {/* image wrapper */}
        <div className='card-image-wrapper relative isolate aspect-[1200/630] w-full'>
          <Image src={image} alt='card-image' fill className='z-1 object-cover' />
        </div>

        <FlexBox className='relative z-5 grow flex-col justify-between gap-16 p-16'>
          {/* title and description */}
          <div className='max-h-36'>
            <H5 className='line-clamp-2 text-pretty'>{title}</H5>
            <P size='small' className={cn("mt-4 text-neutral-700", isExpanded ? "line-clamp-none" : "line-clamp-2")}>
              {description}
            </P>
          </div>

          {/* tags */}
          <FlexBox className='flex-wrap gap-8 overflow-x-hidden'>
            {tags.map((tag, index) => (
              <P
                id='tag'
                size='tiny'
                weight='medium'
                key={index}
                className='min-w-12 text-nowrap rounded-full border border-neutral-400 bg-background px-10 py-6 text-center'>
                {tag}
              </P>
            ))}
          </FlexBox>

          {/* link CTA */}
          {isExpanded && (
            <motion.a
              href={link}
              target='_blank'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='rounded-full bg-neutral-900 py-8 text-center text-background'>
              Visit link
            </motion.a>
          )}
        </FlexBox>
      </motion.div>
    </>
  );
};

export default PostCard;
