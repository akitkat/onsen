import ExternalLink from './ExternalLink'
import React from 'react'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  border: solid 1px #d6d6d6;
  border-radius: 4px;
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
  background-color: #1AAB8A;
  &:before {
    content: "予約";
  }
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

const RakutenTravelBannerWrapper = styled.div`
  height: 45px;
  width: 89px;
`

const RakutenTravelPrice = styled.span`
  margin: auto 0;
  font-weight: bold;
`


const RakutenTravelItem = props => (
  <Wrapper>
    <ExternalLink href={props.url}>
      <NoticeTitleArea>
        <NoticeCardLabelWrapper>
          <NoticeCardLabel></NoticeCardLabel>
        </NoticeCardLabelWrapper>
        <NoticeTitle>{props.title}のプランを見る</NoticeTitle>
      </NoticeTitleArea>
      <ExternalDescription>
        <RakutenTravelBannerWrapper>
          <img src="https://hbb.afl.rakuten.co.jp/hsb/20cb2c73.10cfbe16.200c9359.c9357672/" width="45" height="89" alt="Rakuten Travel" />
        </RakutenTravelBannerWrapper>
        <RakutenTravelPrice>料金 {props.price} 円～</RakutenTravelPrice>
      </ExternalDescription>
    </ExternalLink>
  </Wrapper>
)

export default RakutenTravelItem
