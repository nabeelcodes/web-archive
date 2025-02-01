import { X } from "lucide-react";
import FlexBox from "@/components/UI/FlexBox";
import P from "@/components/UI/Typography/P";
import { usePathname, useRouter } from "next/navigation";
import { TAGS_QUERY_KEY } from "@/data/globals";

const TagList = ({ tagArray }: { tagArray: string[] }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleTagClose = (currentTag: string) => {
    const newTags = tagArray
      .filter((tag) => tag !== currentTag)
      .join(",")
      .replaceAll(" ", "+");

    if (newTags.trim().length === 0) {
      // for no tags in url params
      router.push(pathname, { scroll: false });
    } else {
      router.push(`${pathname}?${TAGS_QUERY_KEY}=${newTags}`, { scroll: false });
    }
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
