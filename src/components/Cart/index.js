import { useContext } from 'react';
import { AppContext } from '@/context/AppContext';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CartItems from './CartItems';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const Cart = () => {
  const { store, setStore } = useContext(AppContext);
  const { push } = useRouter();
  const { cartItems } = store || {};

  const loadScript = (src) => {
    return new Promise((resovle) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resovle(true);
      };

      script.onerror = () => {
        resovle(false);
      };

      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (amount) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("You are offline... Failed to load Razorpay SDK");
      return;
    }

    const options = {
      key: "rzp_test_brNvd8q3AZOoId",
      currency: "INR",
      amount: amount * 100,
      name: "FashionStore",
      description: "Thanks for purchasing",
      image: "",

      handler: function (response) {
        alert("Payment Successfully", response.razorpay_payment_id);
        push('/');

        setTimeout(() => {
          setStore({ productList: [], cartItems: [], wishList: [] });
        }, 1000);
      },
      prefill: {
        name: "FashionStore",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const totalAmount = cartItems.reduce((acc, curr) => acc + (curr?.price * curr?.quantity), 0);

  return (
      <Container maxWidth="md" sx={{ border: '1px solid', borderRadius: "4px", marginTop: '20px', padding: '20px 0 12px 0' }}>
          {cartItems.map((item)=> <CartItems key={item?.id} item={item} />)}
          
          <Typography variant="h4" sx={{ textAlign: 'right' }}>
              Total: INR {(totalAmount || 0).toFixed(2)}
          </Typography>

          <Typography sx={{ textAlign: 'right' }}>
           <Button onClick={() => displayRazorpay(totalAmount || '200')} sx={{ fontSize: '18px' }}>
                BUY NOW
          </Button>
          </Typography>
      </Container>
  );
};

export default Cart;