import React from 'react'
import './LoadingScreen.css'
import { CircularProgress } from '@mui/material'

export default function LoadingScreen() {
    return (
        <div className='loading-screen'>
            <CircularProgress color='inherit' size={50} />
        </div>
    )
}
