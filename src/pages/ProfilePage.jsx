import React from 'react'
import Profile from '../components/Profile/Profile'
import { getToken } from '../utils/tokenFunctions';
import { redirect } from 'react-router-dom';

export function ProfilePage() {
    return (
        <>
            <Profile />
        </>
    )
}

export default async function profileLoader() {
    // console.log('profile Details Loader entered');

    const token = JSON.parse(getToken());
    var requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        redirect: 'follow'
    };
    const response = await fetch("https://techtrack-be.vercel.app/api/v1/users/me", requestOptions);
    const result = await response.json();
    return result.data.data
}
export async function getUserRatings() {
    // console.log('get User Ratings Loader entered');

    const token = JSON.parse(getToken());
    var requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        redirect: 'follow'
    };
    const response = await fetch("https://techtrack-be.vercel.app/api/v1/Myreviews", requestOptions);
    const result = await response.json();
    return result.data.data
}
export async function getUsers() {
    // console.log('get Users Loader entered');

    const token = JSON.parse(getToken());
    var requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        redirect: 'follow'
    };
    const response = await fetch("https://techtrack-be.vercel.app/api/v1/users", requestOptions);
    const result = await response.json();
    return result.data.users
}

export async function updateAction({ request }) {
    // console.log('update user Action entered');

    const token = JSON.parse(getToken());
    const data = await request.formData();

    if (data.get('phone').length !== 11) {
        return { error: "phone number must be 11 digits" }
    }

    const raw = {
        name: `${data.get('firstName') + ' ' + data.get('lastName')}`.trim(),
        email: data.get('email'),
        gender: data.get('gender'),
        phone: data.get('phone').slice(-10),
    }
    var requestOptions = {
        method: 'PATCH',
        body: JSON.stringify(raw),
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        redirect: 'follow'
    };
    const regex = /^1\d{9}$/;
    if (!regex.test(raw.phone)) {
        return { error: "wrong phone number" }
    }
    const response = await fetch("https://techtrack-be.vercel.app/api/v1/users/updateMe", requestOptions);
    const result = await response.json();
    if (result.status === 'error') {
        if (result.error.code === 11000) {
            if (result.error.keyPattern.phone === 1) {
                return { error: 'phone already exists' }
            } else if (result.error.keyPattern.email === 1) {
                return { error: 'email already exists' }
            } else {
                return { error: result.message }
            }
        }
        else {
            return { error: result.message }
        }
    }
    return redirect('/profile/content')
}

export async function changeAction({ request }) {
    // console.log('change user Action entered');

    const token = JSON.parse(getToken());
    const data = await request.formData();
    const raw = {
        passwordCurrent: data.get('oldPassword'),
        password: data.get('newPassword'),
        passwordConfirm: data.get('confirmPassword')
    }
    var requestOptions = {
        method: 'PATCH',
        body: JSON.stringify(raw),
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        redirect: 'follow'
    };
    if (raw.password !== raw.passwordConfirm) {
        return { error: "passwords doesn't match" }
    }
    const response = await fetch("https://techtrack-be.vercel.app/api/v1/users/changeMyPassword", requestOptions);
    const result = await response.json();
    if (result.status === 'error') {
        return { error: result.message }
    }
    localStorage.setItem('userToken', JSON.stringify(result.token))
    return redirect('..')
}