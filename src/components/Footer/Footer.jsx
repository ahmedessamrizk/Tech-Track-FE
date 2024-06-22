import React from 'react'
import './Footer.css'

export default function Footer() {

    return <>
        <div className='Footer-container'>
            <div className="footer-half1">
                <div className="Footer-about">
                    <h2>About</h2>
                    <span className='aboutSpan'>About Us</span>
                    <span className='aboutSpan'>Blog</span>
                    <span className='aboutSpan'>Careers</span>
                    <span className='aboutSpan'>Jobs</span>
                    <span className='aboutSpan'>In press</span>
                    <span className='aboutSpan'>Gallery</span>
                </div>
                <div className="Footer-support">
                    <h2>Support</h2>
                    <span className='aboutSpan'>Contact Us</span>
                    <span className='aboutSpan'>Online Chat</span>
                    <span className='aboutSpan'>Whatsapp</span>
                    <span className='aboutSpan'>Telegram</span>
                    <span className='aboutSpan'>Ticketing</span>
                    <span className='aboutSpan'>Call center</span>
                </div>

            </div>
            <div className="footer-half2">
                <h2>Newsletter</h2>
                <p>Don't miss out on the exciting world of travel - subscribe now and embark on a journey of discovery with us .</p>

            </div>
        </div>
    </>

}
