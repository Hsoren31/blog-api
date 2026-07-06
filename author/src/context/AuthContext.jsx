import { createContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function checkForUser() {
      let user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        setUser(null);
        setLoading(false);
        return;
      }
      setUser(user);
      setLoading(false);
    }

    checkForUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
