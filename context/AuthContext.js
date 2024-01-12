import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { loginUserSupabase, logOutUserSupabase } from "@/auth/server";
import { NEXT_URL } from "@/config/index";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    checkUserLoggedIn(), [];
  });

  // Login user
  const login = async ({ email, password }) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      // console.log(data.data)
      setUser(data.data.user);
      router.push("/");
      // console.log(data.data.user);
    } else {
      setError(data.message);
      setError(null);
    }
  };

  //Logout User

  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.ok) {
      setUser("");
      router.push("/login");
    } else {
      setError(data.message);
      setError(null);
    }
  };

  //Check session

  const checkUserLoggedIn = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();
    // console.log(data.user)

    if (data.user.id) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  };
  return (
    <AuthContext.Provider value={{ user, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
