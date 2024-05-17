import { auth } from "../firebase-config";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { notifyError, notifySuccess } from "../toast-config.js";

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        notifySuccess("Login successful!");
        return null;
    } catch (error) {
        notifyError(error.message);
        return error.message;
    }
}

const logout = async () => {
    await signOut(auth);
    notifySuccess("Logout successful!");
}

export { login, logout }
