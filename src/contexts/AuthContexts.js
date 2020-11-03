import React, {useState, useContext, useEffect} from 'react'
import {auth} from '../fire'

const AuthContext = React.createContext()

export function useAuth(){
 return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, SetCurrentUser] = useState() 
    const [loading, SetLoading] = useState(true) 

        useEffect(() => {
            const unSubscribe = auth.onAuthStateChanged(user => {
                SetLoading(false)
                SetCurrentUser(user)
                console.log(user)
            })
            return unSubscribe;
        }, [])


function signUp(email, password){
    return auth.createUserWithEmailAndPassword(email, password)
}

function login(email, password){
    return auth.signInWithEmailAndPassword(email, password)
}

function resetPassword(email){
    return auth.sendPasswordResetEmail(email)
}

function logout(){
    return auth.signOut()
}

function updateEmail(email) {
    return currentUser.updateEmail(email)
}

function updatePassword(password) {
    return currentUser.updatePassword(password)
}

const value = {
    currentUser,
    login,
    signUp,
    logout,
    updateEmail,
    resetPassword,
    updatePassword
}

    return (
            <AuthContext.Provider value={value}>
                    {!loading && children}
            </AuthContext.Provider>
    )
}

export default AuthContext
