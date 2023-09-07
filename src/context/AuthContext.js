import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
    const [user, setUser] = useState("");
    useEffect(()=>{
        const currentUserName = sessionStorage.getItem("username");

        if(currentUserName){
            const db = JSON.parse(localStorage.getItem("collaborative-management-app"));
            setUser(db.users.find((user)=>user.username === currentUserName))
        }
    }, [])

    const logout = ()=>{
        setUser("");
    }
    
    return(
        <AuthContext.Provider value={{user, logout}}>
            {children}
        </AuthContext.Provider>
    )
}