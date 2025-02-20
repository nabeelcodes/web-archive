import { Dispatch, MouseEvent, SetStateAction } from "react";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { Pencil } from "lucide-react";
import { useVerifyToken } from "@/apiRoutes/auth-routes";
import EditForm from "@/components/EditForm";
import Button from "@/components/UI/Button";
import { Post } from "@/utils/types";
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
  editModalOpen: boolean;
  setEditModalOpen: Dispatch<SetStateAction<boolean>>;
};

const EditPost = ({ postDetails, editModalOpen, setEditModalOpen }: EditPostProps) => {
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

  const modalHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    loginChecker();
  };

  return (
    <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
      <DialogTrigger asChild>
        <Button
          size='small'
          variant='pill'
          shape='circle'
          className='absolute right-2 top-2 z-1'
          onClick={modalHandler}>
          <Pencil size={12} />
        </Button>
      </DialogTrigger>

      <DialogContent className='max-h-[90vh] overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle>Edit Article</DialogTitle>
          <DialogDescription>Update details for this article</DialogDescription>
        </DialogHeader>

        <EditForm postDetails={postDetails} modalHandler={setEditModalOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default EditPost;
