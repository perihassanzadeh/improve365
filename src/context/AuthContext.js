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
            const docSnap = await getDoc(docRef);
            let profileData = docSnap.exists() ? docSnap.data() : {};
            // If name is missing, update from displayName or email
            if (!profileData.name) {
              const name = firebaseUser.displayName || firebaseUser.email.split('@')[0] || "User";
              await setDoc(docRef, { ...profileData, name }, { merge: true });
              profileData = { ...profileData, name };
            }
            if (!profileData.joinDate) {
              const joinDate = new Date(firebaseUser.metadata.creationTime).toISOString();
              await setDoc(docRef, { ...profileData, joinDate }, { merge: true });
              profileData = { ...profileData, joinDate };
            }
            setProfile(profileData);
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
    // Fetch the profile from Firestore to ensure it's loaded
    const docRef = doc(db, "users", cred.user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setProfile(docSnap.data());
    } else {
      setProfile({ name, email, joinDate }); // fallback
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