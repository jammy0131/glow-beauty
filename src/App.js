import React, { useState, useEffect } from 'react';
import Login from './Login';
import Register from './Register';
import Header from './Header';
import Gallery from './Gallery';
import Dashboard from './Dashboard';
import Cart from './Cart';
import Checkout from './Checkout';
import Payment from './Payment';
import Receipt from './Receipt';
import ReviewModal from './ReviewModal';
import CustomerService from './CustomerService';
import TrackOrder from './TrackOrder';
import ChatBox from './ChatBox';

const loadCSS = (href) => {
  if (!document.querySelector(`link[href="${href}"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }
};

export default function App() {
  useEffect(() => {
    loadCSS('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');
    loadCSS('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css');
    loadCSS('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css');
  }, []);

  // --- STATES WITH LOCALSTORAGE SYNC ---
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('glow_is_logged_in') === 'true');
  
  // FIX: Default to 'login' para laging login screen ang una
  const [authMode, setAuthMode] = useState('login'); 
  
  const [registeredUser, setRegisteredUser] = useState(() => {
    const savedAccount = localStorage.getItem('glow_user_account');
    return savedAccount ? JSON.parse(savedAccount) : null;
  });

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('glow_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [lastOrder, setLastOrder] = useState(() => {
    const savedLastOrder = localStorage.getItem('glow_last_order');
    return savedLastOrder ? JSON.parse(savedLastOrder) : [];
  });

  const [activeOrderId, setActiveOrderId] = useState(() => localStorage.getItem('glow_active_order_id') || '');
  
  // Persistence para sa view para hindi bumabalik sa gallery pag nag-refresh
  const [view, setView] = useState(() => localStorage.getItem('glow_current_view') || 'gallery');
  
  const [showCart, setShowCart] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeRider, setActiveRider] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [orderData, setOrderData] = useState(() => {
    const savedData = localStorage.getItem('glow_order_data');
    return savedData ? JSON.parse(savedData) : { name: '', phone: '', address: '' };
  });
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [paymentMethod, setPaymentMethod] = useState('GCash');
  const [paymentRef, setPaymentRef] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem('glow_beauty_reviews');
    return savedReviews ? JSON.parse(savedReviews) : [
      { id: 1, productId: 1, userName: "Maria Clara", rating: 5, comment: "Very refreshing!", isUser: false }
    ];
  });

  // --- PERSISTENCE EFFECTS ---
  useEffect(() => { localStorage.setItem('glow_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { 
    localStorage.setItem('glow_last_order', JSON.stringify(lastOrder)); 
    localStorage.setItem('glow_active_order_id', activeOrderId);
  }, [lastOrder, activeOrderId]);
  useEffect(() => { localStorage.setItem('glow_current_view', view); }, [view]);
  useEffect(() => { localStorage.setItem('glow_beauty_reviews', JSON.stringify(reviews)); }, [reviews]);
  useEffect(() => { localStorage.setItem('glow_order_data', JSON.stringify(orderData)); }, [orderData]);

  const showNotification = (msg, type = 'success') => {
    setToast({ show: true, message: msg, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  // --- HANDLERS ---
  const handleRegister = (data) => {
    const newUser = { username: data.username, password: data.password };
    setRegisteredUser(newUser);
    localStorage.setItem('glow_user_account', JSON.stringify(newUser));
    showNotification("Account created! You can now login.");
    setAuthMode('login');
  };

  const handleLogin = (username, password) => {
    if (!registeredUser) {
      showNotification("Walang record. Mag-register muna!", "danger");
      setAuthMode('register');
      return;
    }
    if (username.trim() === registeredUser.username && password === registeredUser.password) {
      localStorage.setItem('glow_is_logged_in', 'true');
      setIsLoggedIn(true);
      setView('gallery');
      showNotification(`Welcome back, ${username}!`);
    } else {
      showNotification("Mali ang Username o Password!", "danger");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('glow_is_logged_in');
    localStorage.removeItem('glow_active_order_id');
    localStorage.removeItem('glow_current_view');
    
    // Linisin ang lahat ng progress data para sa tracking
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('glow_step_progress_')) localStorage.removeItem(key);
    });

    setIsLoggedIn(false);
    setAuthMode('login');
    setCart([]);
    setActiveOrderId('');
    setIsChatOpen(false);
    setActiveRider('');
    setView('gallery');
    showNotification("Logged out successfully.");
  };

  const handleAddToCart = (p) => {
    const exists = cart.find(item => item.id === p.id);
    if (exists) {
      setCart(cart.map(item => item.id === p.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...p, quantity: 1 }]);
    }
    showNotification(`${p.name} added to cart!`);
  };

  const handleConfirmPayment = (ref) => {
    const generatedId = "GLW-" + Math.floor(10000 + Math.random() * 90000);
    
    // FIX: Consistent key naming para sa TrackOrder.js
    localStorage.setItem(`glow_step_progress_${generatedId}`, "0");
    localStorage.setItem('glow_active_order_id', generatedId);

    setActiveOrderId(generatedId);
    setPaymentRef(ref);
    setLastOrder([...cart]);
    setCart([]);
    setView('receipt');
    showNotification("Payment confirmed! Tracking enabled.");
  };

  // --- RENDER LOGIC ---
  if (!isLoggedIn) {
    return authMode === 'login' ? (
      <Login onLogin={handleLogin} onSwitch={() => setAuthMode('register')} />
    ) : (
      <Register onRegister={handleRegister} onSwitch={() => setAuthMode('login')} />
    );
  }

  const subtotal = lastOrder.reduce((s, i) => s + (i.price * i.quantity), 0);
  const shippingFee = (subtotal >= 500 || subtotal === 0) ? 0 : 45;
  const totalAmount = subtotal + shippingFee;

  return (
    <div style={{ backgroundColor: '#fdfaf6', minHeight: '100vh' }}>
      <Header 
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)} 
        setView={setView} 
        setShowCart={setShowCart} 
        onLogout={handleLogout}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        hasActiveOrder={!!activeOrderId}
      />

      {showCart && (
        <Cart 
          cart={cart} 
          setShowCart={setShowCart} 
          updateQty={(id, delta) => setCart(cart.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item))}
          removeFromCart={(id) => {
            setCart(cart.filter(item => item.id !== id));
            showNotification("Removed from cart.", "danger");
          }}
          onCheckout={() => { setShowCart(false); setView('checkout'); }}
        />
      )}

      <div className="container py-5">
        {view === 'gallery' && (
          <Gallery 
            onSelectProduct={(p) => { setSelectedProduct(p); setView('dashboard'); }} 
            onAddToCart={handleAddToCart}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
          />
        )}

        {view === 'dashboard' && selectedProduct && (
          <Dashboard 
            product={selectedProduct} 
            reviews={reviews}
            onBack={() => setView('gallery')} 
            onAddToCart={handleAddToCart}
            onWriteReview={() => setShowReviewModal(true)}
            onDeleteReview={(id) => setReviews(reviews.filter(r => r.id !== id))}
          />
        )}

        {view === 'checkout' && (
          <Checkout 
            orderData={orderData} 
            setOrderData={setOrderData} 
            onContinue={() => {
              if(!orderData.name.trim() || !orderData.phone.trim() || !orderData.address.trim()) {
                showNotification("Please fill up all delivery details!", "danger");
                return;
              }
              setView('payment');
            }} 
          />
        )}

        {view === 'payment' && <Payment paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} onConfirm={handleConfirmPayment} />}

        {view === 'receipt' && (
          <Receipt 
            cart={lastOrder} 
            total={totalAmount} 
            shippingFee={shippingFee}
            onReturn={() => { setView('gallery'); setPaymentRef(''); }} 
            paymentRef={paymentRef}
            deliveryDetails={orderData}
            orderId={activeOrderId}
            onTrackOrder={() => setView('track-order')}
          />
        )}

        {view === 'track-order' && (
          activeOrderId ? (
            <TrackOrder 
              orderId={activeOrderId} 
              customerName={orderData.name}
              lastOrder={lastOrder} 
              onBack={() => setView('gallery')} 
              onOpenChat={(name) => {
                setActiveRider(name);
                setIsChatOpen(true);
              }}
            />
          ) : (
            <div className="text-center py-5">
              <i className="bi bi-cart-x display-1 text-muted"></i>
              <h4 className="mt-3">Bawal po! Mag-checkout muna bago mag-track.</h4>
              <button className="btn btn-primary mt-3" onClick={() => setView('gallery')}>Back to Shop</button>
            </div>
          )
        )}

        {view === 'report-damage' && (
          <CustomerService 
            preFilledOrderId={activeOrderId}
            onBack={() => setView('gallery')}
            onSubmitReport={() => {
              showNotification("Report submitted!");
              setView('gallery');
            }}
          />
        )}
      </div>

      {isChatOpen && (
        <ChatBox 
          riderName={activeRider} 
          onClose={() => setIsChatOpen(false)} 
        />
      )}

      {showReviewModal && (
        <ReviewModal 
          productId={selectedProduct?.id}
          onClose={() => setShowReviewModal(false)}
          onSave={(newReview) => {
            setReviews([newReview, ...reviews]);
            showNotification("Review posted!");
          }}
        />
      )}

      {/* TOAST SYSTEM */}
      {toast.show && (
        <div className="position-fixed bottom-0 end-0 p-3 animate__animated animate__fadeInUp" style={{ zIndex: 3000 }}>
          <div className={`toast show align-items-center text-white border-0 shadow-lg ${toast.type === 'success' ? 'bg-success' : 'bg-danger'}`} role="alert">
            <div className="d-flex">
              <div className="toast-body">
                <i className={`bi ${toast.type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} me-2`}></i>
                {toast.message}
              </div>
              <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => setToast({ ...toast, show: false })}></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}