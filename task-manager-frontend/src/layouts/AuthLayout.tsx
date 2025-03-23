import React from "react";
import { Navigate } from "react-router-dom";
import { useToken } from "../hooks/useToken";
import { LinearProgress } from "@mui/material";

interface IProps {
  children: React.ReactNode;
}

const AuthLayout = React.memo(({ children }: IProps) => { 
  const [token, loadingToken] = useToken();

  if (loadingToken) return <LinearProgress color="inherit" sx={{ width: 1, maxWidth: 360 }} /> ;

  if (!token) return <Navigate to="/auth/login" />;

  return <>{children}</>;
});

AuthLayout.displayName = "AuthLayout";
export default AuthLayout;
