import React from 'react';

const Cart = ({ show, onClose, cart, setCart, onCheckout }) => {
    if (!show) return null;

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const updateQty = (id, delta) => {
        setCart(cart.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
    };

    const removeItem = (id) => setCart(cart.filter(item => item.id !== id));

    return (
        <div className="modal-backdrop d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050, position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}>
            <div className="bg-white p-4 rounded-5 shadow-lg" style={{ width: '90%', maxWidth: '450px' }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="fw-bold m-0"><i className="bi bi-bag me-2"></i>My Bag</h5>
                    <button className="btn-close" onClick={onClose}></button>
                </div>
                
                <div className="cart-items mb-4" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {cart.length === 0 ? <p className="text-center py-4">Your bag is empty.</p> : cart.map(item => (
                        <div key={item.id} className="d-flex align-items-center mb-3 p-2 border-bottom">
                            <i className={`bi ${item.icon} fs-4 me-3 text-primary`}></i>
                            <div className="flex-grow-1">
                                <h6 className="m-0 fw-bold">{item.name}</h6>
                                <small className="text-muted">${item.price.toFixed(2)}</small>
                            </div>
                            <div className="d-flex align-items-center">
                                <button className="btn btn-sm btn-outline-dark rounded-pill" onClick={() => updateQty(item.id, -1)}>-</button>
                                <span className="mx-2 fw-bold">{item.quantity}</span>
                                <button className="btn btn-sm btn-outline-dark rounded-pill" onClick={() => updateQty(item.id, 1)}>+</button>
                                <i className="bi bi-trash text-danger ms-3" style={{ cursor: 'pointer' }} onClick={() => removeItem(item.id)}></i>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4 pt-3 border-top">
                    <h5 className="text-muted">Total Amount:</h5>
                    <h3 className="fw-bold text-primary">${total.toFixed(2)}</h3>
                </div>
                <button className="btn btn-dark w-100 py-3 rounded-pill fw-bold" onClick={onCheckout} disabled={cart.length === 0}>Checkout</button>
            </div>
        </div>
    );
};

export default Cart;