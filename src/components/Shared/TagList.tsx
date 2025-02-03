import { X } from "lucide-react";
import FlexBox from "@/components/UI/FlexBox";
import P from "@/components/UI/Typography/P";
import { Options } from "nuqs";

type TagListProps = {
  tags: string;
  setTags: (value: string | ((old: string) => string | null) | null, options?: Options) => Promise<URLSearchParams>;
};

const TagList = ({ tags, setTags }: TagListProps) => {
  const tagArray = tags.split(",");

  const handleTagClose = (currentTag: string) => {
    const newTags = tagArray
      .filter((tag) => tag !== currentTag)
      .join(",")
      .replaceAll(" ", "+");

    setTags(newTags);
  };

  return (
    <FlexBox className={"my-2440 flex-wrap gap-8 overflow-x-hidden"}>
      {tagArray.map((currentTag, index) => (
        <P
          id='tag'
          size='small'
          weight='medium'
          key={index}
          tag={"button"}
          onClick={() => handleTagClose(currentTag)}
          className='flex min-w-12 items-center justify-between gap-8 text-nowrap rounded-full bg-neutral-900 px-16 py-8 text-center leading-5 text-background'>
          {currentTag}

          <X size={16} />
        </P>
      ))}
    </FlexBox>
  );
};

export default TagList;
