import React from 'react'
import { Stack } from '@mui/material';
import TasksList from '../components/TasksList';

const Home = React.memo(() => {
  return (
    <Stack sx={{ minHeight: '100dvh', flexGrow: 1 }} justifyContent="center" alignItems="center">
        <TasksList />
    </Stack>
  )
})

Home.displayName = 'Home'
export default Home