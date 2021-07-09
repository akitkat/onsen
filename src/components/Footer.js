import { Link } from 'gatsby'
import React from 'react'
import styled from '@emotion/styled'
import { useSiteMetadata } from '../hooks/use-site-metadata'

const Wrapper = styled.footer`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: flex-start;
  margin: 0 auto;
  max-width: ${props => props.theme.sizes.maxWidth};
`

const List = styled.ul`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  width: 100%;
  border-top: 1px solid ${props => props.theme.colors.secondary};
  padding: 1em 0 2em;
  margin: 0 1.5em;
`

const Item = styled.li`
  display: inline-block;
  padding: .25em .5em;
  width: 100%;
  @media screen and (min-width: ${props => props.theme.responsive.small}) {
    width: auto;
  }
  a {
    font-weight: 600;
    transition: all 0.2s;
    color: ${props => props.theme.colors.text};
    &:hover {
      color: ${props => props.theme.colors.highlight};
    }
    &:visited {
      color: ${props => props.theme.colors.text};
    }
  }
`

const Footer = () => {
  const { footerMenuLinks } = useSiteMetadata()
  return (
  <Wrapper>
      <List>
        {footerMenuLinks.map(link => (
          <Item key={link.name}>
            <Link to={link.slug}>
              {link.name}
            </Link>
          </Item>
        ))}

      </List>
  </Wrapper>
  )
}

export default Footer