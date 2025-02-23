import { useState } from "react";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { useVerifyToken } from "@/apiRoutes/auth-routes";
import PostForm from "@/components/PostForm";
import Button from "@/components/UI/Button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/UI/Modal";

const CreatePost = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const modalHandler = async () => {
    await loginChecker();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button
          size='small'
          className='h-[41.6px] rounded-full bg-neutral-900 px-1620 text-small'
          onClick={modalHandler}>
          Create
        </Button>
      </DialogTrigger>

      <DialogContent className='max-h-[90vh] overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle>New Article</DialogTitle>
          <DialogDescription>Enter details for a new article</DialogDescription>
        </DialogHeader>

        <PostForm setIsModalOpen={setIsModalOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
