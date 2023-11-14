// AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { UserData, AuthContextData } from "../../interfaces/user.interfaces";
import { registerSchema } from "../../validation/schema";

export const AuthContext = createContext<AuthContextData | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);

  const signIn = (email: string, password: string) => {
    setUser({ name: "Usuário", email });
  };

  const signUp = async (
    userData: UserData,
    password: string,
    confirmPassword: string
  ) => {
    try {
      await registerSchema.validate({ ...userData, password, confirmPassword });
      setUser(userData);
    } catch (error) {
      console.error("Erro no cadastro:", error.message);
      throw error;
    }
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
