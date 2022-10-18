import React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TCity } from '../../../types';

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: string, item: string, theme: Theme) {
    return {
        fontWeight:
            item.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

type TSelectComponent = {
    selectItems: any;
    currentItem: string;
    setSelectItem: (selectItem: TCity) => void;
};

export const SelectComponent: React.FC<TSelectComponent> = ({
    currentItem,
    setSelectItem,
    selectItems,
}) => {
    const theme = useTheme();

    const handleChange = (event: SelectChangeEvent<typeof currentItem>) => {
        setSelectItem(event.target.value as TCity);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
                <Select
                    size="small"
                    displayEmpty
                    value={currentItem}
                    onChange={handleChange}
                    input={<OutlinedInput />}
                    MenuProps={MenuProps}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    {Object.keys(selectItems).map(item => (
                        <MenuItem
                            key={item}
                            value={item}
                            style={getStyles(item, currentItem, theme)}
                        >
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};
