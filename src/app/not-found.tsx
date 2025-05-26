import Link from "next/link";

import LayoutContainer from "@/components/UI/LayoutContainer";
import Footer from "@/components/Footer";
import H1 from "@/components/UI/Typography/H1";
import Button from "@/components/UI/Button";

const NotFound = () => {
  return (
    <section className='flex min-h-screen flex-col'>
      <LayoutContainer tag='main' className='grid grow place-content-center gap-24 pb-3264 pt-2448'>
        <H1 className='text-center text-h2'>Oops! This resource does not exist.</H1>

        <Link href='/'>
          <Button className='mx-auto'>Go to home</Button>
        </Link>
      </LayoutContainer>

      <Footer />
    </section>
  );
};

export default NotFound;
