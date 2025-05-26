import Button from "@/components/UI/Button";

type SocialLinkProps = {
  children: React.ReactNode;
  url: string;
  title: string;
};

const SocialLink = ({ children, url, title }: SocialLinkProps) => {
  return (
    <a href={url} target='_blank' title={title} aria-label={title}>
      <Button size='small' variant='pill' shape='circle' title={title} aria-label={title}>
        {children}
      </Button>
    </a>
  );
};

export default SocialLink;
