import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
import { color } from '@mui/system';

export default function BackButton({}) {
  const navigate = useNavigate();

  return (
    <IconButton
      aria-label='back'
      size='small'
      onClick={() => {
        navigate(-1);
      }}
      color='inherit'
    >
      <ArrowBackIosIcon />
    </IconButton>
  );
}
