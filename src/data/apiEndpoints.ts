const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CFW_URL = process.env.NEXT_CFW_URL;

const apiEndpoints = {
  posts: {
    getPosts: ({ query = "", tags = "", page = "1" }) =>
      `${API_URL}/api/posts?query=${query}&tags=${tags}&page=${page}`,
    getPost: (postId: string) => `${API_URL}/api/posts/${postId}`,
    createPost: () => `${API_URL}/api/posts`,
    updatePost: (postId: string) => `${API_URL}/api/posts/${postId}`,
    deletePost: (postId: string) => `${API_URL}/api/posts/${postId}`
  },
  tags: {
    getAllTags: () => `${API_URL}/api/tags`
  },
  users: {
    login: () => `${API_URL}/api/users/login`,
    fetchCurrentUser: () => `${API_URL}/api/users/current`
  },
  metaData: {
    getMetaDataFromUrl: (linkUrl: string) => `${CFW_URL}?url=${linkUrl}`
  }
} as const;

export default apiEndpoints;
