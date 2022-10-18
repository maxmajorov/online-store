import React, { useState } from 'react';
import { offices } from '../../const';
import { GoogleMaps } from '../maps/Maps';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import classes from './OfficesLocation.module.scss';
import { SelectComponent } from '../common/select/Select';
import { TCity } from '../../types';

export const OfficesLocation: React.FC = React.memo(() => {
    const [selectItem, setSelectItem] = useState<TCity>('Minsk');

    return (
        <div className={classes.locationSection}>
            <div className={classes.officesLocation}>
                <SelectComponent
                    selectItems={offices}
                    currentItem={selectItem}
                    setSelectItem={setSelectItem}
                />
                <div className={classes.officesList}>
                    {offices[selectItem].length ? (
                        offices[selectItem].map((office, ind) => (
                            <div key={ind} className={classes.officesItem}>
                                <div className={classes.title}>{office.point}</div>
                                <div className={classes.hours}>
                                    <AccessTimeIcon fontSize="small" />
                                    <div className={classes.hours_time}>
                                        sun-mon: {office.workingHours}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>Offices not found</div>
                    )}
                </div>
            </div>
            <GoogleMaps />
        </div>
    );
});
