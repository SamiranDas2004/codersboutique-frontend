import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { setStatus } from '@/app/store/search';

export default function BasicSelect() {
  const {status} = useSelector(state => state.search);
  const dispatch = useDispatch()
  const handleChange = (event) => {
    dispatch(setStatus(event.target.value));
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Status"
          onChange={handleChange}
        >
          <MenuItem value={'Pending'}>Pending</MenuItem>
          <MenuItem value={'In Progress'}>In Progress</MenuItem>
          <MenuItem value={'Completed'}>Completed</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
