import { Control, FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import CreatableMultiSelect from "@/components/CreatableMultiSelect";
import Input, { InputLabel } from "@/components/UI/Input";
import P from "@/components/UI/Typography/P";
import { PostSchemaType } from "@/utils/types";

type FormType = {
  children: React.ReactNode;
  allTags: string[];
  formActionHandler: (formData: PostSchemaType) => Promise<void>;
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

const Form = ({
  children,
  allTags,
  register,
  handleSubmit,
  control,
  errors,
  formActionHandler
}: FormType) => {
  return (
    <form
      className='mt-16 flex flex-col justify-between gap-16'
      onSubmit={handleSubmit(formActionHandler)}>
      {/* Modal - Form */}
      <div>
        {/* Title */}
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

      <div>
        {/* Description */}
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

      <div>
        {/* Link */}
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

      <div>
        {/* Image */}
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

      <div>
        {/* Tags */}
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

      {/* Modal - CTA */}
      {children}
    </form>
  );
};

export default Form;
