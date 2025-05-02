import {
  Control,
  FieldErrors,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister
} from "react-hook-form";

import CreatableMultiSelect from "@/components/CreatableMultiSelect";
import { StepsIndicator } from "@/components/StepsIndicator";
import Input, { InputLabel } from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import FlexBox from "@/components/UI/FlexBox";
import P from "@/components/UI/Typography/P";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { PostSchemaType } from "@/utils/types";
import { cn, fetchMetadataFromCFW } from "@/utils/helper";

type FormType = {
  allTags: string[];
  formActionHandler: (formData: PostSchemaType) => Promise<void>;
  isDirty: boolean;
  isSubmitting: boolean;
  getValues: UseFormGetValues<{
    title: string;
    link: string;
    image: string;
    tags: [string, ...string[]];
    description?: string | undefined;
  }>;
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
};

type SubFormType = Pick<FormType, "register" | "errors">;

type TagsFormType = Pick<FormType, "allTags" | "control">;

const LinkForm = ({ register, errors }: SubFormType) => {
  return (
    <div className='flex min-h-[9.5rem] flex-col justify-between'>
      <fieldset>
        <InputLabel required htmlFor='link'>
          Link (url)
        </InputLabel>
        <Input
          {...register("link")}
          id='link'
          placeholder='Enter a url for the article'
          fullWidth
        />
      </fieldset>

      {errors.link && (
        <P tag='span' weight='medium' size='tiny' className='text-red-600'>
          {errors.link.message}
        </P>
      )}
    </div>
  );
};

const TitleAndDescriptionForm = ({ register, errors }: SubFormType) => {
  return (
    <div className='flex min-h-[9.5rem] flex-col justify-between'>
      {/* Title */}
      <div>
        <fieldset>
          <InputLabel required htmlFor='title'>
            Title
          </InputLabel>
          <Input {...register("title")} id='title' placeholder='Enter a title' fullWidth />
        </fieldset>

        {errors.title && (
          <P tag='span' weight='medium' size='tiny' className='text-red-600'>
            {errors.title.message}
          </P>
        )}
      </div>

      {/* Description */}
      <div>
        <fieldset>
          <InputLabel htmlFor='description'>Description</InputLabel>
          <Input
            {...register("description")}
            id='description'
            placeholder='Enter a description'
            fullWidth
          />
        </fieldset>

        {errors.description && (
          <P tag='span' weight='medium' size='tiny' className='text-red-600'>
            {errors.description.message}
          </P>
        )}
      </div>
    </div>
  );
};

const ImageAndTagsForm = ({ register, errors, allTags, control }: SubFormType & TagsFormType) => {
  return (
    <div className='flex min-h-[9.5rem] flex-col justify-between'>
      {/* Image */}
      <div>
        <fieldset>
          <InputLabel required htmlFor='image'>
            Image (url)
          </InputLabel>
          <Input
            {...register("image")}
            id='image'
            placeholder='Enter an image url for the article'
            fullWidth
          />
        </fieldset>

        {errors.image && (
          <P tag='span' weight='medium' size='tiny' className='text-red-600'>
            {errors.image.message}
          </P>
        )}
      </div>

      {/* Tags */}
      <div>
        <fieldset>
          <InputLabel required htmlFor='tags'>
            Tags
          </InputLabel>

          <CreatableMultiSelect allTags={allTags} control={control} />
        </fieldset>

        {errors.tags && (
          <P tag='span' weight='medium' size='tiny' className='text-red-600'>
            {errors.tags.message}
          </P>
        )}
      </div>
    </div>
  );
};

const Form = ({
  allTags,
  register,
  handleSubmit,
  control,
  errors,
  getValues,
  formActionHandler,
  isDirty,
  isSubmitting
}: FormType) => {
  const { step, steps, currentStepIndex, isFirstStep, isLastStep, next, back } = useMultiStepForm([
    <LinkForm register={register} errors={errors} />,
    <TitleAndDescriptionForm register={register} errors={errors} />,
    <ImageAndTagsForm register={register} errors={errors} allTags={allTags} control={control} />
  ]);

  const handleNextAction = async (url: string) => {
    // fetch metadata from CFW, if on the first step
    if (isFirstStep && url) {
      // Fetch metadata from CFW
      const metadata = await fetchMetadataFromCFW(url);
      console.log(metadata);
    }

    // Proceed to the next step
    next();
  };

  return (
    <form
      className='mt-16 flex flex-col justify-between gap-16'
      onSubmit={handleSubmit(formActionHandler)}>
      {/* Rendering all the forms as "step" */}
      {step}

      {/* Buttons and the CTA */}
      <FlexBox className='mt-10 flex-col gap-12 xs:flex-row'>
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
            onClick={() => handleNextAction(getValues("link"))}>
            Next
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
