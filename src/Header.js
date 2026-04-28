import React from 'react';

export default function Header({ cartCount, setView, setShowCart, onLogout }) {
    return (
        <div className="d-flex justify-content-between p-3 bg-white shadow">
            <h4 style={{ cursor: 'pointer' }} onClick={() => setView('gallery')}>
                GLOW
            </h4>

            <div>
                <button onClick={() => setShowCart(true)}>
                    Cart ({cartCount})
                </button>

                <button onClick={onLogout} className="ms-2">
                    Logout
                </button>
            </div>
        </div>
    );
}