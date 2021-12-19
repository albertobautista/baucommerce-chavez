import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from "firebase/auth";
import {createContext, useEffect, useState} from "react";
import {auth} from "../firebase/config";


export const UserContext = createContext();

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState()
    const [logged, setLogged] = useState(false)

    const provider = new GoogleAuthProvider()

    const signup = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => { // Signed in
            const user = userCredential.user;
            alert("Usuario creado correctamente")
            // ...
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode + errorMessage)
            // ..
        });
    }

    const login = (email, password) => {
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => { // Signed in
            const user = userCredential.user;
            setUser(user)
            // ...
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
        });
    }

    const logout = () => {
        signOut(auth).then(() => {
            alert("BYEEE")
        }).catch((error) => {
            alert(error.message)
        })
    }

    const googleAuth = () => {
        signInWithPopup(auth, provider).then((result) => { // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            setUser(user)
            // ...
        }).catch((error) => { // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                setLogged(true)
            } else {
                setLogged(false)
            }
        })
    }, []);

    return (
        <UserContextProvider value={
            {
                user,
                logged,
                login,
                signup,
                logout,
                googleAuth
            }
        }>
            {children} </UserContextProvider>
    )
}

export default UserContextProvider
