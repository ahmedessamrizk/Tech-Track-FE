import React from 'react'
import './ProfileContent.css'
import ProfileData from '../../utils/ProfileData'
import { NavLink, Outlet, useNavigate, useRouteLoaderData } from 'react-router-dom'

export default function ProfileContent() {
    const navigate = useNavigate();
    const data = useRouteLoaderData('profile');

    function handleUpdate() {
        navigate(`/profile/updateProfile`)
    }

    return (
        <>
            <div className='profile-content'>
                <div className="profile-content-fields">
                    <ProfileData label={'first name'} data={data.name.split(' ')[0]} />
                    <ProfileData label={'last name'} data={data.name.split(' ')[1]} />
                    <ProfileData label={'gender'} data={data.Gender} />
                    <ProfileData label={'phone'} data={0 + data.phone} />
                    <ProfileData label={'email'} data={data.email} />
                </div>
                <div className="profile-action-buttons">
                    <button onClick={handleUpdate}>update profile</button>
                    <button><NavLink to='changePassword' >change password</NavLink></button>
                </div>
            </div>
            <Outlet />
        </>
    )
}
