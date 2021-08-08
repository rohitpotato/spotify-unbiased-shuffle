import { useCallback, useLayoutEffect } from "react";
import { useAppContext } from "../Context/AppContext";
import { stateKey } from "../constants";
import { login, hashParams } from "../utils/common";

const useHook = () => {
  const { accessToken, setAccessToken, setExpiresAt, expiresAt } =
    useAppContext();
  const getToken = useCallback(() => {
    if (accessToken && expiresAt && new Date().getTime() < expiresAt) {
      return null;
    }
    const params = hashParams();

    if (
      params.state &&
      params.access_token &&
      params.expires_in &&
      params.state === localStorage.getItem(stateKey)
    ) {
      localStorage.removeItem(stateKey);
      setAccessToken(params.access_token);
      setExpiresAt(new Date().getTime() + params.expires_in);
      window.location.hash = "";
      return null;
    }

    login();
    return null;
  }, [accessToken, expiresAt, setAccessToken, setExpiresAt]);

  useLayoutEffect(() => {
    getToken();
  }, [getToken]);
  return getToken;
};

export default useHook;
