import { Dispatch, SetStateAction, useRef, useState, MouseEvent } from "react";
import { motion } from "motion/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import FlexBox from "@/components/UI/FlexBox";
import H5 from "@/components/UI/Typography/H5";
import P from "@/components/UI/Typography/P";
import { Post } from "@/utils/types";
import { cn } from "@/utils/helper";
import { SEARCH_QUERY_KEY, TAGS_QUERY_KEY } from "@/data/globals";

type PostCardProps = {
  post: Post;
  isPostExpanded: boolean;
  isInactive: boolean;
  setExpandedCardId: Dispatch<SetStateAction<string>>;
};

const PostCard = ({ post, isPostExpanded, setExpandedCardId, isInactive }: PostCardProps) => {
  const { title, description, link, image, tags, id } = post;
  const [isExpanded, setIsExpanded] = useState(false);
  const postCardRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const cardClickHandler = () => {
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

  const tagClickHandler = (e: MouseEvent<HTMLParagraphElement>, tag: string) => {
    // getting searchQuery from url params
    const searchQuery = searchParams.get(SEARCH_QUERY_KEY);
    // checking if searchQuery is empty
    const searchQueryIsEmpty = searchQuery === null || searchQuery.trim().length === 0;
    // getting all active tags as string[]
    const activeTags = searchParams.get(TAGS_QUERY_KEY)?.split(",") || [];
    // removing duplicates using Set
    const tagSet = new Set([...activeTags, tag]);
    // updated tag list by converting from Set to array + converting to string + replacing all empty spaces with '+'
    const updatedTagList = Array.from(tagSet).join(",").replaceAll(" ", "+");
    // checking if tag list is empty
    const noTags = updatedTagList.trim().length === 0;

    if (searchQueryIsEmpty && noTags) {
      console.log(`log from 1`);
      // inputValue = empty, activeTags = empty
      router.push(pathname);
    } else if (searchQueryIsEmpty && !noTags) {
      console.log(`log from 2`);
      // inputValue = empty, activeTags = not empty
      router.push(`${pathname}?${TAGS_QUERY_KEY}=${updatedTagList}`, { scroll: false });
    } else if (!searchQueryIsEmpty && noTags) {
      console.log(`log from 3`);
      // inputValue = non empty, activeTags = empty
      router.push(`${pathname}?${SEARCH_QUERY_KEY}=${searchQuery}`, { scroll: false });
    } else {
      console.log(`log from 4`);
      // inputValue = non empty, activeTags = non empty
      router.push(`${pathname}?${SEARCH_QUERY_KEY}=${searchQuery}&&${TAGS_QUERY_KEY}=${updatedTagList}`, { scroll: false });
    }
    // to prevent PostCard expand through event propagation
    e.stopPropagation();
  };

  return (
    <>
      {/* fake component */}
      {isExpanded ? <div style={{ width: `${postCardRef.current?.offsetWidth}px`, height: `${postCardRef.current?.offsetHeight}px` }} /> : null}

      {/* backdrop */}
      {isExpanded ? <div className='fixed inset-0 z-40 bg-black/70 backdrop-blur-[2px]' onClick={cardClickHandler} /> : null}

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
        onClick={isExpanded ? () => null : cardClickHandler}
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
          <FlexBox className={cn("flex-wrap gap-8 overflow-x-hidden", { "pointer-events-none": isExpanded })}>
            {tags.map((tag, index) => (
              <P
                id='tag'
                size='tiny'
                weight='medium'
                role='button'
                key={index}
                onClick={(e) => tagClickHandler(e, tag)}
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
