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

export type ApiResponse = {
  posts: Post[];
  currentPage: number;
  nextPageExists: boolean;
  totalPages: number;
};
