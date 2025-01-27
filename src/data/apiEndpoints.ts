const API_HOST = process.env.API_URL;

const apiEndpoints = {
  posts: {
    getPosts: `${API_HOST}/posts`,
    getPost: ({ postId }: { postId: string }) => `${API_HOST}/posts/${postId}`
  },
  users: {}
} as const;

export default apiEndpoints;
