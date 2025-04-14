import Link from "next/link";

import LayoutContainer from "@/components/UI/LayoutContainer";
import Footer from "@/components/Footer";
import H2 from "@/components/UI/Typography/H2";
import Button from "@/components/UI/Button";

const NotFound = () => {
  return (
    <section className='flex min-h-screen flex-col'>
      <LayoutContainer tag='main' className='grid grow place-content-center gap-24 pb-3264 pt-2448'>
        <H2 tag='h1' className='text-center'>
          Oops! This resource does not exist.
        </H2>

        <Link href='/'>
          <Button className='mx-auto'>Go to home</Button>
        </Link>
      </LayoutContainer>

      <Footer />
    </section>
  );
};

export default NotFound;
