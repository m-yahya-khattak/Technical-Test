"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useDispatch } from "react-redux";
import { fetchUserSuccess } from "@/store/actions";
import { createUserData } from "@/apis/userApi";

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const setSessionExpiry = () => {
    const currentTime = Date.now()  
  const expiryTime = currentTime + 2400 * 60 * 60
  localStorage.setItem("sessionExpiry", expiryTime.toString());
//   console.log("current time", currentTime, "expiry", expiryTime)
};

export const isSessionExpired = (): boolean => {
    const expiryTime = localStorage.getItem("sessionExpiry");
    // console.log("isexpiry", expiryTime)
    if (!expiryTime) return true; // No expiry set means session is invalid
    return Date.now() > parseInt(expiryTime, 10); // Compare current time to expiry
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Initialize user state from localStorage/sessionStorage
    const savedUser = typeof window !== "undefined" && localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // setUser(currentUser);
        const userData = { email: currentUser.email, uid: currentUser.uid, name: currentUser.displayName };
        localStorage.setItem("user", JSON.stringify(userData)); // Persist session in localStorage
        dispatch(fetchUserSuccess(userData));
      } else {
        setUser(null);
        localStorage.removeItem("user");
        // localStorage.removeItem("sessionExpiry");
        dispatch(fetchUserSuccess(null));
        // auth.signOut();
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userData = { email: userCredential.user.email, uid: userCredential.user.uid, name: userCredential.user.displayName };
    console.log("userCreds", userCredential)
    await createUserData(userCredential.user.uid, userCredential.user.email!, userCredential.user.displayName!);
    localStorage.setItem("refreshToken", userCredential.user.refreshToken)
    const accessToken = await userCredential.user.getIdToken();
    localStorage.setItem("accessToken", accessToken)
    setUser(userCredential.user);
    localStorage.setItem("user", JSON.stringify(userData)); // Persist session
    setSessionExpiry()
    dispatch(fetchUserSuccess(userData));
  };

  const logout = async () => {
    await auth.signOut();
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("sessionExpiry");
    dispatch(fetchUserSuccess(null));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};