import { Dispatch, SetStateAction, useRef, useState, MouseEvent } from "react";
import { useSession } from "next-auth/react";
import { motion } from "motion/react";
import Image from "next/image";
import { Options } from "nuqs";

import EditPost from "@/components/EditPost";
import DeletePost from "@/components/DeletePost";
import FlexBox from "@/components/UI/FlexBox";
import H2 from "@/components/UI/Typography/H2";
import P from "@/components/UI/Typography/P";
import { Post } from "@/utils/types";
import { cn } from "@/utils/helper";
import { blurPlaceholder } from "@/data/globals";

type PostCardProps = {
  post: Post;
  allTags: string[];
  isInactive: boolean;
  isPostExpanded: boolean;
  setExpandedCardId: Dispatch<SetStateAction<string>>;
  setTags: (
    value: string[] | ((old: string[]) => string[] | null) | null,
    options?: Options
  ) => Promise<URLSearchParams>;
  setPage: (
    value: string | ((old: string) => string | null) | null,
    options?: Options
  ) => Promise<URLSearchParams>;
  setShowTagList: Dispatch<SetStateAction<boolean>>;
};

const PostCard = ({
  post,
  allTags,
  isInactive,
  isPostExpanded,
  setExpandedCardId,
  setTags,
  setPage,
  setShowTagList
}: PostCardProps) => {
  const { title, description, link, image, tags: tagList, id } = post;
  const [isExpanded, setIsExpanded] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const postCardRef = useRef<HTMLDivElement | null>(null);
  const session = useSession();

  const cardClickHandler = () => {
    // Do not run when Post is being edited
    if (editModalOpen) return;

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

  const tagClickHandler = (event: MouseEvent<HTMLParagraphElement>, tag: string) => {
    setTags((prev) => {
      if (prev.includes(tag)) return prev;
      // skip everything if duplicate tag attempted
      setPage("1");
      // Show TagList when PostCard tag is clicked
      setShowTagList(true);
      return prev.concat(tag);
    });

    // to prevent PostCard expand through event propagation
    event.stopPropagation();
  };

  return (
    <>
      {/* fake component */}
      {isExpanded ? (
        <div
          style={{
            width: `${postCardRef.current?.offsetWidth}px`,
            height: `${postCardRef.current?.offsetHeight}px`
          }}
        />
      ) : null}

      {/* backdrop */}
      {isExpanded ? (
        <div
          className='fixed inset-0 z-40 bg-black/70 backdrop-blur-[2px]'
          onClick={cardClickHandler}
        />
      ) : null}

      {/* PostCard component */}
      <motion.div
        ref={postCardRef}
        className={cn(
          "relative flex flex-col justify-between overflow-hidden rounded-lg border border-neutral-400 bg-background",
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
          <Image
            fill
            quality={85}
            src={image}
            alt={`An illustration about ${title.toLowerCase()}`}
            placeholder='blur'
            blurDataURL={blurPlaceholder}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className='z-1 object-cover'
          />
        </div>

        {/* Textual data and Tags */}
        <div className='p-16'>
          {/* title and description */}
          <H2
            className={cn(
              "line-clamp-2 text-pretty text-h5",
              isExpanded ? "line-clamp-none" : "line-clamp-2"
            )}>
            {title}
          </H2>
          <P
            size='small'
            className={cn(
              "mt-4 text-neutral-700",
              isExpanded ? "line-clamp-none" : "line-clamp-2"
            )}>
            {description}
          </P>

          {/* tags */}
          <FlexBox
            className={cn("mt-16 flex-wrap gap-8 overflow-x-hidden", {
              "pointer-events-none": isExpanded
            })}>
            {tagList.map((tag, index) => (
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
              className='mt-16 block w-full rounded-full bg-neutral-900 py-8 text-center text-background'>
              Visit link
            </motion.a>
          )}
        </div>

        <FlexBox className='absolute right-2 top-2 z-1 gap-x-8'>
          {/* Edit Button */}
          {session.status === "authenticated" && !isExpanded && (
            <EditPost
              allTags={allTags}
              postDetails={post}
              editModalOpen={editModalOpen}
              setEditModalOpen={setEditModalOpen}
            />
          )}

          {/* Delete Button */}
          {session.status === "authenticated" && !isExpanded && <DeletePost postDetails={post} />}
        </FlexBox>
      </motion.div>
    </>
  );
};

export default PostCard;
