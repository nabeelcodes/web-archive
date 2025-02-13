const API_URL = process.env.API_URL;

const apiEndpoints = {
  posts: {
    getPosts: ({ query = "", tags = "", page = "1" }) =>
      `${API_URL}/api/posts?query=${query}&tags=${tags}&page=${page}`,
    getPost: ({ postId }: { postId: string }) => `${API_URL}/api/posts/${postId}`
  },
  users: {
    login: () => `${API_URL}/api/users/login`
  }
} as const;

export default apiEndpoints;
