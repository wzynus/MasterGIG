import React from 'react'
import './Header.css'
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

const Header = () => {
    return (
        <div className='header' >
            <div className='header__left'>
                <h2><a className="Home-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    MasterGIG
                </a></h2>
                <h2><a className="Browse-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Browse
                </a></h2>
                <div className="header__verticalLine"></div>
            </div>

            <div className='header__center'>
                <input type="text" placeholder='Search' />
                <div className="header__centerLogoContainer">
                    <button ><SearchIcon /></button>
                    
                </div>
            </div>

            <div className='header__right'>
                <div className='header_rightContainer'>
                    <Button variant="contained">Login</Button>
                    
                    <Button variant="contained" color="secondary">Sign Up</Button>
                </div>
            </div>
        </div>
    )
}

export default Header
