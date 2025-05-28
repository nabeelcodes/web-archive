import { Options } from "nuqs";

import Button from "@/components/UI/Button";
import { cn } from "@/utils/helper";

type TagProps = {
  inVaul?: boolean;
  currentTag: string;
  tagsInUrl: string[];
  setTags: (
    value: string[] | ((old: string[]) => string[] | null) | null,
    options?: Options
  ) => Promise<URLSearchParams>;
};

const Tag = ({ currentTag, setTags, tagsInUrl, inVaul }: TagProps) => {
  // Check if the current tag is active (i.e., included in the URL parameters)
  const isActive = tagsInUrl.includes(currentTag.trim());

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

export default Tag;
