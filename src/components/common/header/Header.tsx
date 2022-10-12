import React, { useState } from 'react';
import Logo from '../../../assets/img/logo.jpg';
import defaultAva from '../../../assets/img/def-image.png';
import { SearchInput } from '../search-input/SearchInput';
import Avatar from '@mui/material/Avatar';
import { SignIN } from '../../signInBtn/SignIn';
import { useAppSelector } from '../../../store/store';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import classes from './Header.module.scss';
import { currentUserSelector } from '../../../store/reducers/auth-reducer';
import { ordersNumSelector, totalPriceSelector } from '../../../store/reducers/cart-reducer';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
    const [searchCustomer, setSearchCustomer] = useState<string>('');

    const currentUser = useAppSelector(currentUserSelector);
    const totalPrice = useAppSelector(totalPriceSelector);
    const orderNum = useAppSelector(ordersNumSelector);

    const navigate = useNavigate();

    const onSearchHandler = () => {
        console.log('find');
    };

    return (
        <header className={classes.headerSection}>
            <div className={classes.container}>
                <div className={classes.block_1}>
                    <div className={classes.location}>
                        <LocationOnIcon fontSize="small" />
                        <div>Minsk city</div>
                    </div>
                    <div className={classes.storeInfo}>
                        <ul className={classes.benefits}>
                            <li>Payment</li>
                            <li>Delivery</li>
                            {/*up ===> &#9650;*/}
                            <li className={classes.more}>More &#9660;</li>
                        </ul>
                        <div className={classes.contacts}>
                            <div className={classes.phone}>
                                <PhoneAndroidIcon fontSize="small" />
                                <span>+7(999) 999-99-99</span>
                            </div>
                            <div>More &#9660;</div>
                        </div>
                        <div className={classes.hours}>
                            <AccessTimeIcon fontSize="small" />
                            <div className={classes.hours_time}>
                                <div>contact-center</div>
                                <div>8.00-20.00</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.block_2}>
                    <div className={classes.headerLogo}>
                        <img src={Logo} className={classes.logo} alt="logo" />
                    </div>
                    <div className={classes.searchField}>
                        <SearchInput
                            value={searchCustomer}
                            onChange={setSearchCustomer}
                            onSearchHandler={onSearchHandler}
                        />
                    </div>
                    <div className={classes.controls}>
                        <div className={classes.controlsAvatar}>
                            <Avatar src={currentUser.photoURL ? currentUser.photoURL : defaultAva} alt="avatar" />
                        </div>
                        <div className={classes.controlsButtons}>
                            <div>{currentUser.displayName ? currentUser.displayName : 'HELLO'}</div>
                            <SignIN />
                        </div>

                        <div className={classes.controlsCart} onClick={() => navigate('cart')}>
                            <IconButton color="primary" component="label">
                                <AddShoppingCartIcon fontSize="large" />
                            </IconButton>
                            <span className={classes.controlsCartOrders}>{orderNum}</span>
                        </div>
                        <div>
                            Shopping Cart
                            <div>
                                <b>${totalPrice}</b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
