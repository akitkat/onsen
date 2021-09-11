import 'lazysizes'
import 'lazysizes/plugins/attrchange/ls.attrchange'

import CoolButton from '../Button/CoolButton'
import ExternalLink from '../ExternalLink'
import React from 'react'
import styled from '@emotion/styled'

const jsonGolfCourse = require('../../../static/data/golfCourse.json')

const Wrapper = styled.div`
  padding-top: 24px;
  display: flex;
  flex-direction: column;
`

const ThumbnailWrapper = styled.div`
  height: 250px;
  width: 100%;
  margin: 0 auto 16px auto;
  overflow: hidden;
  background: #fcfbf8;
  img {
    height: 250px;

    object-fit: cover;
  }
  @media screen and (min-width: ${(props) => props.theme.responsive.large}) {
    min-width: 250px;
    img {
      width: 250px;
    }
  }
`

const DescriptionWrapper = styled.div`
  padding: 14px;
  background-color: #fde5e5;
  font-size: 0.9em;
  border-radius: 12px;
  box-sizing: border-box;
  margin-left: 16px;
  @media screen and (max-width: ${(props) => props.theme.responsive.small}) {
    margin: 0;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  @media screen and (max-width: ${(props) => props.theme.responsive.small}) {
    flex-direction: column;
  }
  > a {
    display: contents;
  }
`

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: ${(props) => props.theme.responsive.small}) {
    flex-direction: column;
  }
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

const GolfCourseItem = (props) => {
  const golfCourse = JSON.parse(JSON.stringify(jsonGolfCourse)).find(
    (e) => e.golfCourseId === parseInt(props.id)
  )

  return (
    <Wrapper>
      <div>
        <ExternalLink
          href={golfCourse.reserveCalUrl}
          ga={{
            eventLabel: `GolfCourseItem_hotelName_${golfCourse.golfCourseId}`,
          }}
        >
          <h2>{golfCourse.golfCourseName}</h2>
        </ExternalLink>
      </div>
      <InfoWrapper>
        <ThumbnailWrapper>
          <ExternalLink
            href={golfCourse.reserveCalUrl}
            ga={{
              eventLabel: `GolfCourseItem_thumbnail_${golfCourse.golfCourseId}`,
            }}
          >
            <picture>
              <source
                type="image/webp"
                srcSet={`https://dmt84s1zqsoj0.cloudfront.net/image?w=250&h=250&p=true&rt=2&id=${golfCourse.golfCourseId} 1x https://dmt84s1zqsoj0.cloudfront.net/image?w=500&h=500&p=true&rt=2&id=${golfCourse.golfCourseId} 2x`}
              />
              <img
                width="250"
                height="250"
                decoding="async"
                data-src={`https://dmt84s1zqsoj0.cloudfront.net/image?w=250&h=250&rt=2&id=${golfCourse.golfCourseId}`}
                data-srcset={`https://dmt84s1zqsoj0.cloudfront.net/image?w=300&h=300&rt=2&id=${golfCourse.golfCourseId} 1x https://dmt84s1zqsoj0.cloudfront.net/image?w=500&h=500&e&rt=2&id=${golfCourse.golfCourseId} 2x`}
                alt={golfCourse.golfCourseName}
                loading="lazy"
                className="lazyload"
                style={{ 'object-fit': 'cover', opacity: 1 }}
              />
            </picture>
          </ExternalLink>
        </ThumbnailWrapper>
        <DescriptionWrapper>
          <p>
            {golfCourse.golfCourseCaption.length >= 300
              ? `${golfCourse.golfCourseCaption.substr(0, 300)}...`
              : golfCourse.golfCourseCaption
            }
          </p>
        </DescriptionWrapper>
      </InfoWrapper>
      <TableWrapper>
        <Table>
          <tr>
            <TableTh>住所</TableTh>
            <TableTd>{golfCourse.address}</TableTd>
          </tr>
          <tr>
            <TableTh>インター</TableTh>
            <TableTd>{golfCourse.highway}</TableTd>
          </tr>
        </Table>
      </TableWrapper>
      <ButtonWrapper>
        <ExternalLink
          href={golfCourse.reserveCalUrl}
          ga={{
            eventLabel: `GolfCourseItem_button_rakuten_${golfCourse.golfCourseId}`,
          }}
        >
          <CoolButton title="プランを確認する" />
        </ExternalLink>
      </ButtonWrapper>
    </Wrapper>
  )
}

export default GolfCourseItem
