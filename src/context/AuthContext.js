import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  setPersistence,
  browserSessionPersistence
} from "firebase/auth";
import app from "../firebase";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const db = getFirestore(app);

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;
    let didSetListener = false;
    console.log("Setting Firebase session persistence...");
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        console.log("Persistence set. Setting up onAuthStateChanged listener...");
        unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          console.log("Auth state changed:", firebaseUser);
          setUser(firebaseUser);
          if (firebaseUser) {
            // Fetch profile from Firestore
            const docRef = doc(db, "users", firebaseUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setProfile(docSnap.data());
            } else {
              setProfile(null);
            }
          } else {
            setProfile(null);
          }
          setLoading(false);
        });
        didSetListener = true;
      })
      .catch((error) => {
        setUser(null);
        setProfile(null);
        setLoading(false);
        signOut(auth); // force sign out on error
        console.error("Failed to set persistence:", error);
      });

    // Fallback: if listener is never set, stop loading after 5 seconds
    const timeout = setTimeout(() => {
      if (!didSetListener) {
        setLoading(false);
        console.error("Auth listener was never set. Possible Firebase config or network issue.");
      }
    }, 5000);

    // Final fallback: always clear loading after 10 seconds
    const hardTimeout = setTimeout(() => {
      setLoading(false);
      console.error("Auth loading timed out after 10 seconds.");
    }, 10000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(hardTimeout);
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Auth functions
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const signup = async (email, password, name) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    // Save profile to Firestore
    await setDoc(doc(db, "users", cred.user.uid), { name, email });
    // Fetch the profile from Firestore to ensure it's loaded
    const docRef = doc(db, "users", cred.user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setProfile(docSnap.data());
    } else {
      setProfile({ name, email }); // fallback
    }
  };
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, profile, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 