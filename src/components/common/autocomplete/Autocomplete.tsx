import React, { ChangeEvent, useEffect } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import classes from './Autocomplete.module.scss';

type TPlaceAutocomplete = {
    isLoaded: boolean;
    onSelect: (coordinates: { lat: number; lng: number }) => void;
};

export const PlacesAutocomplete: React.FC<TPlaceAutocomplete> = ({ isLoaded, onSelect }) => {
    const {
        ready,
        init,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        initOnMount: false,
        debounce: 300,
    });

    const ref = useOnclickOutside(() => {
        clearSuggestions();
    });

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleSelect =
        //@ts-ignore


            ({ description }) =>
            () => {
                setValue(description, false);
                clearSuggestions();

                // Get latitude and longitude via utility functions
                getGeocode({ address: description }).then(results => {
                    const { lat, lng } = getLatLng(results[0]);
                    console.log('📍 Coordinates: ', { lat, lng });
                    onSelect({ lat, lng }); //selected item for changing place ==> use as center point
                });
            };

    const renderSuggestions = () =>
        data.map(suggestion => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (
                <li key={place_id} onClick={handleSelect(suggestion)} className={classes.listItem}>
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
            );
        });

    useEffect(() => {
        if (isLoaded) {
            init();
        }
    }, [isLoaded, init]);

    return (
        <div ref={ref} className={classes.root}>
            <input
                className={classes.input}
                value={value}
                onChange={handleInput}
                disabled={!ready}
                placeholder="Choose your location"
            />
            {status === 'OK' && <ul className={classes.suggestions}>{renderSuggestions()}</ul>}
        </div>
    );
};
