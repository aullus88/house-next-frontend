import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { loginUserSupabase, logOutUserSupabase } from "@/auth/server";
import { NEXT_URL } from '@/config/index'


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    checkUserLoggedIn(), [];
  });

  // Login user
  const login = async ({email,password}) =>{
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    
    

    const data = await res.json()

    if (res.ok) {
      setUser(data.user)
      router.push('/')
    } else {
      setError(data.message)
      setError(null)
    }
  }


  const logout = async () => {
    const data = logOutUserSupabase()
    if (data){
      
      setUser(null)
      router.push('/login')
    }
  };

  //Check session

  const checkUserLoggedIn = async (user) => {
    console.log("Check Session");
  };

  return (
    <AuthContext.Provider value={{ user, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;