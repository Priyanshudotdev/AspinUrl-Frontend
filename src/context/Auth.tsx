import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext<any>({});

interface LinkProps {
  createdAt: string;
  createdBy: string;
  qrCode: string;
  redirectUrl: string;
  shortId?: string;
  customUrl?: string;
  urlTitle: string;
  visitHistory: [];
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<any | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const [links, setLinks] = useState<LinkProps[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setLoading(false);
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    links,
    setLinks,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
