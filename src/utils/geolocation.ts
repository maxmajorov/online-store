import { DEFAULT_LOCATION } from '../const';

type TReturn = {
    lat: number;
    lng: number;
};

export const getBrowserLocation = (): Promise<TReturn> => {
    return new Promise((res, rej) => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                pos => {
                    const { latitude: lat, longitude: lng } = pos.coords;
                    res({ lat, lng });
                },
                () => {
                    rej(DEFAULT_LOCATION);
                },
            );
        } else {
            rej(DEFAULT_LOCATION);
        }
    });
};
