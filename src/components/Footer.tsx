import { Figma, Github, Twitter } from "lucide-react";
import LayoutContainer from "@/components/UI/LayoutContainer";
import SocialLink from "@/components/SocialLink";
import AdminLogin from "@/components/AdminLogin";
import { Grid, GridCol } from "@/components/UI/Grid";
import FlexBox from "@/components/UI/FlexBox";
import H5 from "@/components/UI/Typography/H5";
import P from "@/components/UI/Typography/P";
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
            <H5>Web Archive</H5>

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
            <div>
              <P tag='h6' weight='bold'>
                Follow
              </P>
              <FlexBox className='mt-10 gap-12'>
                <SocialLink url={SOCIAL_LINKS.site.github} title='Github'>
                  <Github size={16} className='text-background' />
                </SocialLink>

                <SocialLink url={SOCIAL_LINKS.site.figma} title='Figma'>
                  <Figma size={16} className='text-background' />
                </SocialLink>

                <SocialLink url={SOCIAL_LINKS.site.twitter} title='Twitter'>
                  <Twitter size={16} className='text-background' />
                </SocialLink>
              </FlexBox>
            </div>
          </GridCol>

          {/* Tech Stack */}
          <GridCol colSizeConfig={{ xxs: 12, sm: 4, lg: 3 }}>
            <div>
              <P tag='h6' weight='bold'>
                Tech Stack
              </P>

              {/* TODO: make these hollow non-clickable button */}
              <FlexBox className='mt-10 gap-12'>
                <SocialLink url={SOCIAL_LINKS.site.github} title='Github'>
                  <Github size={16} />
                </SocialLink>

                <SocialLink url={SOCIAL_LINKS.site.figma} title='Figma'>
                  <Figma size={16} />
                </SocialLink>

                <SocialLink url={SOCIAL_LINKS.site.twitter} title='Twitter'>
                  <Twitter size={16} />
                </SocialLink>

                <SocialLink url={SOCIAL_LINKS.site.twitter} title='Twitter'>
                  <Twitter size={16} />
                </SocialLink>
              </FlexBox>
            </div>
          </GridCol>
        </Grid>
      </LayoutContainer>

      {/* banner */}
      <section className='bg-neutral-900'>
        <LayoutContainer className='py-10'>
          <FlexBox className='items-center justify-between gap-48'>
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
