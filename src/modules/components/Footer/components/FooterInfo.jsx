import { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import InfoIcon from '@mui/icons-material/Info'

export const FooterInfo = () => {

  return (
    <IconButton aria-label="info">
        <InfoIcon />
    </IconButton>
  )
}