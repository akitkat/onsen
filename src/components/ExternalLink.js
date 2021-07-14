import React from 'react'
import styled from '@emotion/styled'

const Link = styled.a`
  text-decoration:none;
`
const ExternalLink = props => {
  return (
    <Link href={props.href} rel="noopener noreferrer nofollow" target="_blank">
      {props.children}
    </Link>
  )
}

export default ExternalLink
