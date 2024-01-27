'use client';

import React, { useContext } from 'react'
import Button from '@mui/material/Button';
import { Typography } from '@mui/material'
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Badge from '@mui/material/Badge';
import { useRouter } from 'next/navigation';
import { AppContext } from '@/context/AppContext';
import styles from './styles.module.css'

const NavBar = () => {
    const { push } = useRouter();
    const { store } = useContext(AppContext);

    const { cartItems } = store || {};
    const addedItemsCount = cartItems.length;

    return (
      <div className={styles.nav_bar}>
          <Typography style={{cursor: 'pointer'}} variant="h4" onClick={()=> push('/')}>Fashion Store</Typography>

          <Badge badgeContent={addedItemsCount} color="primary">
              <Button  variant="text" startIcon={<LocalMallIcon/>} onClick={()=> push('/cart')} sx={{border: '.5px solid #000', color: '#000'}}>Cart</Button>
          </Badge>
      </div>
    )
}

export default NavBar