import { graphql, useStaticQuery } from 'gatsby'

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query siteMetaData {
        site {
          siteMetadata {
            title
            description
            siteUrl
            image
            menuLinks {
              name
              slug
            }
            footerMenuLinks {
              name
              slug
            }
          }
        }
      }
    `
  )
  return site.siteMetadata
}
