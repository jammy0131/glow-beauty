import React from 'react';

const TrackOrder = ({ orderId, orderData, onBack, lastOrder, onOpenChat }) => {

    // --- PRICE DETECTION LOGIC ---
    const calculateSubtotal = () => {
        if (!lastOrder || lastOrder.length === 0) return 0;
        return lastOrder.reduce((acc, item) => {
            const priceValue = item.price || item.Price || 0;
            const qtyValue = item.quantity || 1;
            return acc + (parseFloat(priceValue) * parseInt(qtyValue));
        }, 0);
    };

    const subtotal = calculateSubtotal();
    const shippingFee = (subtotal >= 500 || subtotal === 0) ? 0 : 45;
    const totalAmount = subtotal + shippingFee;

    // --- REALISTIC RIDER POOL ---
    const riderPool = [
        { name: "Ricardo 'Ric' Santos", plate: "NCR-1234", rating: "4.9", phone: "0917-123-4567" },
        { name: "John Mark Bautista", plate: "PHP-5532", rating: "4.8", phone: "0918-987-6543" },
        { name: "Arnel Dela Cruz", plate: "ZXC-1099", rating: "5.0", phone: "0927-445-1122" },
        { name: "Christopher 'Chris' Reyes", plate: "QWE-4471", rating: "4.7", phone: "0915-000-8899" }
    ];

    // Ang rider na ito ay naka-lock sa Order ID para sa data consistency
    const riderIndex = (orderId ? orderId.charCodeAt(orderId.length - 1) : 0) % riderPool.length;
    const currentRider = riderPool[riderIndex];

    const etaDate = "May 02, 2026";
    const etaTime = "1:00 PM - 3:00 PM";

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

                {/* --- 1. VISUAL PROGRESS MAP --- */}
                <div className="card border-0 shadow-sm rounded-4 mb-4 overflow-hidden">
                    <div className="p-3 bg-white border-bottom d-flex justify-content-between align-items-center">
                        <span className="small fw-bold text-uppercase" style={{ color: '#b0926a' }}>Delivery Status</span>
                        <span className="small text-muted font-monospace">{orderId || "GLW-22274"}</span>
                    </div>
                    <div className="card-body bg-light py-4 position-relative">
                        <div className="px-4">
                            <div className="d-flex justify-content-between mb-2 small fw-bold">
                                <span>Warehouse</span>
                                <span style={{ color: '#b0926a' }}>{etaTime}</span>
                                <span>Home</span>
                            </div>
                            <div className="progress rounded-pill shadow-sm" style={{ height: '10px', backgroundColor: '#e9ecef' }}>
                                <div className="progress-bar progress-bar-striped progress-bar-animated"
                                    role="progressbar"
                                    style={{ width: '60%', backgroundColor: '#b0926a' }}>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between mt-2 text-muted" style={{ fontSize: '0.7rem' }}>
                                <span>QC Warehouse</span>
                                <span>ETA: {etaDate}</span>
                                <span>Your Location</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- 2. RIDER INFO CARD --- */}
                <div className="card border-0 shadow-sm rounded-4 mb-4" style={{ backgroundColor: '#fff', border: '1px solid #f0f0f0' }}>
                    <div className="card-body d-flex align-items-center p-3">
                        <div className="position-relative">
                            <div className="rounded-circle bg-light d-flex align-items-center justify-content-center shadow-sm"
                                style={{ width: '65px', height: '65px', overflow: 'hidden', border: '2px solid #b0926a' }}>
                                <img
                                    src={`https://ui-avatars.com/api/?name=${currentRider.name}&background=b0926a&color=fff&bold=true`}
                                    alt="Rider Avatar"
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </div>
                            <span className="position-absolute bottom-0 end-0 bg-success border border-2 border-white rounded-circle"
                                style={{ width: '14px', height: '14px' }}></span>
                        </div>

                        <div className="ms-3 flex-grow-1">
                            <div className="d-flex align-items-center mb-1">
                                <h6 className="fw-bold mb-0 me-2" style={{ fontSize: '1rem', color: '#333' }}>{currentRider.name}</h6>
                                <span className="badge bg-light text-dark border rounded-pill fw-normal" style={{ fontSize: '0.65rem' }}>
                                    <i className="bi bi-shield-check text-success me-1"></i>Verified
                                </span>
                            </div>
                            <div className="d-flex align-items-center text-muted" style={{ fontSize: '0.8rem' }}>
                                <span className="me-2">
                                    <i className="bi bi-star-fill text-warning me-1"></i>
                                    <span className="fw-bold text-dark">{currentRider.rating}</span>
                                </span>
                                <span className="me-2">|</span>
                                <span><i className="bi bi-bicycle me-1"></i>{currentRider.plate}</span>
                            </div>
                        </div>

                        <div className="d-flex gap-2">
                            {/* In-update ang onClick para ipasa ang name ng rider na nasa card */}
                            <button className="btn rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                                onClick={() => onOpenChat(currentRider.name)}
                                style={{ width: '42px', height: '42px', color: '#b0926a', backgroundColor: '#fff', border: '1px solid #eee' }}>
                                <i className="bi bi-chat-dots" style={{ fontSize: '1.2rem' }}></i>
                            </button>
                            <button className="btn rounded-circle d-flex align-items-center justify-content-center shadow-sm text-white"
                                onClick={() => window.open(`tel:${currentRider.phone}`)}
                                style={{ width: '42px', height: '42px', backgroundColor: '#b0926a', border: 'none' }}>
                                <i className="bi bi-telephone-fill" style={{ fontSize: '1.1rem' }}></i>
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- 3. TRACKING TIMELINE --- */}
                <div className="card border-0 shadow-sm rounded-4 mb-4">
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

                {/* --- 4. ORDER SUMMARY --- */}
                <div className="card border-0 shadow-sm rounded-4 mb-4">
                    <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h6 className="fw-bold m-0 small text-muted text-uppercase">Items Ordered</h6>
                            <button className="btn btn-sm text-primary fw-bold p-0 border-0"
                                onClick={onBack} style={{ fontSize: '0.75rem' }}>
                                <i className="bi bi-arrow-repeat me-1"></i> BUY AGAIN
                            </button>
                        </div>

                        {(lastOrder || []).map((item, i) => (
                            <div key={i} className="d-flex justify-content-between align-items-center mb-3">
                                <div className="d-flex align-items-center">
                                    <div className="rounded-3 bg-light d-flex align-items-center justify-content-center me-3"
                                        style={{ width: '50px', height: '50px', overflow: 'hidden', border: '1px solid #f0f0f0' }}>
                                        <img
                                            src={item.image || "https://via.placeholder.com/50"}
                                            alt={item.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div>
                                        <div className="fw-bold small mb-0 text-dark">{item.name}</div>
                                        <div className="text-muted" style={{ fontSize: '0.7rem' }}>Quantity: {item.quantity || 1}</div>
                                    </div>
                                </div>
                                <div className="text-end">
                                    <span className="fw-bold small">₱{(parseFloat(item.price || 0) * (item.quantity || 1)).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                                </div>
                            </div>
                        ))}

                        <hr className="my-4 opacity-50" />

                        <div className="d-flex justify-content-between mb-2 small text-muted">
                            <span>Merchandise Subtotal</span>
                            <span>₱{subtotal.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2 small text-muted">
                            <span>Shipping Fee</span>
                            <span className={shippingFee === 0 ? "text-success fw-bold" : ""}>
                                {shippingFee === 0 ? "FREE" : `₱${shippingFee.toFixed(2)}`}
                            </span>
                        </div>
                        <div className="d-flex justify-content-between fw-bold text-dark mt-3 pt-3 border-top">
                            <span className="fs-6">Order Total</span>
                            <span className="fs-5" style={{ color: '#b0926a' }}>₱{totalAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                        </div>
                    </div>
                </div>

                {/* --- 5. ACTION BUTTONS --- */}
                <div className="d-flex gap-3 mb-5">
                    <button className="btn btn-outline-secondary flex-grow-1 rounded-pill fw-bold py-3 shadow-sm bg-white" onClick={onBack}>
                        BACK TO SHOP
                    </button>
                    <button className="btn btn-primary flex-grow-1 rounded-pill fw-bold py-3 shadow-sm"
                        style={{ backgroundColor: '#b0926a', border: 'none' }}
                        onClick={() => alert("Connecting to Customer Service...")}>
                        NEED HELP?
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TrackOrder;