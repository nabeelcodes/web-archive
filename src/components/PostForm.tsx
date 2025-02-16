import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { postSchema, PostSchemaType } from "@/utils/types";
import Input, { InputLabel } from "@/components/UI/Input";
import P from "@/components/UI/Typography/P";
import Button from "@/components/UI/Button";
import apiEndpoints from "@/data/apiEndpoints";
import { toast } from "sonner";
import { CustomError } from "@/utils/customError";

const PostForm = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<PostSchemaType>({ resolver: zodResolver(postSchema) });
  const session = useSession();
  const token = session?.data?.accessToken;

  // return if no session
  if (session.status === "unauthenticated" || !token) return;

  const PostFormHandler = async (formData: PostSchemaType) => {
    try {
      const { title, description, link, image, tags } = formData;
      const tagsArray = tags.split(",");
      const postData = {
        title,
        description,
        link,
        image,
        tags: tagsArray
      };

      const apiResponse = await fetch(apiEndpoints.posts.createPost(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(postData)
      });

      // Check if the response status is OK (2xx status codes)
      if (!apiResponse.ok) {
        // Parse the error response if available
        const errorData = await apiResponse.json();
        const errorTitle = errorData.error.title;
        const errorMessage = errorData.error.message;
        throw new CustomError(
          errorTitle || "Oops! an error occurred",
          errorMessage || "Something went wrong on the server."
        );
      }

      // Handle the successful response
      // const responseData = await apiResponse.json();
      toast.success("New article added!");
      reset();
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
