import { Dispatch, SetStateAction } from "react";
import { useSession } from "next-auth/react";
import { Options } from "nuqs";

import SearchWithVaul from "@/components/SearchWithVaul";
import Button from "@/components/UI/Button";
import CreatePost from "@/components/CreatePost";

type SearchByTagsProps = {
  allTags: string[];
  allTagsShown: boolean;
  setAllTagsShown: Dispatch<SetStateAction<boolean>>;
  setTags: (
    value: string[] | ((old: string[]) => string[] | null) | null,
    options?: Options
  ) => Promise<URLSearchParams>;
};

const SearchByTags = ({ allTags, allTagsShown, setTags, setAllTagsShown }: SearchByTagsProps) => {
  const session = useSession();

  const handleClickForDesktopMode = () => {
    if (allTagsShown) {
      setTags(null);
    }
    setAllTagsShown((prev) => !prev);
  };

  return (
    <>
      <Button
        className='hidden h-[41.6px] shrink-0 gap-6 rounded-full bg-neutral-900 px-1620 text-small sm:block'
        onClick={handleClickForDesktopMode}>
        All Tags
      </Button>

      {/* Vaul enabled only for mobile screens */}
      <SearchWithVaul allTags={allTags} setTags={setTags}>
        <Button className='h-[41.6px] shrink-0 gap-6 rounded-full bg-neutral-900 px-1620 text-small sm:hidden'>
          All Tags
        </Button>
      </SearchWithVaul>

      {/* create new post button : for logged-in admin only */}
      {session.status === "authenticated" && <CreatePost allTags={allTags} />}
    </>
  );
};

export default SearchByTags;
