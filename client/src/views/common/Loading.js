import React from 'react'
import {  CircularProgress } from '@material-ui/core';
import Container from 'components/Grid/Container'

const Loading = () => {
  return (
    <Container justify="center">
      <CircularProgress/>
    </Container>
  )
}

export default Loading