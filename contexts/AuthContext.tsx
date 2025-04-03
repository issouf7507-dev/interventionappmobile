import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useSegments } from "expo-router";

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  employeeTypeId: string;
}

interface AuthContextType {
  token: string | null;
  employee: Employee | null;
  isLoading: boolean;
  signIn: (token: string, employee: Employee) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Composant pour gérer la redirection en fonction de l'état d'authentification
function useProtectedRoute(token: string | null) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (!token && !inAuthGroup) {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      router.replace("/(auth)/login");
    } else if (token && inAuthGroup) {
      // Rediriger vers la page d'accueil si l'utilisateur est connecté et essaie d'accéder aux pages d'authentification
      router.replace("/(root)/(tabs)/home");
    }
  }, [token, segments]);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useProtectedRoute(token);

  useEffect(() => {
    // Charger le token et les informations de l'utilisateur au démarrage
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("token");
      const storedEmployee = await AsyncStorage.getItem("employee");

      if (storedToken && storedEmployee) {
        setToken(storedToken);
        setEmployee(JSON.parse(storedEmployee));
      }
    } catch (error) {
      console.error(
        "Erreur lors du chargement des données d'authentification:",
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (newToken: string, newEmployee: Employee) => {
    try {
      await AsyncStorage.setItem("token", newToken);
      await AsyncStorage.setItem("employee", JSON.stringify(newEmployee));
      setToken(newToken);
      setEmployee(newEmployee);
    } catch (error) {
      console.error(
        "Erreur lors de la sauvegarde des données d'authentification:",
        error
      );
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("employee");
      setToken(null);
      setEmployee(null);
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, employee, isLoading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
