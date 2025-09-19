"use client";
import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from '../redux/store';
import { setAuthToken } from '../redux/slices/userSlice';
import Cookies from 'js-cookie';

function AuthHydrator({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const authToken = Cookies.get('authToken');
    if (authToken) {
      dispatch(setAuthToken({ authToken }));
    }
  }, [dispatch]);

  return <>{children}</>;
}

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>
    <AuthHydrator>{children}</AuthHydrator>
  </Provider>;
}
