import { CircleAlert, Trash2 } from "lucide-react";
import { MouseEvent } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import { useVerifyToken } from "@/apiRoutes/auth-routes";
import { deletePost } from "@/apiRoutes/admin-routes";
import { CustomError } from "@/utils/customError";
import { Post } from "@/utils/types";
import FlexBox from "@/components/UI/FlexBox";
import Button from "@/components/UI/Button";
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/UI/Modal";
import P from "@/components/UI/Typography/P";

type DeletePostProps = {
  postDetails: Post;
};

const DeletePost = ({ postDetails }: DeletePostProps) => {
  const { verifyToken } = useVerifyToken();
  const router = useRouter();
  const session = useSession();
  const accessToken = session?.data?.accessToken;

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

  const deletePostHandler = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    try {
      // Check for user authentication
      await loginChecker();

      // Attempting post deletion
      const { success, errorData } = await deletePost({
        postId: postDetails.id,
        accessToken
      });

      // Post deletion : FAILED
      if (!success) {
        // Parse the error response if available
        const errorTitle = errorData.error.title;
        const errorMessage = errorData.error.message;
        throw new CustomError(
          errorTitle || "Oops! an error occurred",
          errorMessage || "Something went wrong on the server."
        );
      }

      // Post deletion : SUCCEEDED
      router.refresh();
      setTimeout(() => {
        toast.success("Article has been deleted!");
      }, 1000);
    } catch (error) {
      console.error(error);

      // Catch network errors and other exceptions
      if (error instanceof CustomError) {
        toast.error(error.title, {
          description: error.message
        });
      } else {
        // In case the error is not an instance of Error (for unexpected issues)
        toast.error("Something went wrong!", {
          description: "An unknown error occurred"
        });
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size='small'
          shape='circle'
          variant='pill'
          onClick={modalHandler}
          className='bg-red-600 text-background'>
          <Trash2 size={15} />
        </Button>
      </DialogTrigger>

      <DialogContent className='max-h-[90vh] w-[90%] max-w-[30rem]'>
        <DialogHeader>
          <DialogTitle>Delete Article</DialogTitle>
          <DialogDescription>This action cannot be undone!</DialogDescription>
        </DialogHeader>

        {/* DISCLAIMER */}
        <FlexBox className='mt-10 items-center justify-center gap-8 rounded-sm bg-red-200 p-1620 text-center text-red-600'>
          <CircleAlert size={16} />
          <P size='micro-to-small' weight='medium'>
            Caution : File once deleted will be un-recoverable
          </P>
        </FlexBox>

        <FlexBox className='mt-16 flex-col gap-12 xs:flex-row'>
          <DialogClose asChild>
            <Button
              type='submit'
              size='small'
              shape='rounded'
              variant='outline'
              className='w-full select-none rounded-full focus-visible:outline-2'
              onClick={(e) => {
                e.stopPropagation();
              }}>
              Cancel
            </Button>
          </DialogClose>

          <Button
            size='small'
            shape='rounded'
            onClick={deletePostHandler}
            className='w-full select-none rounded-full bg-red-600 text-background focus-visible:outline-2'>
            Yes, delete the article
          </Button>
        </FlexBox>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePost;
