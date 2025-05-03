import CreatableMultiSelect from "@/components/CreatableMultiSelect";
import Input, { InputLabel } from "@/components/UI/Input";
import P from "@/components/UI/Typography/P";
import { FormType } from "@/components/Form";

type SubFormType = Pick<FormType, "register" | "errors">;

type TagsFormType = Pick<FormType, "allTags" | "control">;

export const LinkForm = ({ register, errors }: SubFormType) => {
  return (
    <div>
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

export const TitleAndDescriptionForm = ({ register, errors }: SubFormType) => {
  return (
    <div className='flex flex-col justify-between gap-y-16'>
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

export const ImageAndTagsForm = ({
  register,
  errors,
  allTags,
  control
}: SubFormType & TagsFormType) => {
  return (
    <div className='flex flex-col justify-between gap-y-16'>
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
