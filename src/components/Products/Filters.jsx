import React, { useEffect, useRef, useState } from 'react'
import { Form, NavLink } from 'react-router-dom'
import './Filters.css'
import TuneIcon from '@mui/icons-material/Tune';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Rating from '@mui/material/Rating';
import CloseIcon from '@mui/icons-material/Close';
import { getToken } from '../../utils/tokenFunctions';
import defaultLaptop from '../../asserts/laptop.png'
import defaultMobile from '../../asserts/mobile.png'
import defaultHeadset from '../../asserts/headset.png'
import defaultEarphone from '../../asserts/earphone.png'
import defaultEarbuds from '../../asserts/earbuds.png'
import defaultMouse from '../../asserts/mouse.png'
import defaultKeyboard from '../../asserts/keyboard.png'
import defaultSmartwatch from '../../asserts/smartwatch.png'

export default function Filters() {
    const url = new URL(window.location.href);
    const filtersRef = useRef();
    const recommendationRef = useRef();
    const singleRecommendationRef = useRef();
    const token = getToken();

    const [maxRec, setMaxRec] = useState(3);
    const [recommended, setRecommended] = useState([]);
    let filteredRecommended = [];
    if (maxRec === 3) {
        if (recommended.length === 1) {
            filteredRecommended = [recommended[0]]
        } else if (recommended.length === 2) {
            filteredRecommended = [recommended[0], recommended[1]]
        } else if (recommended.length >= 3) {
            filteredRecommended = [recommended[0], recommended[1], recommended[2]]
        }
    } else if (maxRec === 2) {
        if (recommended.length === 1) {
            filteredRecommended = [recommended[0]]
        } else if (recommended.length >= 2) {
            filteredRecommended = [recommended[0], recommended[1]]
        }
    } else {
        filteredRecommended = [recommended[0]]
    }
    const stickyRecommendation = function (entries, observer) {
        const [entry] = entries;
        if (entry.isIntersecting) {
            entry.target.classList.remove('hide');
            entry.target.classList.add('show');
        }
    }
    const stickyFilter = function (entries, observer) {
        const [entry] = entries;
        if (entry.isIntersecting && recommendationRef.current.classList.contains('show')) {
            recommendationRef.current.classList.remove('show');
            recommendationRef.current.classList.add('hide');
        }
    }
    useEffect(() => {
        if (recommendationRef.current) {
            const recommendationObserver = new IntersectionObserver(stickyRecommendation, {
                root: null,
                threshold: 1
            });
            recommendationObserver.observe(recommendationRef.current);

            const filterObserver = new IntersectionObserver(stickyFilter, {
                root: null,
                threshold: 0.1
            });
            filterObserver.observe(filtersRef.current);
            if (recommended.length !== 0) {
                const resizeObserver = new ResizeObserver(entries => {
                    for (let entry of entries) {
                        const { width, height } = entry.contentRect;
                        if (width > 170 && width <= 226) {
                            setMaxRec(2)
                        }
                        else if (width <= 170) {
                            setMaxRec(2)
                        }
                        else {
                            setMaxRec(3)
                        }
                        if (height <= 600 && width <= 226) {
                            setMaxRec(1)
                        } else if (height > 433 && height <= 633) {
                            setMaxRec(2)
                        }
                    }
                });
                resizeObserver.observe(recommendationRef.current);
            }
        }
    }, [recommended]);
    useEffect(() => {
        async function getRecommendations() {
            const token = getToken();
            var requestOptions1 = {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${JSON.parse(token)}`,
                },
                redirect: 'follow'
            };
            const response1 = await fetch(`https://techtrack-be.vercel.app/api/v1/user-rec`, requestOptions1);
            const result1 = await response1.json();
            setRecommended(result1.products);
        }
        if (token !== null) {
            getRecommendations();
        }
    }, [token])
    function handleDeleteRecommendation(id) {
        setRecommended(recommended.filter(rec => rec._id !== id));
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

    return (
        <aside className='filters'>
            <header className='filters-header'>
                <span><TuneIcon /></span>
                <h1>filters</h1>
            </header>
            <Form method='POST' ref={filtersRef}>
                <div className="filters-submit">
                    <h2>click go to apply selected filters</h2>
                    <button type='submit'>go</button>
                </div>
                <div className="filter">
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <h2>price</h2>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="input-price">
                                <div className="start-price">
                                    <label >min price</label>
                                    <div className="input-with-unit">
                                        <input type="number" name='minPrice' min={0} />
                                        <span className='input-unit'>L.E</span>
                                    </div>
                                </div>
                                <div className="end-price">
                                    <label >max price</label>
                                    <div className="input-with-unit">
                                        <input type="number" name='maxPrice' min={0} />
                                        <span className='input-unit'>L.E</span>
                                    </div>
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
                {!(url.pathname.includes('Mobiles') || url.pathname.includes('Laptops') || url.pathname.includes('Accessories')) && <>
                    <div className="filter">
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <h2>category</h2>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='check-box'>
                                    <div className="single-check-box">
                                        <input type="radio" name="categoryCheckbox" id="category1Checkbox" value='Mobiles' />
                                        <label htmlFor="category1Checkbox">mobiles</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="radio" name="categoryCheckbox" id="category2Checkbox" value='Laptops' />
                                        <label htmlFor="category2Checkbox">laptops</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="radio" name="categoryCheckbox" id="category3Checkbox" value='Accessories' />
                                        <label htmlFor="category3Checkbox">accessories</label>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    {!(url.pathname.includes('amazon') || url.pathname.includes('BTECH') || url.pathname.includes('2b') || url.pathname.includes('Kimo Store') || url.pathname.includes('Raya') || url.pathname.includes('union') || url.pathname.includes('Noon') || url.pathname.includes('dream2000')) && <>
                        <div className="filter">
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <h2>site</h2>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className='check-box'>
                                        <div className="single-check-box">
                                            <input type="checkbox" name="siteCheckbox" id="noonCheckbox" value='Noon' />
                                            <label htmlFor="noonCheckbox">noon</label>
                                        </div>
                                        <div className="single-check-box">
                                            <input type="checkbox" name="siteCheckbox" id="amazonCheckbox" value='amazon' />
                                            <label htmlFor="amazonCheckbox">amazon</label>
                                        </div>
                                        <div className="single-check-box">
                                            <input type="checkbox" name="siteCheckbox" id="2bCheckbox" value='2b' />
                                            <label htmlFor="2bCheckbox">2b</label>
                                        </div>
                                        <div className="single-check-box">
                                            <input type="checkbox" name="siteCheckbox" id="BTECHCheckbox" value='BTECH' />
                                            <label htmlFor="BTECHCheckbox">BTECH</label>
                                        </div>
                                        <div className="single-check-box">
                                            <input type="checkbox" name="siteCheckbox" id="dream2000Checkbox" value='dream2000' />
                                            <label htmlFor="dream2000Checkbox">dream2000</label>
                                        </div>
                                        <div className="single-check-box">
                                            <input type="checkbox" name="siteCheckbox" id="unionStoreCheckbox" value='union' />
                                            <label htmlFor="unionStoreCheckbox">union store</label>
                                        </div>
                                        <div className="single-check-box">
                                            <input type="checkbox" name="siteCheckbox" id="kimoStoreCheckbox" value='Kimo Store' />
                                            <label htmlFor="kimoStoreCheckbox">kimo store</label>
                                        </div>
                                        <div className="single-check-box">
                                            <input type="checkbox" name="siteCheckbox" id="rayaCheckbox" value='Raya' />
                                            <label htmlFor="rayaCheckbox">raya</label>
                                        </div>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </>}
                </>}
                {(url.pathname.includes('Mobiles') || url.search.includes('Mobiles')) && <>
                    {url.pathname.includes('Mobiles') && <div className="filter">
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <h2>site</h2>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='check-box'>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="siteCheckbox" id="noonCheckbox" value='Noon' />
                                        <label htmlFor="noonCheckbox">noon</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="siteCheckbox" id="amazonCheckbox" value='amazon' />
                                        <label htmlFor="amazonCheckbox">amazon</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="siteCheckbox" id="2bCheckbox" value='2b' />
                                        <label htmlFor="2bCheckbox">2b</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="siteCheckbox" id="BTECHCheckbox" value='BTECH' />
                                        <label htmlFor="BTECHCheckbox">BTECH</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="siteCheckbox" id="dream2000Checkbox" value='dream2000' />
                                        <label htmlFor="dream2000Checkbox">dream2000</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="siteCheckbox" id="unionStoreCheckbox" value='union' />
                                        <label htmlFor="unionStoreCheckbox">union store</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="siteCheckbox" id="kimoStoreCheckbox" value='Kimo Store' />
                                        <label htmlFor="kimoStoreCheckbox">kimo store</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="siteCheckbox" id="rayaCheckbox" value='Raya' />
                                        <label htmlFor="rayaCheckbox">raya</label>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </div>}
                    <div className="filter">
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <h2>network</h2>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='check-box'>
                                    {/* 2  , 3 , 4 , 6 , 8 , 12*/}
                                    <div className="single-check-box">
                                        <input type="checkbox" name="networkCheckbox" id="network1Checkbox" value='5G' />
                                        <label htmlFor="network1Checkbox">5G</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="networkCheckbox" id="network2Checkbox" value='4G' />
                                        <label htmlFor="network2Checkbox">4G</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="networkCheckbox" id="network3Checkbox" value='3G' />
                                        <label htmlFor="network3Checkbox">3G</label>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <div className="filter">
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <h2>SIM count</h2>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='check-box'>
                                    {/* android , ios */}
                                    <div className="single-check-box">
                                        <input type="checkbox" name="simCountCheckbox" id="simCount1Checkbox" value='single' />
                                        <label htmlFor="simCount1Checkbox">single</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="simCountCheckbox" id="simCount2Checkbox" value='dual' />
                                        <label htmlFor="simCount2Checkbox">dual</label>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <div className="filter">
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <h2>battery</h2>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="input-price">
                                    <div className="start-price">
                                        <label >min battery</label>
                                        <div className="input-with-unit">
                                            <input type="number" min={0} name='minBattery' />
                                            <span className='input-unit'>mA</span>
                                        </div>
                                    </div>
                                    <div className="end-price">
                                        <label >max battery</label>
                                        <div className="input-with-unit">
                                            <input type="number" min={0} name='maxBattery' />
                                            <span className='input-unit'>mA</span>
                                        </div>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <div className="filter">
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <h2>primary camera</h2>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="input-price">
                                    <div className="start-price">
                                        <label >min camera</label>
                                        <div className="input-with-unit">
                                            <input type="number" min={0} name='minPrimaryCamera' />
                                            <span className='input-unit'>MP</span>
                                        </div>
                                    </div>
                                    <div className="end-price">
                                        <label >max camera</label>
                                        <div className="input-with-unit">
                                            <input type="number" min={0} name='maxPrimaryCamera' />
                                            <span className='input-unit'>MP</span>
                                        </div>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <div className="filter">
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <h2>secondary camera</h2>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="input-price">
                                    <div className="start-price">
                                        <label >min camera</label>
                                        <div className="input-with-unit">
                                            <input type="number" min={0} name='minSecondaryCamera' />
                                            <span className='input-unit'>MP</span>
                                        </div>
                                    </div>
                                    <div className="end-price">
                                        <label >max camera</label>
                                        <div className="input-with-unit">
                                            <input type="number" min={0} name='maxSecondaryCamera' />
                                            <span className='input-unit'>MP</span>
                                        </div>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <div className="filter">
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <h2>internal memory</h2>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='check-box'>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="internalMemoryCheckbox" id="internalMemory1Checkbox" value='16' />
                                        <label htmlFor="internalMemory1Checkbox">16</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="internalMemoryCheckbox" id="internalMemory2Checkbox" value='32' />
                                        <label htmlFor="internalMemory2Checkbox">32</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="internalMemoryCheckbox" id="internalMemory3Checkbox" value='64' />
                                        <label htmlFor="internalMemory3Checkbox">64</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="internalMemoryCheckbox" id="internalMemory4Checkbox" value='128' />
                                        <label htmlFor="internalMemory4Checkbox">128</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="internalMemoryCheckbox" id="internalMemory5Checkbox" value='256' />
                                        <label htmlFor="internalMemory5Checkbox">256</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="internalMemoryCheckbox" id="internalMemory6Checkbox" value='512' />
                                        <label htmlFor="internalMemory6Checkbox">512</label>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <div className="filter">
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <h2>ram</h2>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='check-box'>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="ramCheckbox" id="ram1Checkbox" value='2' />
                                        <label htmlFor="ram1Checkbox">2</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="ramCheckbox" id="ram2Checkbox" value='3' />
                                        <label htmlFor="ram2Checkbox">3</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="ramCheckbox" id="ram3Checkbox" value='4' />
                                        <label htmlFor="ram3Checkbox">4</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="ramCheckbox" id="ram4Checkbox" value='6' />
                                        <label htmlFor="ram4Checkbox">6</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="ramCheckbox" id="ram5Checkbox" value='8' />
                                        <label htmlFor="ram5Checkbox">8</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="ramCheckbox" id="ram6Checkbox" value='12' />
                                        <label htmlFor="ram6Checkbox">12</label>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <div className="filter">
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <h2>display size</h2>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='check-box'>
                                    {/* 2  , 3 , 4 , 6 , 8 , 12*/}
                                    <div className="single-check-box">
                                        <input type="checkbox" name="displaySizeCheckbox" id="displaySize1Checkbox" value='1.77' />
                                        <label htmlFor="displaySize1Checkbox">1.77 inches</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="displaySizeCheckbox" id="displaySize2Checkbox" value='1.8' />
                                        <label htmlFor="displaySize2Checkbox">1.8 inches</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="displaySizeCheckbox" id="displaySize3Checkbox" value='2.4' />
                                        <label htmlFor="displaySize3Checkbox">2.4 inches</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="displaySizeCheckbox" id="displaySize4Checkbox" value='2.7' />
                                        <label htmlFor="displaySize4Checkbox">2.7 inches</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="displaySizeCheckbox" id="displaySize5Checkbox" value='2.8' />
                                        <label htmlFor="displaySize5Checkbox">2.8 inches</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="displaySizeCheckbox" id="displaySize6Checkbox" value='5.45' />
                                        <label htmlFor="displaySize6Checkbox">5.45 inches</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="displaySizeCheckbox" id="displaySize7Checkbox" value='5.99' />
                                        <label htmlFor="displaySize7Checkbox">5.99 inches</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="displaySizeCheckbox" id="displaySize8Checkbox" value='6.1 inches' />
                                        <label htmlFor="displaySize8Checkbox">6.1 inches</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="displaySizeCheckbox" id="displaySize9Checkbox" value='6.4' />
                                        <label htmlFor="displaySize9Checkbox">6.4 inches</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="displaySizeCheckbox" id="displaySize10Checkbox" value='6.43' />
                                        <label htmlFor="displaySize10Checkbox">6.43 inches</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="displaySizeCheckbox" id="displaySize11Checkbox" value='6.5' />
                                        <label htmlFor="displaySize11Checkbox">6.5 inches</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="displaySizeCheckbox" id="displaySize12Checkbox" value='6.51' />
                                        <label htmlFor="displaySize12Checkbox">6.51 inches</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="displaySizeCheckbox" id="displaySize13Checkbox" value='6.52' />
                                        <label htmlFor="displaySize13Checkbox">6.52 inches</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="displaySizeCheckbox" id="displaySize14Checkbox" value='6.55' />
                                        <label htmlFor="displaySize14Checkbox">6.55 inches</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="displaySizeCheckbox" id="displaySize15Checkbox" value='6.6' />
                                        <label htmlFor="displaySize15Checkbox">6.6 inches</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="displaySizeCheckbox" id="displaySize16Checkbox" value='6.67' />
                                        <label htmlFor="displaySize16Checkbox">6.67 inches</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="displaySizeCheckbox" id="displaySize17Checkbox" value='6.78' />
                                        <label htmlFor="displaySize17Checkbox">6.78 inches</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="displaySizeCheckbox" id="displaySize18Checkbox" value='6.82' />
                                        <label htmlFor="displaySize18Checkbox">6.82 inches</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="displaySizeCheckbox" id="displaySize19Checkbox" value='6.9' />
                                        <label htmlFor="displaySize19Checkbox">6.9 inches</label>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <div className="filter">
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <h2>operating system</h2>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='check-box'>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="operatingSystemCheckbox" id="operatingSystem1Checkbox" value='android' />
                                        <label htmlFor="operatingSystem1Checkbox">android</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="operatingSystemCheckbox" id="operatingSystem2Checkbox" value='ios' />
                                        <label htmlFor="operatingSystem2Checkbox">ios</label>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </>}
                {(url.pathname.includes('Laptops') || url.search.includes('Laptops')) && <>
                    {url.pathname.includes('Laptops') && <div className="filter">
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <h2>site</h2>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='check-box'>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="siteCheckbox" id="noonCheckbox" value='Noon' />
                                        <label htmlFor="noonCheckbox">noon</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="siteCheckbox" id="amazonCheckbox" value='amazon' />
                                        <label htmlFor="amazonCheckbox">amazon</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="siteCheckbox" id="2bCheckbox" value='2b' />
                                        <label htmlFor="2bCheckbox">2b</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="siteCheckbox" id="BTECHCheckbox" value='BTECH' />
                                        <label htmlFor="BTECHCheckbox">BTECH</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="siteCheckbox" id="dream2000Checkbox" value='dream2000' />
                                        <label htmlFor="dream2000Checkbox">dream2000</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="siteCheckbox" id="unionStoreCheckbox" value='union' />
                                        <label htmlFor="unionStoreCheckbox">union store</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="siteCheckbox" id="kimoStoreCheckbox" value='Kimo Store' />
                                        <label htmlFor="kimoStoreCheckbox">kimo store</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="siteCheckbox" id="rayaCheckbox" value='Raya' />
                                        <label htmlFor="rayaCheckbox">raya</label>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </div>}
                    <div className="filter">
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <h2>graphics card</h2>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='check-box'>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="graphicsCardCheckbox" id="graphicsCard1Checkbox" value='intel' />
                                        <label htmlFor="graphicsCard1Checkbox">intel</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="graphicsCardCheckbox" id="graphicsCard2Checkbox" value='nividia' />
                                        <label htmlFor="graphicsCard2Checkbox">nividia</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="graphicsCardCheckbox" id="graphicsCard3Checkbox" value='rtx' />
                                        <label htmlFor="graphicsCard3Checkbox">RTX</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="graphicsCardCheckbox" id="graphicsCard4Checkbox" value='gtx' />
                                        <label htmlFor="graphicsCard4Checkbox">GTX</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="graphicsCardCheckbox" id="graphicsCard5Checkbox" value='mx' />
                                        <label htmlFor="graphicsCard5Checkbox">MX</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="graphicsCardCheckbox" id="graphicsCard6Checkbox" value='amd' />
                                        <label htmlFor="graphicsCard6Checkbox">AMD</label>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <div className="filter">
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <h2>HDD</h2>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='check-box'>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="HDDCheckbox" id="HDD1Checkbox" value='256GB' />
                                        <label htmlFor="HDD1Checkbox">256 GB</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="HDDCheckbox" id="HDD2Checkbox" value='512GB' />
                                        <label htmlFor="HDD2Checkbox">512 GB</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="HDDCheckbox" id="HDD3Checkbox" value='1TB' />
                                        <label htmlFor="HDD3Checkbox">1 TB</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="HDDCheckbox" id="HDD4Checkbox" value='2TB' />
                                        <label htmlFor="HDD4Checkbox">2 TB</label>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <div className="filter">
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <h2>SSD</h2>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='check-box'>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="SSDCheckbox" id="SSD1Checkbox" value='128GB' />
                                        <label htmlFor="SSD1Checkbox">128 GB</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="SSDCheckbox" id="SSD2Checkbox" value='256GB' />
                                        <label htmlFor="SSD2Checkbox">256 GB</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="SSDCheckbox" id="SSD3Checkbox" value='512GB' />
                                        <label htmlFor="SSD3Checkbox">512 GB</label>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <div className="filter">
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <h2>ram</h2>
                            </AccordionSummary>
                            <AccordionDetails>

                                <div className='check-box'>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="ramLaptopCheckbox" id="ramLaptop1Checkbox" value='4' />
                                        <label htmlFor="ramLaptop1Checkbox">4</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="ramLaptopCheckbox" id="ramLaptop2Checkbox" value='8' />
                                        <label htmlFor="ramLaptop2Checkbox">8</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="ramLaptopCheckbox" id="ramLaptop3Checkbox" value='16' />
                                        <label htmlFor="ramLaptop3Checkbox">16</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="ramLaptopCheckbox" id="ramLaptop4Checkbox" value='24' />
                                        <label htmlFor="ramLaptop4Checkbox">24</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="ramLaptopCheckbox" id="ramLaptop5Checkbox" value='32' />
                                        <label htmlFor="ramLaptop5Checkbox">32</label>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <div className="filter">
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <h2>display size</h2>
                            </AccordionSummary>
                            <AccordionDetails>

                                <div className='check-box'>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="displaySizeLaptopCheckbox" id="displaySizeLaptop1Checkbox" value='13.3' />
                                        <label htmlFor="displaySizeLaptop1Checkbox">13.3 inches</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="displaySizeLaptopCheckbox" id="displaySizeLaptop2Checkbox" value='14' />
                                        <label htmlFor="displaySizeLaptop2Checkbox">14 inches</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="displaySizeLaptopCheckbox" id="displaySizeLaptop3Checkbox" value='15.6' />
                                        <label htmlFor="displaySizeLaptop3Checkbox">15.6 inches</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="displaySizeLaptopCheckbox" id="displaySizeLaptop4Checkbox" value='16' />
                                        <label htmlFor="displaySizeLaptop4Checkbox">16 inches</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="displaySizeLaptopCheckbox" id="displaySizeLaptop5Checkbox" value='16.1' />
                                        <label htmlFor="displaySizeLaptop5Checkbox">16.1 inches</label>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <div className="filter">
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <h2>operating system</h2>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='check-box'>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="operatingSystemLaptopCheckbox" id="operatingSystemLaptop1Checkbox" value='windows' />
                                        <label htmlFor="operatingSystemLaptop1Checkbox">windows</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="operatingSystemLaptopCheckbox" id="operatingSystemLaptop4Checkbox" value='ubuntu' />
                                        <label htmlFor="operatingSystemLaptop4Checkbox">ubuntu</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="operatingSystemLaptopCheckbox" id="operatingSystemLaptop5Checkbox" value='freeDOS' />
                                        <label htmlFor="operatingSystemLaptop5Checkbox">freeDOS</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="operatingSystemLaptopCheckbox" id="operatingSystemLaptop6Checkbox" value='mac' />
                                        <label htmlFor="operatingSystemLaptop6Checkbox">Mac</label>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <div className="filter">
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <h2>processor</h2>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='check-box'>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="processorCheckbox" id="processor1Checkbox" value='i3' />
                                        <label htmlFor="processor1Checkbox">i3</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="processorCheckbox" id="processor2Checkbox" value='i5' />
                                        <label htmlFor="processor2Checkbox">i5</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="processorCheckbox" id="processor3Checkbox" value='i7' />
                                        <label htmlFor="processor3Checkbox">i7</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="processorCheckbox" id="processor4Checkbox" value='i9' />
                                        <label htmlFor="processor4Checkbox">i9</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="processorCheckbox" id="processor5Checkbox" value='amd' />
                                        <label htmlFor="processor5Checkbox">AMD</label>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </>}
                {(url.pathname.includes('Accessories') || url.search.includes('Accessories')) && <>
                    {url.pathname.includes('Accessories') && <div className="filter">
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <h2>site</h2>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='check-box'>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="siteCheckbox" id="noonCheckbox" value='Noon' />
                                        <label htmlFor="noonCheckbox">noon</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="siteCheckbox" id="amazonCheckbox" value='amazon' />
                                        <label htmlFor="amazonCheckbox">amazon</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="siteCheckbox" id="2bCheckbox" value='2b' />
                                        <label htmlFor="2bCheckbox">2b</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="siteCheckbox" id="BTECHCheckbox" value='BTECH' />
                                        <label htmlFor="BTECHCheckbox">BTECH</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="siteCheckbox" id="dream2000Checkbox" value='dream2000' />
                                        <label htmlFor="dream2000Checkbox">dream2000</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="siteCheckbox" id="unionStoreCheckbox" value='union' />
                                        <label htmlFor="unionStoreCheckbox">union store</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="siteCheckbox" id="kimoStoreCheckbox" value='Kimo Store' />
                                        <label htmlFor="kimoStoreCheckbox">kimo store</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="siteCheckbox" id="rayaCheckbox" value='Raya' />
                                        <label htmlFor="rayaCheckbox">raya</label>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </div>}
                    <div className="filter">
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <h2>accessory type</h2>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='check-box'>
                                    {/* android , ios */}
                                    <div className="single-check-box">
                                        <input type="checkbox" name="typeCheckbox" id="type1Checkbox" value='earphones' />
                                        <label htmlFor="type1Checkbox">Earphones</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="typeCheckbox" id="type2Checkbox" value='mouse' />
                                        <label htmlFor="type2Checkbox">mouse</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="typeCheckbox" id="type3Checkbox" value='keyboard' />
                                        <label htmlFor="simCount3Checkbox">keyboard</label>
                                    </div>
                                    <div className="single-check-box">
                                        <input type="checkbox" name="typeCheckbox" id="type4Checkbox" value='watch' />
                                        <label htmlFor="simCount4Checkbox">smart watch</label>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </>}
            </Form>
            {token && <>
                <section ref={recommendationRef} id='search-recommendation' className="search-recommendation hide">
                    {<div className={`temp-div ${recommended.length !== 0 ? '' : 'hide-rec'}`}>
                        {filteredRecommended.length !== 0 && <h2>recommended for you</h2>}
                        {filteredRecommended.map((singleRec) => <div to={`/products/${singleRec._id}`} key={singleRec._id} ref={singleRecommendationRef} className={`single-search-recommendation`}>
                            <NavLink to={`/products/${singleRec._id}`}>
                                {
                                    singleRec.image_src === undefined ? <img src={singleRec.category === 'Mobiles' ? defaultMobile : singleRec.category === 'Laptops' ? defaultLaptop : defaultHeadset} alt={singleRec.name} />
                                        : <img src={singleRec.image_src} onError={(event) => handleError(event, singleRec)} alt={singleRec.name} data-type={singleRec.Accessories_type} />
                                }
                            </NavLink>
                            <div className="search-recommendation-details">
                                <div className="recommendation-icons">
                                    <span><Rating name="read-only" value={singleRec.Rate_Avg} readOnly size={`${maxRec === 1 ? "small" : ''}`} /></span>
                                    <span onClick={() => handleDeleteRecommendation(singleRec._id)}><CloseIcon className='close' /></span>
                                </div>
                                <div className='recommendation-link'>
                                    <NavLink to={`/products/${singleRec._id}`}>
                                        <h3>{singleRec.name}</h3>
                                        <h3>{singleRec.price} L.E</h3>
                                    </NavLink>
                                </div>
                            </div>
                        </div>)}
                    </div>}
                </section>
            </>}

        </aside>
    )
}
