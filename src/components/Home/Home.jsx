import React, { useEffect, useRef, useState } from 'react'
import './Home.css'
import Amazon from '../../asserts/amazon.png'
import TwoB from '../../asserts/2B.png'
import BTECH from '../../asserts/BTech.png'
import KimoStore from '../../asserts/Kimo.png'
import Raya from '../../asserts/Raya.png'
import Union from '../../asserts/Union.png'
import Noon from '../../asserts/Noon.png'
import Dream from '../../asserts/Dream_2000.png'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Productcard from '../../utils/Productcard'
import { NavLink, useNavigate, useNavigation } from 'react-router-dom'
import { handleSlider } from '../../utils/HandleSlider'
import LoadingScreen from '../../utils/loadingScreen'

const storesArray = [{ site: Amazon, index: 0 }, { site: TwoB, index: 1 }, { site: BTECH, index: 2 }, { site: KimoStore, index: 3 }, { site: Raya, index: 4 }, { site: Union, index: 5 }, { site: Noon, index: 6 }, { site: Dream, index: 7 }];
const storesArrayNames = ['amazon', '2b', 'BTECH', 'Kimo Store', 'Raya', 'union', 'Noon', 'dream2000'];

export default function Home() {

    const [slideIndex, setSlideIndex] = useState({ start: 0, end: 4 })
    const [topRatedProducts, setTopRatedProducts] = useState([])
    const inputRef = useRef();
    const navigate = useNavigate();
    const navigation = useNavigation();
    const state = navigation.state === 'loading';
    const storesRef = useRef();

    useEffect(() => {
        if (storesRef.current) {
            const resizeObserver = new ResizeObserver(entries => {
                for (let entry of entries) {
                    const { width } = entry.contentRect;
                    if (width > 982 && width <= 1190) {
                        setSlideIndex(prevState => { return { start: (prevState.start > 4 ? 4 : prevState.start), end: (prevState.start > 4 ? 7 : prevState.start + 3) } })
                    }
                    else if (width > 758 && width <= 982) {
                        setSlideIndex(prevState => { return { start: (prevState.start > 5 ? 5 : prevState.start), end: (prevState.start > 5 ? 7 : prevState.start + 2) } })
                    }
                    else if (width <= 758) {
                        setSlideIndex(prevState => { return { start: (prevState.start > 6 ? 6 : prevState.start), end: (prevState.start > 6 ? 7 : prevState.start + 1) } })
                    }
                    else {
                        setSlideIndex(prevState => { return { start: (prevState.start > 3 ? 3 : prevState.start), end: (prevState.start > 3 ? 7 : prevState.start + 4) } })
                    }
                }
            });
            resizeObserver.observe(storesRef.current);
        }
    }, [storesRef.current]);
    const handleSearch = function (e) {
        e.preventDefault()
        const searchWord = inputRef.current.value.trim();
        navigate(`/categories/${searchWord}?page=1`)
    }
    useEffect(() => {
        // console.log('useEffect home page entered');
        window.scrollTo(0, 0);
        async function getTopRatedProducts() {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            const response = await fetch("https://techtrack-be.vercel.app/api/v1/top-rated", requestOptions);
            const result = await response.json();
            setTopRatedProducts(result.data.topRatedProducts);
        }
        getTopRatedProducts();
    }, [])

    return (<>
        {state && <LoadingScreen />}
        <div className="home">
            <section className="search-container">
                <div className="overlay">
                    <div className="search-content">
                        <h1>find what you want</h1>
                        <form className="search" onSubmit={handleSearch}>
                            <input ref={inputRef} type="text" id="searchInput" placeholder='🔍 Search for a product' required />
                            <span className='search-button'><button>Search</button></span>
                        </form>
                    </div>
                </div>
            </section>
            <section className="products">
                <div className="product">
                    <NavLink to='categories/Mobiles?page=1' end>
                        <svg className='product-icon' id="Group_179" data-name="Group 179" xmlns="http://www.w3.org/2000/svg" width="78.254" height="117.132" viewBox="0 0 78.254 117.132">
                            <path id="Path_2313" data-name="Path 2313" d="M588.011,342.6H534.243A12.215,12.215,0,0,0,522,354.843v92.647a12.215,12.215,0,0,0,12.243,12.243h53.768a12.215,12.215,0,0,0,12.243-12.243V354.677A12.288,12.288,0,0,0,588.011,342.6Zm0,112.169H534.243a7.344,7.344,0,0,1-7.279-7.279H595.29A7.237,7.237,0,0,1,588.011,454.769Zm7.279-12.077H526.963V354.843a7.344,7.344,0,0,1,7.279-7.279h53.768a7.344,7.344,0,0,1,7.28,7.279v87.849Z" transform="translate(-522 -342.6)" fill="#1a1e29" />
                            <path id="Path_2314" data-name="Path 2314" d="M550.045,348.5h-4.963a2.482,2.482,0,1,0,0,4.963h4.963a2.482,2.482,0,1,0,0-4.963Z" transform="translate(-508.519 -338.739)" fill="#1a1e29" />
                            <path id="Path_2315" data-name="Path 2315" d="M550.045,348.5h-4.963a2.482,2.482,0,1,0,0,4.963h4.963a2.482,2.482,0,1,0,0-4.963Z" transform="translate(-508.519 -338.739)" fill="#1a1e29" />
                            <path id="Path_2316" data-name="Path 2316" d="M550.045,348.5h-4.963a2.482,2.482,0,1,0,0,4.963h4.963a2.482,2.482,0,1,0,0-4.963Z" transform="translate(-508.519 -338.739)" fill="#1a1e29" />
                        </svg>
                        <h2>Smart Phones</h2>
                    </NavLink>
                </div>
                <div className="product">
                    <NavLink to='categories/Laptops?page=1' end>
                        <svg className='product-icon' id="Group_178" data-name="Group 178" xmlns="http://www.w3.org/2000/svg" width="172.316" height="117.132" viewBox="0 0 172.316 117.132">
                            <path id="Path_2308" data-name="Path 2308" d="M673.955,366.658h-3.507V280.387A10.378,10.378,0,0,0,660.161,270.1H535.781a10.378,10.378,0,0,0-10.287,10.287v86.271h-3.507a10.287,10.287,0,1,0,0,20.574H673.721a10.378,10.378,0,0,0,10.287-10.287A10.031,10.031,0,0,0,673.955,366.658ZM532.508,280.621a3.6,3.6,0,0,1,3.507-3.507H660.161a3.6,3.6,0,0,1,3.507,3.507v86.271H532.508Zm141.447,99.831H522.221a3.507,3.507,0,1,1,0-7.014H673.955a3.507,3.507,0,1,1,0,7.014Z" transform="translate(-511.7 -270.1)" fill="#1a1e29" />
                            <path id="Path_2309" data-name="Path 2309" d="M556.121,283.014h-7.014a3.507,3.507,0,1,1,0-7.014h7.014a3.6,3.6,0,0,1,3.507,3.507A3.77,3.77,0,0,1,556.121,283.014Z" transform="translate(-466.343 -262.206)" fill="#1a1e29" />
                            <path id="Path_2310" data-name="Path 2310" d="M556.121,276h-7.014a3.507,3.507,0,1,0,0,7.014h7.014a3.6,3.6,0,0,0,3.507-3.507A3.77,3.77,0,0,0,556.121,276Z" transform="translate(-466.343 -262.206)" fill="#1a1e29" />
                            <path id="Path_2311" data-name="Path 2311" d="M556.121,276h-7.014a3.507,3.507,0,1,0,0,7.014h7.014a3.6,3.6,0,0,0,3.507-3.507A3.77,3.77,0,0,0,556.121,276Z" transform="translate(-466.343 -262.206)" fill="#1a1e29" />
                            <path id="Path_2312" data-name="Path 2312" d="M556.121,276h-7.014a3.507,3.507,0,1,0,0,7.014h7.014a3.6,3.6,0,0,0,3.507-3.507A3.77,3.77,0,0,0,556.121,276Z" transform="translate(-466.343 -262.206)" fill="#1a1e29" />
                        </svg>
                        <h2>Laptops</h2>
                    </NavLink>
                </div>
                <div className="product">
                    <NavLink to='categories/Accessories?page=1' end>
                        <svg className='product-icon' id="Group_180" data-name="Group 180" xmlns="http://www.w3.org/2000/svg" width="60.788" height="117.132" viewBox="0 0 60.788 117.132">
                            <path id="Path_2317" data-name="Path 2317" d="M577.13,461.571,573,453.317a2.288,2.288,0,0,0-2.063-1.27v-9.364a7.045,7.045,0,0,0-6.983-6.983H549.831a7.045,7.045,0,0,0-6.984,6.983v9.364a2.127,2.127,0,0,0-2.063,1.27l-4.127,8.253A11.665,11.665,0,0,0,526.5,473.157v42.218a11.786,11.786,0,0,0,10.158,11.586l4.127,8.253a2.288,2.288,0,0,0,2.063,1.27v9.364a7.046,7.046,0,0,0,6.984,6.983h14.126a7.046,7.046,0,0,0,6.983-6.983v-9.364a2.127,2.127,0,0,0,2.063-1.27l4.127-8.253a11.665,11.665,0,0,0,10.158-11.586V473.157A11.665,11.665,0,0,0,577.13,461.571Zm-29.68-18.887a2.441,2.441,0,0,1,2.381-2.381h14.126a2.441,2.441,0,0,1,2.381,2.381v9.364H547.609v-9.364Zm-3.174,13.967h25.236l2.381,4.761H542.054Zm21.9,89.039a2.441,2.441,0,0,1-2.381,2.381H549.673a2.441,2.441,0,0,1-2.381-2.381v-9.364H566.02v9.364Zm3.333-13.967H544.276l-2.381-4.761h29.839Zm13.173-16.506A7.045,7.045,0,0,1,575.7,522.2H538.245a7.045,7.045,0,0,1-6.984-6.983V473a7.045,7.045,0,0,1,6.984-6.983H575.7A7.045,7.045,0,0,1,582.685,473Z" transform="translate(-526.5 -435.7)" fill="#1a1e29" />
                            <path id="Path_2318" data-name="Path 2318" d="M552.945,457.8h-9.364a2.381,2.381,0,0,0,0,4.762h9.364a2.381,2.381,0,0,0,0-4.762Z" transform="translate(-517.869 -422.724)" fill="#1a1e29" />
                            <path id="Path_2319" data-name="Path 2319" d="M552.945,457.8h-9.364a2.381,2.381,0,0,0,0,4.762h9.364a2.381,2.381,0,0,0,0-4.762Z" transform="translate(-517.869 -422.724)" fill="#1a1e29" />
                            <path id="Path_2320" data-name="Path 2320" d="M552.945,457.8h-9.364a2.381,2.381,0,0,0,0,4.762h9.364a2.381,2.381,0,0,0,0-4.762Z" transform="translate(-517.869 -422.724)" fill="#1a1e29" />
                        </svg>
                        <h2>Accessories</h2>
                    </NavLink>
                </div>


            </section>
            <section className="stores" ref={storesRef}>
                <div className='stores-header'>
                    <h2>Our Stores</h2>
                    <div className="slider">
                        <button onClick={() => handleSlider('-', setSlideIndex)} disabled={slideIndex.start === 0}><NavigateBeforeIcon className={`${slideIndex.start === 0 ? 'slide-icon-disabled' : 'slide-icon'}`} /></button>
                        <button onClick={() => handleSlider('+', setSlideIndex)} disabled={slideIndex.end === 7}> <NavigateNextIcon className={`${slideIndex.end === 7 ? 'slide-icon-disabled' : 'slide-icon'}`} /></button>
                    </div>
                </div>
                <div className="stores-images">
                    {storesArray.filter((storeImage, imageKey) => imageKey >= slideIndex.start && imageKey <= slideIndex.end).map((storeImage) => <div className='single-store' key={storeImage.index}>
                        <NavLink to={`categories/${storesArrayNames[storeImage.index]}?page=1`}>
                            <img src={storeImage.site} alt="store" />
                        </NavLink>
                    </div>)}
                </div>
            </section >
            <Productcard label='Top rated products' products={topRatedProducts} />
        </div >
    </>
    )
}
