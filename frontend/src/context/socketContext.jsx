import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuthContext } from './authContext.jsx';
import { io } from 'socket.io-client'

export const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext)
}

export const SocketContextProvider = ({children}) => {
    const [socket, setSocket] = useState(null);
    const [onlineUser, setOnlineUser] = useState([]);
    const {AuthUser} = useAuthContext();
    // const authUser = localStorage.getItem("online-user")
    // const AuthUserAll = authUser ? JSON.parse(authUser) : null;
    // const AuthUser = AuthUserAll ? AuthUserAll._id : null;
    useEffect(() => {
        
        if(AuthUser){
            const socket = io ('http://localhost:8000', {
                query: {
                    userId: AuthUser._id,
                },
            })
            setSocket(socket)
        console.log("socket :", socket)

        socket.on('getOnlineUser', (users) => {
            setOnlineUser(users)
        });
        //console.log("user Socket : ", users)
        //console.log("getOnlineUser : ", getOnlineUser)
        return () => socket.close();
        
    }else{
        if(socket){
            socket.close();
            setSocket(null)
        }
    }
        

     //console.log("user in socket : ", users)   

    },[AuthUser]);

    return <SocketContext.Provider value={{socket, onlineUser}}>{children}</SocketContext.Provider>
}

