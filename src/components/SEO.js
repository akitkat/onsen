import { graphql, useStaticQuery } from 'gatsby'

import Helmet from 'react-helmet'
import React from 'react'

const SEO = ({ title, description, image, slug = null, publishDateISO = null, updatedAtISO = null }) => {
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

  const jsonLd = {
    "@context" : "http://schema.org",
    "@type" : "Article",
    "author" : {
      "@type" : "Person",
      "name" : "akitkat"
    },
    "publisher": {
      "@id": `${site.siteMetadata.siteUrl}/#organization`
    },
    "headline": title,
    "datePublished" : publishDateISO,
    "dateModified": updatedAtISO,
    "image" : image,
  }

  return (
    <Helmet
      htmlAttributes={{
        lang: `ja`,
      }}
      title={title}
      defaultTitle={site.siteMetadata.title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
    >
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

      {updatedAtISO && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  )
}

export default SEO
