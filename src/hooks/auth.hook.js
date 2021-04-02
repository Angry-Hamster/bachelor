import { useState, useCallback, useEffect } from "react";

const storageName = "userData";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [userStatus, setuserStatus] = useState(null);
  const [userName, setuserName] = useState("");

  const login = useCallback((jwtToken, status, name) => {
    console.log(status, name);
    setToken(jwtToken);
    setuserStatus(status);
    setuserName(name);

    localStorage.setItem(
      storageName,
      JSON.stringify({
        userStatus: status,
        token: jwtToken,
        userName: name,
      }),
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setuserStatus(null);
    setuserName(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token && data.userName) {
      login(data.token, data.userStatus, data.userName);
    }
    setReady(true);
  }, [login]);

  return { login, logout, token, userStatus, userName, ready };
};
