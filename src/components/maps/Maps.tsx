import React, { useState, useCallback, useRef } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
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
};

export const GoogleMaps = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_MAPS_API_KEY ? GOOGLE_MAPS_API_KEY : '', //string | ''
        libraries: ['places'],
    });

    const [map, setMap] = useState(null);

    // const mapRef = useRef(undefined);
    // const onLoad = useCallback(function callback(map) {
    //     mapRef.current = map;
    // }, []);
    // const onUnmount = useCallback(function callback(map) {
    //     mapRef.current = undefined;
    // }, []);

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(defCenter);
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    return (
        <div>
            {isLoaded ? (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={defCenter}
                    zoom={8}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    options={defOptions}
                >
                    {/* Child components, such as markers, info windows, etc. */}
                    <></>
                </GoogleMap>
            ) : (
                <h2>Maps not found</h2>
            )}
        </div>
    );
};
