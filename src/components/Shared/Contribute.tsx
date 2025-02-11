import * as RadixDialog from "@radix-ui/react-dialog";
import LoginForm from "@/components/Shared/LoginForm";
import Button from "@/components/UI/Button";
import { X } from "lucide-react";

const Contribute = () => {
  return (
    <RadixDialog.Root>
      {/* Modal Trigger */}
      <RadixDialog.Trigger asChild>
        <Button variant='outline' shape='rounded' className='mt-10 rounded-full text-neutral-700'>
          Submit an article
        </Button>
      </RadixDialog.Trigger>

      <RadixDialog.Portal>
        {/* Modal Overlay */}
        <RadixDialog.Overlay className='fixed inset-0 bg-black/70 backdrop-blur-[2px] data-[state=closed]:animate-overlayHide data-[state=open]:animate-overlayShow' />

        {/* Modal */}
        <RadixDialog.Content className='fixed left-1/2 top-1/2 max-h-[85vh] w-[80vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-background p-2440 text-neutral-900 focus:outline-none data-[state=closed]:animate-contentHide data-[state=open]:animate-contentShow'>
          {/* Modal - Heading */}
          <RadixDialog.Title className='mb-6 text-center text-h5 font-bold'>
            Login
          </RadixDialog.Title>

          {/* Modal - Description */}
          <RadixDialog.Description className='mb-2440 text-center text-small text-neutral-500'>
            Enter your credentials for Web Archive
          </RadixDialog.Description>

          {/* Modal - Form */}
          <LoginForm />

          {/* Modal - Close */}
          <RadixDialog.Close asChild>
            <button
              className='absolute right-4 top-4 inline-flex appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none'
              aria-label='Close'>
              <X size={16} />
            </button>
          </RadixDialog.Close>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

export default Contribute;
