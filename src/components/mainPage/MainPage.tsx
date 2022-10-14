import React from 'react';
import classes from './MainPage.module.scss';
import { RCSwiper } from '../common/swiper/Swiper';
import rc_1 from '../../assets/img/rc-1.jpg';
import rc_2 from '../../assets/img/rc-2.jpg';
import rc_3 from '../../assets/img/rc-3.jpg';
import rc_4 from '../../assets/img/rc-4.jpg';
import rc_5 from '../../assets/img/rc-5.jpg';
import { Button } from '@mui/material';

export type RSType = {
    _id: number;
    img: string;
    title: string;
};

const images = [
    { _id: 1, img: rc_1, title: 'Porsche 911 GT3RS' },
    { _id: 2, img: rc_2, title: 'GAZ 13 Chaika' },
    { _id: 3, img: rc_3, title: 'AUDI RS6 GTO' },
    { _id: 4, img: rc_4, title: 'Land Rover Defender 90' },
    { _id: 5, img: rc_5, title: 'BMW M4' },
];

export const MainPage: React.FC = React.memo(() => {
    return (
        <div className={classes.mainBlock}>
            <RCSwiper images={images} />
        </div>
    );
});
