import React, { useEffect, useState } from 'react'
import './SignUp.css'
import { Form, NavLink, Outlet, useActionData, useNavigation } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import loginImage from '../../asserts/pexels-canvy-mockups-56805-205316.png'
import CircularProgress from '@mui/material/CircularProgress';

export default function SignUp() {
    const action = useActionData();
    const navigation = useNavigation();
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

    const searchString = 'User validation failed: ';
    let extractedMessage;
    if (action && action.error) {
        extractedMessage = action.error.includes(searchString)
            ? action.error.split(searchString)[1]
            : action.error;
    }

    return (
        <>
            <section className="authentication-container signUp-responsive">
                <div className='authentication-side'>
                    <header>
                        <h1 className='signUp'>Create new account</h1>
                        <p className='have-account'>Already have an account ? <NavLink to='/login'>Log in</NavLink></p>
                    </header>
                    <div className="authentication-details">
                        <Form method='post' className='authentication-form'>
                            <div className="single-input">
                                <p>Email</p>
                                <div className='input-icon'>
                                    <input type='email' name='email' placeholder='Email' className='name-input-email' />
                                    <span><EmailIcon /></span>
                                </div>
                            </div>
                            <div className="name-input-container">
                                <div className="single-input name">
                                    <p>Password</p>
                                    <div className='input-icon '>
                                        <input type='password' name='password' id='password' placeholder='Password' required min={5} className='name-input' />
                                        <span className='signUp-password show-password' onClick={() => togglePasswordVisibility('password')}>{toggle.password ? <VisibilityOffIcon /> : <VisibilityIcon />}</span>
                                    </div>
                                </div>
                                <div className="single-input name">
                                    <p>Confirm Password</p>
                                    <div className='input-icon '>
                                        <input type='password' name='passwordConfirm' id='passwordConfirm' placeholder='Password confirmation' required min={5} className='name-input' />
                                        <span className='signUp-password show-password' onClick={() => togglePasswordVisibility('passwordConfirm')}>{toggle.passwordConfirm ? <VisibilityOffIcon /> : <VisibilityIcon />}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="name-input-container">
                                <div className="single-input name">
                                    <p>first name</p>
                                    <div className='input-icon '>
                                        <input type='text' name='firstName' placeholder='First name' required className='name-input' />
                                    </div>
                                </div>
                                <div className="single-input name">
                                    <p>last name</p>
                                    <div className='input-icon '>
                                        <input type='text' name='lastName' placeholder='Last name' required className='name-input' />
                                    </div>
                                </div>
                            </div>
                            <div className="name-input-container">
                                <div className="single-input name">
                                    <p>gender</p>
                                    <div className='input-icon '>
                                        <input type='text' name='gender' placeholder='Gender' required className='name-input' />
                                    </div>
                                </div>
                                <div className="single-input name">
                                    <p>phone</p>
                                    <div className='input-icon '>
                                        <input type='tel' name='phone' placeholder='Contains of 11 number' required className='name-input' />
                                    </div>
                                </div>
                            </div>
                            {
                                action && action.error && <p className="error">{extractedMessage}</p>
                            }

                            {!isSubmitting &&
                                <div className='authentication-action'>
                                    <button className='authentication-action-login'> sign up </button>
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
            <Outlet />
        </>
    )
}
