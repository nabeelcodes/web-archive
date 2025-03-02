import { Dispatch, SetStateAction } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import Input, { InputLabel } from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import P from "@/components/UI/Typography/P";
import { scrollToTop } from "@/utils/helper";
import { loginSchema, LoginSchemaType } from "@/utils/types";

const LoginForm = ({ setIsModalOpen }: { setIsModalOpen: Dispatch<SetStateAction<boolean>> }) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginSchemaType>({ resolver: zodResolver(loginSchema) });

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
            type='password'
            placeholder='Enter your password'
            fullWidth
            autoComplete='on'
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
