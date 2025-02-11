"use client";

// import { Close } from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "@/components/UI/Button";
import { loginSchema, LoginSchemaType } from "@/utils/types";

const LoginForm = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginSchemaType>({ resolver: zodResolver(loginSchema) });

  const loginFormHandler = async (formData: LoginSchemaType) => {
    // fake waiting for 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log({ ...formData });
    reset();
  };

  return (
    <form
      className='flex flex-col justify-between gap-20'
      onSubmit={handleSubmit(loginFormHandler)}>
      {/* Modal - Form */}
      <input
        {...register("email")}
        type='email'
        placeholder='enter your email'
        className='w-full rounded-md bg-background px-10 py-8 text-small font-semibold leading-none text-neutral-500 shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]'
      />
      {errors.email && (
        <span className='rounded-md bg-red-200 px-10 py-6 text-small font-semibold text-red-600'>{`${errors.email.message}`}</span>
      )}

      <input
        {...register("password")}
        type='password'
        placeholder='enter your password'
        className='w-full rounded-md bg-background px-10 py-8 text-small font-semibold leading-none text-neutral-500 shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]'
      />
      {errors.password && (
        <span className='rounded-md bg-red-200 px-10 py-6 text-small font-semibold text-red-600'>{`${errors.password.message}`}</span>
      )}

      {/* Modal - CTA */}
      {/* <Close asChild> */}
      <Button
        type='submit'
        size='small'
        shape='rounded'
        disabled={isSubmitting}
        className='mb-10 w-full select-none rounded-full text-background focus-visible:outline-2'>
        Login
      </Button>
      {/* </Close> */}
    </form>
  );
};

export default LoginForm;
