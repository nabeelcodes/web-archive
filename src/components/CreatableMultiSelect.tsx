import { Control, Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { colors } from "@/designSystem/tokens/colors";

type CreatableMultiSelectProps = {
  allTags: string[];
  control: Control<{
    link: string;
    tags: [string, ...string[]];
    title: string;
    image: string;
    description?: string | undefined;
  }>;
};

const CreatableMultiSelect = ({ allTags, control }: CreatableMultiSelectProps) => {
  const selectOptions = allTags.map((tag) => ({
    value: tag.toLowerCase(),
    label: tag
  }));

  return (
    <Controller
      name='tags'
      control={control}
      render={({ field: { name, onBlur, onChange, value } }) => (
        <CreatableSelect
          isMulti
          inputId={name}
          onBlur={onBlur}
          options={selectOptions}
          defaultValue={
            value
              ? value.map((tag) => ({
                  value: tag.toLowerCase(),
                  label: tag
                }))
              : []
          }
          onChange={(selectedOptions) => {
            const tags = selectedOptions ? selectedOptions.map((option) => option.value) : [];
            onChange(tags);
          }}
          styles={{
            option: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: state.isFocused ? colors.black : "",
              color: state.isFocused ? colors.background : ""
            })
          }}
          classNames={{
            container: () => "border border-neutral-400 rounded-[0.5rem] px-4 py-4",
            valueContainer: () => "bg-background !pl-10",
            control: () => "!border-transparent !bg-transparent",
            multiValue: () => "!rounded-md !bg-black !text-background !px-4",
            multiValueLabel: () => "!text-background",
            multiValueRemove: () => "-me-4",
            menu: () => "-ml-4",
            menuList: () => "bg-background border border-neutral-400"
          }}
          menuPlacement='top'
          placeholder='Enter one or more tags associated with the article'
        />
      )}
    />
  );
};

export default CreatableMultiSelect;
