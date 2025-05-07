import { Dispatch, MouseEvent, SetStateAction } from "react";
import { toast } from "sonner";
import { Pencil } from "lucide-react";
import { signOut } from "next-auth/react";

import { useVerifyToken } from "@/apiRoutes/auth-routes";
import { Post } from "@/utils/types";
import EditForm from "@/components/EditForm";
import Button from "@/components/UI/Button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/UI/Modal";

type EditPostProps = {
  postDetails: Post;
  allTags: string[];
  editModalOpen: boolean;
  setEditModalOpen: Dispatch<SetStateAction<boolean>>;
};

const EditPost = ({ postDetails, allTags, editModalOpen, setEditModalOpen }: EditPostProps) => {
  const { verifyToken } = useVerifyToken();

  const loginChecker = async () => {
    const { success } = await verifyToken();
    // Do nothing if user logged in
    if (!success) {
      // user NOT logged in
      toast.error("Please login again", {
        description: "User timed out!"
      });
      signOut({ redirect: false });
    }
  };

  const modalHandler = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    await loginChecker();
  };

  return (
    <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
      <DialogTrigger asChild>
        <Button size='small' variant='pill' shape='circle' onClick={modalHandler}>
          <Pencil size={15} />
        </Button>
      </DialogTrigger>

      <DialogContent className='max-h-[95vh]'>
        <DialogHeader>
          <DialogTitle>Make Changes</DialogTitle>
          <DialogDescription>Update details for this article</DialogDescription>
        </DialogHeader>

        <EditForm allTags={allTags} postDetails={postDetails} setEditModalOpen={setEditModalOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default EditPost;
