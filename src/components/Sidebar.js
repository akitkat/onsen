import { graphql, useStaticQuery } from "gatsby"

import Adsense from './Adsense'
import ArticleItem from './ArticleItem'
import React from 'react'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  padding-left: 24px;
  width: 324px;
  @media screen and (max-width: ${props => props.theme.responsive.small}) {
    display: none;
  }
`

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SectionTitle = styled.h2`
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  background: #f89174;
  color: #fff;
  padding: 7px 15px;
  margin-bottom: 1em;
`

const Sidebar = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulPost(sort: { fields: [publishDate], order: DESC }, limit: 20) {
        edges {
          node {
            slug
            title
            publishDate
            heroImage {
              fluid(maxWidth: 1800) {
                ...GatsbyContentfulFluid_withWebp_noBase64
              }
            }
          }
        }
      }
    }
  `)

  const posts = data.allContentfulPost.edges
  return (
    <Wrapper>
      <SectionTitle>新着記事</SectionTitle>
      <List>
        {posts.map(({ node }) => {
          return (
            <ArticleItem
              key={node.slug}
              title={node.title}
              heroImage={node.heroImage}
              slug={node.slug}
            />
          )
        })}
      </List>
      <Adsense dataAdSlot={9657326887} />
    </Wrapper>
  )
}

export default Sidebar
