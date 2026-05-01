import React from 'react';

const backdropStyle = {
    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 2000,
    display: 'flex', alignItems: 'center', justifyContent: 'center'
};

const Cart = ({ cart, setShowCart, updateQty, removeFromCart, onCheckout }) => (
    <div style={backdropStyle}>
        <div className="bg-white p-4 rounded-5 shadow-lg" style={{ width: '100%', maxWidth: '680px' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold m-0"><i className="bi bi-bag me-2"></i>My Bag</h4>
                <button className="btn-close" onClick={() => setShowCart(false)}></button>
            </div>
            {cart.length === 0 ? <p className="text-center py-5 text-muted">Empty bag.</p> : (
                <>
                    <div style={{maxHeight: '350px', overflowY: 'auto'}} className="px-1">
                        {cart.map((item) => (
                            <div key={item.id} className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3">
                                <div className="d-flex align-items-center">
                                    <img src={item.image} alt={item.name} className="rounded-3 me-3" style={{width: '100px', height: '100px', objectFit: 'cover'}} />
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
                                    <i className="bi bi-trash text-danger" style={{ cursor: 'pointer' }} onClick={() => removeFromCart(item.id)}></i>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="d-flex justify-content-between mb-4 mt-3">
                        <span className="text-muted">Total:</span>
                        <h4 className="fw-bold text-primary">₱{cart.reduce((s, i) => s + (i.price * i.quantity), 0).toLocaleString()}</h4>
                    </div>
                    <button className="btn w-100 py-3 rounded-pill fw-bold text-white" style={{ backgroundColor: '#b0926a' }} onClick={onCheckout}>Checkout</button>
                </>
            )}
        </div>
    </div>
);

export default Cart;