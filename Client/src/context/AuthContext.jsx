import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  // user state
  const [user, setUser] = useState(null);

  // loading state
  const [loading, setLoading] = useState(true);

  // check token on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setUser(token);
    }

    setLoading(false);
  }, []);

  // logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;