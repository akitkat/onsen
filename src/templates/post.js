import Container from '../components/Container'
import Hero from '../components/Hero'
import Layout from '../components/Layout'
import PageBody from '../components/PageBody'
import PostDetails from '../components/PostDetails'
import React from 'react'
import SEO from '../components/SEO'
import ShareButtonList from '../components/ShareButtonList'
import Sidebar from '../components/Sidebar'
import TagList from '../components/TagList'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'

const PostTemplate = ({ data, pageContext }) => {
  const {
    title,
    slug,
    metaDescription,
    heroImage,
    body,
    publishDate,
    tags,
  } = data.contentfulPost

  const { basePath, siteUrl } = pageContext

  let ogImage
  try {
    ogImage = heroImage.ogimg.src
  } catch (error) {
    ogImage = null
  }
  const ContentWrapper = styled.div`
    display: flex;
    justify-content: space-between;
  `

  return (
    <Layout>
      <SEO
        title={title}
        description={
          metaDescription
            ? metaDescription.internal.content
            : body.childMarkdownRemark.excerpt
        }
        image={ogImage}
        slug={slug}
      />
      <Hero title={title} image={heroImage} height={'50vh'} />
      <Container>
        <ContentWrapper>
          <div>
            {tags && <TagList tags={tags} basePath={basePath} />}
            <ShareButtonList title={title} url={`${siteUrl}/${slug}`} />
            <PostDetails
              date={publishDate}
              timeToRead={body.childMarkdownRemark.timeToRead}
            />
            <PageBody body={body} />
          </div>
          <Sidebar />
        </ContentWrapper>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulPost(slug: { eq: $slug }) {
      title
      slug
      metaDescription {
        internal {
          content
        }
      }
      publishDate(formatString: "MMMM DD, YYYY")
      publishDateISO: publishDate(formatString: "YYYY-MM-DD")
      tags {
        title
        id
        slug
      }
      heroImage {
        title
        fluid(maxWidth: 1800) {
          ...GatsbyContentfulFluid_withWebp_noBase64
        }
        ogimg: resize(width: 1800) {
          src
        }
      }
      body {
        childMarkdownRemark {
          timeToRead
          html
          excerpt(pruneLength: 320)
        }
      }
    }
  }
`

export default PostTemplate
