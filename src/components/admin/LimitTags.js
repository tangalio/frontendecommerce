import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
function LimitTags(props) {
    const top100Films = props.Films;
    return (
        <div>
            <Autocomplete
                multiple
                limitTags={2}
                id="multiple-limit-tags"
                options={top100Films}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                    <TextField {...params} label="Size" placeholder="Add Size" />
                )}
                sx={{ width: '100%' }}
            />
        </div>

    );
}
export default LimitTags;

