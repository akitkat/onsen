import Img from 'gatsby-image'
import { Link } from 'gatsby'
import React from 'react'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const ThumbnailWrapper = styled.div`
  margin-bottom: 16px;
  height: 75px;
  flex: 0 0 120px;
  overflow: hidden;
  background: #fcfbf8;
`

const TitleWrapper = styled.div`
  padding: .5em 0 0 12px;
  overflow: hidden;
  flex-grow: 1;
`

const Title = styled.h3`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  line-height: 20px;
  font-size: 14px;
`

const ArticleItem = props => {
  return (
    <Wrapper>
      <ThumbnailWrapper>
        <Link to={`/${props.slug}`}>
          <Img fluid={props.heroImage.fluid} backgroundColor={'#eeeeee'} />
        </Link>
      </ThumbnailWrapper>
      <TitleWrapper>
        <Link to={`/${props.slug}`}>
          <Title>{props.title}</Title>
        </Link>
      </TitleWrapper>
    </Wrapper>
  )
}

export default ArticleItem
