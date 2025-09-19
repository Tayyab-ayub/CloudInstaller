"use client";

import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setInitialToken } from '../redux/slices/userSlice';

function AuthInitializer({ children, authToken }) {
  const dispatch = useDispatch();
  const initialized = useRef(false);

  // Run this only once
  if (!initialized.current) {
    dispatch(setInitialToken({ authToken }));
    initialized.current = true;
  }

  return <>{children}</>;
}

export default AuthInitializer;
