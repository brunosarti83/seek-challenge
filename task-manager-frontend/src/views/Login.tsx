import { Box, Button, Card, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authSelectors, loginWithCredentials } from '../store/auth';
import { useNavigate } from 'react-router-dom';

const Login = React.memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authLoading = useSelector(authSelectors.authLoading);

  const [validate, setValidate] = React.useState(false)  
  const [data, setData] = React.useState({ email: '', password: '' })

  const errors = React.useMemo(() => {
    const errors: Record<string, string> = {}
    if (!validate) return errors 

    if (!data.email.includes('@') || !data.email.includes('.')) {
      errors.email = 'Invalid email'  
    }
    if (data.password.length < 8) {
      errors.password = 'Password must be at least 8 characters'
    }
    return errors
  }, [data, validate])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setValidate(true)
    const { email, password } = data
    setTimeout(async () => {
        if (Object.keys(errors).length === 0) {
          const { success } = await dispatch(loginWithCredentials({email, password}) as any).unwrap()
          if (success) {
            setValidate(false)
            setData({ email: '', password: '' })
            navigate('/')
          }
        }
    }, 500)
  }  

  return (
    <Stack sx={{ minHeight: '100dvh', flexGrow: 1 }} justifyContent="center" alignItems="center">
        <Card sx={{ minWidth: 320, py: 6, px: 3 }}>
           <Box component="form" onSubmit={handleSubmit} 
           sx={{ h: 1, w: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 2 }}
           >
                <Typography variant="h5" sx={{ mb: "20px" }}>Login</Typography>
                <TextField required name="email" type="email" label="Email" variant="filled" onChange={handleChange} sx={{ width: 300 }} />
                <Typography variant="caption" color="error" sx={{ minHeight: "14px" }}>{errors?.email}</Typography>
                <TextField required name="password" type="password" label="Password" variant="filled" onChange={handleChange} sx={{ width: 300 }} />
                <Typography variant="caption" color="error" sx={{ minHeight: "14px" }}>{errors?.password}</Typography>
                <Button loading={authLoading} type="submit" variant="contained" sx={{ px: 4, py: 2, minWidth: 160, minHeight: 36 }}>Login</Button>
                <br/>
                <Typography variant="body2">Don't have an account? <a href="/auth/register">Register</a></Typography>
           </Box> 
        </Card>
    </Stack>
  )
})

Login.displayName = 'Login'
export default Login