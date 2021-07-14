import Container from '../components/Container'
import Layout from '../components/Layout'
import PageBody from '../components/PageBody'
import PageTitle from '../components/PageTitle'
import React from 'react'
import SEO from '../components/SEO'
import { graphql } from 'gatsby'

const PageTemplate = ({ data }) => {
  const { title, metaDescription, body } = data.contentfulPage
  return (
    <Layout>
      <SEO
        title={title}
        description={
          metaDescription
            ? metaDescription.internal.content
            : body.childMarkdownRemark.excerpt
        }
      />
      <Container>
        <PageTitle>{title}</PageTitle>
        <PageBody body={body} />
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulPage(slug: { eq: $slug }) {
      title
      slug
      metaDescription {
        internal {
          content
        }
      }
      body {
        childMarkdownRemark {
          html
          htmlAst
          excerpt(pruneLength: 320)
        }
      }
    }
  }
`

export default PageTemplate
