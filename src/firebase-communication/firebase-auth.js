import { auth } from "../firebase-config";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

const login = async (email, password) => {
    try{
        signInWithEmailAndPassword(auth, email, password);
    } catch (error){
        console.error("Error occured: ", error);
    }
}

const logout = async () => {
    signOut(auth);
}

export {login, logout}
