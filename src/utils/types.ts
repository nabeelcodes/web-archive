import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required") // Ensures email is not empty
    .email("Invalid email format"), // Ensures email has a valid format
  password: z.string().nonempty("Password is required") // Ensures password is not empty
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

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

export type User = {
  username: string;
  email: string;
};

export type ApiResponseUser = {
  user: User;
  accessToken: string;
};
