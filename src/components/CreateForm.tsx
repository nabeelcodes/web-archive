import { Dispatch, SetStateAction } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import Form from "@/components/Form";
import FlexBox from "@/components/UI/FlexBox";
import Button from "@/components/UI/Button";
import { useVerifyToken } from "@/apiRoutes/auth-routes";
import { createPost } from "@/apiRoutes/admin-routes";
import { postSchema, PostSchemaType } from "@/utils/types";
import { CustomError } from "@/utils/customError";
import { cn } from "@/utils/helper";

type CreateFormType = {
  allTags: string[];
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
};

const CreateForm = ({ allTags, setIsModalOpen, children }: CreateFormType) => {
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
  } = useForm<PostSchemaType>({ resolver: zodResolver(postSchema) });

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

  const createFormHandler = async (formData: PostSchemaType) => {
    // TODO: remove this fake delay lol
    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });

    try {
      // Check for user authentication
      await loginChecker();

      // Attempting post creation
      const { success, errorData } = await createPost({
        formData,
        accessToken
      });

      // Post creation : FAILED
      if (!success) {
        // Parse the error response if available
        const errorTitle = errorData.error.title;
        const errorMessage = errorData.error.message;
        throw new CustomError(
          errorTitle || "Oops! an error occurred",
          errorMessage || "Something went wrong on the server."
        );
      }

      // Post creation : SUCCEEDED
      toast.success("New article added!");
      reset();
      setIsModalOpen(false);
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
    <Form
      allTags={allTags}
      register={register}
      handleSubmit={handleSubmit}
      control={control}
      errors={errors}
      formActionHandler={createFormHandler}>
      {/* Modal - CTA */}
      <FlexBox className='mt-6 flex-col gap-8 xs:flex-row'>
        {/* Cancel button */}
        {children}

        {/* Form submit button */}
        <Button
          type='submit'
          size='small'
          shape='rounded'
          disabled={!isDirty || isSubmitting}
          className='relative w-full select-none overflow-hidden rounded-full text-background focus-visible:outline-2'>
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
    </Form>
  );
};

export default CreateForm;
