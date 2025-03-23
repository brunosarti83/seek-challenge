import React from 'react'
import { Navigate } from 'react-router-dom'
import { useToken } from '../hooks/useToken';
import { useSelector } from 'react-redux';
import { authSelectors } from '../store/auth';

interface IProps {
    children: React.ReactNode
}

const AuthLayout = React.memo(({ children }: IProps) => {
  const authLoading = useSelector(authSelectors.authLoading);  
  const token = useToken();
  React.useEffect(() => console.log(token), [token])
  if (authLoading) return
  if (!token && !authLoading) return (<Navigate to="/auth/login" />)
  return (
    <>
        {children}
    </>
  )
})

AuthLayout.displayName = 'AuthLayout'
export default AuthLayout