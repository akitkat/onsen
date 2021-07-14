import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { graphql, useStaticQuery } from "gatsby"

import CoolButton from './Button/CoolButton'
import ExternalLink from './ExternalLink'
import RakutenTravelItem from './RakutenTravelItem'
import React from 'react'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  padding-top: 24px;
  display: flex;
  flex-direction: column;
`

const ThumbnailWrapper = styled.div`
  height: 250px;
  margin: 0 auto 16px auto;
  overflow: hidden;
  background: #fcfbf8;
  img {
    height: 250px;
    object-fit: cover;
  }
  @media screen and (min-width: ${props => props.theme.responsive.large}) {
    min-width: 250px;
    img {
      width: 250px;
    }
  }
`

const DescriptionWrapper = styled.div`
  padding: 14px;
  background-color: #fde5e5;
  font-size: .9em;
  border-radius: 12px;
  box-sizing: border-box;
  margin-left: 16px;
  @media screen and (max-width: ${props => props.theme.responsive.small}) {
    margin: 0;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  @media screen and (max-width: ${props => props.theme.responsive.small}) {
    flex-direction: column;
  }
  > a {
    display: contents;
  }
`

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: ${props => props.theme.responsive.small}) {
    flex-direction: column;
  }
`

const RakutenTravelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 12px;
`

const TableWrapper = styled.div`
  padding-top: 12px;
`

const Table = styled.table`
  border-collapse: collapse;
  font-size: .9em;
`

const TableTh = styled.th`
  width: 7em;
  text-align: left;
  border-top: solid 1px #e8e8e8;
  border-bottom: solid 1px #e8e8e8;
  background: #f7f7f7;
  padding: 11px 17px 10px;
  line-height: 1em;
`

const TableTd = styled.th`
  text-align: left;
  border-top: solid 1px #f0f0f0;
  border-bottom: solid 1px #f0f0f0;
  word-break: break-all;
  padding: 11px 17px 10px;
  line-height: 1em;
  background: #fff;
`

const HotelInfoItem = props => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: {name: {eq: "hotelInfoItem"}}) {
        edges {
          node {
            childImageSharp {
              gatsbyImageData
            }
            internal {
              content
            }
          }
        }
      }
    }
  `)

  const url = `https://hb.afl.rakuten.co.jp/hgc/g0190dd6.uc73i72f.g0190dd6.uc73jb24/?pc=https%3A%2F%2Ftravel.rakuten.co.jp%2FHOTEL%2F${props.no}`
  const image = getImage(data.allFile.edges.find(e => e.node.internal.content === props.image).node)

  return (
    <Wrapper>
      <div>
        <ExternalLink href={url}>
          <h2>{props.title}</h2>
        </ExternalLink>
      </div>
      <InfoWrapper>
        <ThumbnailWrapper>
          <ExternalLink href={url}>
            <GatsbyImage image={image} alt={props.title} />
          </ExternalLink>
        </ThumbnailWrapper>
        <DescriptionWrapper>
          <p>{props.description}</p>
        </DescriptionWrapper>
      </InfoWrapper>
      <ExternalLink href={url}>
        <RakutenTravelWrapper>
          <RakutenTravelItem url={url} title={props.title} price={props.price} />
        </RakutenTravelWrapper>
      </ExternalLink>
      <TableWrapper>
        <Table>
          <tr>
            <TableTh>住所</TableTh>
            <TableTd>{props.address}</TableTd>
          </tr>
          <tr>
            <TableTh>アクセス</TableTh>
            <TableTd>{props.access}</TableTd>
          </tr>
          <tr>
            <TableTh>Tel</TableTh>
            <TableTd>{props.tel}</TableTd>
          </tr>
        </Table>
      </TableWrapper>
      <ButtonWrapper>
        <ExternalLink href={`https://hb.afl.rakuten.co.jp/hgc/g0190dd6.uc73i72f.g0190dd6.uc73jb24/?pc=https%3A%2F%2Fcoupon.travel.rakuten.co.jp%2Fcoupon%2Fhotel%2F${props.no}`}>
          <CoolButton title="クーポンを確認する" />
        </ExternalLink>
        <ExternalLink href={url}>
          <CoolButton title="空席を確認する" />
        </ExternalLink>
      </ButtonWrapper>
    </Wrapper>
  )
}

export default HotelInfoItem
