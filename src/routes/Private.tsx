import { ReactNode, useEffect, useState } from "react"
import { Navigate } from "react-router-dom"

import { auth } from '../services/firebaseConnection'
import { onAuthStateChanged } from 'firebase/auth'

interface PrivaceProps {
    children: ReactNode
}

export function Private({ children }: PrivaceProps) {

    const [loading, setLoading] = useState(true)
    const [signed, setSigned] = useState(false)

    useEffect(() => {

        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                //console.log(user)
                const userData = {
                    uid: user?.uid,
                    email: user?.email
                }

                localStorage.setItem("@reactlinks", JSON.stringify(userData))
                setLoading(false)
                setSigned(true)

            } else {
                //console.log("NÃO TEM USER LOGADO")
                setLoading(false)
                setSigned(false)
            }
        })
        //console.log("UNSUB", unsub)
        return () => {
            unsub()
        }
    }, [])

    if (loading) {
        return <div></div>
    }

    if (!signed) {
        return <Navigate to='/login' />
    }

    return children
}