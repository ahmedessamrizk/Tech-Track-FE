import React, { useEffect, useState } from 'react'
import { Outlet, useLoaderData, useSubmit } from 'react-router-dom'
import Chatbot from '../components/chatbot/Chatbot'
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import { getDuration } from '../utils/tokenFunctions';

export default function RootPage() {
    const { token } = useLoaderData();
    const submit = useSubmit();
    const userFavorites = JSON.parse(localStorage.getItem('userFavorites'));
    const [profileFavorites, setProfileFavorites] = useState(userFavorites === null ? [] : [...userFavorites]);
    useEffect(() => {
        if (token === 'EXPIRED') {
            submit(null, { action: '/logout', method: 'POST' })
            return;
        }
        if (token !== null) {
            setTimeout(() => submit(null, { action: '/logout', method: 'POST' }), getDuration())
        }
    }, [submit, token])
    return (
        <>
            <NavBar />
            <Chatbot />
            <Outlet context={[profileFavorites, setProfileFavorites]} />
            <Footer />
        </>
    )
}
