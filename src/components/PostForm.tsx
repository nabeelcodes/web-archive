import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signOut, useSession } from "next-auth/react";
import Input, { InputLabel } from "@/components/UI/Input";
import P from "@/components/UI/Typography/P";
import Button from "@/components/UI/Button";
import { useVerifyToken } from "@/apiRoutes/auth-routes";
import { createPost } from "@/apiRoutes/admin-routes";
import { postSchema, PostSchemaType } from "@/utils/types";

const PostForm = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<PostSchemaType>({ resolver: zodResolver(postSchema) });
  const { verifyToken } = useVerifyToken();
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
      reset();
      // TODO : close modal
      signOut({ redirect: false });
    }
  };

  const PostFormHandler = async (formData: PostSchemaType) => {
    await loginChecker();
    await createPost({ formData, accessToken, reset });
  };

  return (
    <form
      className='mt-16 flex flex-col justify-between gap-16'
      onSubmit={handleSubmit(PostFormHandler)}>
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
      <Button
        type='submit'
        size='small'
        shape='rounded'
        disabled={isSubmitting}
        className='mt-6 w-full select-none rounded-full text-background focus-visible:outline-2'>
        Submit article
      </Button>
    </form>
  );
};

export default PostForm;
