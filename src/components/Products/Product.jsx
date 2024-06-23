import React, { useEffect, useRef, useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Rating from '@mui/material/Rating';
import './Product.css'
import { Link, NavLink, useNavigate, useNavigation, useOutletContext, useRouteLoaderData } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { removeFromFavorite, addToFavorite } from '../../utils/HandleFavorite';
import { getToken } from '../../utils/tokenFunctions';
import { handleSlider } from '../../utils/HandleSlider.js'
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import LoadingScreen from '../../utils/loadingScreen.jsx';
import DeleteIcon from '@mui/icons-material/Delete';
import defaultLaptop from '../../asserts/laptop.png'
import defaultMobile from '../../asserts/mobile.png'
import defaultHeadset from '../../asserts/headset.png'
import defaultEarphone from '../../asserts/earphone.png'
import defaultEarbuds from '../../asserts/earbuds.png'
import defaultMouse from '../../asserts/mouse.png'
import defaultKeyboard from '../../asserts/keyboard.png'
import defaultSmartwatch from '../../asserts/smartwatch.png'

export default function Product() {
    const [anchorEl, setAnchorEl] = useState(null);
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);

    const navigation = useNavigation();
    const state = navigation.state === 'loading';
    const url = new URL(window.location.href);

    const [slideIndex, setSlideIndex] = useState({ start: 0, end: 3 })
    const [slideRateIndex, setSlideRateIndex] = useState({ start: 0, end: 1 })
    const token = getToken();
    const role = JSON.parse(localStorage.getItem('userRole'));
    const [profileFavorites, setProfileFavorites] = useOutletContext();
    const { product } = useRouteLoaderData('product');



    const tempArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const [addedToRecommendation, setAddedToRecommendation] = useState(false);
    useEffect(() => {
        setAddedToRecommendation(false);
    }, [product._id]);
    function addToCompare(product) {
        localStorage.setItem('compareProducts', localStorage.getItem('compareProducts') === null ? JSON.stringify([product]) : JSON.stringify([...JSON.parse(localStorage.getItem('compareProducts')), product]))
        setAddedToRecommendation(prevState => !prevState)
    }

    function removeToCompare(product) {
        const compareProducts = JSON.parse(localStorage.getItem('compareProducts'));
        console.log(compareProducts);
        localStorage.setItem('compareProducts', JSON.stringify(compareProducts.filter(pro => pro._id !== product._id)))
        setAddedToRecommendation(prevState => !prevState)
    }

    async function remove(id) {
        removeFromFavorite(id, setProfileFavorites);
    }
    async function add(product) {
        addToFavorite(product, setProfileFavorites);
    }

    const navigate = useNavigate();
    async function deleteReview(id) {
        var requestOptions1 = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${JSON.parse(token)}`,
            },
            redirect: 'follow'
        };
        await fetch(`https://techtrack-be.vercel.app/api/v1/reviews/${id}`, requestOptions1);
        navigate(`/products/${product._id}`)
    }
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [product])

    const recommendationRef = useRef();
    useEffect(() => {
        if (recommendationRef.current) {
            const resizeObserver = new ResizeObserver(entries => {
                for (let entry of entries) {
                    const { width } = entry.contentRect;
                    if (width > 882 && width <= 1090) {
                        setSlideIndex(prevState => {
                            return { start: (prevState.start > 7 ? 7 : prevState.start), end: (prevState.start > 7 ? 9 : prevState.start + 2) }
                        })
                    }
                    else if (width > 658 && width <= 882) {
                        setSlideIndex(prevState => {
                            return { start: (prevState.start > 8 ? 8 : prevState.start), end: (prevState.start > 8 ? 9 : prevState.start + 1) }
                        })
                    }
                    else if (width <= 658) {
                        setSlideIndex(prevState => {
                            return { start: (prevState.start), end: (prevState.start) }
                        })
                    }
                    else {
                        setSlideIndex(prevState => {
                            return { start: (prevState.start > 6 ? 6 : prevState.start), end: (prevState.start > 6 ? 9 : prevState.start + 3) }
                        })
                    }
                }
            });
            resizeObserver.observe(recommendationRef.current);
        }
    }, []);

    const handleError = (event) => {
        let imageSrc;
        if (product.category === 'Laptops') {
            imageSrc = defaultLaptop
        }
        else if (product.category === 'Mobiles') {
            imageSrc = defaultMobile
        }
        else {
            if (event.target.dataset.type.includes('Headsets') || event.target.dataset.type.includes('Headset')) {
                imageSrc = defaultHeadset
            }
            else if (event.target.dataset.type.includes('Earphones') || event.target.dataset.type.includes('headphones') || event.target.dataset.type.includes('Earphone') || event.target.dataset.type.includes('Headphones') || event.target.dataset.type.includes('Headphone')) {
                imageSrc = defaultEarphone
            }
            else if (event.target.dataset.type.includes('earbuds') || event.target.dataset.type.includes('Earbuds')) {
                imageSrc = defaultEarbuds
            }
            else if (event.target.dataset.type.includes('Keyboard') || event.target.dataset.type.includes('keyboard')) {
                imageSrc = defaultKeyboard
            }
            else if (event.target.dataset.type.includes('Mouses') || event.target.dataset.type.includes('mouse') || event.target.dataset.type.includes('Mouse')) {
                imageSrc = defaultMouse
            }
            else if (event.target.dataset.type.includes('watches') || event.target.dataset.type.includes('watch') || event.target.dataset.type.includes('Watch')) {
                imageSrc = defaultSmartwatch
            }
            else {
                imageSrc = defaultHeadset
            }
        }
        event.target.src = imageSrc;
    };

    return (
        <>
            {state && !url.pathname.endsWith('rate') && <LoadingScreen />}
            <main className='product-container'>
                <div className="navigations">
                </div>
                <section className='single-product'>
                    <div className="product-image">
                        {product.image_src === undefined ? <img src={product.category === 'Mobiles' ? defaultMobile : product.category === 'Laptops' ? defaultLaptop : defaultHeadset} alt={product.name} />
                            : <img src={product.image_src} onError={handleError} alt={product.name} data-type={product.Accessories_type} />
                        }
                    </div>
                    <div className="product-info">
                        <div className="product-header">
                            <h1 className='product-name'>{product.name}</h1>
                            <h2 className='link'>product link : <a href={product.link_href} target='_blank' className='product-link' rel="noreferrer">click here</a></h2>
                            <div className="product-icons">
                                <Rating name="read-only" value={product.Rate_Avg} readOnly />
                                {token && role === 'user' && <>
                                    {(profileFavorites.findIndex(pro => pro._id === product._id) !== -1) && <span ><FavoriteIcon onClick={() => remove(product._id)} className="favorite-product" /></span>}
                                    {(profileFavorites.findIndex(pro => pro._id === product._id) === -1) && <span><FavoriteBorderIcon onClick={() => add(product)} className='favorite-icon' /></span>}
                                </>}
                            </div>
                        </div>
                        <div className="product-details">
                            <h2>Product Details</h2>
                            <div className='product-all-details'>
                                <ul>
                                    {product.site !== 'NONE' ? <li className='product-website'><span>Website:</span> {product.site}</li> : null}
                                    {(product.brand && product.brand !== 'NONE') ? <li><span>Brand:</span> {product.brand}</li> : null}
                                    {(product.model_name && product.model_name !== 'NONE') && product.model_name !== product.name ? <li><span>Model:</span> {product.model_name}</li> : null}
                                    {(product.processor && product.processor !== 'NONE') ? <li><span>Processor:</span> {product.processor}</li> : null}
                                    {(product.graphics_card && product.graphics_card !== 'NONE') ? <li><span>Graphics Card:</span> {product.graphics_card}</li> : null}
                                    {(product.internal_memory && product.internal_memory !== 'NONE') ? <li><span>Internal Memory:</span> {product.internal_memory}</li> : null}
                                    {(product.network && product.network !== 'NONE') ? <li><span>Network:</span> {product.network}</li> : null}
                                    {(product.ram && product.ram !== 'NONE') ? <li><span>Ram:</span> {product.ram}</li> : null}
                                    {(product.HDD && product.HDD !== 'NONE') ? <li><span>HDD:</span> {product.HDD}</li> : null}
                                    {(product.SSD && product.SSD !== 'NONE') ? <li><span>SSD:</span> {product.SSD}</li> : null}
                                    {(product.operating_system && product.operating_system !== 'NONE') ? <li><span>Operating System:</span> {product.operating_system}</li> : null}
                                    {(product.display_size && product.display_size !== 'NONE') ? <li><span>Display Size:</span> {product.display_size}</li> : null}
                                    {(product.SIM_count && product.SIM_count !== 'NONE') ? <li><span>SIM Count:</span> {product.SIM_count}</li> : null}
                                    {(product.battery && product.battery !== 'NONE') ? <li><span>Battery:</span> {product.battery}</li> : null}
                                    {(product.prim_cam && product.prim_cam !== 'NONE') ? <li><span>Primary Camera:</span> {product.prim_cam}</li> : null}
                                    {(product.second_cam && product.second_cam !== 'NONE') ? <li><span>Secondary Camera:</span> {product.second_cam}</li> : null}
                                    {(product.Accessories_type && product.Accessories_type !== 'NONE') ? <li><span>Type:</span> {product.Accessories_type}</li> : null}
                                    {(product.Accessories_features && product.Accessories_features !== 'NONE') ? <li ><div>
                                        <Typography
                                            aria-owns={open ? 'mouse-over-popover' : undefined}
                                            aria-haspopup="true"
                                            onMouseEnter={handlePopoverOpen}
                                            onMouseLeave={handlePopoverClose}
                                        >
                                            <div className='product-features'>
                                                <span>Features:</span> {product.Accessories_features}
                                            </div>
                                        </Typography>
                                        <Popover
                                            id="mouse-over-popover"
                                            sx={{
                                                pointerEvents: 'none',
                                            }}
                                            open={open}
                                            anchorEl={anchorEl}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'left',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                            onClose={handlePopoverClose}
                                            disableRestoreFocus
                                        >
                                            <Typography sx={{ p: 2, width: 600 }}>{product.Accessories_features}</Typography>
                                        </Popover></div></li> : null}
                                </ul>
                            </div>
                        </div>
                        <div className="product-price">
                            <h2 className='after-sale'>Price: <span>{product.price} L.E</span>.</h2>
                            <h2 className='before-sale'>{product.sale !== 0 && Math.ceil(product.price / (1 - (product.sale / 100)))}</h2>
                        </div>
                        <div className="actions">
                            <button className={`add-product ${addedToRecommendation && 'added'}`} onClick={() => { addedToRecommendation ? removeToCompare(product) : addToCompare(product) }}>{addedToRecommendation ? 'Remove from compare' : 'Add to compare'}</button>
                            {token && role === 'user' && <Link to={'rate'} className='rate-product'>Rate</Link>}
                        </div>
                        <div className="technical-support">
                            <p>
                                for technical details : <Link to='/technical'>technical page</Link>
                            </p>
                        </div>
                    </div>
                </section>
                <section className='product-ratings'>
                    <div className='stores-header'>
                        <h2>Ratings</h2>
                        <div className="slider">
                            <button onClick={() => handleSlider('-', setSlideRateIndex)} disabled={slideRateIndex.start === 0}><NavigateBeforeIcon className={`${slideRateIndex.start === 0 ? 'slide-icon-disabled' : 'slide-icon'}`} /></button>
                            <button onClick={() => handleSlider('+', setSlideRateIndex)} disabled={slideRateIndex.end === (product.reviews.length - 1) || product.reviews.length <= 2}> <NavigateNextIcon className={`${(slideRateIndex.end === (product.reviews.length - 1) || product.reviews.length <= 2) ? 'slide-icon-disabled' : 'slide-icon'}`} /></button>
                        </div>
                    </div>
                    <div className='rating-content'>
                        {product.reviews.length === 0 && <p>No ratings available for this product</p>}
                        {product.reviews.filter((storeImage, imageKey) => imageKey >= slideRateIndex.start && imageKey <= slideRateIndex.end).map((rating, ratingKey) => <div className='single-rating-item' key={ratingKey}>
                            <div className="rating-header-date">
                                <h3><span>Rate By:</span> {rating.user && rating.user.name}</h3>
                                <h3 className='date'>{new Date(rating.createdAt).toDateString()}</h3>
                            </div>
                            <div className="product-icon-rate">
                                <h3><span>Rate:</span> </h3>
                                <Rating name="read-only" value={rating.rating} readOnly className='rate-stars' />
                            </div>
                            <div className="product-icon-comment-delete">
                                <h3><span>Comment:</span> {rating.review}</h3>
                                {JSON.parse(localStorage.getItem('userRole')) === 'admin' && <div className="admin-actions">
                                    <button className='add-to-compare delete-icon' onClick={() => deleteReview(rating._id)}><DeleteIcon fontSize='large' /></button>
                                </div>}
                            </div>
                        </div>)}
                    </div>
                </section>
                <section className="recommended-for-you">
                    <div className='stores-header'>
                        <h2>Recommended For You</h2>
                        <div className="slider">
                            <button onClick={() => handleSlider('-', setSlideIndex)} disabled={slideIndex.start === 0}><NavigateBeforeIcon className={`${slideIndex.start === 0 ? 'slide-icon-disabled' : 'slide-icon'}`} /></button>
                            <button onClick={() => handleSlider('+', setSlideIndex)} disabled={slideIndex.end === 9}> <NavigateNextIcon className={`${slideIndex.end === 9 ? 'slide-icon-disabled' : 'slide-icon'}`} /></button>
                        </div>
                    </div>
                    <div className="recommended-products" ref={recommendationRef}>
                        {tempArr.filter((storeImage, imageKey) => imageKey >= slideIndex.start && imageKey <= slideIndex.end).map((indexFromArray, imageKey) => {
                            return <div key={product.recommendations[0][`Recommendation_${indexFromArray}`]._id} className="single-recommendation">
                                <div className='recommended-products-header'>
                                    <h4>Similar</h4>
                                    {
                                        token && role === 'user' && <>
                                            {(profileFavorites.findIndex((favProduct) => favProduct._id === product.recommendations[0][`Recommendation_${indexFromArray}`]._id) !== -1) && <span><FavoriteIcon className="favorite-product" onClick={() => remove(product.recommendations[0][`Recommendation_${indexFromArray}`]._id)} /></span>}
                                            {(profileFavorites.findIndex((favProduct) => favProduct._id === product.recommendations[0][`Recommendation_${indexFromArray}`]._id) === -1) && <span><FavoriteBorderIcon className="favorite-icon" onClick={() => add(product.recommendations[0][`Recommendation_${indexFromArray}`])} /></span>}
                                        </>
                                    }
                                </div>
                                <NavLink to={`/products/${product.recommendations[0][`Recommendation_${indexFromArray}`]._id}`}>
                                    <div className="recommended-products-flex">
                                        <div className='recommended-product-image'>
                                            {product.recommendations[0][`Recommendation_${indexFromArray}`].image_src === undefined ? <img src={product.recommendations[0][`Recommendation_${indexFromArray}`].category === 'Mobiles' ? defaultMobile : product.recommendations[0][`Recommendation_${indexFromArray}`].category === 'Laptops' ? defaultLaptop : defaultHeadset} alt={product.recommendations[0][`Recommendation_${indexFromArray}`].name} />
                                                : <img src={product.recommendations[0][`Recommendation_${indexFromArray}`].image_src} onError={handleError} alt={product.recommendations[0][`Recommendation_${indexFromArray}`].name} data-type={product.recommendations[0][`Recommendation_${indexFromArray}`].Accessories_type} />
                                            }
                                        </div>
                                        <h3>{product.recommendations[0][`Recommendation_${indexFromArray}`].name}</h3>
                                        <div className="recommended-product-footer">
                                            <h3 className='price'>{product.recommendations[0][`Recommendation_${indexFromArray}`].price}$</h3>
                                            <p>{product.recommendations[0][`Recommendation_${indexFromArray}`].site}</p>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        })}
                    </div>
                </section>

            </main>
        </>
    )
}
