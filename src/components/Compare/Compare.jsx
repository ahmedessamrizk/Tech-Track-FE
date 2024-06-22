import React, { useEffect, useState } from 'react'
import './Compare.css'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { NavLink, useNavigation } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Rating from '@mui/material/Rating';
import LoadingScreen from '../../utils/loadingScreen.jsx';
import defaultLaptop from '../../asserts/laptop.png'
import defaultMobile from '../../asserts/mobile.png'
import defaultHeadset from '../../asserts/headset.png'
import defaultEarphone from '../../asserts/earphone.png'
import defaultEarbuds from '../../asserts/earbuds.png'
import defaultMouse from '../../asserts/mouse.png'
import defaultKeyboard from '../../asserts/keyboard.png'
import defaultSmartwatch from '../../asserts/smartwatch.png'

export default function Compare() {
    const [sideBar, setSideBar] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [products, setProducts] = useState(JSON.parse(localStorage.getItem('compareProducts')));
    const [compareProducts, setCompareProducts] = useState([]);
    const navigation = useNavigation();
    const state = navigation.state === 'loading';
    const mobileList = ['image', 'Rate_Avg', 'brand', 'ram', 'SIM_count', 'battery', 'display_size', 'internal_memory', 'network', 'operating_system', 'prim_cam', 'second_cam', 'processor'];
    const laptopList = ['image', 'Rate_Avg', 'brand', 'ram', 'display_size', 'operating_system', 'processor', 'HDD', 'SSD', 'graphics_card'];
    const accessoriesList = ['image', 'Rate_Avg', 'brand', 'model_name', 'Accessories_features'];

    let helper;
    if (compareProducts.length !== 0) {
        helper = compareProducts[0].category === 'Mobiles' ? mobileList : compareProducts[0].category === 'Laptops' ? laptopList : accessoriesList;
    }

    function toggleSide() {
        setSideBar(prevState => !prevState)
    }
    function removeFromCompare(product) {
        const temp = [...products];
        const index = temp.findIndex((pro => pro._id === product._id));
        temp.splice(index, 1);
        localStorage.setItem('compareProducts', JSON.stringify(temp));
        setProducts(temp);
    }
    function addToCompare(product) {
        if (compareProducts.length === 4) {
            setErrorMessage('you can only compare 4 products');
            return
        }
        else {
            if (compareProducts.length !== 0) {
                const flag = product.category === compareProducts[0].category;
                if (!flag) {
                    setErrorMessage('choose products of same categories');
                    return
                }
            }
            if (compareProducts.findIndex(pro => pro._id === product._id) === -1) {
                setErrorMessage('');
                setCompareProducts(prevCompareProducts => [...prevCompareProducts, product]);
            }
            else {
                setErrorMessage('product is already chosen for comparing');
                return
            }
        }
    }
    function removeFromCompareTable(product) {
        const temp = [...compareProducts];
        const index = temp.findIndex((pro => pro._id === product._id));
        temp.splice(index, 1);
        setCompareProducts(temp);
    }
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

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
    return <>
        {state && <LoadingScreen />}
        <section className='compare'>
            <aside className={`compare-side ${products.length === 0 && 'no-compare'} ${sideBar ? 'show-side' : ''}`} >
                {products.length === 0 && <h2>no products to choose from</h2>}
                {errorMessage && <h2>{errorMessage}</h2>}
                {(products.length !== 0) && <>
                    {products.map((singleRec) => <div key={singleRec._id} className="product-compare-card">
                        <div className="product-compare-image">
                            <NavLink to={`/products/${singleRec._id}`} >
                                {
                                    singleRec.image_src === undefined ? <img src={singleRec.category === 'Mobiles' ? defaultMobile : singleRec.category === 'Laptops' ? defaultLaptop : defaultHeadset} alt={singleRec.name} />
                                        : <img src={singleRec.image_src} onError={(event) => handleError(event, singleRec)} alt={singleRec.name} data-type={singleRec.Accessories_type} />
                                }
                            </NavLink>
                        </div>
                        <div >
                            <NavLink to={`/products/${singleRec._id}`}>
                                <h3>{singleRec.name}</h3>
                            </NavLink>
                        </div>
                        <div className="compare-actions">
                            <button className='add-to-compare add-icon' onClick={() => addToCompare(singleRec)}><AddIcon /></button>
                            <button className='add-to-compare delete-icon' onClick={() => removeFromCompare(singleRec)}><DeleteIcon /></button>
                        </div>
                    </div>)
                    }
                </>
                }
            </aside>
            <button className={`show-side-icon ${sideBar ? 'icon-transition' : ''}`} onClick={toggleSide}>{sideBar ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}</button>
            <div className={`compare-details ${compareProducts.length === 0 && 'no-compare'}`}>
                {compareProducts.length === 0 && <h2>please select up to 4 products to compare from the list in the side</h2>}
                {sideBar && <div className="compare-overlay"></div>}
                {compareProducts.length !== 0 &&
                    <div className={`compare-table`}>
                        <TableContainer >
                            <Table aria-label="simple table">
                                <TableBody>
                                    {helper.map((row) => (
                                        <TableRow
                                            key={row}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            {row === 'image' && <TableCell component="th" scope="row"></TableCell>}
                                            {row === 'Rate_Avg' && <TableCell component="th" scope="row"><h3>rating</h3></TableCell>}
                                            {row === 'SIM_count' && <TableCell component="th" scope="row"><h3>SIM count</h3></TableCell>}
                                            {row === 'display_size' && <TableCell component="th" scope="row"><h3>display size</h3></TableCell>}
                                            {row === 'internal_memory' && <TableCell component="th" scope="row"><h3>internal memory</h3></TableCell>}
                                            {row === 'operating_system' && <TableCell component="th" scope="row"><h3>operating system</h3></TableCell>}
                                            {row === 'prim_cam' && <TableCell component="th" scope="row"><h3>primary camera</h3></TableCell>}
                                            {row === 'second_cam' && <TableCell component="th" scope="row"><h3>secondary camera</h3></TableCell>}
                                            {row === 'graphics_card' && <TableCell component="th" scope="row"><h3>graphics card</h3></TableCell>}
                                            {row === 'model_name' && <TableCell component="th" scope="row"><h3>model name</h3></TableCell>}
                                            {row === 'Accessories_features' && <TableCell component="th" scope="row"><h3>features</h3></TableCell>}
                                            {row !== 'image' && row !== 'Rate_Avg' && row !== 'SIM_count' && row !== 'display_size' && row !== 'internal_memory' && row !== 'operating_system' && row !== 'prim_cam' && row !== 'second_cam' && row !== 'graphics_card' && row !== 'model_name' && row !== 'Accessories_features' && <TableCell component="th" scope="row"><h3>{row}</h3></TableCell>}
                                            {compareProducts.map((product, index) => <TableCell key={product._id} align="center">
                                                {row === 'image' && <div className='first-row'>
                                                    {
                                                        product.image_src === undefined ? <img src={product.category === 'Mobiles' ? defaultMobile : product.category === 'Laptops' ? defaultLaptop : defaultHeadset} alt={product.name} />
                                                            : <img src={product.image_src} onError={(event) => handleError(event, product)} alt={product.name} data-type={product.Accessories_type} />
                                                    }
                                                    <p className='product-index'>{index + 1}</p>
                                                    <h2>{product.name}</h2>
                                                    <p className='compare-price'>{product.price} L.E</p>
                                                    <button className='add-to-compare delete-icon' onClick={() => removeFromCompareTable(product)}><DeleteIcon /></button>
                                                </div>}
                                                {row === 'Rate_Avg' && <Rating name="read-only" value={product.Rate_Avg} readOnly />}
                                                {row !== 'image' && row !== 'Rate_Avg' && <h4>{product[row] ? product[row] : '----'}</h4>}
                                            </TableCell>)}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                }
            </div>
        </section>
    </>
}
