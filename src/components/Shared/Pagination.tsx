import Button from "@/components/UI/Button";
import FlexBox from "@/components/UI/FlexBox";
import H5 from "@/components/UI/Typography/H5";
import { Options } from "nuqs";

type PaginationProps = {
  page: string;
  nextPageExists: boolean;
  setPage: (value: string | ((old: string) => string | null) | null, options?: Options) => Promise<URLSearchParams>;
};

const Pagination = ({ page, nextPageExists, setPage }: PaginationProps) => {
  const gotoPreviousPage = () => setPage((currentPage) => String(+currentPage - 1));

  const gotoNextPage = () => setPage((currentPage) => String(+currentPage + 1));

  return (
    <FlexBox className='items-center justify-between gap-32'>
      <FlexBox className='items-center gap-12'>
        <H5 className='font-geistMono'>{+page}</H5>
      </FlexBox>

      <FlexBox className='items-center gap-12'>
        {+page > 1 && (
          <Button className='min-w-28' onClick={gotoPreviousPage}>
            Previous
          </Button>
        )}

        <Button className='min-w-28' onClick={gotoNextPage} disabled={nextPageExists ? false : true}>
          Next
        </Button>
      </FlexBox>
    </FlexBox>
  );
};

export default Pagination;
