import React, { createContext, useState, useEffect, useContext} from "react";
import { jwtDecode } from 'jwt-decode';
import { DeleteValueByKey, GetValueByKey, SaveValueByKey } from "../../helpers/LocalStorage";

export const AuthContext = createContext(undefined);

const decodeJWT = (token) => {
    try{
        const decoded = jwtDecode(token);

        if(decoded.id && decoded.email && decoded.role){
            return{
                id: decoded.id,
                email: decoded.email,
                role: decoded.role
            };
        }

        return null;
    } catch(error) {
        console.error("Greška tokom dekodiranja JWT tokena: ", error);
        return null;
    }
};

const isTokenExpired = (token) => {
    try{
        const decoded = jwtDecode(token);
        const currentTime = Date.now()/1000;

        return decoded.exp ? decoded.exp < currentTime : false;
    } catch(error){
        return true;
    }
};

export const AuthProvider = ({children}) => {
    const [ user, setUser ] =  useState(null);
    const [ token, setToken ] = useState(null);
    const [ isLoading, setLoading ] = useState(true); 

    useEffect(() => {
        const savedToken = GetValueByKey("authToken");

        if(savedToken){
            if(isTokenExpired(savedToken)){
                DeleteValueByKey("authToken");
                setLoading(false);
                return;
            }

            const claims = decodeJWT(savedToken);
            if(claims){
                setToken(savedToken);
                setUser({
                    id: claims.id,
                    email: claims.email,
                    role: claims.role
                });
            } else {
                DeleteValueByKey("authToken");
            }
        }
        setLoading(false);
    }, []);

    const login = (newToken) => {
        const claims = decodeJWT(newToken);

        if(claims && !isTokenExpired(newToken)){
            setToken(newToken);
            setUser({
                id: claims.id,
                email: claims.email,
                role: claims.role
            });
            SaveValueByKey("authToken", newToken);
        } else {
            console.error('Nevažeći ili istekao token');
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        DeleteValueByKey("authToken");
    };

    const isAuthenticated = !!user && !!token;

    const value = {
        user,
        token,
        login,
        logout,
        isAuthenticated,
        isLoading
    };

    return(
        <AuthContext.Provider value={value}>
            {children} 
        </AuthContext.Provider>
    );
};