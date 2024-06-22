import React from 'react'
import './ProfileContent.css'
import { Form, useActionData, useNavigation, useRouteLoaderData } from 'react-router-dom'
import { updateAction } from '../../pages/ProfilePage';
import CircularProgress from '@mui/material/CircularProgress';
import './ProfileContent.css'

export default function UpdatePRofile() {
    const navigation = useNavigation();
    const status = navigation.state === 'submitting';
    const data = useRouteLoaderData('profile');
    const action = useActionData();

    const searchString = 'Validation failed: ';
    let extractedMessage;
    if (action && action.error) {
        extractedMessage = action.error.includes(searchString)
            ? action.error.split(searchString)[1]
            : action.error;
    }
    return (
        <div className='profile-content'>
            <h1>update your data</h1>
            <Form method='POST' action={updateAction} className="profile-content-fields">
                <div className="single-data-field">
                    <p >first name</p>
                    <input type="text" name='firstName' required defaultValue={data.name.split(' ')[0]} />
                </div>
                <div className="single-data-field">
                    <p >last name</p>
                    <input type="text" name='lastName' required defaultValue={data.name.split(' ')[1]} />
                </div>
                <div className="single-data-field">
                    <p >gender</p>
                    <input type="text" name='gender' required defaultValue={data.Gender} />
                </div>
                <div className="single-data-field">
                    <p >phone</p>
                    <input type="text" name='phone' required defaultValue={0 + data.phone} />
                </div>
                <div className="single-data-field email-update">
                    <p >email</p>
                    <input type="email" name='email' required defaultValue={data.email} />
                </div>

                <div className="error-buttons-update">
                    <div className='validationErrorContainer'>
                        {
                            action && action.error && <h2 className='validationError'>{extractedMessage}</h2>
                        }                    </div>
                    <div className="buttons ">
                        <button className='submit change' disabled={status}>{status ? <CircularProgress color="inherit" size={20} /> : 'submit'}</button>
                    </div>
                </div>
            </Form>
        </div>
    )
}
