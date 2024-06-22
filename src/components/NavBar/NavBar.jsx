import React from 'react'
import './NavBar.css'
import logoImg from '../../asserts/Group 133.png'
import { Form, NavLink, useRouteLoaderData } from 'react-router-dom'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function NavBar() {
    const { token } = useRouteLoaderData('root');
    const storesArrayNames = ['amazon', '2b', 'BTECH', 'Kimo Store', 'Raya', 'union', 'noon'];
    const url = new URL(window.location.href);
    const activeStore = storesArrayNames.reduce((acc, store) => acc || url.pathname.includes(store), false);

    return (
        <header className='navbar'>
            <nav>
                <div className="logo">
                    <img src={logoImg} alt="" />
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="49.687" height="43.001" viewBox="0 0 49.687 43.001">
                        <g id="Group_133" data-name="Group 133" transform="translate(-873.083 -386.475)">
                            <path id="Path_2236" data-name="Path 2236" d="M922.14,386.475H873.719a.556.556,0,0,0-.636.624v6.98a.56.56,0,0,0,.636.63H884.61a.333.333,0,0,1,.38.374v33.763a.56.56,0,0,0,.636.63h8.04a.56.56,0,0,0,.636-.63V395.083l.006-.374a3.624,3.624,0,0,1,6.181-2.4,3.563,3.563,0,0,1,1.06,2.4l.006.374v33.763a.556.556,0,0,0,.63.63h8.046a.559.559,0,0,0,.63-.63V395.083a.335.335,0,0,1,.381-.374h10.9a.558.558,0,0,0,.63-.63V387.1A.554.554,0,0,0,922.14,386.475Z" transform="translate(0 0)" fill="#132d46" />
                            <path id="Path_2237" data-name="Path 2237" d="M914.281,418.866a3.448,3.448,0,0,1-6.9,0,3.448,3.448,0,1,1,6.9,0Z" transform="translate(-12.907 -10.889)" fill="#132d46" />
                            <path id="Path_2238" data-name="Path 2238" d="M912.908,421.019v-.206a1.523,1.523,0,0,1,.006-.168" transform="translate(-14.985 -12.857)" fill="#132d46" />
                            <path id="Path_2239" data-name="Path 2239" d="M912.914,421.019v-.206a1.523,1.523,0,0,0-.006-.168" transform="translate(-14.985 -12.857)" fill="#132d46" />
                        </g>
                    </svg> */}
                </div>
                <div className="links">
                    <ul>
                        <li>
                            <NavLink to='/' className={({ isActive }) => {
                                return isActive ? 'active' : undefined
                            }} end>
                                home
                            </NavLink>
                        </li>
                        <li>
                            <PopupState variant="popover" popupId="demo-popup-menu">
                                {(popupState) => (
                                    <React.Fragment>
                                        <button variant="contained" {...bindTrigger(popupState)} className={activeStore ? 'active' : undefined}>
                                            stores
                                        </button>
                                        <Menu {...bindMenu(popupState)}>
                                            <NavLink className='store-link' to='categories/amazon?page=1'>
                                                <MenuItem onClick={popupState.close}>
                                                    amazon
                                                </MenuItem>
                                            </NavLink>
                                            <NavLink className='store-link' to='categories/Raya?page=1'>
                                                <MenuItem onClick={popupState.close}>
                                                    raya
                                                </MenuItem>
                                            </NavLink>
                                            <NavLink className='store-link' to='categories/2b?page=1'>
                                                <MenuItem onClick={popupState.close}>
                                                    2b
                                                </MenuItem>
                                            </NavLink>
                                            <NavLink className='store-link' to='categories/BTECH?page=1'>
                                                <MenuItem onClick={popupState.close}>
                                                    BTECH
                                                </MenuItem>
                                            </NavLink>
                                            <NavLink className='store-link' to='categories/Kimo Store?page=1'>
                                                <MenuItem onClick={popupState.close}>
                                                    Kimo Store
                                                </MenuItem>
                                            </NavLink>
                                            <NavLink className='store-link' to='categories/union?page=1'>
                                                <MenuItem onClick={popupState.close}>
                                                    union store
                                                </MenuItem>
                                            </NavLink>
                                            <NavLink className='store-link' to='categories/dream2000?page=1'>
                                                <MenuItem onClick={popupState.close}>
                                                    Dream2000
                                                </MenuItem>
                                            </NavLink>
                                            <NavLink className='store-link' to='categories/Noon?page=1'>
                                                <MenuItem onClick={popupState.close}>
                                                    noon
                                                </MenuItem>
                                            </NavLink>

                                        </Menu>
                                    </React.Fragment>
                                )}
                            </PopupState>

                        </li>
                        <li>
                            <NavLink to='/compare'>
                                compare
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/about'>
                                about
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="login-signUp">
                    <ul>
                        {!token && <>
                            <li className='login-button'>
                                <NavLink to='/login'>
                                    login
                                </NavLink>
                            </li>
                            <li className='signUp-button'>
                                <NavLink to='/signUp'>
                                    signUp
                                </NavLink>
                            </li>
                        </>
                        }
                        {token && <>
                            <li className='login-button'>
                                <Form action='/logout' method='post'>
                                    <button>logout</button>
                                </Form>
                            </li>
                            <li className='signUp-button'>
                                <NavLink to='/profile/content'>
                                    profile
                                </NavLink>
                            </li>
                        </>
                        }
                    </ul>
                </div>
            </nav>
        </header>
    )
}
