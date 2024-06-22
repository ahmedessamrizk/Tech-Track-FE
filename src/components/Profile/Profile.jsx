import React, { useEffect } from 'react'
import './Profile.css'
import SideBar from './SideBar'
import { Outlet, useNavigation, useOutletContext } from 'react-router-dom'
import LoadingScreen from '../../utils/loadingScreen.jsx'

export default function Profile() {
    const [profileFavorites = [], setProfileFavorites] = useOutletContext();
    const url = new URL(window.location.href);

    const navigation = useNavigation();
    const state = navigation.state === 'loading';
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <>
            {state && !url.pathname.endsWith('edit') && !url.pathname.endsWith('changePassword') && !url.pathname.endsWith('update') && <LoadingScreen />}
            <main className='profile'>
                <SideBar />
                <Outlet context={[profileFavorites, setProfileFavorites]} />
            </main>
        </>

    )
}
