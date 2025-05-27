import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { Options } from "nuqs";

import FlexBox from "@/components/UI/FlexBox";
import Button from "@/components/UI/Button";
import { cn } from "@/utils/helper";

type AllTagsListProps = {
  inVaul?: boolean;
  allTags: string[];
  setTags: (
    value: string[] | ((old: string[]) => string[] | null) | null,
    options?: Options
  ) => Promise<URLSearchParams>;
};

const Tag = ({
  currentTag,
  setTags,
  inVaul
}: { currentTag: string; inVaul?: boolean } & Pick<AllTagsListProps, "setTags">) => {
  // Using useSearchParams to get the current tags from the URL
  // This is useful for checking if the tag is active
  const params = useSearchParams();
  // Get the current tag from the URL parameters
  const allTagsInParams = params.get("tags")?.split(",") || [];
  // Check if the current tag is active (i.e., included in the URL parameters)
  const isActive = allTagsInParams.includes(currentTag.trim());

  const handleClick = () => {
    // fetch data(with params) using current tag name
    setTags((prev) => {
      if (prev?.includes(currentTag)) {
        return prev.filter((tag) => tag !== currentTag);
      } else {
        return [...(prev || []), currentTag];
      }
    });
    // No need to show TagList for AllTagsList clicks
  };

  return (
    <Button
      id='tag'
      weight='medium'
      shape='rounded'
      variant='outline'
      onClick={handleClick}
      className={cn(
        "flex min-w-12 items-center justify-between gap-8 text-nowrap rounded-full text-center",
        { "bg-neutral-900 text-background": isActive },
        { "text-background": inVaul && !isActive },
        { "bg-background text-neutral-900": inVaul && isActive }
      )}>
      {currentTag}
    </Button>
  );
};

const AllTagsList = ({ allTags, setTags, inVaul }: AllTagsListProps) => {
  return (
    <motion.div
      className='w-full'
      initial={{ opacity: 0, transition: { delay: 0.25 } }}
      animate={{ opacity: 1, transition: { delay: 0.25 } }}
      exit={{ opacity: 0 }}>
      <FlexBox className={"my-2440 flex-wrap items-center gap-10"}>
        {allTags.map((currentTag, index) => (
          <Tag key={index} currentTag={currentTag} setTags={setTags} inVaul={inVaul} />
        ))}
      </FlexBox>
    </motion.div>
  );
};

export default AllTagsList;
