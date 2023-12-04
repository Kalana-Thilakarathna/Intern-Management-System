import { useContext } from "react";
import AuthContext from "../Context/AuthProvider";


function useAuth() {
    return useContext(AuthContext);
 
}

export default useAuth;

