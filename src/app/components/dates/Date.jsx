import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { setEndDate, setStartDate } from '@/app/store/search';
import dayjs from 'dayjs';

export default function BasicDatePicker({ label }) {
  const { startDate, endDate } = useSelector(state => state.search)
  const dispatch = useDispatch()
  const handleDate = e => {
    if (label === 'Start Date') dispatch(setStartDate(e.toDate()));
    else if (label === 'End Date') dispatch(setEndDate(e.toDate()));
  }
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer sx={{
        paddingTop: 0,
      }} components={['DatePicker']}>
        <DatePicker label={label} onChange={handleDate} value={label === 'Start Date' ? dayjs(startDate) : dayjs(endDate)} />
      </DemoContainer>
    </LocalizationProvider>
  );
}
