import { Dispatch, SetStateAction } from "react";
import { useSession } from "next-auth/react";
import Button from "@/components/UI/Button";
import { LayoutGrid, List } from "lucide-react";
import CreatePost from "@/components/CreatePost";

type ListStyleProps = {
  postStyle: "grid" | "list";
  allTags: string[];
  setPostStyle: Dispatch<SetStateAction<"grid" | "list">>;
};

const ListStylePicker = ({ postStyle, allTags, setPostStyle }: ListStyleProps) => {
  const listIsActive = postStyle === "list";
  const session = useSession();

  return (
    <>
      {/* grid button */}
      <Button
        size='small'
        variant='outline'
        shape='circle'
        className={listIsActive ? "" : "bg-neutral-900"}
        onClick={() => setPostStyle("grid")}>
        <LayoutGrid size={16} className={listIsActive ? "text-neutral-700" : "text-background"} />
      </Button>

      {/* list button */}
      <Button
        size='small'
        variant='outline'
        shape='circle'
        className={listIsActive ? "bg-neutral-900" : ""}
        onClick={() => setPostStyle("list")}>
        <List size={16} className={listIsActive ? "text-background" : "text-neutral-700"} />
      </Button>

      {/* create new post button : for logged-in admin only */}
      {session.status === "authenticated" && <CreatePost allTags={allTags} />}
    </>
  );
};

export default ListStylePicker;
