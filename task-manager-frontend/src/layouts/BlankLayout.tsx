import { Container, Stack } from '@mui/material'
import React from 'react'

interface IProps {
    children: React.ReactNode
}

const BlankLayout = React.memo(({ children }: IProps) => {
  return (
    <Stack sx={{ minHeight: '100dvh' }}>
        <Container sx={{ flexGrow: 1 }}>
            {children}
        </Container>
    </Stack>
  )
})

BlankLayout.displayName = 'BlankLayout'
export default BlankLayout