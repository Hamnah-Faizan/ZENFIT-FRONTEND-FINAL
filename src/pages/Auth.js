import { createContext, useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      setUser({
        id: decodedToken.id,
        name: decodedToken.name,
        email: decodedToken.email,
        roles: decodedToken.roles,
      });
    }
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}
