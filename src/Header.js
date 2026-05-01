import React, { useState } from 'react';

const Header = ({ cartCount, setView, setShowCart, selectedCategory, setSelectedCategory, onLogout }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const categories = ['All Categories', 'Skincare', 'Makeup', 'Tools', 'Body Care', 'Fragrance', 'Hair Care'];

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top py-3 px-4 shadow-sm">
            <div className="container-fluid d-flex justify-content-between align-items-center">

                {/* Logo Section */}
                <div
                    className="navbar-brand fw-bold d-flex align-items-center m-0"
                    onClick={() => { setView('gallery'); setSelectedCategory('All Categories'); }}
                    style={{ cursor: 'pointer', color: '#b0926a', fontSize: '1.8rem', letterSpacing: '2px' }}
                >
                    <i className="bi bi-stars me-2"></i> GLOW
                </div>

                {/* Controls Section */}
                <div className="d-flex align-items-center gap-1 gap-md-2">

                    {/* Category Dropdown */}
                    <div className="dropdown d-none d-md-block me-2">
                        <button
                            className="btn btn-sm rounded-pill px-3 d-flex align-items-center fw-semibold"
                            type="button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            style={{ border: '1px solid #b0926a', color: '#b0926a', fontSize: '0.85rem' }}
                        >
                            <i className="bi bi-filter-left me-1"></i> {selectedCategory}
                        </button>
                        <ul className={`dropdown-menu dropdown-menu-end shadow-lg border-0 mt-2 p-2 ${isDropdownOpen ? 'show' : ''}`}
                            style={{ borderRadius: '15px', minWidth: '180px', zIndex: 1000 }}>
                            {categories.map((cat) => (
                                <li key={cat}>
                                    <button
                                        className={`dropdown-item rounded-3 py-2 mb-1 ${selectedCategory === cat ? 'active bg-primary text-white' : ''}`}
                                        onClick={() => { setSelectedCategory(cat); setIsDropdownOpen(false); setView('gallery'); }}
                                    >
                                        {cat}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* --- MY ORDERS (SHOPEE STYLE) --- */}
                    <button
                        className="btn border-0 p-2"
                        onClick={() => setView('track-order')}
                        title="My Orders"
                        style={{ color: '#b0926a' }}
                    >
                        <i className="bi bi-truck fs-4"></i>
                        <span className="d-none d-lg-inline ms-1 small fw-bold">Orders</span>
                    </button>

                    {/* CUSTOMER SERVICE */}
                    <button
                        className="btn border-0 p-2"
                        onClick={() => setView('report-damage')}
                        title="Customer Service"
                        style={{ color: '#b0926a' }}
                    >
                        <i className="bi bi-chat-quote fs-4"></i>
                    </button>

                    {/* CART ICON */}
                    <button
                        className="btn border-0 p-2 position-relative"
                        onClick={() => setShowCart(true)}
                        style={{ color: '#b0926a' }}
                    >
                        <i className="bi bi-handbag fs-4"></i>
                        {cartCount > 0 && (
                            <span className="position-absolute top-0 start-50 translate-middle-x badge rounded-pill bg-danger"
                                style={{ fontSize: '0.6rem', marginTop: '5px' }}>
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {/* LOGOUT ICON */}
                    <button
                        className="btn border-0 p-2"
                        onClick={onLogout}
                        title="Logout"
                        style={{ color: '#b0926a' }}
                    >
                        <i className="bi bi-power fs-4"></i>
                    </button>
                </div>
            </div>

            {isDropdownOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 }} onClick={() => setIsDropdownOpen(false)}></div>
            )}
        </nav>
    );
};

export default Header;