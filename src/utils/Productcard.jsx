import React from 'react'
import './Productcard.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { NavLink, useOutletContext } from 'react-router-dom';
import { addToFavorite, removeFromFavorite } from './HandleFavorite';
import { getToken } from './tokenFunctions';
import defaultLaptop from '../asserts/laptop.png'
import defaultMobile from '../asserts/mobile.png'
import defaultHeadset from '../asserts/headset.png'
import defaultEarphone from '../asserts/earphone.png'
import defaultEarbuds from '../asserts/earbuds.png'
import defaultMouse from '../asserts/mouse.png'
import defaultKeyboard from '../asserts/keyboard.png'
import defaultSmartwatch from '../asserts/smartwatch.png'

export default function Productcard({ label = '', products = [] }) {
    const token = getToken();
    const role = JSON.parse(localStorage.getItem('userRole'));

    const [profileFavorites = [], setProfileFavorites] = useOutletContext();
    async function remove(id) {
        removeFromFavorite(id, setProfileFavorites);
    }
    async function add(singleProduct) {
        addToFavorite(singleProduct, setProfileFavorites);
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

    const productsArray = label === 'favorite' ? profileFavorites : products;
    return (
        <>
            <section className={`${label === 'favorite' ? 'profile-favorite' : 'top-rated'}`}>
                {label !== 'favorite' && label !== 'home' ? <div className='top-rated-header'>
                    <h2>{label}</h2>
                </div> : null}

                {productsArray.length === 0 && <h3 className='fall-back-content'>no products found</h3>}
                {productsArray.length > 0 && <div className={`top-rated-products ${label === 'favorite' || label === 'home' ? 'added-to-favorite' : undefined}`}>
                    {productsArray.map((singleProduct, productIndex) => <div key={productIndex} className={` ${label === 'favorite' ? 'top-rated-product-favorite' : label === 'home' ? 'stores-products' : "top-rated-product"}`}>
                        <div className='top-rated-product-header'>
                            <h4>Top</h4>
                            {
                                token && role === 'user' && <>
                                    {(label === 'favorite' || (profileFavorites.findIndex((product) => product._id === singleProduct._id) !== -1)) && <span><FavoriteIcon className="favorite-product" onClick={() => remove(singleProduct._id)} /></span>}
                                    {(label !== 'favorite' && (profileFavorites.findIndex((product) => product._id === singleProduct._id) === -1)) && <span><FavoriteBorderIcon className="favorite-icon" onClick={() => add(singleProduct)} /></span>}
                                </>
                            }
                        </div>
                        <NavLink to={`/products/${singleProduct._id}`}>
                            <div className={` ${label === 'favorite' ? 'favorite-product-flex' : "top-rated-product-flex"}`}>
                                <div className={` ${label === 'favorite' ? 'favorite-image' : "top-rated-product-image"}`}>
                                    {
                                        singleProduct.image_src === undefined ? <img src={singleProduct.category === 'Mobiles' ? defaultMobile : singleProduct.category === 'Laptops' ? defaultLaptop : defaultHeadset} alt={singleProduct.name} />
                                            : <img src={singleProduct.image_src} onError={(event) => handleError(event, singleProduct)} alt={singleProduct.name} data-type={singleProduct.Accessories_type} />
                                    }
                                </div>
                                <h3>{singleProduct.name}</h3>
                                <div className="top-rated-product-footer">
                                    <h3 className='price'>{singleProduct.price} L.E</h3>
                                    <p>{singleProduct.site}</p>
                                </div>
                            </div>
                        </NavLink>
                    </div>)}
                </div>}
            </section>
        </>
    )
}
