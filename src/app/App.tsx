import React, { useState, useEffect } from 'react';
import { Container, LinearProgress } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import IconButton from '@mui/material/IconButton';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import { Cart } from '../components/cart/Cart';
import { OnlineStore } from '../components/onlineStore/OnlineStore';
import { ErrorSnackbar } from '../components/common/ErrorSnackbar/ErrorSnackbar';
import { Header } from '../components/common/header/Header';
import { WithLayout } from '../components/common/withLayout/WithLayout';
import { Chat } from '../components/chat/Chat';
import { MainPage } from '../components/mainPage/MainPage';
import { Footer } from '../components/common/footer/Footer';
import Error404 from '../components/common/error404/Error404';
import './App.css';
import { appStatusSelector, initializeAppTC } from '../store/reducers/app-reducer';
import { Menu } from '../components/common/menu/Menu';
import { GoogleMaps } from '../components/maps/Maps';
import { PATH } from '../const';

export const App = () => {
    const [open, setOpen] = useState(false);

    const status = useAppSelector(appStatusSelector);

    const dispatch = useAppDispatch();

    //Скорее всего это здесь не нужно???
    useEffect(() => {
        dispatch(initializeAppTC());
    }, []);

    return (
        <div className="App">
            <Header />
            <Menu />
            {status === 'loading' && <LinearProgress />}
            <ErrorSnackbar />
            <Container fixed>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <WithLayout>
                                <MainPage />
                            </WithLayout>
                        }
                    />
                    <Route
                        path={PATH.CATALOG}
                        element={
                            <WithLayout>
                                <OnlineStore />
                            </WithLayout>
                        }
                    />
                    <Route
                        path={PATH.RETRO_CARS}
                        element={
                            <WithLayout>
                                <OnlineStore />
                            </WithLayout>
                        }
                    />
                    <Route
                        path={PATH.CART}
                        element={
                            <WithLayout>
                                <Cart />
                            </WithLayout>
                        }
                    />
                    <Route
                        path={PATH.LOCATION}
                        element={
                            <WithLayout>
                                <GoogleMaps />
                            </WithLayout>
                        }
                    />
                    <Route
                        path="/*"
                        element={
                            <WithLayout>
                                <Error404 />
                            </WithLayout>
                        }
                    />
                </Routes>
            </Container>
            <Footer open={open} setOpen={setOpen} />

            {!open ? (
                <div className="chatIcon" onClick={() => setOpen(!open)}>
                    Chat with us
                </div>
            ) : (
                <div>
                    <div className="closeIcon" onClick={() => setOpen(!open)}>
                        <IconButton size={'large'} style={{ color: 'white' }}>
                            <CloseOutlinedIcon fontSize="inherit" />
                        </IconButton>
                    </div>
                    <Chat active={open} />
                </div>
            )}
        </div>
    );
};
