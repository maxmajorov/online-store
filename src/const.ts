export const PATH = {
    LOCATION: '/location',
    CART: '/cart',
    CATALOG: '/catalog',
    RETRO_CARS: '/retro-cars',
    ALL_RAOD_CARS: '/all-road-cars',
    RACING: '/racing-cars',
    DRIFT_CARS: '/drift-cars',
    SUPERCARS: '/supercars',
    TRUCKS: '/trucks',
    PARTS: '/parts',
};

export enum menuItems {
    'Home' = 'Home/',
    'All' = 'All catalog/catalog',
    'Retro' = 'Retro/retro-cars',
    'All Road' = 'All Road/all-road-cars',
    'Racing' = 'Racing/racing-cars',
    'Drift' = 'Drift/drift-cars',
    'Supercar' = 'Supercars/supercars',
    'Trucks' = 'Trucks/trucks',
    Parts = 'Parts/parts',
}

export enum Promocodes {
    summer = 'summer/5',
    winter = 'winter/10',
    autumn = 'autunm/7',
    spring = 'spring/8',
    holidays = 'holidays/15',
}

export const deliveryTimes = [
    {
        value: '11.00 - 13.00',
    },
    {
        value: '13.00 - 15.00',
    },
    {
        value: '15.00 - 17.00',
    },
    {
        value: '17.00 - 19.00',
    },
    {
        value: '19.00 - 21.00',
    },
];

export const pickupPoints = [
    {
        point: 'Partizanskaya st, 128',
        workingHours: '09.00 - 21.00',
        location: { lat: 53.8654, lng: 27.6596 },
    },
    {
        point: 'Tashkentskaya st, 19',
        workingHours: '09.00 - 21.00',
        location: { lat: 53.8447, lng: 27.6289 },
    },
    {
        point: 'Dzianisayskaya st, 8',
        workingHours: '10.00 - 22.00',
        location: { lat: 53.8714, lng: 27.5725 },
    },
    {
        point: 'Derzhinskogo pr, 104-2',
        workingHours: '09.00 - 21.00',
        location: { lat: 53.8631, lng: 27.483 },
    },
    {
        point: 'Pobeditelej pr, 65',
        workingHours: '09.00 - 21.00',
        location: { lat: 53.926, lng: 27.517 },
    },
];

export const DEFAULT_LOCATION = {
    lat: 53.9,
    lng: 27.559,
};

export const paymentMethods = ['Payment upon receipt', 'Online payment'];

export const shippingCost = 1.2;
