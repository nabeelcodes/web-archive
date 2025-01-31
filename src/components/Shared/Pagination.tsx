import Button from "@/components/UI/Button";
import FlexBox from "@/components/UI/FlexBox";
import H5 from "@/components/UI/Typography/H5";

const Pagination = () => {
  return (
    <FlexBox className='items-center justify-between gap-32'>
      <FlexBox className='items-center gap-12'>
        <H5 className='font-geistMono'>1</H5>
      </FlexBox>

      <FlexBox className='items-center gap-16'>
        <Button>Previous</Button>

        <Button>Next</Button>
      </FlexBox>
    </FlexBox>
  );
};

export default Pagination;
