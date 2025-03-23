import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import axios from "axios";
import { authSelectors, updateAuthLoading, updateToken } from "../store/auth";

const cookies = new Cookies();

export const useToken = () => {
  const dispatch = useDispatch();
  const token = useSelector(authSelectors.token);  
  useEffect(() => {
    if (!token) {
        dispatch(updateAuthLoading(true));
        const cookieToken = cookies.get("token");
        if (cookieToken) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${cookieToken}`;
          dispatch(updateToken(cookieToken));
        }
        dispatch(updateAuthLoading(false));
    }
  }, [dispatch, token]);
  return token;
};