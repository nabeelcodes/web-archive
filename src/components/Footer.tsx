import { Figma, Github } from "lucide-react";

import SocialLink from "@/components/SocialLink";
import AdminLogin from "@/components/AdminLogin";
import LayoutContainer from "@/components/UI/LayoutContainer";
import { Grid, GridCol } from "@/components/UI/Grid";
import FlexBox from "@/components/UI/FlexBox";
import P from "@/components/UI/Typography/P";
import H4 from "@/components/UI/Typography/H4";
import H5 from "@/components/UI/Typography/H5";
import Bluesky from "@/components/SVG/Bluesky";
import Nextjs from "@/components/SVG/Nextjs";
import Typescript from "@/components/SVG/Typescript";
import Tailwindcss from "@/components/SVG/Tailwindcss";
import Cloudflare from "@/components/SVG/Cloudflare";
import Hono from "@/components/SVG/Hono";
import { SOCIAL_LINKS } from "@/data/globals";

const Footer = () => {
  return (
    <footer className='border-t border-neutral-300'>
      <LayoutContainer className='py-3264'>
        <Grid className='gap-2464'>
          {/* Info */}
          <GridCol
            colSizeConfig={{
              xxs: 12,
              sm: 12,
              md: 10,
              lg: 6
            }}>
            <H4 className='text-h5'>Web Archives</H4>

            <P size='small' className='mt-2 text-pretty text-neutral-700'>
              Stay ahead in the ever-evolving world of web technologies. Browse a curated collection
              of in-depth articles covering frameworks, tools, best practices, and emerging
              trends—everything you need to build, innovate, and stay inspired.
            </P>

            <P size='small' className='mt-20 text-neutral-500'>
              Website designed and developed by{" "}
              <a
                href={SOCIAL_LINKS.dev.nabeel}
                target='_blank'
                className='font-semibold text-neutral-900 underline underline-offset-2 can-hover:no-underline'>
                Nabeel Asif
              </a>{" "}
              &{" "}
              <a
                href={SOCIAL_LINKS.dev.mohit}
                target='_blank'
                className='font-semibold text-neutral-900 underline underline-offset-2 can-hover:no-underline'>
                Mohit Kumar
              </a>
            </P>
          </GridCol>

          {/* Follow / Socials */}
          <GridCol colSizeConfig={{ xs: 12, sm: 4, lg: 3 }}>
            <section>
              <H5 weight='bold' className='text-h6'>
                Follow
              </H5>
              <FlexBox className='mt-10 gap-12'>
                <SocialLink url={SOCIAL_LINKS.site.github} title='Github'>
                  <Github size={16} className='text-background' />
                </SocialLink>

                <SocialLink url={SOCIAL_LINKS.site.figma} title='Figma'>
                  <Figma size={16} className='text-background' />
                </SocialLink>

                <SocialLink url={SOCIAL_LINKS.site.bluesky} title='Bluesky'>
                  <Bluesky size={16} className='text-background' />
                </SocialLink>
              </FlexBox>
            </section>
          </GridCol>

          {/* Tech Stack */}
          <GridCol colSizeConfig={{ xxs: 12, sm: 4, lg: 3 }}>
            <section>
              <H5 weight='bold' className='text-h6'>
                Tech Stack
              </H5>

              <FlexBox className='mt-10 gap-12 lg:flex-wrap'>
                <Nextjs />
                <Typescript />
                <Tailwindcss />
                <Hono />
                <Cloudflare />
              </FlexBox>
            </section>
          </GridCol>
        </Grid>
      </LayoutContainer>

      {/* banner */}
      <section className='bg-neutral-900'>
        <LayoutContainer className='py-20 md:py-10'>
          <FlexBox className='flex-col items-start gap-10 md:flex-row md:items-center md:justify-between'>
            <P className='text-background' size='small'>
              Copyright © {new Date().getFullYear()}, Web Archive. All rights reserved.
            </P>

            {/* admin login */}
            <AdminLogin />
          </FlexBox>
        </LayoutContainer>
      </section>
    </footer>
  );
};

export default Footer;
