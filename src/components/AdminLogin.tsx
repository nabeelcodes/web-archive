"use client";

import { useState } from "react";
import { toast } from "sonner";
import { MoveRight } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

import { scrollToTop } from "@/utils/helper";
import LoginForm from "@/components/LoginForm";
import FlexBox from "@/components/UI/FlexBox";
import P from "@/components/UI/Typography/P";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/UI/Modal";

const AdminLogin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const session = useSession();

  // return if no session
  if (session.status === "loading") return;

  // authenticated and session exists
  if (session.status === "authenticated") {
    const adminName = session.data.user.username;

    return (
      <FlexBox className='items-center gap-10'>
        <P size='small' className='shrink-0 whitespace-nowrap text-background'>
          Welcome, {adminName}
        </P>

        <P className='text-background'>&#8226;</P>

        <P
          tag='button'
          size='small'
          onClick={() => {
            signOut({ redirect: false });
            toast.success("User signed out successfully!");
            scrollToTop();
          }}
          className='shrink-0 whitespace-nowrap text-background underline underline-offset-2 can-hover:no-underline'>
          SignOut
        </P>
      </FlexBox>
    );
  }

  // DEFAULT : no session (user not signed in)
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

        <LoginForm setIsModalOpen={setIsModalOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default AdminLogin;
