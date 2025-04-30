import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [products] = useState([
    {
      id: 1,
      name: 'T-Shirt',
      price: 900,
      image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Comfortable cotton T-shirt',
    },
    {
      id: 2,
      name: 'Makeup',
      price: 800,
      image: 'https://images.pexels.com/photos/208052/pexels-photo-208052.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Makeup products to look beautiful',
    },
    {
      id: 3,
      name: 'Phone Case',
      price: 80000,
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Protective phone case',
    },
    {
      id: 4,
      name: 'Pretty Gold Necklace',
      price: 5000,
      image: 'https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwb5fe97b8/images/hi-res/512313NCBAA00_2.jpg',
      description: 'Pretty Gold Necklace with layers',
    },
    {
      id: 5,
      name: 'Slow Fashion Coat Photo',
      price: 20000,
      image: 'https://img.freepik.com/premium-photo/cozy-oversized-gray-wool-coat-draped-effortlessly-showcasing-warmth-comfort-minimalist-ap_981101-85279.jpg',
      description: 'Handmade wool coat draped on dress form',
    },
    {
      id: 6,
      name: 'Black And White Sneakers',
      price: 1500,
      image: 'https://i.pinimg.com/736x/53/3a/17/533a17edd7e0f9fff51af62bc57858d8.jpg',
      description: 'Black and white fashion sneakers on a purple background',
    },
    {
      id: 7,
      name: 'Girl On Grassy Path',
      price: 1500,
      image: 'https://up.yimg.com/ib/th?id=OIP.0IOvyM4SYp_AHILXHwmaJgHaFW&pid=Api&rs=1&c=1&qlt=95&w=171&h=123',
      description: 'Girl in a pink dress walking down grassy path',
    },
    {
      id: 8,
      name: 'Wood Leather Watches',
      price: 2000,
      image: 'https://burst.shopifycdn.com/photos/wood-leather-watches.jpg?width=1000&format=pjpg&exif=0&iptc=0',
      description: 'Wood and leather watches on various backgrounds',
    },
    {
      id: 9,
      name: 'Rose Gold Wedding Ring',
      price: 200000,
      image: 'http://s3.weddbook.com/t4/2/4/2/2423724/vintage-bridal-set-morganite-engagement-ring-and-scalloped-diamond-wedding-band-in-14k-rose-gold-8x8mm-cushion-pink-morganite.jpg',
      description: 'Elegant rose gold wedding ring set',
    },
    {
      id: 10,
      name: 'Nursery Interior Design',
      price: 1000,
      image: 'http://st.hzcdn.com/simgs/ff21c257034f0eab_8-9480/transitional-nursery.jpg',
      description: 'Modern nursery design with toys and warm colors',
    },
    {
      id: 11,
      name: 'Stacked Bracelets',
      price: 2000,
      image: 'https://i.etsystatic.com/21436368/r/il/ff6794/3184946491/il_1588xN.3184946491_rc1n.jpg',
      description: 'Stacked gold bangle bracelets',
    },
    {
      id: 12,
      name: 'Flowers In Yellow Watering Can',
      price: 1000,
      image: 'https://st.depositphotos.com/1177973/1354/i/950/depositphotos_13542642-stock-photo-beautiful-bouquet-of-bright-flowers.jpg',
      description: 'Spring flowers in a bright yellow watering can',
    },
    {
      id: 13,
      name: 'Baby’s Room Decoration',
      price: 20000,
      image: 'https://www.thespruce.com/thmb/Yl1VQNu9NbZz1H0KbbqnEfDKt6I=/5120x0/filters:no_upscale():max_bytes(150000):strip_icc()/Soothing-Lavender-Nursery-56a6b2a15f9b58b7d0e45a46.jpg',
      description: 'Baby room with soft lighting and furniture',
    },
    {
      id: 14,
      name: 'Colorful Oil Lamps',
      price: 1000,
      image: 'https://img.freepik.com/premium-photo/colorful-clay-diya-lamps-lit-diwali-celebration_147325-2637.jpg',
      description: 'Colorful diya lamps used in celebration',
    },
    {
      id: 15,
      name: 'Natural Soap With Cucumber',
      price: 150,
      image: 'https://moolea.ch/wp-content/uploads/2023/06/cucumber-soap-2.jpg',
      description: 'Handmade soap next to fresh cucumber',
    },    
  ]);

  const [cart, setCart] = useState([]);
  const [currentView, setCurrentView] = useState('login');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [user, setUser] = useState({ name: '', phone: '', address: '' });
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ email: '', password: '' });

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  const viewProduct = (product) => {
    setSelectedProduct(product);
    setCurrentView('productDetails');
  };

  const getTotal = () => cart.reduce((total, item) => total + item.price, 0);

  const handleContinue = () => setCurrentView('checkout');

  const handleUserInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
      <header className="header">
        <h1 onClick={() => setCurrentView('home')}>PrintMine</h1>
        {currentView !== 'login' && currentView !== 'signup' && (
          <button onClick={() => setCurrentView('cart')}>Cart ({cart.length})</button>
        )}
      </header>

      <main>
        {currentView === 'login' && (
          <div className="auth-form">
            <h2>Login</h2>
            <input type="email" placeholder="Email" onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
            <input type="password" placeholder="Password" onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
            <button onClick={() => setCurrentView('home')}>Login</button>
            <p>Don't have an account? <span onClick={() => setCurrentView('signup')}>Sign up</span></p>
          </div>
        )}

        {currentView === 'signup' && (
          <div className="auth-form">
            <h2>Sign Up</h2>
            <input type="email" placeholder="Email" onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} />
            <input type="password" placeholder="Password" onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} />
            <button onClick={() => setCurrentView('home')}>Sign Up</button>
            <p>Already have an account? <span onClick={() => setCurrentView('login')}>Login</span></p>
          </div>
        )}

        {currentView === 'home' && (
          <div className="product-list">
            {products.map((product) => (
              <div key={product.id} className="product-card" onClick={() => viewProduct(product)}>
                <img src={product.image} alt={product.name} />
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>₹{product.price}</p>
                <button onClick={(e) => { e.stopPropagation(); addToCart(product); }}>Add to Cart</button>
              </div>
            ))}
          </div>
        )}

        {currentView === 'productDetails' && selectedProduct && (
          <div className="product-details fade-in">
            <img src={selectedProduct.image} alt={selectedProduct.name} />
            <h2>{selectedProduct.name}</h2>
            <p>{selectedProduct.description}</p>
            <p>₹{selectedProduct.price}</p>
            <button onClick={() => addToCart(selectedProduct)}>Add to Cart</button>
            <button onClick={() => setCurrentView('home')}>Back</button>
          </div>
        )}

        {currentView === 'cart' && (
          <div className="cart fade-in">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
              <p>Cart is empty</p>
            ) : (
              <>
                <ul>
                  {cart.map((item, i) => (
                    <li key={i}>{item.name} - ₹{item.price}</li>
                  ))}
                </ul>
                <p>Total: ₹{getTotal()}</p>
                <button onClick={handleContinue}>Continue to Checkout</button>
              </>
            )}
          </div>
        )}

        {currentView === 'checkout' && (
          <div className="checkout fade-in">
            <h2>Checkout Details</h2>
            <input type="text" name="name" placeholder="Full Name" onChange={handleUserInput} />
            <input type="text" name="phone" placeholder="Phone Number" onChange={handleUserInput} />
            <textarea name="address" placeholder="Shipping Address" onChange={handleUserInput}></textarea>
            <button onClick={() => alert('Order placed successfully!')}>Place Order</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
