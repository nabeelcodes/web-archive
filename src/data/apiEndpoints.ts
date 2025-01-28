const API_HOST = process.env.API_URL;

const apiEndpoints = {
  posts: {
    getPosts: `${API_HOST}/api/posts`,
    getPost: ({ postId }: { postId: string }) => `${API_HOST}/api/posts/${postId}`
  },
  users: {}
} as const;

export default apiEndpoints;
