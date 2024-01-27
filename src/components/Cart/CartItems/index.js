import { useContext } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Item, CountInput, Container } from './styles';
import { CardMedia } from '@mui/material';
import { AppContext } from '@/context/AppContext';

const CartItems = ({ item }) => {
  const { store, setStore } = useContext(AppContext);

  const { cartItems, wishList } = store || {};

  const decrement = (e) => {
    e.stopPropagation();

    setStore(prev => {
      return {
        ...prev,
        cartItems: (prev.cartItems || []).reduce((acc, cv) => {
          const quantity = (cv?.quantity || 0) - 1;

          if (cv.id === item.id && quantity <= 0) {
            return [...acc];
          }

          return [
            ...acc,
            { ...cv, quantity: cv.id === item.id ? quantity : cv.quantity }
          ];
        }, [])
      };
    });
  };

  const increment = (e) => {
    e.stopPropagation();

    setStore(prev => {
      return {
        ...prev,
        cartItems: (prev.cartItems || []).reduce((acc, cv) => {
          const quantity = (cv?.quantity || 0) + 1;

          if (cv.id === item.id && quantity > 10) {
            alert('can not be more than 10');

            return [...acc, cv];
          }

          return [
            ...acc,
            { ...cv, quantity: cv.id === item.id ? quantity : cv.quantity }
          ];
        }, [])
      };
    });
  };

  const isFavourite = wishList.filter((val) => val.id === item.id).length > 0;

  const handleAddToWishList = () => {
    setStore((prev)=> ({...prev, wishList: [...prev?.wishList, item] }));
  }

  const handleRemoveFromWishList = () => {
    const filteredItems = wishList.filter((val) => val.id !== item.id);
    setStore((prev)=> ({...prev, wishList: filteredItems }));
  }

  const handleRemoveFromCart = () => {
    const filteredItems = cartItems.filter((val) => val.id !== item.id);
    setStore((prev)=> ({...prev, cartItems: filteredItems }));
  }

  const quantity = store?.cartItems.find(_ => _?.id === item?.id)?.quantity || 0;

  return (
    <Container container key={item.id}>
      <Grid item xs={2}>
        <Item>
          <CardMedia
            sx={{ height: 100, objectFit: "contain" }}
            component="img"
            alt={item.name}
            image={item.image}
          />
        </Item>
      </Grid>
      <Grid item xs={4} sx={{ display:'flex', flexDirection: 'column', paddingLeft: '12px' }}>
      <Typography variant="overline" display="block" sx={{ textAlign: 'left', color: '#8d99ae'}}>
        {item.category}
      </Typography>
        <Typography variant="overline" display="block" sx={{ lineHeight: '1.5', textAlign: 'left' }}>
        {item.title}
      </Typography>
      </Grid>
      <Grid item xs={2} sx={{ display:'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CountInput>
          <RemoveIcon onClick={decrement} size='small' sx={{ cursor: 'pointer' }}/>
          {quantity}
          <AddIcon onClick={increment} size='small' sx={{ cursor: 'pointer' }}/>
        </CountInput>
      </Grid>
      <Grid item xs={2} sx={{ display:'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Item>INR {(item.price * quantity).toFixed(2)}</Item>
      </Grid>
      <Grid item xs={2} sx={{ display:'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Item>
          <FavoriteIcon sx={{ marginRight: '20px', color: isFavourite ? 'red' : '#000', cursor: 'pointer'   }} onClick={isFavourite ? handleRemoveFromWishList : handleAddToWishList}/>
          <CloseIcon onClick={handleRemoveFromCart} sx={{ cursor: 'pointer' }}/>
        </Item>
      </Grid>
    </Container>
  );
};

export default CartItems