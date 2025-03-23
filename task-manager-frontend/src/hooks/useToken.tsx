import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import axios from "axios";
import { authSelectors, updateToken } from "../store/auth";

const cookies = new Cookies();

export const useToken = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);  
  const token = useSelector(authSelectors.token);  

  useEffect(() => {
    if (!token) {
      const cookieToken = cookies.get("token");
      if (cookieToken) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${cookieToken}`;
        dispatch(updateToken(cookieToken));
      }
    }
    setLoading(false);
  }, [dispatch, token]);

  return [ token, loading ];
};
