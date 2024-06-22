import React from 'react'
import './Forget.css'
import { Form, NavLink, useActionData, useNavigation } from 'react-router-dom'
import handleForget from '../../pages/ForgetPasswordPage'
import CircularProgress from '@mui/material/CircularProgress';

export default function Forget() {
    const action = useActionData();
    const navigation = useNavigation();
    const status = navigation.state === 'submitting';
    return (
        <div className="forget-password-container">
            <div className='forget-password'>
                <div className="forget-header">
                    <h2>forget password</h2>
                    <p>please enter an email to reset your password </p>
                </div>
                <Form method='post' action={handleForget}>
                    <p>email :</p>
                    <input type="email" name='email' required placeholder='Enter Your Email' />
                    <div className="forget-action-button">
                        <p className={action === 'submitted' ? 'show-message' : 'hide-message'}>email sent successfully!</p>
                        <div className='forget-actions'>
                            <NavLink to='..'>close</NavLink>
                            {!(action === 'submitted') && !status && <button>submit</button>}
                            {
                                status && <button className='forget-form-button' disabled> <CircularProgress color="inherit" size={20} />
                                </button>
                            }
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}
