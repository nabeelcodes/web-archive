import { ChangeEvent, useRef } from "react";
import { Search, X } from "lucide-react";
import { Options } from "nuqs";
import Input from "@/components/UI/Input";

type SearchInputProps = {
  isSearchQueryEmpty: boolean;
  setQuery: (
    value: string | ((old: string) => string | null) | null,
    options?: Options
  ) => Promise<URLSearchParams>;
  setPage: (
    value: string | ((old: string) => string | null) | null,
    options?: Options
  ) => Promise<URLSearchParams>;
};

const SearchInput = ({ isSearchQueryEmpty, setQuery, setPage }: SearchInputProps) => {
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const inputIsEmpty = inputValue.trim().length === 0;
    if (inputIsEmpty) {
      setQuery("");
    } else {
      setQuery(inputValue);
      setPage("1");
    }
  };

  const clearInput = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
    setQuery("");
  };

  return (
    <Input
      fullWidth
      shape='pill'
      ref={searchInputRef}
      onChange={searchHandler}
      name='global search'
      placeholder='Search for articles'
      className={isSearchQueryEmpty ? "" : "border-2 border-neutral-700"}
      suffix={
        isSearchQueryEmpty ? (
          <Search size={20} className='text-neutral-700' role='button' />
        ) : (
          <X size={20} className='text-neutral-700' role='button' onClick={clearInput} />
        )
      }
    />
  );
};

export default SearchInput;
