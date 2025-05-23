import {
  Control,
  FieldErrors,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue
} from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";

import { ImageAndTagsForm, LinkForm, TitleAndDescriptionForm } from "@/components/FormComponents";
import { StepsIndicator } from "@/components/StepsIndicator";
import Button from "@/components/UI/Button";
import FlexBox from "@/components/UI/FlexBox";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { PostSchemaType } from "@/utils/types";
import { cn, fetchMetadataFromCFW, validateURL } from "@/utils/helper";

export type FormType = {
  fetchMetadata?: boolean;
  linkInputValue?: string;
  allTags: string[];
  formActionHandler: (formData: PostSchemaType) => Promise<void>;
  isDirty: boolean;
  isSubmitting: boolean;
  register: UseFormRegister<{
    link: string;
    title: string;
    image: string;
    tags: [string, ...string[]];
    description?: string | undefined;
  }>;
  handleSubmit: UseFormHandleSubmit<
    {
      link: string;
      title: string;
      image: string;
      tags: [string, ...string[]];
      description?: string | undefined;
    },
    undefined
  >;
  control: Control<{
    link: string;
    tags: [string, ...string[]];
    title: string;
    image: string;
    description?: string | undefined;
  }>;
  errors: FieldErrors<{
    link: string;
    title: string;
    image: string;
    tags: [string, ...string[]];
    description?: string | undefined;
  }>;
  getValues?: UseFormGetValues<{
    title: string;
    link: string;
    image: string;
    tags: [string, ...string[]];
    description?: string | undefined;
  }>;
  setValue?: UseFormSetValue<PostSchemaType>;
};

const Form = ({
  fetchMetadata,
  linkInputValue,
  getValues,
  setValue,
  allTags,
  register,
  handleSubmit,
  control,
  errors,
  formActionHandler,
  isDirty,
  isSubmitting
}: FormType) => {
  const { step, steps, currentStepIndex, isFirstStep, isLastStep, next, back } = useMultiStepForm([
    <LinkForm key={1} register={register} errors={errors} />,
    <TitleAndDescriptionForm key={2} register={register} errors={errors} />,
    <ImageAndTagsForm
      key={3}
      register={register}
      errors={errors}
      allTags={allTags}
      control={control}
    />
  ]);
  // State to manage the fetching state
  // This state is used to show the loading state of the button
  // when fetching metadata from CFW
  const [fetchingFromCfw, setFetchingFromCfw] = useState(false);

  const handleNextAction = async () => {
    // fetch metadata from CFW
    if (fetchMetadata && isFirstStep && getValues && setValue) {
      // Extract the value of the link field
      const url = getValues("link");
      // Check if the URL is valid
      const { isValid, error } = validateURL(url);
      if (!isValid) {
        toast.error("You entered an invalid URL", {
          description: error && error
        });
        return;
      }
      setFetchingFromCfw(true);
      // Fetch metadata from CFW
      const metadata = await fetchMetadataFromCFW(url);
      // Directly update form values
      setValue("title", metadata.title);
      setValue("description", metadata.description);
      setValue("image", metadata.image);
      setFetchingFromCfw(false);
    }

    // Proceed to the next step
    next();
  };

  return (
    <form
      className='mt-16 flex flex-col justify-between gap-y-24'
      onSubmit={handleSubmit(formActionHandler)}>
      {/* Rendering all the forms as "step" */}
      {step}

      {/* Buttons and the CTA */}
      <FlexBox className='flex-col gap-16 xs:flex-row'>
        {/* Back button */}
        {!isFirstStep && (
          <Button
            type='button'
            size='small'
            shape='rounded'
            variant='outline'
            className='relative w-full select-none overflow-hidden rounded-full focus-visible:outline-2 xs:w-1/2'
            onClick={back}>
            Back
          </Button>
        )}

        {/* Next button */}
        {!isLastStep && (
          <Button
            type='button'
            size='small'
            shape='rounded'
            className='relative ml-auto w-full select-none overflow-hidden rounded-full text-background focus-visible:outline-2 xs:w-1/2'
            onClick={handleNextAction}
            disabled={!linkInputValue}>
            <span
              className={cn("absolute translate-y-0 transition-all", {
                "-translate-y-7": fetchingFromCfw
              })}>
              Next
            </span>
            <span
              className={cn("absolute translate-y-7 transition-all", {
                "translate-y-0": fetchingFromCfw
              })}>
              Fetching metadata . . .
            </span>
          </Button>
        )}

        {/* Form submit button */}
        {isLastStep && (
          <Button
            type='submit'
            size='small'
            shape='rounded'
            disabled={!isDirty || isSubmitting}
            className='relative w-full select-none overflow-hidden rounded-full text-background focus-visible:outline-2 xs:w-1/2'>
            <span
              className={cn("absolute translate-y-0 transition-all", {
                "-translate-y-7": isSubmitting
              })}>
              Submit
            </span>
            <span
              className={cn("absolute translate-y-7 transition-all", {
                "translate-y-0": isSubmitting
              })}>
              Submitting . . .
            </span>
          </Button>
        )}
      </FlexBox>

      <StepsIndicator totalSteps={steps.length} currentStepIndex={currentStepIndex} />
    </form>
  );
};

export default Form;
