import { PostSchemaType } from "@/utils/types";
import apiEndpoints from "@/data/apiEndpoints";

// createPost()
export const createPost = async ({
  formData,
  accessToken
}: {
  formData: PostSchemaType;
  accessToken: string | undefined;
}) => {
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

  const success = apiResponse.ok;

  return {
    success,
    errorData: success ? {} : await apiResponse.json()
  };
};

// updatePost()
export const updatePost = async ({
  postId,
  updatedFormData,
  accessToken
}: {
  postId: string;
  updatedFormData: PostSchemaType;
  accessToken: string | undefined;
}) => {
  const { title, description, link, image, tags } = updatedFormData;
  const tagsArray = tags.split(",");
  const updatedPostData = {
    title,
    description,
    link,
    image,
    tags: tagsArray
  };

  const apiResponse = await fetch(apiEndpoints.posts.updatePost(postId), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(updatedPostData)
  });

  const success = apiResponse.ok;

  return {
    success,
    errorData: success ? {} : await apiResponse.json()
  };
};

// deletePost()
export const deletePost = async ({
  postId,
  accessToken
}: {
  postId: string;
  accessToken: string | undefined;
}) => {
  const apiResponse = await fetch(apiEndpoints.posts.deletePost(postId), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  });

  const success = apiResponse.ok;

  return {
    success,
    errorData: success ? {} : await apiResponse.json()
  };
};
