import { X } from "lucide-react";
import FlexBox from "@/components/UI/FlexBox";
import Button from "@/components/UI/Button";
import { Options } from "nuqs";

type TagListProps = {
  tags: string[];
  setTags: (
    value: string[] | ((old: string[]) => string[] | null) | null,
    options?: Options
  ) => Promise<URLSearchParams>;
};

const TagList = ({ tags, setTags }: TagListProps) => {
  const handleTagClose = (currentTag: string) => {
    const newTags = tags.filter((tag) => tag !== currentTag);

    setTags(newTags);
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

      <Button shape='circle' size='small' onClick={() => setTags([])}>
        <X size={16} />
      </Button>
    </FlexBox>
  );
};

export default TagList;
