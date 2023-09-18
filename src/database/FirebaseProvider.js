import React, { createContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { firebaseConfig } from "../config";

const FirebaseContext = createContext();

const FirebaseProvider = ({ children }) => {
  const [db, setDb] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!db) {
      const app = initializeApp(firebaseConfig);
      setDb(getDatabase(app));
      setIsLoading(false);
    }
  }, []);

  return (
    <FirebaseContext.Provider value={{ db, isLoading }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseContext, FirebaseProvider };
