import React, { useState } from 'react';

const loadCSS = (href) => {
    if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    }
};
loadCSS('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');
loadCSS('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css');

// ==========================================
// MOCK DATA - EXPANDED TO 20 PRODUCTS (₱)
// ==========================================
const initialProducts = [
    { id: 1, name: "Hydrating Glow Serum", category: "Skincare", price: 1250, badge: "New", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80" },
    { id: 2, name: "Velvet Matte Lipstick", category: "Makeup", price: 550, badge: "Best Seller", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=80" },
    { id: 3, name: "Crystal Face Roller", category: "Tools", price: 890, badge: "Limited", image: "https://images.unsplash.com/photo-1714176774596-45946a7325fd?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 4, name: "Night Repair Cream", category: "Skincare", price: 2100, badge: "Popular", image: "https://images.unsplash.com/photo-1630854984065-dcf945c6f47d?q=80&w=799&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 5, name: "Precision Eyeliner", category: "Makeup", price: 350, badge: "New", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZP862WHQ9bhd2-AcVpmOi3m4v1D1XXr_Bsg&s" },
    { id: 6, name: "Professional Brush Set", category: "Tools", price: 1800, badge: "Essentials", image: "https://images.unsplash.com/photo-1600228390270-970186129936?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    // ADDITIONAL 14 PRODUCTS
    { id: 7, name: "Lavender Body Scrub", category: "Body Care", price: 420, badge: "Eco", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCwQl7W5reRWq5b6jeGE1d7qwNhjmSqtC5QQ&s" },
    { id: 8, name: "Sun Protection SPF 50", category: "Skincare", price: 680, badge: "Top Rated", image: "https://k2pharmacy.ph/cdn/shop/files/NiveaSunProtectandMoistureSpf50125mL1_batcheditor_fotor_grande.jpg?v=1724046560" },
    { id: 9, name: "Midnight Rose Perfume", category: "Fragrance", price: 3200, badge: "Luxury", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLOAkhp5HG_6bSf8pOM3b8WO20sHcjmpm6pA&s" },
    { id: 10, name: "Volumizing Mascara", category: "Makeup", price: 480, badge: "New", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM_RA1UUwXa3PT2l4LeVDb_u1Af6e9sKvdbQ&s" },
    { id: 11, name: "Argan Oil Hair Mask", category: "Hair Care", price: 950, badge: "Best Seller", image: "https://images.unsplash.com/photo-1667242003572-96caaf8ac5c4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 12, name: "Refreshing Toner", category: "Skincare", price: 320, badge: "Sale", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf_M6jkDXdgtg9I9-ryQ0itOUhIGw68_IU8w&s" },
    { id: 13, name: "Peach Blossom Blush", category: "Makeup", price: 590, badge: "New", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2zPy10ywTG_mKZZSYcK_E52XlhcPAXfg5Qg&s" },
    { id: 14, name: "Vitamin C Serum", category: "Skincare", price: 1450, badge: "Trending", image: "https://images.unsplash.com/photo-1723951174326-2a97221d3b7f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 15, name: "Electric Facial Cleanser", category: "Tools", price: 2800, badge: "High Tech", image: "https://i5.walmartimages.com/seo/Electric-Facial-Cleansing-Brush-System-Battery-Operated-Face-Cleanser-Spin-Massager-w-5-Heads_c933e1e5-ee12-4b3b-af74-ce5935adad43_1.2ed11377aa0c9bb5d365b64e6198aa3a.jpeg" },
    { id: 16, name: "Citrus Body Wash", category: "Body Care", price: 380, badge: "Fresh", image: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/cmo/cmo00444/l/28.jpg" },
    { id: 17, name: "Coconut Hair Serum", category: "Hair Care", price: 720, badge: "Eco", image: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/pal/pal03320/l/62.jpg" },
    { id: 18, name: "Setting Spray 24h", category: "Makeup", price: 850, badge: "Long Lasting", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSre96KiorpcmYyy4TH0i7fd-dPGW7Wa7x1RQ&s" },
    { id: 19, name: "Cooling Eye Gel", category: "Skincare", price: 520, badge: "Must Have", image: "https://m.media-amazon.com/images/I/71kknn-6BlL.jpg" },
    { id: 20, name: "Nourishing Hand Cream", category: "Body Care", price: 290, badge: "Small", image: "https://media.amway.com.ph/sys-master/images/h2f/h0a/10696580825118/125902-en-US-1800px-01_amway-WF_Product_588Wx588H" }
];

// Palitan mo ito sa taas
const backdropStyle = {
    position: 'fixed', top: 0, left: 0, 
    width: '100vw', height: '100vh', // Ginawang sakto sa screen
    backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 2000,
    display: 'flex', alignItems: 'center', justifyContent: 'center'
};

const AuthPage = ({ onLogin }) => (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light px-3">
        <div className="card border-0 shadow-lg p-4 p-md-5 rounded-4 text-center" style={{ maxWidth: '450px', width: '100%' }}>
            <div className="mb-4 d-flex justify-content-center">
                {/* Binabaan ang 800% dahil ito ang madalas mag-cause ng blank screen */}
                <img src="beauty logo.png" alt="Logo" style={{ maxWidth: '800px', height: 'auto' }} /> 
            </div>
            <form onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
                <input type="text" className="form-control rounded-pill py-3 mb-3 border-light bg-light shadow-sm" placeholder="Username" required />
                <input type="password" className="form-control rounded-pill py-3 mb-4 border-light bg-light shadow-sm" placeholder="Password" required />
                <button type="submit" className="btn w-100 py-3 rounded-pill fw-bold text-white shadow-sm" style={{ backgroundColor: '#b0926a' }}>ENTER STORE</button>
            </form>
        </div>
    </div>
);
const Header = ({ cartCount, setView, setShowCart, selectedCategory, setSelectedCategory, onLogout }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const categories = ['All Categories', 'Skincare', 'Makeup', 'Tools', 'Body Care', 'Fragrance', 'Hair Care'];
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm py-3 px-4">
            <div className="container-fluid">
                <span className="navbar-brand fw-bold fs-3" onClick={() => setView('gallery')} style={{ cursor: 'pointer', color: '#b0926a' }}>
                    GLOW BEAUTY  <i className="bi bi-sparkles"></i>
                </span>
                <div className="d-flex align-items-center">
                    <div className="dropdown me-3">
                        <button className="btn btn-light rounded-pill px-4" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                            {selectedCategory} <i className="bi bi-chevron-down ms-1"></i>
                        </button>
                        <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''} shadow border-0 mt-2`} style={{ position: 'absolute' }}>
                            {categories.map(cat => (
                                <li key={cat}><button className="dropdown-item" onClick={() => { setSelectedCategory(cat); setIsDropdownOpen(false); setView('gallery'); }}>{cat}</button></li>
                            ))}
                        </ul>
                    </div>
                    <button className="btn btn-light rounded-circle position-relative border shadow-sm me-3" onClick={() => setShowCart(true)}>
                        <i className="bi bi-bag fs-5"></i>
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{cartCount}</span>
                    </button>
                    <button className="btn btn-outline-danger rounded-circle shadow-sm" onClick={onLogout}><i className="bi bi-box-arrow-right"></i></button>
                </div>
            </div>
        </nav>
    );
};

const Gallery = ({ products, onSelectProduct, onAddToCart, searchQuery, setSearchQuery }) => (
    <>
        <div className="p-5 mb-5 text-center shadow-sm text-white rounded-5" style={{ backgroundColor: '#b0926a' }}>
            <h1 className="fw-bold display-4 mb-4">Summer Radiance Collection</h1>
            <input type="text" className="form-control form-control-lg rounded-pill border-0 shadow-sm mx-auto" style={{ maxWidth: '600px' }} placeholder="Search from our 20+ products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <div className="row g-4">
            {products.map(p => (
                <div key={p.id} className="col-md-4 col-lg-3">
                    <div className="card h-100 border-0 shadow-sm p-3 rounded-4 product-card" onClick={() => onSelectProduct(p)} style={{ cursor: 'pointer' }}>
                        <img src={p.image} alt={p.name} className="rounded-4 mb-3" style={{ height: '200px', objectFit: 'cover' }} />
                        <h6 className="fw-bold mb-1 text-truncate">{p.name}</h6>
                        <p className="text-muted small mb-3">{p.category}</p>
                        <div className="d-flex justify-content-between align-items-center mt-auto">
                            <span className="fw-bold text-primary">₱{p.price.toLocaleString()}</span>
                            <button className="btn btn-dark btn-sm rounded-pill px-3" onClick={(e) => { e.stopPropagation(); onAddToCart(p); }}>Add</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </>
);

const Dashboard = ({ product, reviews, onBack, onAddToCart, onWriteReview, onDeleteReview }) => {
    const productReviews = reviews.filter(r => r.productId === product.id);
    return (
        <div className="mt-4">
            <button className="btn btn-link text-muted p-0 mb-4 text-decoration-none" onClick={onBack}><i className="bi bi-arrow-left me-2"></i>Back to Gallery</button>
            <div className="row">
                <div className="col-lg-7">
                    <div className="bg-white border rounded-5 shadow-sm p-5 text-center d-flex align-items-center justify-content-center" style={{ minHeight: '400px' }}>
                         <img src={product.image} alt={product.name} className="img-fluid rounded-4" style={{maxHeight: '550px'}} />
                    </div>
                </div>
                <div className="col-lg-5 ps-lg-5 mt-4 mt-lg-0">
                    <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2 mb-3 fw-bold">{product.category}</span>
                    <h1 className="fw-bold display-6 mb-2">{product.name}</h1>
                    <p className="fw-bold display-6 mb-4 text-primary">₱{product.price.toLocaleString()}</p>
                    <button className="btn w-100 py-3 rounded-pill fw-bold text-white shadow-lg mb-5" style={{ backgroundColor: '#1a2a3a' }} onClick={() => onAddToCart(product)}>Add to Bag</button>
                    
                    <h6 className="fw-bold mb-3">Community Reviews</h6>
<div className="bg-white p-4 rounded-4 border shadow-sm mb-4">
    {/* Binago ang 00px sa 300px */}
    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {productReviews.length === 0 ? (
            <p className="text-muted fst-italic small">No reviews yet.</p>
        ) : (
            productReviews.map(rev => (
                <div key={rev.id} className="border-bottom mb-4 pb-3 position-relative">
                    <div className="d-flex justify-content-between align-items-start">
                        <div className="w-100">
                            <div className="text-warning small mb-1">
                                {[...Array(5)].map((_, i) => (
                                    <i key={i} className={`bi ${i < rev.rating ? 'bi-star-fill' : 'bi-star'}`}></i>
                                ))}
                            </div>
                            <div className="fw-bold text-dark mb-1" style={{fontSize: '0.85rem'}}>
                                {rev.userName}
                            </div>
                            <p className="text-muted mb-0 small">"{rev.comment}"</p>
                        </div>
                        {/* Lalabas lang ang delete button kung isUser ay true */}
                        {rev.isUser && (
                            <button 
                                className="btn btn-sm text-danger" 
                                onClick={() => onDeleteReview(rev.id)}
                            >
                                <i className="bi bi-trash"></i>
                            </button>
                        )}
                    </div>
                </div>
            ))
        )}
    </div>
</div>
                    <button className="btn btn-outline-primary w-100 py-3 rounded-pill fw-bold" onClick={onWriteReview}>
                        <i className="bi bi-pencil-square me-2"></i>Write a Review
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [view, setView] = useState('gallery');
    const [showCart, setShowCart] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [cart, setCart] = useState([]);
    const [lastOrder, setLastOrder] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [paymentMethod, setPaymentMethod] = useState('GCash');
    const [orderData, setOrderData] = useState({ name: '', phone: '', address: '' });

    const [reviews, setReviews] = useState([
        { id: 1, productId: 1, userName: "Maria Clara", rating: 5, comment: "Very refreshing and light on the skin.", isUser: false }
    ]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [reviewerName, setReviewerName] = useState("");

    const updateQty = (id, delta) => setCart(cart.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
    const addToCart = (product) => {
        const existing = cart.find(i => i.id === product.id);
        if (existing) updateQty(product.id, 1);
        else setCart([...cart, { ...product, quantity: 1 }]);
        alert('Added to Bag!');
    };

    const handleAddReview = () => {
        if(!reviewerName.trim() || !comment.trim()) return alert("Please fill in your name and comment.");
        const newReview = { id: Date.now(), productId: selectedProduct.id, userName: reviewerName, rating: rating, comment: comment, isUser: true };
        setReviews([newReview, ...reviews]);
        setComment(""); setReviewerName(""); setRating(5); setShowReviewModal(false);
    };

    const filtered = initialProducts.filter(p => (selectedCategory === 'All Categories' || p.category === selectedCategory) && p.name.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!isLoggedIn) return <AuthPage onLogin={() => setIsLoggedIn(true)} />;

    return (
        <div style={{ backgroundColor: '#fdfaf6', minHeight: '100vh' }}>
            <Header cartCount={cart.reduce((s, i) => s + i.quantity, 0)} setView={setView} setShowCart={setShowCart} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} onLogout={() => setIsLoggedIn(false)} />
            
            {showCart && (
                <div style={backdropStyle}>
                    <div className="bg-white p-4 rounded-5 shadow-lg" style={{ width: '100%', maxWidth: '680px' }}>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="fw-bold m-0"><i className="bi bi-bag me-2"></i>My Bag</h4>
                            <button className="btn-close" onClick={() => setShowCart(false)}></button>
                        </div>
                        {cart.length === 0 ? <p className="text-center py-5 text-muted">Empty bag.</p> : (
                            <div>
                                <div style={{maxHeight: '350px', overflowY: 'auto'}} className="px-1">
                                    {cart.map((item) => (
                                        <div key={item.id} className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3">
                                            <div className="d-flex align-items-center">
                                                <img src={item.image} alt={item.name} className="rounded-3 me-3" style={{width: '200px', height: '200px', objectFit: 'cover'}} />
                                                <div>
                                                    <h6 className="mb-0 fw-bold small">{item.name}</h6>
                                                    <small className="text-muted">₱{item.price.toLocaleString()}</small>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <div className="btn-group border rounded-pill me-3 bg-light">
                                                    <button className="btn btn-sm" onClick={() => updateQty(item.id, -1)}>-</button>
                                                    <span className="px-2 align-self-center small">{item.quantity}</span>
                                                    <button className="btn btn-sm" onClick={() => updateQty(item.id, 1)}>+</button>
                                                </div>
                                                <i className="bi bi-trash text-danger" style={{ cursor: 'pointer' }} onClick={() => setCart(cart.filter(i => i.id !== item.id))}></i>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="d-flex justify-content-between mb-4 mt-3">
                                    <span className="text-muted">Total:</span>
                                    <h4 className="fw-bold text-primary">₱{cart.reduce((s, i) => s + (i.price * i.quantity), 0).toLocaleString()}</h4>
                                </div>
                                <button className="btn w-100 py-3 rounded-pill fw-bold text-white mt-2" style={{ backgroundColor: '#1a2a3a' }} onClick={() => { setShowCart(false); setView('checkout'); }}>Checkout</button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="container py-5">
                {view === 'gallery' && <Gallery products={filtered} onSelectProduct={(p) => { setSelectedProduct(p); setView('dashboard'); }} onAddToCart={addToCart} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
                {view === 'dashboard' && selectedProduct && <Dashboard product={selectedProduct} reviews={reviews} onBack={() => setView('gallery')} onAddToCart={addToCart} onWriteReview={() => setShowReviewModal(true)} onDeleteReview={(id) => setReviews(reviews.filter(r => r.id !== id))} />}
                
                {view === 'checkout' && (
                    <div className="bg-white p-5 rounded-5 shadow-sm mx-auto" style={{ maxWidth: '550px' }}>
                        <h2 className="fw-bold mb-4 text-center">Delivery Details</h2>
                        <input className="form-control rounded-pill mb-3 py-3 px-4 border-light bg-light" placeholder="Full Name" onChange={(e) => setOrderData({...orderData, name: e.target.value})} />
                        <input className="form-control rounded-pill mb-3 py-3 px-4 border-light bg-light" placeholder="Phone Number" onChange={(e) => setOrderData({...orderData, phone: e.target.value})} />
                        <textarea className="form-control rounded-4 mb-4 py-3 px-4 border-light bg-light" placeholder="Full Address" rows="4" onChange={(e) => setOrderData({...orderData, address: e.target.value})}></textarea>
                        <button className="btn w-100 py-3 rounded-pill fw-bold text-white shadow" style={{ backgroundColor: '#1a2a3a' }} onClick={() => setView('payment')}>Continue to Payment</button>
                    </div>
                )}

                {view === 'payment' && (
                    <div className="bg-white p-5 rounded-5 shadow-sm mx-auto text-center" style={{ maxWidth: '500px' }}>
                        <h3 className="fw-bold mb-4">Payment Method</h3>
                        <div className="d-flex mb-4 border rounded-pill overflow-hidden shadow-sm">
                            {['GCash', 'Maya', 'Cash'].map(m => (
                                <button key={m} className={`btn w-100 py-2 fw-bold ${paymentMethod === m ? 'btn-primary' : 'btn-light text-primary'}`} style={{ borderRadius: 0 }} onClick={() => setPaymentMethod(m)}>{m}</button>
                            ))}
                        </div>
                        {(paymentMethod === 'GCash' || paymentMethod === 'Maya') && (
                            <div className="bg-light p-4 rounded-5 mb-3 border d-inline-block">
                                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${paymentMethod}-PAY`} alt="QR" className="mb-3" />
                                <p className="small text-muted mb-0">Scan to pay via {paymentMethod}</p>
                            </div>
                        )}
                        {paymentMethod === 'Cash' && <div className="py-5"><i className="bi bi-cash-stack display-1 text-success mb-3"></i><p className="text-muted">Pay upon delivery (COD).</p></div>}
                        <button className="btn w-100 py-3 rounded-pill fw-bold text-white shadow" style={{ backgroundColor: '#1a2a3a' }} onClick={() => { setLastOrder([...cart]); setCart([]); setView('receipt'); }}>Confirm Order</button>
                    </div>
                )}

                {view === 'receipt' && (
                    <div className="bg-white p-5 rounded-5 shadow-lg mx-auto border text-center" style={{ maxWidth: '550px' }}>
                        <i className="bi bi-check-circle-fill text-success display-1 mb-3"></i>
                        <h2 className="fw-bold mb-4">Order Confirmed!</h2>
                        <div className="text-start bg-light p-4 rounded-4 mb-4">
                            <h6 className="fw-bold mb-3 border-bottom pb-2">Purchase Summary:</h6>
                            {lastOrder.map(item => (
                                <div key={item.id} className="d-flex align-items-center mb-3">
                                    <img src={item.image} alt={item.name} className="rounded-2 me-3" style={{width: '100px', height: '100px', objectFit: 'cover'}} />
                                    <div className="flex-grow-1">
                                        <div className="d-flex justify-content-between">
                                            <span className="small fw-bold">{item.name}</span>
                                            <span className="small fw-bold">₱{(item.price * item.quantity).toLocaleString()}</span>
                                        </div>
                                        <small className="text-muted">Qty: {item.quantity}</small>
                                    </div>
                                </div>
                            ))}
                            <div className="border-top pt-2 d-flex justify-content-between">
                                <span className="fw-bold">Total Paid:</span>
                                <span className="fw-bold text-primary">₱{lastOrder.reduce((s, i) => s + (i.price * i.quantity), 0).toLocaleString()}</span>
                            </div>
                        </div>
                        <button className="btn btn-dark rounded-pill px-5 py-3 fw-bold w-100" onClick={() => setView('gallery')}>Return to Store</button>
                    </div>
                )}
            </div>

            {showReviewModal && (
                <div style={backdropStyle}>
                    <div className="bg-white p-5 rounded-5 shadow-lg text-center" style={{ maxWidth: '400px', width: '90%' }}>
                        <h4 className="fw-bold mb-4">Your Feedback</h4>
                        <div className="mb-4 fs-2 text-warning">
                            {[1, 2, 3, 4, 5].map(n => <i key={n} className={`bi ${n <= rating ? 'bi-star-fill' : 'bi-star'} px-1`} style={{ cursor: 'pointer' }} onClick={() => setRating(n)}></i>)}
                        </div>
                        <input type="text" className="form-control rounded-pill mb-3 bg-light py-2 px-4 border-0 shadow-sm" placeholder="Your Name" value={reviewerName} onChange={(e) => setReviewerName(e.target.value)} />
                        <textarea className="form-control rounded-4 mb-4 bg-light py-3 px-4 border-0 shadow-sm" rows="3" placeholder="Write your thoughts..." value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                        <button className="btn w-100 py-3 rounded-pill fw-bold text-white" style={{ backgroundColor: '#1a2a3a' }} onClick={handleAddReview}>Submit Experience</button>
                        <button className="btn btn-link btn-sm text-muted mt-3 text-decoration-none" onClick={() => setShowReviewModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}