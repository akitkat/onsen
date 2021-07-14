import React from 'react'
import styled from '@emotion/styled'

const Button = styled.button`
  background: #1AAB8A;
  color: #fff;
  border: none;
  position: relative;
  height: 60px;
  font-size: 1.2em;
  padding: 0 2em;
  cursor: pointer;
  transition: 800ms ease all;
  outline: none;
  margin: 0 4px;
  width: 100%;
  @media screen and (max-width: ${props => props.theme.responsive.small}) {
    margin: 4px 0;
  }

  &:before {
    content:'';
    height:100%;
    display:inline-block;
    vertical-align:middle;
  }

  &:hover{
    background:#fff;
    color:#1AAB8A;
  }

  &:before, &:after{
    content:'';
    position:absolute;
    top:0;
    right:0;
    height:2px;
    width:0;
    background: #1AAB8A;
    transition:400ms ease all;
  }

  &:after{
    right:inherit;
    top:inherit;
    left:0;
    bottom:0;
  }

  &:hover:before, &:hover:after{
    width:100%;
    transition:800ms ease all;
  }
`

const CoolButton = props => (
  <Button>{props.title}</Button>
)

export default CoolButton
