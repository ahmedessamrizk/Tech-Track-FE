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
