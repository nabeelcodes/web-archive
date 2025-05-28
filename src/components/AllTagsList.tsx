import { motion } from "motion/react";
import { Options } from "nuqs";

import Tag from "@/components/Tag";
import FlexBox from "@/components/UI/FlexBox";

type AllTagsListProps = {
  inVaul?: boolean;
  allTags: string[];
  tagsInUrl: string[];
  setTags: (
    value: string[] | ((old: string[]) => string[] | null) | null,
    options?: Options
  ) => Promise<URLSearchParams>;
};

const AllTagsList = ({ allTags, setTags, tagsInUrl, inVaul }: AllTagsListProps) => {
  return (
    <motion.div
      className='w-full'
      initial={{ opacity: 0, transition: { delay: 0.25 } }}
      animate={{ opacity: 1, transition: { delay: 0.25 } }}
      exit={{ opacity: 0 }}>
      <FlexBox className={"my-2440 flex-wrap items-center gap-10"}>
        {allTags.map((currentTag, index) => (
          <Tag
            key={index}
            currentTag={currentTag}
            setTags={setTags}
            tagsInUrl={tagsInUrl}
            inVaul={inVaul}
          />
        ))}
      </FlexBox>
    </motion.div>
  );
};

export default AllTagsList;
