import AllTagsList from "@/components/AllTagsList";
import { Options } from "nuqs";
import { Drawer } from "vaul";

type SearchWithVaulProps = {
  allTags: string[];
  children: React.ReactNode;
  setTags: (
    value: string[] | ((old: string[]) => string[] | null) | null,
    options?: Options
  ) => Promise<URLSearchParams>;
};

const SearchWithVaul = ({ children, allTags, setTags }: SearchWithVaulProps) => {
  const { Root, Trigger, Portal, Overlay, Content, Handle, Title, Description } = Drawer;

  return (
    <Root>
      <Trigger asChild>{children}</Trigger>

      <Portal>
        <Overlay className='fixed inset-0 bg-black/40' />

        <Content className='fixed bottom-0 left-0 right-0 h-fit bg-neutral-900 p-16 text-white outline-none'>
          <Handle />

          <Title className='mt-20 text-center font-semibold'>Filter by tags</Title>

          <Description className='mt-4 text-center text-tiny'>
            Use the tags to filter out the posts.
          </Description>

          <AllTagsList allTags={allTags} setTags={setTags} inVaul />
        </Content>
      </Portal>
    </Root>
  );
};

export default SearchWithVaul;
