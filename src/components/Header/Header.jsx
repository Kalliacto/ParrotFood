import React from 'react';
import './header.css';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';
import HeaderIcons from './HeaderIcons/HeaderIcons';
import { Link, useLocation } from 'react-router-dom';

export const Header = React.memo(({ setSearch }) => {
    const setSearchQuery = (path) => {
        setSearch(path);
    };

    const location = useLocation();

    return (
        <header className='header'>
            <div className='container'>
                <div className='header__wrapper'>
                    <Link to={'/'}>
                        <div className='header__logo' title='На главную'>
                            <Logo />
                        </div>
                    </Link>
                    {location.pathname === '/catalogPage' ||
                    location.pathname === '/notfoundProduct' ? (
                        <Search setSearch={setSearchQuery} />
                    ) : (
                        ''
                    )}
                    <HeaderIcons />
                </div>
            </div>
        </header>
    );
});
