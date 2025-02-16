import PostForm from "@/components/PostForm";
import Button from "@/components/UI/Button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/UI/Modal";

const CreatePost = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='small' className='h-[41.6px] rounded-full bg-neutral-900 px-1620 text-small'>
          Create
        </Button>
      </DialogTrigger>

      <DialogContent className='max-h-[90vh] overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle>New Article</DialogTitle>
          <DialogDescription>Enter details for a new article</DialogDescription>
        </DialogHeader>

        <PostForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
