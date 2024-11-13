import { setName } from '@/app/store/search';
import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Search() {
  const {name} = useSelector(state => state.search)
  const dispatch = useDispatch();
  const handleChange = e => {
    dispatch(setName(e.target.value));
  }
  return (
    <TextField label="search by name" fullWidth value={name} onChange={handleChange} />
  )
}
