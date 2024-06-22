import React, { useEffect, useState } from 'react'
import './Login.css';
import { Form, NavLink, Outlet, useActionData, useNavigate, useNavigation, useOutletContext } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import loginImage from '../../asserts/pexels-canvy-mockups-56805-205316.png'
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Login() {

    const navigation = useNavigation();
    const navigate = useNavigate();
    const isSubmitting = navigation.state === 'submitting';
    const url = new URL(window.location.href);
    const loginPage = url.pathname.endsWith('login');
    const [toggle, setToggle] = useState(false);
    const action = useActionData();
    function togglePasswordVisibility() {
        var passwordInput = document.getElementById("password");

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            setToggle(true);
        } else {
            passwordInput.type = "password";
            setToggle(false);
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const [setProfileFavorites] = useOutletContext();
    if (action && action.success === true) {
        const userFavorites = JSON.parse(localStorage.getItem('userFavorites'));
        setProfileFavorites(userFavorites)
        navigate('/');
    }
    return (
        <>
            <section className="authentication-container">
                <div className='authentication-side'>
                    <header>
                        <h1 className='login'>Welcome back</h1>
                        <p className='login-p'> Welcome back please enter your details</p>
                    </header>
                    <div className="authentication-details">
                        <Form method='post' className='authentication-form'>
                            <div className="single-input">
                                <p>Email</p>
                                <div className='input-icon'>
                                    <input type='email' name='email' placeholder='Email' required />
                                    <span><EmailIcon /></span>
                                </div>
                            </div>
                            <div className="single-input">
                                <p>Password</p>
                                <div className='input-icon'>
                                    <input type='password' id='password' name='password' placeholder='Password' required />
                                    <span onClick={togglePasswordVisibility} className='show-password' id='toggle'>{toggle ? <VisibilityOffIcon /> : <VisibilityIcon />}</span>
                                </div>
                            </div>
                            <div className="forget">
                                <NavLink to='forget' > forget password </NavLink>
                            </div>
                            {
                                action && action.error && <p className="error">{action.error}</p>
                            }
                            {!isSubmitting && loginPage &&
                                <div className='authentication-action'>
                                    <button className='authentication-action-login'> sign in </button>
                                </div>
                            }
                            {
                                isSubmitting && loginPage && <div className='authentication-action'>
                                    <button className='authentication-action-login' disabled> <CircularProgress color="inherit" size={20} /></button>
                                </div>
                            }
                        </Form>
                    </div>
                </div>
                <div className="authentication-image">
                    <img src={loginImage} alt="" />
                </div>
            </section >
            <Outlet />
        </>
    )
}
