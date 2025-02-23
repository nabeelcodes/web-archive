import { Dispatch, SetStateAction } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signOut, useSession } from "next-auth/react";
import Input, { InputLabel } from "@/components/UI/Input";
import FlexBox from "@/components/UI/FlexBox";
import P from "@/components/UI/Typography/P";
import Button from "@/components/UI/Button";
import { useVerifyToken } from "@/apiRoutes/auth-routes";
import { updatePost, deletePost } from "@/apiRoutes/admin-routes";
import { CustomError } from "@/utils/customError";
import { Post, postSchema, PostSchemaType } from "@/utils/types";

type EditFormProps = {
  postDetails: Post;
  setEditModalOpen: Dispatch<SetStateAction<boolean>>;
};

const EditForm = ({ postDetails, setEditModalOpen }: EditFormProps) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting }
  } = useForm<PostSchemaType>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      ...postDetails,
      tags: postDetails.tags.toString()
    }
  });
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
      setEditModalOpen(false);
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
    <form
      className='mt-16 flex flex-col justify-between gap-16'
      onSubmit={handleSubmit(editFormHandler)}>
      {/* Modal - Form */}
      <div>
        {/* Title */}
        <fieldset>
          <InputLabel required htmlFor='title'>
            Title
          </InputLabel>
          <Input {...register("title")} id='title' placeholder='Enter a title' fullWidth />
        </fieldset>

        {errors.title && (
          <P tag='span' weight='medium' size='tiny' className='text-red-600'>
            {errors.title.message}
          </P>
        )}
      </div>

      <div>
        {/* Description */}
        <fieldset>
          <InputLabel htmlFor='description'>Description</InputLabel>
          <Input
            {...register("description")}
            id='description'
            placeholder='Enter a description'
            fullWidth
          />
        </fieldset>

        {errors.description && (
          <P tag='span' weight='medium' size='tiny' className='text-red-600'>
            {errors.description.message}
          </P>
        )}
      </div>

      <div>
        {/* Link */}
        <fieldset>
          <InputLabel required htmlFor='link'>
            Link (url)
          </InputLabel>
          <Input
            {...register("link")}
            id='link'
            placeholder='Enter a url for the article'
            fullWidth
          />
        </fieldset>

        {errors.link && (
          <P tag='span' weight='medium' size='tiny' className='text-red-600'>
            {errors.link.message}
          </P>
        )}
      </div>

      <div>
        {/* Image */}
        <fieldset>
          <InputLabel required htmlFor='image'>
            Image (url)
          </InputLabel>
          <Input
            {...register("image")}
            id='image'
            placeholder='Enter an image url for the article'
            fullWidth
          />
        </fieldset>

        {errors.image && (
          <P tag='span' weight='medium' size='tiny' className='text-red-600'>
            {errors.image.message}
          </P>
        )}
      </div>

      <div>
        {/* Tags */}
        <fieldset>
          <InputLabel required htmlFor='tags'>
            Tags
          </InputLabel>
          <Input
            {...register("tags")}
            id='tags'
            placeholder='Enter one or more tags associated with the article'
            fullWidth
          />
        </fieldset>

        {errors.tags && (
          <P tag='span' weight='medium' size='tiny' className='text-red-600'>
            {errors.tags.message}
          </P>
        )}
      </div>

      {/* Modal - CTA */}
      <FlexBox className='mt-6 gap-8'>
        {/* Submit Button */}
        <Button
          type='submit'
          size='small'
          shape='rounded'
          disabled={!isDirty || isSubmitting}
          className='w-full select-none rounded-full text-background focus-visible:outline-2'>
          Submit
        </Button>

        {/* Delete Button */}
        <Button
          size='small'
          shape='rounded'
          disabled={isSubmitting}
          onClick={(event) => {
            event.preventDefault();
            deletePostHandler();
          }}
          className='w-full select-none rounded-full bg-red-600 text-background focus-visible:outline-2'>
          Delete
        </Button>
      </FlexBox>
    </form>
  );
};

export default EditForm;
