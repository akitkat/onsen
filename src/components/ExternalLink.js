import React from 'react'
import styled from '@emotion/styled'
import { trackCustomEvent } from 'gatsby-plugin-google-analytics'

const Link = styled.a`
  text-decoration: none;
`
const ExternalLink = (props) => {
  return (
    <Link
      className="external-link"
      href={props.href}
      rel="noopener noreferrer nofollow"
      target="_blank"
      data-vars-event-label={props.ga.eventLabel}
      onClick={(e) => {
        trackCustomEvent({
          category: 'External Link',
          action: 'Click',
          label: props.ga.eventLabel ?? '',
        })
      }}
    >
      {props.children}
    </Link>
  );
}

export default ExternalLink
