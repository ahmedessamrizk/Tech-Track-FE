import React from 'react'
import maleImage from '../../asserts/male.png'
import femaleImage from '../../asserts/female.png'
import './SideBar.css'
import CircleIcon from '@mui/icons-material/Circle';
import { NavLink, useLoaderData } from 'react-router-dom';


export default function SideBar() {
    const url = new URL(window.location.href);
    const profileData = useLoaderData();
    return (
        <aside className='profile-sidebar'>
            <div className="profile-image">
                <img src={profileData.Gender === 'male' ? maleImage : femaleImage} alt="" />
            </div>
            <div className="profile-list">
                <h2>{profileData.name}</h2>
                <ul className='profile-list-items'>
                    <div className={`profile-list-item ${url.pathname.endsWith('content') ? 'selected' : undefined}`} >
                        <CircleIcon className={`${url.pathname.endsWith('content') ? 'point-icon-selected' : 'point-icon'}`} />
                        <li>
                            <NavLink to='/profile/content'>
                                profile
                            </NavLink>
                        </li>
                    </div>
                    {JSON.parse(localStorage.getItem('userRole')) === 'user' && <div className={`profile-list-item ${url.pathname.endsWith('ratings') ? 'selected' : undefined}`} >
                        <CircleIcon className={`${url.pathname.endsWith('ratings') ? 'point-icon-selected' : 'point-icon'}`} />
                        <li>
                            <NavLink to='/profile/ratings'>
                                ratings
                            </NavLink>
                        </li>
                    </div>}
                    {JSON.parse(localStorage.getItem('userRole')) === 'user' && <div className={`profile-list-item ${url.pathname.endsWith('favorites') ? 'selected' : undefined}`} >
                        <CircleIcon className={`${url.pathname.endsWith('favorites') ? 'point-icon-selected' : 'point-icon'}`} />
                        <li>
                            <NavLink to='/profile/favorites'>
                                favorites
                            </NavLink>
                        </li>
                    </div>
                    }
                    {JSON.parse(localStorage.getItem('userRole')) !== 'user' && <div className={`profile-list-item ${url.pathname.endsWith('users') ? 'selected' : undefined}`} >
                        <CircleIcon className={`${url.pathname.endsWith('users') ? 'point-icon-selected' : 'point-icon'}`} />
                        <li>
                            <NavLink to='/profile/users'>
                                users
                            </NavLink>
                        </li>
                    </div>}
                </ul>
            </div>
        </aside>
    )
}
