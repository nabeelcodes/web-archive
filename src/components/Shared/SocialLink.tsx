import Button from "@/components/UI/Button";

type SocialLinkProps = {
  children: React.ReactNode;
  url: string;
  title: string;
};

const SocialLink = ({ children, url, title }: SocialLinkProps) => {
  return (
    <a href={url} target='_blank' title={title}>
      <Button size='small' variant='outline' shape='circle'>
        {children}
      </Button>
    </a>
  );
};

export default SocialLink;
