// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import authService, { User, LoginCredentials } from '@/services/authservice';
import { toast } from '@/hooks/use-toast';
import { isAxiosError } from 'axios';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
      toast({
        title: "Connexion réussie",
        description: `Bienvenue ${response.user.prenom} ${response.user.nom}!`,
      });
    } catch (error:unknown ) {
        let errorMessage = "Email ou mot de passe incorrect";

        if (isAxiosError(error) && error.response?.data?.message) {
             errorMessage = error.response.data.message;
        } else if (error instanceof Error) {
             errorMessage = error.message;
        }
      toast({
        title: "Erreur de connexion",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};