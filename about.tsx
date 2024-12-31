import {
  json,
  type HeadersFunction,
  type LinksFunction,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'
import { useLoaderData, useSearchParams } from '@remix-run/react'
import { ArrowLink } from '#app/components/arrow-button.tsx'
import { Grid } from '#app/components/grid.tsx'
import { H2, H3, H6, Paragraph } from '#app/components/typography.tsx'
import { images, getImgProps } from '#app/images.tsx'
import { type RootLoaderType } from '#app/root.tsx'

export async function loader({ request }: LoaderFunctionArgs) {
  return json({}, {
    headers: {
      'Cache-Control': 'private, max-age=3600',
      Vary: 'Cookie',
    },
  })
}

export const headers: HeadersFunction = () => {
  return {}
}

export const meta: MetaFunction<typeof loader, { root: RootLoaderType }> = ({
  matches,
}) => {
  const requestInfo = matches.find((m) => m.id === 'root')?.data.requestInfo
  return {
    title: 'About Me - My Artwork',
    description: 'Learn about my passion for creating artwork in my free time.',
    keywords: 'artwork, hobby, painting, artwork portfolio',
    url: window.location.href,
  }
}

function AboutMePage() {
  return (
    <>
      <Grid as="main" className="mb-24 mt-16 lg:mb-48">
        <div className="col-span-full">
          <H2 className="mb-8">A Little About My Hobby</H2>
          <Paragraph className="mb-12">
            In my free time, I absolutely love doing artwork. Whether it’s sketching, painting, or creating digital designs, it’s a great way for me to relax and express my creativity. I find that the process of bringing an idea to life through art is incredibly fulfilling. Below are some of my favorite pieces that I've worked on recently. Enjoy!
          </Paragraph>
        </div>
      </Grid>

      <Grid className="mb-24 lg:mb-64">
        <div className="col-span-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="relative">
                <img
                  {...getImgProps(
                    {
                      src: `https://github.com/nbahador/nbahador.github.io/blob/main/assets/img/art${index + 1}_enhanced.jpg?raw=true`,
                      alt: `Artwork ${index + 1}`,
                    },
                    {
                      className: 'rounded-lg object-cover w-full h-full',
                      widths: [280, 560, 840, 1100, 1300, 2600],
                      sizes: ['(min-width:1620px) 1280px', '80vw'],
                    }
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </Grid>

      <Grid className="mb-24 lg:mb-64">
        <div className="col-span-full">
          <H2 className="mb-10">I hope you enjoyed seeing my artwork!</H2>
          <Paragraph className="mb-12">
            Art has always been an essential part of who I am, and I am always eager to improve and learn new techniques. I hope to continue creating and sharing my work with others. Thanks for taking the time to check it out!
          </Paragraph>
          <ArrowLink to="/portfolio" className="mb-12">
            See more of my artwork
          </ArrowLink>
        </div>
      </Grid>
    </>
  )
}

export default AboutMePage
