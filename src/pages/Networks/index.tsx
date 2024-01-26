import { FormEvent, useEffect, useState } from "react"
import { Header } from "../../components/Header"
import { Input } from "../../components/Input"

import { db } from "../../services/firebaseConnection"
import {
    setDoc,
    doc,
    // addDoc,
    getDoc
} from 'firebase/firestore'

export const Networks = () => {

    const [facebook, setFacebook] = useState('')
    const [instagram, setInstagram] = useState('')
    const [youTube, setYouTube] = useState('')

    useEffect(() => {
        function loadLinks(){
            const docRef = doc(db, 'social', 'link')
            getDoc(docRef)
            .then((snapshot) => {
                //console.log(snapshot.data())
                if (snapshot.data() !== undefined) {
                    setFacebook(snapshot.data()?.facebook)
                    setInstagram(snapshot.data()?.instagram)
                    setYouTube(snapshot.data()?.youTube)
                }
            })
        }

        loadLinks()
    }, [])

    function handleRegister(e: FormEvent) {
        e.preventDefault()

        setDoc(doc(db, 'social', 'link'), {
            facebook: facebook,
            instagram: instagram,
            youTube: youTube
        })
        .then(() => {
            console.log("CADASTRADOS COM SUCESSO!")
        })
        .catch((error) => {
            console.log("ERRO AO SALVAR" + error)
        })
    }

    return (
        <>
            <div className="flex items-center flex-col min-h-screen pb-7 px-2">
                <Header />

                <h1 className="text-white text-2xl font-medium mt-8 mb-4">Minhas redes sociais</h1>

                <form 
                    onSubmit={handleRegister}
                    className="flex flex-col max-w-xl w-full">
                    <label className="text-white font-medium mt-2 mb-2">Link do Facebook</label>
                    <Input
                        type="url"
                        placeholder="Digite a url do Facebook..."
                        value={facebook}
                        onChange={(e) => setFacebook(e.target.value)}
                    />

                    <label className="text-white font-medium mt-2 mb-2">Link do Instagram</label>
                    <Input
                        type="url"
                        placeholder="Digite a url do Instagram..."
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                    />

                    <label className="text-white font-medium mt-2 mb-2">Link do YouTube</label>
                    <Input
                        type="url"
                        placeholder="Digite a url do YouTube..."
                        value={youTube}
                        onChange={(e) => setYouTube(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="text-white bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7 font-medium"
                    >
                        Salvar links
                    </button>
                </form>
            </div>
        </>
    )
}