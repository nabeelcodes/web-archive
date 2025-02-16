const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const apiEndpoints = {
  posts: {
    getPosts: ({ query = "", tags = "", page = "1" }) =>
      `${NEXT_PUBLIC_API_URL}/api/posts?query=${query}&tags=${tags}&page=${page}`,
    getPost: ({ postId }: { postId: string }) => `${NEXT_PUBLIC_API_URL}/api/posts/${postId}`,
    createPost: () => `${NEXT_PUBLIC_API_URL}/api/posts`
  },
  users: {
    login: () => `${NEXT_PUBLIC_API_URL}/api/users/login`
  }
} as const;

export default apiEndpoints;
