import { Dispatch, SetStateAction, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

import Input, { InputLabel } from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import P from "@/components/UI/Typography/P";
import { cn, scrollToTop } from "@/utils/helper";
import { loginSchema, LoginSchemaType } from "@/utils/types";

const LoginForm = ({ setIsModalOpen }: { setIsModalOpen: Dispatch<SetStateAction<boolean>> }) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginSchemaType>({ resolver: zodResolver(loginSchema) });
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const loginFormHandler = async (formData: LoginSchemaType) => {
    const { email, password } = formData;

    // Attempting signIn
    const apiResponse = await signIn("credentials", {
      email,
      password,
      redirect: false
    });

    // signIn Failed
    if (apiResponse?.error) {
      switch (apiResponse.error) {
        case "CredentialsSignin":
          toast.error("Invalid Credentials", {
            description: "Please check your login credentials and try again"
          });
          return;
        default:
          toast.error("Something went wrong!, Please try again");
          return;
      }
    }

    // signIn Succeeded
    toast.success("Logged in successfully");
    reset();
    setIsModalOpen(false);
    scrollToTop();
  };

  return (
    <form
      className='mt-16 flex flex-col justify-between gap-16'
      onSubmit={handleSubmit(loginFormHandler)}>
      {/* Modal - Form */}
      <div>
        <fieldset>
          <InputLabel required htmlFor='email'>
            Email
          </InputLabel>
          <Input
            {...register("email")}
            id='email'
            type='email'
            placeholder='Enter your email'
            fullWidth
            autoComplete='on'
          />
        </fieldset>

        {errors.email && (
          <P tag='span' weight='medium' size='tiny' className='text-red-600'>
            {errors.email.message}
          </P>
        )}
      </div>

      <div>
        <fieldset>
          <InputLabel required htmlFor='password'>
            Password
          </InputLabel>
          <Input
            {...register("password")}
            id='password'
            type={passwordIsVisible ? "text" : "password"}
            placeholder='Enter your password'
            autoComplete='on'
            fullWidth
            suffix={
              passwordIsVisible ? (
                <button
                  type='button'
                  className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer'
                  onClick={() => setPasswordIsVisible((prevState) => !prevState)}>
                  <EyeOff size={20} className='text-neutral-900' />
                </button>
              ) : (
                <button
                  type='button'
                  className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer'
                  onClick={() => setPasswordIsVisible((prevState) => !prevState)}>
                  <Eye size={20} className='text-neutral-900' />
                </button>
              )
            }
          />
        </fieldset>

        {errors.password && (
          <P tag='span' weight='medium' size='tiny' className='text-red-600'>
            {errors.password.message}
          </P>
        )}
      </div>

      {/* Modal - CTA */}
      <Button
        type='submit'
        size='small'
        shape='rounded'
        disabled={isSubmitting}
        className='relative mt-6 w-full select-none overflow-hidden rounded-full text-background focus-visible:outline-2'>
        <span
          className={cn("absolute translate-y-0 transition-all", {
            "-translate-y-7": isSubmitting
          })}>
          Login
        </span>
        <span
          className={cn("absolute translate-y-7 transition-all", {
            "translate-y-0": isSubmitting
          })}>
          Logging in . . .
        </span>
      </Button>
    </form>
  );
};

export default LoginForm;
