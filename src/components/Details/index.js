'use client';

import React, { useContext } from 'react'
import useGetDetails from './hooks/useGetDetails';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import { useParams, useRouter } from 'next/navigation';
import { Button, CardContent, Typography } from '@mui/material';
import Rating from '@mui/material/Rating';

import { Actions } from './styles'
import { AppContext } from '@/context/AppContext';

const Details = () => {
    const params = useParams();
    const { push } = useRouter();

    const { store, setStore } = useContext(AppContext);
    const { cartItems } = store || {};

    const { data }= useGetDetails(params?.id);
    const { image, title, description, category, price, rating } = data || {};

    const handleRemoveFromCart = () => {
        const filteredList = cartItems.filter((item) => item.id !== data.id)
        setStore((prev) => ({
            ...prev,
            cartItems: filteredList,
        }));
    };

    const onClickAddToCartButton = () => {
        setStore((prev)=> {
            let tempCartItems = [...prev.cartItems];

            const isProductPresent = tempCartItems.some(_ => _.id === data?.id);

            if (isProductPresent) {
                tempCartItems = tempCartItems.map(_ => {
                    return {
                        ..._,
                        quantity: _.id === data?.id ? ((_.quantity || 0) + 1) : _.quantity,
                    };
                });
            } else {
                tempCartItems = [
                    ...tempCartItems,
                    { ...data, quantity: 1 }
                ];
            }

            return {
                ...prev,
                cartItems: tempCartItems 
            };
        });
    };

    const isAlreadyAdded = store?.cartItems?.some(_ => _.id === data?.id);

    return (
        <Container maxWidth="lg">
            <Box sx={{ height: '80vh' ,  display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%'}}>
                        <CardMedia
                            sx={{ width: '45%', height: 500, objectFit: "contain"  }}
                            component="img"
                            alt="Image"
                            image={image}
                        />
                    <CardContent sx={{ width: '50%' }}>
                        <Typography 
                            variant="h6" component="p" 
                            sx={{textTransform: 'Uppercase', fontFamily: "sans-serif", color: '#adb5bd', letterSpacing: '6px'}}>
                            {category}
                        </Typography>
                        <Typography variant="h4" component="p" sx={{marginTop: '12px', color: '#4d4d4d'}}>
                            {title}
                        </Typography>
                        <Typography component="div" sx={{fontWeight: '600', display: 'flex', alignItems: 'center', marginBlock: '12px'}}>
                       {rating?.rate && <Rating name="read-only" value={rating?.rate} precision={0.5} readOnly sx={{marginRight: "8px"}}/>} {rating?.rate} 
                        </Typography>
                        <Typography variant="h3" component="p"  sx={{marginBlock: '16px'}}>
                        INR {price}
                        </Typography>
                        <Typography variant="body1" component="p" sx={{color: '#6c757d', fontSize: '16px'}}>
                            {description}
                        </Typography>
                        <Actions>
                            {isAlreadyAdded 
                                ?
                                <div>
                                    <Button sx={{  color: '#000', marginRight: '16px' }} variant="outlined" onClick={handleRemoveFromCart}>
                                        Remove from Cart
                                    </Button> 
                                    <Button variant="contained" sx={{  color: '#fff', backgroundColor: '#000', marginRight: '12px' }} onClick={()=> push('/cart')}>Go to Cart</Button>
                                    <Button sx={{  color: '#fff', backgroundColor: '#000' }} className='go_to_cart' variant="contained" onClick={()=> push('/')}>
                                        Shop more
                                    </Button>
                                </div>
                                :
                                <div>
                                    <Button sx={{  color: '#fff', backgroundColor: '#000' }} className='go_to_cart' variant="contained" onClick={() => onClickAddToCartButton()}>
                                        Add to Cart
                                    </Button>
                                   
                                </div>
                            }
                        </Actions>
                    </CardContent>
            </Box>
        </Container>
    )
}

export default Details