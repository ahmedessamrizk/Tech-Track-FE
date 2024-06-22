import React, { useEffect, useState } from 'react'
import './Login.css';
import { Form, useActionData, useNavigate, useNavigation, useOutletContext } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import loginImage from '../../asserts/pexels-canvy-mockups-56805-205316.png'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Reset() {

    const navigation = useNavigation();
    const navigate = useNavigate();
    const isSubmitting = navigation.state === 'submitting';
    const [toggle, setToggle] = useState({
        password: false,
        passwordConfirm: false
    });

    function togglePasswordVisibility(name) {
        var passwordInput = document.getElementById(name);
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            setToggle(prevToggle => ({
                ...prevToggle,
                [name]: !prevToggle[name],
            }));
        } else {
            passwordInput.type = "password";
            setToggle(prevToggle => ({
                ...prevToggle,
                [name]: !prevToggle[name],
            }));
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const action = useActionData();
    const searchString = 'User validation failed: ';
    let extractedMessage;
    if (action && action.error) {
        extractedMessage = action.error.includes(searchString)
            ? action.error.split(searchString)[1]
            : action.error;
    }

    const [profileFavorites, setProfileFavorites] = useOutletContext();
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
                        <h1 className='login'>Reset Password</h1>
                        <p className='login-p'>fill the fields to reset your password</p>
                    </header>
                    <div className="authentication-details">
                        <Form method='post' className='authentication-form'>
                            <div className="single-input">
                                <p>New password</p>
                                <div className='input-icon'>
                                    <input type='password' id='password' name='password' placeholder='enter new password' required />
                                    <span onClick={() => togglePasswordVisibility('password')} className='show-password' id='toggle'>{toggle.password ? <VisibilityOffIcon /> : <VisibilityIcon />}</span>
                                </div>
                            </div>
                            <div className="single-input">
                                <p>Confirm new password</p>
                                <div className='input-icon'>
                                    <input type='password' id='passwordConfirm' name='passwordConfirm' placeholder='confirm new password' required />
                                    <span onClick={() => togglePasswordVisibility('passwordConfirm')} className='show-password' id='toggle'>{toggle.passwordConfirm ? <VisibilityOffIcon /> : <VisibilityIcon />}</span>
                                </div>
                            </div>
                            {
                                action && action.error && <p className="error">{extractedMessage}</p>
                            }
                            {!isSubmitting &&
                                <div className='authentication-action'>
                                    <button className='authentication-action-login'> reset </button>
                                </div>
                            }
                            {
                                isSubmitting && <div className='authentication-action'>
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
        </>
    )
}
