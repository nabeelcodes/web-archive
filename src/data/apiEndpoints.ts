const API_URL = process.env.API_URL;

const apiEndpoints = {
  posts: {
    getPosts: `${API_URL}/api/posts`,
    getPost: ({ postId }: { postId: string }) => `${API_URL}/api/posts/${postId}`
  },
  users: {}
} as const;

export default apiEndpoints;
