import { Dispatch, SetStateAction } from "react";
import { useSession } from "next-auth/react";
import Button from "@/components/UI/Button";
import CreatePost from "@/components/CreatePost";

type SearchByTagsProps = {
  allTags: string[];
  setAllTagsShown: Dispatch<SetStateAction<boolean>>;
};

const SearchByTags = ({ allTags, setAllTagsShown }: SearchByTagsProps) => {
  const session = useSession();

  return (
    <>
      <Button
        className='h-[41.6px] shrink-0 gap-6 rounded-full bg-neutral-900 px-1620 text-small'
        onClick={() => setAllTagsShown((prev) => !prev)}>
        All Tags
      </Button>

      {/* create new post button : for logged-in admin only */}
      {session.status === "authenticated" && <CreatePost allTags={allTags} />}
    </>
  );
};

export default SearchByTags;
