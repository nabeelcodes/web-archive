import { Dispatch, SetStateAction } from "react";
import { X } from "lucide-react";
import FlexBox from "@/components/UI/FlexBox";
import P from "@/components/UI/Typography/P";
import { cn } from "@/utils/helper";

type TagListProps = {
  tagArray: string[];
  setTagArray: Dispatch<SetStateAction<string[]>>;
};

const TagList = ({ tagArray, setTagArray }: TagListProps) => {
  const tagArrayIsEmpty = tagArray.length === 0;

  const handleTagClose = (currentTag: string) => {
    const newTagArray = tagArray.filter((tag) => tag !== currentTag);
    setTagArray(newTagArray);
  };

  return (
    <FlexBox
      className={cn("my-2440 flex-wrap gap-8 overflow-x-hidden", {
        "my-0": tagArrayIsEmpty
      })}>
      {!tagArrayIsEmpty &&
        tagArray.map((currentTag, index) => (
          <P
            id='tag'
            size='small'
            weight='medium'
            key={index}
            tag={"button"}
            className='flex min-w-12 items-center justify-between gap-8 text-nowrap rounded-full bg-neutral-900 px-16 py-6 text-center text-background'>
            <span>{currentTag}</span>

            <X size={16} onClick={() => handleTagClose(currentTag)} />
          </P>
        ))}
    </FlexBox>
  );
};

export default TagList;
