import { useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(context == undefined){
        throw new Error('useAuth mora biti korišten unutar AuthProvider-a!');
    }
    return context;
};