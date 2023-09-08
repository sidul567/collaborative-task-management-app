import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext(null);

export const AuthContextProvider = ({children})=>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        login();
    }, [])

    const login = ()=>{
        const currentUserName = sessionStorage.getItem("username");

        if(currentUserName){
            const db = JSON.parse(localStorage.getItem("collaborative-management-app"));
            setUser(db?.users?.find((user)=>user?.username === currentUserName) || null);
        }

        setLoading(false);
    }

    const logout = ()=>{
        setUser(null);
        sessionStorage.removeItem("username");
    }
    
    return(
        <AuthContext.Provider value={{user, login, logout}}>
            {!loading && children}
        </AuthContext.Provider>
    )
}