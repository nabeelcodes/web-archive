import { Dispatch, SetStateAction } from "react";
import { X } from "lucide-react";
import { Options } from "nuqs";

import FlexBox from "@/components/UI/FlexBox";
import Button from "@/components/UI/Button";

type TagListProps = {
  tags: string[];
  setTags: (
    value: string[] | ((old: string[]) => string[] | null) | null,
    options?: Options
  ) => Promise<URLSearchParams>;
  setShowTagList: Dispatch<SetStateAction<boolean>>;
};

const TagList = ({ tags, setTags, setShowTagList }: TagListProps) => {
  const handleTagClose = (currentTag: string) => {
    const newTags = tags.filter((tag) => tag !== currentTag);

    setTags(newTags);
    setShowTagList(false);
  };

  return (
    <FlexBox className={"my-2440 flex-wrap items-center gap-10"}>
      {tags.map((currentTag, index) => (
        <Button
          id='tag'
          key={index}
          weight='medium'
          shape='rounded'
          onClick={() => handleTagClose(currentTag)}
          className='flex min-w-12 items-center justify-between gap-8 text-nowrap rounded-full bg-neutral-900 text-center text-background'>
          {currentTag}

          <X size={16} className='mt-2' />
        </Button>
      ))}

      {tags.length > 1 && (
        <Button
          shape='circle'
          size='small'
          onClick={() => {
            setTags([]);
            setShowTagList(false);
          }}>
          <X size={16} />
        </Button>
      )}
    </FlexBox>
  );
};

export default TagList;
