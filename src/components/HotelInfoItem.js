import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';

import CoolButton from './Button/CoolButton'
import ExternalLink from './ExternalLink'
import HotelMediaItem from './Hotel/HotelMediaItem'
import React from 'react'
import styled from '@emotion/styled'

const jsonHotels = require('../../static/data/hotels.json')

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

const HotelMediaItemWrapper = styled.div`
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

const HotelMediaList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media screen and (min-width: ${props => props.theme.responsive.large}) {
    & > div {
      width: 50%;
    }
  }
`

const HotelInfoItem = props => {
  const hotel = JSON.parse(JSON.stringify(jsonHotels)).find(e => e.hotelNo === parseInt(props.no))
  const url = `https://hb.afl.rakuten.co.jp/hgc/g0190dd6.uc73i72f.g0190dd6.uc73jb24/?pc=https%3A%2F%2Ftravel.rakuten.co.jp%2FHOTEL%2F${props.no}`

  return (
    <Wrapper>
      <div>
        <ExternalLink
          href={url}
          ga={{
            eventLabel: `HotelInfoItem_hotelName_${hotel.hotelNo}`,
          }}
        >
          <h2>{hotel.hotelName}</h2>
        </ExternalLink>
      </div>
      <InfoWrapper>
        <ThumbnailWrapper>
          <ExternalLink
            href={url}
            ga={{
              eventLabel: `HotelInfoItem_thumbnail_${hotel.hotelNo}`,
            }}
          >
            <picture>
              <source
                type="image/webp"
                srcSet={`https://dmt84s1zqsoj0.cloudfront.net/image?w=250&h=250&p=true&rt=1&id=${hotel.hotelNo} 1x, https://dmt84s1zqsoj0.cloudfront.net/image?w=500&h=500&p=true&rt=1&id=${hotel.hotelNo} 2x`}
              />
              <img
                width="250"
                height="250"
                decoding="async"
                data-src={`https://dmt84s1zqsoj0.cloudfront.net/image?w=250&h=250&rt=1&id=${hotel.hotelNo}`}
                data-srcset={`https://dmt84s1zqsoj0.cloudfront.net/image?w=300&h=300&rt=1&id=${hotel.hotelNo} 1x, https://dmt84s1zqsoj0.cloudfront.net/image?w=500&h=500&e&rt=1&id=${hotel.hotelNo} 2x`}
                alt={hotel.hotelName}
                loading="lazy"
                className="lazyload"
                style={{"object-fit": "cover", opacity: 1}} />
            </picture>
          </ExternalLink>
        </ThumbnailWrapper>
        <DescriptionWrapper>
          <p>{props.description}</p>
        </DescriptionWrapper>
      </InfoWrapper>
      <HotelMediaList>
        <div>
          <HotelMediaItemWrapper>
            <HotelMediaItem
              hotelNo={hotel.hotelNo}
              url={url}
              title={hotel.hotelName}
              logoUrl="https://merchant.linksynergy.com/fs/logo/link_2902.jpg"
              price={hotel.price}
              alt="Rakuten Travel"
              color="#1AAB8A"
              width="100%"
              name="rakuten"
            />
          </HotelMediaItemWrapper>
        </div>
        {! ['NULL', ''].includes(hotel.jUrl) && (
          <div>
            <HotelMediaItemWrapper>
              <HotelMediaItem
                hotelNo={hotel.hotelNo}
                url={hotel.jUrl}
                title={hotel.hotelName}
                logoUrl="https://aff.valuecommerce.ne.jp/img/siteLogo/2130725.gif"
                alt="じゃらん"
                color="#EB5C02"
                width="100%"
                name="jalan"
                pid="887319502"
              />
            </HotelMediaItemWrapper>
          </div>
        )}
        {! ['NULL', ''].includes(hotel.iUrl) && (
          <div>
            <HotelMediaItemWrapper>
              <HotelMediaItem
                hotelNo={hotel.hotelNo}
                url={hotel.iUrl}
                title={hotel.hotelName}
                logoUrl="https://aff.valuecommerce.ne.jp/img/siteLogo/221.gif"
                alt="一休"
                color="#294B77"
                width="100%"
                name="ikyu"
                pid="887319524"
              />
            </HotelMediaItemWrapper>
          </div>
        )}
        {! ['NULL', ''].includes(hotel.yUrl) && (
          <div>
            <HotelMediaItemWrapper>
              <HotelMediaItem
                hotelNo={hotel.hotelNo}
                url={hotel.yUrl}
                title={hotel.hotelName}
                logoUrl="https://aff.valuecommerce.ne.jp/img/siteLogo/2244419.gif"
                alt="Yahoo!トラベル"
                color="#FF446A"
                width="100%"
                name="yahoo"
                pid="887316004"
              />
            </HotelMediaItemWrapper>
          </div>
        )}
      </HotelMediaList>
      <TableWrapper>
        <Table>
          <tr>
            <TableTh>住所</TableTh>
            <TableTd>{hotel.address}</TableTd>
          </tr>
          <tr>
            <TableTh>アクセス</TableTh>
            <TableTd>{hotel.access}</TableTd>
          </tr>
          <tr>
            <TableTh>Tel</TableTh>
            <TableTd>{hotel.tel}</TableTd>
          </tr>
        </Table>
      </TableWrapper>
      <ButtonWrapper>
        <ExternalLink
          href={`https://hb.afl.rakuten.co.jp/hgc/g0190dd6.uc73i72f.g0190dd6.uc73jb24/?pc=https%3A%2F%2Fcoupon.travel.rakuten.co.jp%2Fcoupon%2Fhotel%2F${props.no}`}
          ga={{
            eventLabel: `HotelInfoItem_button_coupon_${hotel.hotelNo}`,
          }}
        >
          <CoolButton title="クーポンを確認する" />
        </ExternalLink>
        <ExternalLink
          href={url}
          ga={{
            eventLabel: `HotelInfoItem_button_room_${hotel.hotelNo}`,
          }}
        >
          <CoolButton title="空室を確認する" />
        </ExternalLink>
      </ButtonWrapper>
    </Wrapper>
  )
}

export default HotelInfoItem
