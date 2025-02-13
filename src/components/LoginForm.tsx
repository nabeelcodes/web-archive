import { Dispatch, SetStateAction } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Input, { InputLabel } from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import P from "@/components/UI/Typography/P";
import { loginSchema, LoginSchemaType } from "@/utils/types";
import { toast } from "sonner";

const LoginForm = ({ modalHandler }: { modalHandler: Dispatch<SetStateAction<boolean>> }) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginSchemaType>({ resolver: zodResolver(loginSchema) });

  const loginFormHandler = async (formData: LoginSchemaType) => {
    const { email, password } = formData;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false
    });

    if (res?.error) {
      switch (res.error) {
        case "CredentialsSignin":
          toast.error("Invalid Credentials", {
            description: "Please check your login credentials and try again"
          });
          return;
        default:
          toast.error("Something went wrong!, Please try again");
      }
    } else {
      toast.success("Logged in successfully");
      modalHandler(false);
      reset();
    }
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
            type='password'
            placeholder='Enter your password'
            fullWidth
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
        className='mt-6 w-full select-none rounded-full text-background focus-visible:outline-2'>
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
