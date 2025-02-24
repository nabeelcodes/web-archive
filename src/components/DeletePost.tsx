import { MouseEvent } from "react";
import { UseFormReset } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
import { CircleAlert } from "lucide-react";

type DeletePostProps = {
  isSubmitting: boolean;
  postDetails: Post;
  reset: UseFormReset<{
    link: string;
    title: string;
    image: string;
    tags: string;
    description?: string | undefined;
  }>;
};

const DeletePost = ({ reset, isSubmitting, postDetails }: DeletePostProps) => {
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

  const deletePostHandler = async () => {
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
      toast.success("Article has been deleted!");
      reset();
      router.refresh();
    } catch (error) {
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
          shape='rounded'
          disabled={isSubmitting}
          onClick={modalHandler}
          className='w-full select-none rounded-full bg-red-600 text-background focus-visible:outline-2'>
          Delete
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

        <FlexBox className='mt-16 flex-col gap-8 xs:flex-row'>
          <DialogClose asChild>
            <Button
              type='submit'
              size='small'
              shape='rounded'
              className='w-full select-none rounded-full text-background focus-visible:outline-2'>
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
