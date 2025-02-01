const siteConfig = {
  title: "Web Archive",
  description: "A curated digital library, featuring insightful articles on a wide range of web development topics."
} as const;

const SEARCH_QUERY_KEY = "query" as const;

const TAGS_QUERY_KEY = "tags" as const;

const PAGE_QUERY_KEY = "page" as const;

export { siteConfig, TAGS_QUERY_KEY, SEARCH_QUERY_KEY, PAGE_QUERY_KEY };
