import { graphql, useStaticQuery } from 'gatsby'

import Helmet from 'react-helmet'
import React from 'react'

const SEO = ({ title, description, image, slug = null }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            image
            siteUrl
          }
        }
      }
    `
  )

  const defaultImage = site.siteMetadata.siteUrl + site.siteMetadata.image
  const metaDescription = description || site.siteMetadata.description
  const metaImage = image || defaultImage
  const ampHtml = slug ? `${site.siteMetadata.siteUrl}/amp/${slug}` : ''

  return (
    <Helmet
      htmlAttributes={{
        lang: `ja`,
      }}
      title={title}
      defaultTitle={site.siteMetadata.title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
    >
      <script data-ad-client={process.env.GOOGLE_ADSENSE} async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* General tags */}
      <meta name="image" content={image} />
      <meta name="description" content={metaDescription} />

      {/* OpenGraph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:description" content={metaDescription} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:description" content={metaDescription} />
      <link rel="amphtml" href={ampHtml} />

    </Helmet>
  )
}

export default SEO
