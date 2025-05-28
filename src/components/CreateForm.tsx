import { Dispatch, SetStateAction } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import Form from "@/components/Form";
import { useVerifyToken } from "@/apiRoutes/auth-routes";
import { createPost } from "@/apiRoutes/admin-routes";
import { postSchema, PostSchemaType } from "@/utils/types";
import { CustomError } from "@/utils/customError";

type CreateFormType = {
  allTags: string[];
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const CreateForm = ({ allTags, setIsModalOpen }: CreateFormType) => {
  const { verifyToken } = useVerifyToken();
  const router = useRouter();
  const session = useSession();
  const accessToken = session?.data?.accessToken;
  const {
    reset,
    watch,
    control,
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting }
  } = useForm<PostSchemaType>({
    resolver: zodResolver(postSchema)
  });
  // getting realtime value of the link input
  // to set disable state of the next button
  const linkInputValue = watch("link");

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
      reset();
      setTimeout(() => {
        toast.success("New article added!");
      }, 1000);
      setIsModalOpen(false);
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
      fetchMetadata
      linkInputValue={linkInputValue}
      getValues={getValues}
      setValue={setValue}
      allTags={allTags}
      register={register}
      submitHandler={handleSubmit}
      control={control}
      errors={errors}
      formActionHandler={createFormHandler}
      isDirty={isDirty}
      isSubmitting={isSubmitting}
    />
  );
};

export default CreateForm;
