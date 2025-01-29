export type Post = {
  user_id: string;
  title: string;
  description: string;
  link: string;
  tags: string[];
  createdAt: string; // Can be a Date object
  updatedAt: string; // Can be a Date object
  id: string;
};
