import React from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import './Users.css'
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { getToken } from '../../utils/tokenFunctions';

export default function Users() {
    const data = useLoaderData();
    console.log(data);
    const navigate = useNavigate();
    async function deleteUser(id) {
        const token = JSON.parse(getToken());
        var requestOptions = {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            redirect: 'follow'
        };
        await fetch(`https://techtrack-be.vercel.app/api/v1/users/disableAdmin/${id}`, requestOptions);
        navigate('/profile/users');
    }
    async function addAdmin(id) {
        const token = JSON.parse(getToken());
        var requestOptions = {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            redirect: 'follow'
        };
        await fetch(`https://techtrack-be.vercel.app/api/v1/users/makeAdmin/${id}`, requestOptions);
        navigate('/profile/users');
    }
    return (
        <section className='users-section'>
            {data.map(user => <div className='single-user' key={user._id}>
                <h2>Name: {user.name}</h2>
                <h2>Email: {user.email}</h2>
                {user.role !== 'superAdmin' && <div className="admin-profile-actions">
                    {user.role === 'admin' && <div className='admin-icon-container'>
                        <button className='add-to-compare delete-icon' onClick={() => deleteUser(user._id)}><DeleteIcon fontSize='large' /></button>
                    </div>}
                    {user.role !== 'admin' && <div className='admin-icon-container'>
                        <button className='add-to-compare admin-icon' onClick={() => addAdmin(user._id)}><PersonAddAlt1Icon fontSize='large' /></button>
                    </div>}
                </div>}
            </div>)}
        </section>
    )
}
