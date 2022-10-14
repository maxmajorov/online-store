import React, { useState, useCallback, useRef } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { customTheme } from './Theme';
import { PlacesAutocomplete } from '../common/autocomplete/Autocomplete';
import classes from './Maps.module.scss';
import { Button } from '@mui/material';

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const containerStyle = {
    width: '100%',
    height: '500px',
};

// def place ==> minsk
const defCenter = {
    lat: 53.9,
    lng: 27.559,
};

const MODES = {
    MOVE: 0,
    SET_MARKET: 1,
};

// options

const defOptions = {
    panControl: true,
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: true,
    streetViewControl: true,
    rotateControl: false,
    clickableIcons: true,
    keyboardShortcuts: false,
    scrollwheel: true,
    disableDoublrClickZoom: false,
    fullScreenControl: false,
    styles: customTheme,
};

export const GoogleMaps = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_MAPS_API_KEY ? GOOGLE_MAPS_API_KEY : '', //string | ''
        libraries: ['places'],
    });

    const [center, setCenter] = useState(defCenter);
    const [mode, setMode] = useState(MODES.MOVE);
    const [map, setMap] = useState(null);

    // const mapRef = useRef(undefined);
    // const onLoad = useCallback(function callback(map) {
    //     mapRef.current = map;
    // }, []);
    // const onUnmount = useCallback(function callback(map) {
    //     mapRef.current = undefined;
    // }, []);

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    // select place on the map
    const onPlaceSelect = useCallback((coordinates: { lat: number; lng: number }) => {
        setCenter(coordinates);
    }, []);

    // toggleModes
    const toggleModes = useCallback(() => {
        switch (mode) {
            case MODES.MOVE:
                setMode(MODES.SET_MARKET);
                break;
            case MODES.SET_MARKET:
                setMode(MODES.MOVE);
                break;
            default:
                setMode(MODES.MOVE);
        }
    }, [mode]);

    // set markers on the map
    const onMapClick = (location: any) => {
        if (MODES.SET_MARKET) {
            console.log(location);
        }
    };

    return (
        <div className={classes.mapsSection}>
            {isLoaded ? (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={8}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    options={defOptions}
                    onClick={onMapClick}
                >
                    {/* Child components, such as markers, info windows, etc. */}

                    <Marker
                        position={center}
                        icon={{ url: '/location.svg' }}
                        label={{ text: 'You are here!', color: '#fff' }}
                    />
                </GoogleMap>
            ) : (
                <h2>Maps not found</h2>
            )}
            <div className={classes.addressSearchContainer}>
                <PlacesAutocomplete isLoaded={isLoaded} onSelect={onPlaceSelect} />
                <Button variant="contained" onClick={toggleModes}>
                    Set
                </Button>
            </div>
        </div>
    );
};
