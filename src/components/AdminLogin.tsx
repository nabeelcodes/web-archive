"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { MoveRight } from "lucide-react";
import LoginForm from "@/components/LoginForm";
import P from "@/components/UI/Typography/P";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/UI/Modal";
import { signOut } from "next-auth/react";

const AdminLogin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const session = useSession();

  if (session.status === "loading") return;

  if (session.status === "authenticated") {
    return (
      <>
        <P
          tag='button'
          size='small'
          onClick={() => signOut()}
          className='shrink-0 whitespace-nowrap text-background underline underline-offset-2 can-hover:no-underline'>
          SignOut
        </P>
      </>
    );
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <P
          tag='button'
          size='small'
          className='shrink-0 whitespace-nowrap text-background underline underline-offset-2 can-hover:no-underline'>
          Login as admin <MoveRight size={16} className='ms-4 inline' />
        </P>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>Enter your credentials</DialogDescription>
        </DialogHeader>

        <LoginForm modalHandler={setIsModalOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default AdminLogin;
