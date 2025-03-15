const blurPlaceholder =
  "data:image/webp;base64,UklGRgwCAABXRUJQVlA4WAoAAAAgAAAAAQAAAgAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggHgAAAJABAJ0BKgIAAwAHQJYlpAAC51m2AAD+5R4qGAAAAA==";

const siteConfig = {
  title: "Web Archive",
  description:
    "A curated digital library, featuring insightful articles on a wide range of web development topics."
} as const;

const SOCIAL_LINKS = {
  dev: {
    nabeel: "https://github.com/nabeelcodes",
    mohit: "https://mohitkumar.dev"
  },
  site: {
    github: "https://github.com/nabeelcodes/web-archive",
    figma: "",
    twitter: ""
  }
} as const;

const SEARCH_QUERY_KEY = "query" as const;

const TAGS_QUERY_KEY = "tags" as const;

const PAGE_QUERY_KEY = "page" as const;

export {
  blurPlaceholder,
  siteConfig,
  TAGS_QUERY_KEY,
  SEARCH_QUERY_KEY,
  PAGE_QUERY_KEY,
  SOCIAL_LINKS
};

export const FETCH_TAGS = {
  posts: "posts"
} as const;
