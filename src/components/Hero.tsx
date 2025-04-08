import Image from "next/image";
import heroImageDesktop from "/public/heroBanner.svg";
import heroImageMobile from "/public/heroBannerMobile.svg";
import LayoutContainer from "@/components/UI/LayoutContainer";
import H1 from "@/components/UI/Typography/H1";
import P from "@/components/UI/Typography/P";

const Hero = () => {
  return (
    <LayoutContainer
      tag={"header"}
      className='relative flex min-h-[380px] items-end justify-center overflow-hidden text-balance py-2448'>
      {/* Desktop Image */}
      <Image
        priority
        src={heroImageDesktop}
        alt='hero-section-image'
        className='absolute -top-20 bottom-0 -z-1 hidden min-w-[1250px] xs:block'
      />
      {/* Mobile Image */}
      <Image
        priority
        src={heroImageMobile}
        alt='hero-section-image'
        className='absolute left-0 top-0 -z-1 w-full xs:hidden'
      />

      <div className='max-w-screen-md text-center'>
        <H1 weight='bold'>Web Archive</H1>

        <P className='mt-16 text-neutral-700'>
          Stay ahead in the ever-evolving world of web technologies. Browse a curated collection of
          in-depth articles covering frameworks, tools, best practices, and emerging
          trends—everything you need to build, innovate, and stay inspired.
        </P>
      </div>
    </LayoutContainer>
  );
};

export default Hero;
