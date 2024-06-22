import React from 'react'
import './Ratings.css'
import Rating from '@mui/material/Rating';
import { Link, Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import { getToken } from '../../utils/tokenFunctions';
import defaultLaptop from '../../asserts/laptop.png'
import defaultMobile from '../../asserts/mobile.png'
import defaultHeadset from '../../asserts/headset.png'
import defaultEarphone from '../../asserts/earphone.png'
import defaultEarbuds from '../../asserts/earbuds.png'
import defaultMouse from '../../asserts/mouse.png'
import defaultKeyboard from '../../asserts/keyboard.png'
import defaultSmartwatch from '../../asserts/smartwatch.png'

export default function Ratings() {
    const data = useLoaderData();
    const navigate = useNavigate();
    async function deleteReview(id) {
        const token = getToken();
        var requestOptions1 = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${JSON.parse(token)}`,
            },
            redirect: 'follow'
        };
        await fetch(`https://techtrack-be.vercel.app/api/v1/reviews/${id}`, requestOptions1);
        navigate(`/profile/ratings`)
    }
    const handleError = (event, product) => {
        let imageSrc;
        if (product.category === 'Laptops') {
            imageSrc = defaultLaptop
        }
        else if (product.category === 'Mobiles') {
            imageSrc = defaultMobile
        }
        else {
            if (event.target.dataset.type?.includes('Headsets') || event.target.dataset.type?.includes('Headset')) {
                imageSrc = defaultHeadset
            }
            else if (event.target.dataset.type?.includes('Earphones') || event.target.dataset.type?.includes('headphones') || event.target.dataset.type.includes('Earphone') || event.target.dataset.type.includes('Headphones') || event.target.dataset.type.includes('Headphone')) {
                imageSrc = defaultEarphone
            }
            else if (event.target.dataset.type?.includes('earbuds') || event.target.dataset.type?.includes('Earbuds')) {
                imageSrc = defaultEarbuds
            }
            else if (event.target.dataset.type?.includes('Keyboard') || event.target.dataset.type?.includes('keyboard')) {
                imageSrc = defaultKeyboard
            }
            else if (event.target.dataset.type?.includes('Mouses') || event.target.dataset.type?.includes('mouse') || event.target.dataset.type?.includes('Mouse')) {
                imageSrc = defaultMouse
            }
            else if (event.target.dataset.type?.includes('watches') || event.target.dataset.type?.includes('watch') || event.target.dataset.type?.includes('Watch')) {
                imageSrc = defaultSmartwatch
            }
            else {
                imageSrc = defaultHeadset
            }
        }
        event.target.src = imageSrc;
    };
    return (<>
        <div className='ratings'>
            {data.length === 0 && <h3 className='fall-back-content'>no rates found</h3>}
            {data.map((rating) => <div key={rating._id} className='single-rating'>
                <div className="rating-title">
                    <div>
                        {
                            rating.product.image_src === undefined ? <img src={rating.product.category === 'Mobiles' ? defaultMobile : rating.product.category === 'Laptops' ? defaultLaptop : defaultHeadset} alt={rating.product.name} />
                                : <img src={rating.product.image_src} onError={(event) => handleError(event, rating.product)} alt={rating.product.name} data-type={rating.product.Accessories_type} />
                        }
                        {/* <img src={rating.product.image_src} alt="" /> */}
                    </div>
                    <h2>{rating.product.name}</h2>
                </div>
                <div className='rating-details'>
                    <span className='rating-details-stars'><Rating name="read-only" value={rating.rating} readOnly /></span>
                    <h2>{rating.product.name}</h2>
                    <p>your review: <span>{rating.review}</span></p>
                </div>
                <div className="edit-delete-buttons">
                    <button><Link to={`${rating._id}/edit?rate=${rating.rating}&comment=${rating.review}`} className='edit-button'>edit</Link></button>
                    <button className='delete-button' onClick={() => deleteReview(rating._id)}>delete</button>
                </div>
            </div>)}
        </div>
        <Outlet />
    </>
    )
}
