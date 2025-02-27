import { z } from "zod";

export type Post = {
  user_id: string;
  title: string;
  description: string;
  link: string;
  image: string;
  tags: string[];
  createdAt: string; // Can be a Date object
  updatedAt: string; // Can be a Date object
  id: string;
};

export type ApiResponsePost = {
  posts: Post[];
  currentPage: number;
  nextPageExists: boolean;
  totalPages: number;
};

export type ApiResponseTags = {
  allTags: string[];
};

export type User = {
  username: string;
  email: string;
};

export type ApiResponseUser = {
  userData: User;
  accessToken: string;
};

export const loginSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email format"),
  password: z.string().nonempty("Password is required")
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const postSchema = z.object({
  title: z.string().min(1, "Please add a title!"),
  description: z.string().optional(),
  link: z
    .string()
    .nonempty("Please add a link for the article!")
    .refine((value) => /^(https?):\/\/(?=.*\.[a-z]{2,})[^\s$.?#].[^\s]*$/i.test(value), {
      message: "Please enter a valid URL"
    }),
  image: z
    .string()
    .nonempty("Please add an image for the article!")
    .refine((value) => /^(https?):\/\/(?=.*\.[a-z]{2,})[^\s$.?#].[^\s]*$/i.test(value), {
      message: "Please enter a valid URL"
    }),
  tags: z.array(z.string()).nonempty("Please provide one or more tags to identify this article!")
});

export type PostSchemaType = z.infer<typeof postSchema>;
