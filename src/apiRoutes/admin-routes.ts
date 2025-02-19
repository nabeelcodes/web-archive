import { UseFormReset } from "react-hook-form";
import { toast } from "sonner";
import apiEndpoints from "@/data/apiEndpoints";
import { CustomError } from "@/utils/customError";
import { PostSchemaType } from "@/utils/types";

// createPost()
export const createPost = async ({
  formData,
  accessToken,
  reset
}: {
  formData: PostSchemaType;
  accessToken: string | undefined;
  reset: UseFormReset<{
    link: string;
    title: string;
    image: string;
    tags: string;
    description?: string | undefined;
  }>;
}) => {
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
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(postData)
    });

    // Post creation : FAILED
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

    // Post creation : SUCCEEDED
    toast.success("New article added!");
    reset();
    // TODO : close modal
    // TODO : revalidate home page "/"
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

// updatePost()
export const updatePost = async () => {};

// deletePost()
export const deletePost = async () => {};
