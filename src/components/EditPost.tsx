import { MouseEvent } from "react";
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
};

const EditPost = ({ postDetails }: EditPostProps) => {
  const { verifyToken } = useVerifyToken();

  const loginChecker = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size='small'
          variant='pill'
          shape='circle'
          className='absolute right-2 top-2 z-1'
          onClick={loginChecker}>
          <Pencil size={12} />
        </Button>
      </DialogTrigger>

      <DialogContent className='max-h-[90vh] overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle>Edit Article</DialogTitle>
          <DialogDescription>Update details for this article</DialogDescription>
        </DialogHeader>

        <EditForm postDetails={postDetails} />
      </DialogContent>
    </Dialog>
  );
};

export default EditPost;
