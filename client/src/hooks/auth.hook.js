import {useState, useCallback, useEffect} from 'react';
const storageName='userData';

export const useAuth=()=>{
  const [token, setToken]=useState(null);
  const [ready, setReady]=useState(false);
  const [userId, setUserId]=useState(null);
  const login=useCallback((jwtToken, id)=>{
    setToken(jwtToken);
    setUserId(id);
    localStorage.setItem(storageName, JSON.stringify({id, jwtToken}));
  }, []);
  const logout=useCallback(()=>{
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName);
  }, []);
  useEffect(()=>{
    const data=JSON.parse(localStorage.getItem(storageName));
    //console.log('data.jwtToken: ', data.jwtToken);
    //console.log('data.id: ', data.id);
    if (data && data.jwtToken) login(data.jwtToken, data.id);
    setReady(true);
  }, [login]);
  return {login, logout, token, userId, ready};
}