import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  setPersistence,
  browserSessionPersistence,
  updateProfile
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
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          setUser(firebaseUser);
          if (firebaseUser) {
            const docRef = doc(db, "users", firebaseUser.uid);
            try {
              const docSnap = await getDoc(docRef);
              let profileData = docSnap.exists() ? docSnap.data() : {};
              let bestName = profileData.name;

              // If Firestore name is missing, empty, or 'User', try to get a better name
              if (!bestName || bestName === "User") {
                const displayName = firebaseUser.displayName;
                const emailName = firebaseUser.email ? firebaseUser.email.split('@')[0] : "User";
                // Prefer displayName if it's not 'User' or empty
                if (displayName && displayName !== "User") {
                  bestName = displayName;
                } else if (emailName && emailName !== "User") {
                  bestName = emailName;
                } else {
                  bestName = "User";
                }
                // Patch Firestore if we have a better name than what's stored
                if (bestName !== profileData.name) {
                  await setDoc(docRef, { ...profileData, name: bestName }, { merge: true });
                  profileData = { ...profileData, name: bestName };
                }
              }

              setProfile(profileData);
              console.log("Profile loaded:", profileData);
            } catch (error) {
              setProfile((prev) => prev || { name: firebaseUser.displayName || firebaseUser.email.split('@')[0] || "User" });
              console.error("Failed to fetch user profile from Firestore:", error);
            }
          } else {
            setProfile(null);
          }
          setLoading(false);
        });
      })
      .catch((error) => {
        setUser(null);
        setProfile(null);
        setLoading(false);
        // Optionally: signOut(auth);
        console.error("Failed to set persistence:", error);
      });
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Auth functions
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const signup = async (email, password, name) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    // Set displayName in Firebase Auth
    await updateProfile(cred.user, { displayName: name });
    // Save profile to Firestore with joinDate
    const joinDate = new Date().toISOString();
    await setDoc(doc(db, "users", cred.user.uid), { name, email, joinDate });
    // Force reload of the user to get the updated displayName
    await cred.user.reload();
    // Fetch the profile from Firestore to ensure it's loaded and up to date
    const docRef = doc(db, "users", cred.user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setProfile(docSnap.data());
    } else {
      setProfile({ name, email, joinDate });
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