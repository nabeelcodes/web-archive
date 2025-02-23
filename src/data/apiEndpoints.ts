const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const apiEndpoints = {
  posts: {
    getPosts: ({ query = "", tags = "", page = "1" }) =>
      `${NEXT_PUBLIC_API_URL}/api/posts?query=${query}&tags=${tags}&page=${page}`,
    getPost: (postId: string) => `${NEXT_PUBLIC_API_URL}/api/posts/${postId}`,
    createPost: () => `${NEXT_PUBLIC_API_URL}/api/posts`,
    updatePost: (postId: string) => `${NEXT_PUBLIC_API_URL}/api/posts/${postId}`,
    deletePost: (postId: string) => `${NEXT_PUBLIC_API_URL}/api/posts/${postId}`
  },
  users: {
    login: () => `${NEXT_PUBLIC_API_URL}/api/users/login`,
    fetchCurrentUser: () => `${NEXT_PUBLIC_API_URL}/api/users/current`
  }
} as const;

export default apiEndpoints;
