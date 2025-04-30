import { useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { signOut } from "next-auth/react";

import { useVerifyToken } from "@/apiRoutes/auth-routes";
import CreateForm from "@/components/CreateForm";
import Button from "@/components/UI/Button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from "@/components/UI/Modal";

const CreatePost = ({ allTags }: { allTags: string[] }) => {
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
          className='h-[41.6px] gap-6 rounded-full bg-neutral-900 px-1620 text-small'
          onClick={modalHandler}>
          <Plus size={16} absoluteStrokeWidth /> Create
        </Button>
      </DialogTrigger>

      <DialogContent className='max-h-[95vh]'>
        <DialogHeader>
          <DialogTitle>New Article</DialogTitle>
          <DialogDescription>Enter details for a new article</DialogDescription>
        </DialogHeader>

        <CreateForm allTags={allTags} setIsModalOpen={setIsModalOpen}>
          {/* Cancel button */}
          <DialogClose asChild>
            <Button
              type='submit'
              size='small'
              shape='rounded'
              variant='outline'
              className='w-full select-none rounded-full focus-visible:outline-2'>
              Cancel
            </Button>
          </DialogClose>
        </CreateForm>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
