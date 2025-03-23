import { Container, Stack } from '@mui/material'
import React from 'react'
import NavBar from '../components/NavBar'

interface IProps {
    children: React.ReactNode
}

const MainLayout = React.memo(({ children }: IProps) => {
  return (
    <Stack sx={{ minHeight: '100dvh' }}>
        <NavBar />
        <Container sx={{ flexGrow: 1 }}>
            {children}
        </Container>
    </Stack>
  )
})

MainLayout.displayName = 'MainLayout'
export default MainLayout