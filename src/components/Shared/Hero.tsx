import LayoutContainer from "@/components/UI/LayoutContainer";
import H1 from "@/components/UI/Typography/H1";
import P from "@/components/UI/Typography/P";
import Image from "next/image";
import heroImage from "/public/heroBanner.svg";

const Hero = () => {
  return (
    <LayoutContainer className='relative flex min-h-[380px] items-end justify-center text-balance py-2448'>
      <Image src={heroImage} alt='hero-section-image' className='absolute -top-20 bottom-0 -z-1' />

      <div className='max-w-screen-md text-center'>
        <H1 weight='bold'>Web Archive</H1>

        <P className='mt-16 text-neutral-700'>
          Stay ahead in the ever-evolving world of web technologies. Browse a curated collection of in-depth articles covering frameworks, tools, best
          practices, and emerging trends—everything you need to build, innovate, and stay inspired.
        </P>
      </div>
    </LayoutContainer>
  );
};

export default Hero;
