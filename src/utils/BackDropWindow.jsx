import React, { useState } from 'react'
import './BackDropWindow.css'
import { Form, Link, useActionData, useNavigation, useSearchParams } from 'react-router-dom'
import { CircularProgress } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function BackDropWindow() {
    const action = useActionData();
    const navigation = useNavigation();
    const url = new URL(window.location.href);
    const [searchParams] = useSearchParams(window.location.href);
    const status = navigation.state === 'submitting';
    const [toggle, setToggle] = useState({
        oldPassword: false,
        newPassword: false,
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
    const searchString = 'Review validation failed: ';
    const searchStringRate = 'rating: Path `rating` ';
    const searchStringPassword = 'User validation failed: ';
    let extractedMessage;
    if (action && action.error) {
        extractedMessage = action.error.includes(searchString)
            ? action.error.split(searchString)[1]
            : action.error;
        extractedMessage = extractedMessage.includes(searchStringRate)
            ? extractedMessage.split(searchStringRate)[1]
            : extractedMessage;
        extractedMessage = action.error.includes(searchStringPassword)
            ? action.error.split(searchStringPassword)[1]
            : action.error;
    }
    return (
        <div className="modal">
            {url.pathname.includes('changePassword') && <Form method='POST'>
                <div className="backDrop-header">
                    <h2>change password</h2>
                    <p>please enter the new password </p>
                </div>
                <div className="field">
                    <label>old password :</label>
                    <div className='input-backDrop-icon'>
                        <input type="password" min={8} id='oldPassword' name='oldPassword' required placeholder='enter old password' />
                        <span className='signUp-password show-password' onClick={() => togglePasswordVisibility('oldPassword')}>{toggle.oldPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}</span>
                    </div>

                </div>
                <div className="field">
                    <label>new password :</label>
                    <div className='input-backDrop-icon'>
                        <input type="password" min={8} id='newPassword' name='newPassword' required placeholder='enter new password' />
                        <span className='signUp-password show-password' onClick={() => togglePasswordVisibility('newPassword')}>{toggle.newPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}</span>
                    </div>

                </div>
                <div className="field">
                    <label>confirm new password :</label>
                    <div className='input-backDrop-icon'>
                        <input type="password" min={8} id='passwordConfirm' name='confirmPassword' required placeholder='enter confirm password' />
                        <span className='signUp-password show-password' onClick={() => togglePasswordVisibility('passwordConfirm')}>{toggle.passwordConfirm ? <VisibilityOffIcon /> : <VisibilityIcon />}</span>
                    </div>

                </div>
                <div className="error-buttons">
                    <div>
                        {action && action.error && <h2 className='validationError'>{extractedMessage}.</h2>}
                    </div>
                    <div className="buttons ">
                        <button type='close '><Link to='..' className='close-backDrop change'>close</Link></button>
                        <button className='submit change' disabled={status}>{status ? <CircularProgress color="inherit" size={20} /> : 'submit'}</button>
                    </div>
                </div>
            </Form>}
            {!url.pathname.includes('changePassword') && <Form method='POST'>
                <div className="backDrop-header">
                    <h2>{url.pathname.includes('edit') ? 'edit your rating' : 'rate product'}</h2>
                    <p>please fill rating and review</p>
                </div>
                <div className="field">
                    <label>rating :</label>
                    <input type="number" min={1} max={5} name='rate' defaultValue={url.pathname.includes('edit') ? searchParams.get('rate') : null} placeholder={url.pathname.includes('edit') ? null : 'rate from 1 to 5'} />
                </div>
                <div className="field">
                    <label>comment :</label>
                    <textarea name='comment' defaultValue={url.pathname.includes('edit') ? searchParams.get('comment') : null} />
                </div>
                <div className="error-buttons">
                    <div>
                        {action && action.error && <h2 className='validationError'>{extractedMessage}.</h2>}
                    </div>
                    <div className="buttons ">
                        <button type='close '><Link to='..' className='close-backDrop change'>close</Link></button>
                        <button className='submit change' disabled={status}>{status ? <CircularProgress color="inherit" size={20} /> : 'submit'}</button>
                    </div>
                </div>

            </Form>}

        </div>
    )
};

