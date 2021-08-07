import React from 'react'
import styled from '@emotion/styled'
import { trackCustomEvent } from 'gatsby-plugin-google-analytics'

const Link = styled.a`
  text-decoration:none;
`
const ExternalLink = props => {
  return (
    <Link
      href={props.href}
      rel="noopener noreferrer nofollow"
      target="_blank"
      onClick={e => {
        trackCustomEvent({
          category: "External Link",
          action: "Click",
          label: props.gaLabel ?? '',
        })
      }}
    >
      {props.children}
    </Link>
  )
}

export default ExternalLink
