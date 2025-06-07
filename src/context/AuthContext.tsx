"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

// Definir el tipo de usuario
export interface User {
  id: number;
  name: string;
  surname: string;
}

// Definir el tipo de contexto de autenticación
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (
    username: string,
    password: string,
    name: string,
    surname: string
  ) => Promise<void>;
  logout: () => void;
  token: string | null;
  id: number;
}

const API_URL = import.meta.env.VITE_API_URL;

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para usar el contexto de autenticación
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
}

// Proveedor de autenticación
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Verificar si hay un usuario en localStorage al cargar la aplicación
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing stored user:", e);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  // Función para iniciar sesión
  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al iniciar sesión");
      }

      const userData = await response.json();
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para registrar un nuevo usuario
  const register = async (
    username: string,
    password: string,
    name: string,
    surname: string
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, name, surname }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al registrar usuario");
      }

      const userData = await response.json();
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  function getToken(): string | null {
    const item = localStorage.getItem("user");
    if (!item) return null;

    try {
      return JSON.parse(item).token;
    } catch (e) {
      return null;
    }
  }
  const token = getToken();

  function getId(): number {
    const item = localStorage.getItem("user");
    if (!item) return 0;

    try {
      return JSON.parse(item).userId;
    } catch (e) {
      return 0;
    }
  }

  const id = getId();

  const value: AuthContextType = {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    token,
    id,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
