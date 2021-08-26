import ExternalLink from '../ExternalLink'
import React from 'react'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  border: solid 1px #d6d6d6;
  border-radius: 4px;
  margin: 0 4px;
`

const NoticeTitleArea = styled.div`
  color: #5d5d5d;
  display: table;
  padding: 10px 15px;
  width: 100%;
  box-sizing: border-box;
  table-layout: fixed;
`

const NoticeCardLabelWrapper = styled.div`
  width: 35px;
  display: table-cell;
  vertical-align: top;
`

const NoticeTitle = styled.h4`
  font-weight: bold;
  font-size: 13px;
  display: table-cell;
  vertical-align: middle;
  padding-left: 15px;
`

const ExternalDescription = styled.div`
  padding: 0 10px 10px 10px;
  text-align: right;
  display: flex;
  justify-content: space-between;
`

const BannerWrapper = styled.div`
  height: 45px;
  width: 89px;
`

const Price = styled.span`
  margin: auto 0;
  font-weight: bold;
`

const RakutenTravelItem = props => {
  const NoticeCardLabel = styled.span`
    color: #fff;
    font-size: 10px;
    display: table-cell;
    height: 35px;
    width: 35px;
    border-radius: 4px;
    text-align: center;
    vertical-align: middle;
    white-space: pre;
    line-height: 12px;
    background-color: ${props.color};
    &:before {
      content: "予約";
    }
  `

  return (
    <Wrapper>
      <ExternalLink
        href={props.url}
        ga={{
          eventLabel: `HotelMediaItem_${props.name}_${props.hotelNo}`,
        }}
      >
        {props.pid && <img src={`//ad.jp.ap.valuecommerce.com/servlet/gifbanner?sid=3599199&pid=${props.pid}`} height="1" width="0" border="0"></img>}
        <NoticeTitleArea>
          <NoticeCardLabelWrapper>
            <NoticeCardLabel></NoticeCardLabel>
          </NoticeCardLabelWrapper>
          <NoticeTitle>{props.title}のプランを見る</NoticeTitle>
        </NoticeTitleArea>
        <ExternalDescription>
          <BannerWrapper>
            <img src={props.logoUrl} width="45" height="89" alt={props.alt} />
          </BannerWrapper>
          {props.price && <Price>料金 {props.price.toLocaleString()} 円～</Price>}
        </ExternalDescription>
      </ExternalLink>
    </Wrapper>
  )
}

export default RakutenTravelItem
