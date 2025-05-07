import { Dispatch, SetStateAction } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import Form from "@/components/Form";
import { useVerifyToken } from "@/apiRoutes/auth-routes";
import { updatePost } from "@/apiRoutes/admin-routes";
import { Post, postSchema, PostSchemaType } from "@/utils/types";
import { CustomError } from "@/utils/customError";

type EditFormProps = {
  allTags: string[];
  postDetails: Post;
  setEditModalOpen: Dispatch<SetStateAction<boolean>>;
};

const EditForm = ({ allTags, postDetails, setEditModalOpen }: EditFormProps) => {
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
    <Form
      allTags={allTags}
      register={register}
      handleSubmit={handleSubmit}
      control={control}
      errors={errors}
      formActionHandler={editFormHandler}
      isDirty={isDirty}
      isSubmitting={isSubmitting}
    />
  );
};

export default EditForm;
