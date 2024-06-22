import React from 'react'
import './About.css'

export default function About() {
    return (
        <section className='about'>
            <div className="about-us">
                <div className="about-us-content">
                    <h1>about us</h1>
                    <p>At Tech Track, our mission is to simplify the process of finding and comparing electronic products from various stores. We aim to provide a seamless and efficient shopping experience, saving you time and money.</p>
                </div>
            </div>
            <div className="our-mission">
                <h2>our mission</h2>
                <p>At Tech Track, our mission is to simplify the process of finding and comparing electronic products from various stores. We aim to provide a seamless and efficient shopping experience, saving you time and money.</p>
            </div>
            <div className="what-we-do">
                <h2>what we do</h2>
                <p>We offer a user-friendly platform with robust search and filter options to help you find the perfect product. Our intelligent features like price tracking and multi-store comparison allow you to make informed decisions without the hassle of visiting multiple websites.</p>
            </div>
            <div className="our-unique-features">
                <h2>our unique features</h2>
                <ul>
                    <li>Multi-Store Comparison: Compare prices across various online stores to find the best deals.</li>
                    <li>Chatbot Assistance: Get instant help and recommendations from our smart chatbot.</li>
                    <li>Specialized Filters: Use category-specific filters to narrow down your search effectively.</li>
                    <li>Informative Videos: Watch detailed videos comparing different product properties like processors and memories.</li>
                </ul>
            </div>
            <div className="why-choose-us">
                <h2>why choose us</h2>
                <p>Unlike other comparison websites, we combine all the best features in one place. Our platform not only provides comprehensive comparison tools but also introduces innovative features that enhance your shopping experience. We identified key competitors and market gaps to ensure that our website stands out in terms of functionality and user satisfaction.</p>
            </div>
            <div className="get-in-touch">
                <h2>get in touch</h2>
                <p>We love to hear from our users! Whether you have feedback, questions, or need assistance, feel free to reach out to us.</p>
            </div>
        </section>
    )
}
