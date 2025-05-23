import { Dispatch, SetStateAction } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import { ImageAndTagsForm, LinkForm, TitleAndDescriptionForm } from "@/components/FormComponents";
import FlexBox from "@/components/UI/FlexBox";
import Button from "@/components/UI/Button";
import { useVerifyToken } from "@/apiRoutes/auth-routes";
import { updatePost } from "@/apiRoutes/admin-routes";
import { Post, postSchema, PostSchemaType } from "@/utils/types";
import { CustomError } from "@/utils/customError";
import { cn } from "@/utils/helper";

type EditFormProps = {
  allTags: string[];
  postDetails: Post;
  setEditModalOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
};

const EditForm = ({ allTags, postDetails, setEditModalOpen, children }: EditFormProps) => {
  const { verifyToken } = useVerifyToken();
  const router = useRouter();
  const session = useSession();
  const accessToken = session?.data?.accessToken;
  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting }
  } = useForm<PostSchemaType>({
    resolver: zodResolver(postSchema),
    defaultValues: postDetails
  });

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

  const editFormHandler = async (updatedFormData: PostSchemaType) => {
    try {
      // Check for user authentication
      await loginChecker();

      // Attempting post update
      const { success, errorData } = await updatePost({
        postId: postDetails.id,
        updatedFormData,
        accessToken
      });

      // Post update : FAILED
      if (!success) {
        // Parse the error response if available
        const errorTitle = errorData.error.title;
        const errorMessage = errorData.error.message;
        throw new CustomError(
          errorTitle || "Oops! an error occurred",
          errorMessage || "Something went wrong on the server."
        );
      }

      // Post update : SUCCEEDED
      toast.success("Article has been updated!");
      reset();
      setEditModalOpen(false);
      router.refresh();
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
    <form
      className='mt-16 flex flex-col justify-between gap-y-24'
      onSubmit={handleSubmit(editFormHandler)}>
      <LinkForm register={register} errors={errors} />

      <TitleAndDescriptionForm register={register} errors={errors} />

      <ImageAndTagsForm register={register} errors={errors} allTags={allTags} control={control} />

      {/* Buttons and the CTA */}
      <FlexBox className='flex-col gap-16 xs:flex-row'>
        {/* Close button */}
        {children}

        {/* Form submit button */}
        <Button
          type='submit'
          size='small'
          shape='rounded'
          disabled={!isDirty || isSubmitting}
          className='relative w-full select-none overflow-hidden rounded-full text-background focus-visible:outline-2 xs:w-1/2'>
          <span
            className={cn("absolute translate-y-0 transition-all", {
              "-translate-y-7": isSubmitting
            })}>
            Submit
          </span>
          <span
            className={cn("absolute translate-y-7 transition-all", {
              "translate-y-0": isSubmitting
            })}>
            Submitting . . .
          </span>
        </Button>
      </FlexBox>
    </form>
  );
};

export default EditForm;
