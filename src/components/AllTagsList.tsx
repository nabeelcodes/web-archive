import { motion } from "motion/react";
import { useState } from "react";
import Button from "@/components/UI/Button";
import FlexBox from "@/components/UI/FlexBox";
import { cn } from "@/utils/helper";

type AllTagsListProps = {
  allTags: string[];
};

const Tag = ({ currentTag }: { currentTag: string }) => {
  const [activeButton, setActiveButton] = useState(false);

  const handleClick = () => {
    setActiveButton((prev) => !prev);
    // fetch data(with params) using current tag name
  };

  return (
    <Button
      id='tag'
      weight='medium'
      shape='rounded'
      variant='outline'
      onClick={() => handleClick()}
      className={cn(
        "flex min-w-12 items-center justify-between gap-8 text-nowrap rounded-full text-center",
        { "bg-neutral-900 text-background": activeButton }
      )}>
      {currentTag}
    </Button>
  );
};

const AllTagsList = ({ allTags }: AllTagsListProps) => {
  return (
    <motion.div
      className='w-full'
      initial={{ opacity: 0, transition: { delay: 0.25 } }}
      animate={{ opacity: 1, transition: { delay: 0.25 } }}
      exit={{ opacity: 0 }}>
      <FlexBox className={"my-2440 flex-wrap items-center gap-10"}>
        {allTags.map((currentTag, index) => (
          <Tag key={index} currentTag={currentTag} />
        ))}
      </FlexBox>
    </motion.div>
  );
};

export default AllTagsList;
