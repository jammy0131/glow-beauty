import React from 'react';

const TrackOrder = ({ orderId, orderData, onBack, lastOrder }) => {
    
    // --- PRICE DETECTION LOGIC ---
    const calculateSubtotal = () => {
        if (!lastOrder || lastOrder.length === 0) return 0;
        return lastOrder.reduce((acc, item) => {
            const priceValue = item.price || item.Price || item.prize || item.Prize || item.amount || 0;
            const qtyValue = item.quantity || item.qty || 1;
            return acc + (parseFloat(priceValue) * parseInt(qtyValue));
        }, 0);
    };

    const subtotal = calculateSubtotal();
    const shippingFee = (subtotal >= 500 || subtotal === 0) ? 0 : 45;
    const totalAmount = subtotal + shippingFee;

    const trackingSteps = [
        { status: 'Order Placed', date: 'May 01, 2026 10:30 PM', desc: 'Order received.', done: true },
        { status: 'Payment Confirmed', date: 'May 01, 2026 10:45 PM', desc: 'Payment via GCash verified.', done: true },
        { status: 'Packing', date: 'May 02, 2026 08:00 AM', desc: 'Items are being packed at GLOW Warehouse.', done: true },
        { status: 'On the Way', date: 'Pending', desc: 'Rider is heading to your location.', done: false },
        { status: 'Delivered', date: 'Pending', desc: 'Order received.', done: false }
    ];

    return (
        <div className="container py-4 animate__animated animate__fadeIn" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <div className="mx-auto" style={{ maxWidth: '650px' }}>
                
                {/* TRACKING TIMELINE CARD */}
                <div className="card border-0 shadow-sm rounded-4 mb-4">
                    <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
                        <h6 className="fw-bold mb-0 text-uppercase small" style={{ letterSpacing: '1px' }}>Tracking Timeline</h6>
                        <span className="badge rounded-pill px-3 py-2" style={{ backgroundColor: '#fcf8f3', color: '#b0926a' }}>
                            ID: {orderId || "GLW-22274"}
                        </span>
                    </div>
                    <div className="card-body p-4">
                        <div className="position-relative ms-2">
                            {trackingSteps.map((step, index) => (
                                <div key={index} className="d-flex mb-4 position-relative">
                                    {index !== trackingSteps.length - 1 && (
                                        <div className="position-absolute" 
                                             style={{ left: '11px', top: '25px', bottom: '-25px', width: '2px', 
                                             backgroundColor: step.done && (trackingSteps[index+1]?.done) ? '#198754' : '#e9ecef' }}>
                                        </div>
                                    )}
                                    <div className={`rounded-circle d-flex align-items-center justify-content-center shadow-sm position-relative ${step.done ? 'bg-success text-white' : 'bg-white text-muted border'}`}
                                         style={{ width: '24px', height: '24px', zIndex: 2, fontSize: '0.7rem' }}>
                                        <i className={`bi ${step.done ? 'bi-check' : 'bi-circle'}`}></i>
                                    </div>
                                    <div className="ms-3">
                                        <div className={`fw-bold small ${step.done ? 'text-dark' : 'text-muted'}`}>{step.status}</div>
                                        <div className="text-muted" style={{ fontSize: '0.75rem' }}>{step.desc}</div>
                                        <div className="text-secondary" style={{ fontSize: '0.65rem' }}>{step.date}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ORDER SUMMARY */}
                <div className="card border-0 shadow-sm rounded-4 mb-4">
                    <div className="card-body p-4">
                        <h6 className="fw-bold mb-3 small text-muted text-uppercase">Order Summary</h6>
                        
                        {(lastOrder || []).map((item, i) => (
                            <div key={i} className="d-flex justify-content-between mb-2 small">
                                <span>{item.name} <span className="text-muted">x{item.quantity || 1}</span></span>
                                <span className="fw-bold">₱{(parseFloat(item.price || item.Price || 0) * (item.quantity || 1)).toFixed(2)}</span>
                            </div>
                        ))}
                        
                        <hr className="my-3 opacity-50" />
                        
                        <div className="d-flex justify-content-between mb-2 small text-muted">
                            <span>Merchandise Subtotal</span>
                            <span>₱{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2 small text-muted">
                            <span>Shipping Fee</span>
                            <span className={shippingFee === 0 ? "text-success fw-bold" : ""}>
                                {shippingFee === 0 ? "FREE" : `₱${shippingFee.toFixed(2)}`}
                            </span>
                        </div>
                        <div className="d-flex justify-content-between fw-bold text-dark mt-3 pt-3 border-top">
                            <span className="fs-6">Order Total</span>
                            <span className="fs-5" style={{ color: '#b0926a' }}>₱{totalAmount.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* DELIVERY ADDRESS & CONTACT */}
                <div className="card border-0 shadow-sm rounded-4 mb-4" style={{ borderLeft: '5px solid #b0926a' }}>
                    <div className="card-body d-flex gap-3 align-items-center">
                        <i className="bi bi-geo-alt-fill fs-4" style={{ color: '#b0926a' }}></i>
                        <div>
                            <h6 className="fw-bold mb-1 small text-muted text-uppercase">Delivery Address</h6>
                            <p className="mb-0 fw-bold small text-dark">
                                {orderData?.name || "JESSIE PADREE"} | {orderData?.phone || "09163149147"}
                            </p>
                            <p className="text-muted small mb-0">{orderData?.address || "QUEZON CITY"}</p>
                        </div>
                    </div>
                </div>

                {/* ACTION BUTTONS (IBINALIK ANG CONTACT) */}
                <div className="d-flex gap-3">
                    <button 
                        className="btn btn-outline-secondary flex-grow-1 rounded-pill fw-bold py-3 shadow-sm" 
                        onClick={onBack}
                        style={{ border: '2px solid #eee' }}
                    >
                        HOME
                    </button>
                    <button 
                        className="btn btn-primary flex-grow-1 rounded-pill fw-bold py-3 shadow-sm" 
                        style={{ backgroundColor: '#b0926a', border: 'none' }}
                        onClick={() => alert(`Contacting Rider for Order ${orderId || "GLW-22274"}...`)}
                    >
                        <i className="bi bi-telephone-fill me-2"></i> CONTACT RIDER
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TrackOrder;