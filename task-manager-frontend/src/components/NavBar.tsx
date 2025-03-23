import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/auth';

const NavBar = React.memo(() => {
  const dispatch = useDispatch(); 
  const handleLogout = () => dispatch(logoutUser() as any)

  return (
    <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Tasks
            </Typography>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
    </AppBar>
  )
})

NavBar.displayName = 'NavBar'
export default NavBar