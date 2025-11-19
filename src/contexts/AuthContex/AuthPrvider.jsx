import React, { useEffect, useState } from "react";
import { AuthContex } from "./AuthContex";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

const AuthPrvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const authinfo = { registerUser, signIn, user, loading, logout };
  return <AuthContex value={authinfo}>{children}</AuthContex>;
};

export default AuthPrvider;
