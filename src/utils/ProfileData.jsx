import React from 'react'
import './ProfileData.css'

export default function ProfileData({ label, data }) {
    return (
        <div className={label === 'email' ? 'single-data-field email-profile' : 'single-data-field'}>
            <p>{label}</p>
            <h2>{data}</h2>
        </div>
    )
}
