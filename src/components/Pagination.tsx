import Button from "@/components/UI/Button";
import FlexBox from "@/components/UI/FlexBox";
import H5 from "@/components/UI/Typography/H5";
import { matches } from "@/utils/helper";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Options } from "nuqs";

type PaginationProps = {
  page: string;
  nextPageExists: boolean;
  totalPages: number;
  setPage: (
    value: string | ((old: string) => string | null) | null,
    options?: Options
  ) => Promise<URLSearchParams>;
};

const Pagination = ({ page, nextPageExists, totalPages, setPage }: PaginationProps) => {
  const paginationHandler = ({
    direction = "next",
    first = false,
    last = false
  }: {
    direction?: "next" | "prev";
    first?: boolean;
    last?: boolean;
  }) => {
    if (first) {
      setPage("1");
      return;
    }

    if (last) {
      setPage(String(totalPages));
      return;
    }

    if (matches(direction, "next")) {
      setPage((prev) => String(+prev + 1));
    } else {
      setPage((prev) => String(+prev - 1));
    }
  };

  return (
    <FlexBox className='items-center justify-between gap-32'>
      <FlexBox className='items-center gap-8'>
        <Button
          shape='circle'
          size='small'
          onClick={() =>
            paginationHandler({
              direction: "prev"
            })
          }
          disabled={+page <= 1}
          title='previous page'>
          <ChevronLeft size={16} />
        </Button>

        <Button
          shape='circle'
          size='small'
          onClick={() =>
            paginationHandler({
              direction: "next"
            })
          }
          disabled={nextPageExists ? false : true}
          title='next page'>
          <ChevronRight size={16} />
        </Button>
      </FlexBox>

      <H5 className='-ms-48 font-geistMono'>{+page}</H5>

      <Button
        shape='circle'
        size='small'
        onClick={() =>
          paginationHandler({
            last: nextPageExists,
            first: !nextPageExists
          })
        }
        title={nextPageExists ? "last page" : "first page"}
        disabled={matches(totalPages, 1) || !Boolean(totalPages)}>
        {nextPageExists ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
      </Button>
    </FlexBox>
  );
};

export default Pagination;
