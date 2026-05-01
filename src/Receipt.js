import React, { useState } from 'react';

const Receipt = ({ cart = [], total = 0, onReturn, paymentRef, deliveryDetails }) => {
    const [isFinished, setIsFinished] = useState(false);

    // Logic para sa Estimated Arrival (Today + 4 days)
    const getDeliveryEstimate = () => {
        const today = new Date();
        const estDate = new Date(today);
        estDate.setDate(today.getDate() + 4);
        return estDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
        });
    };

    const handleDonePaying = () => {
        setIsFinished(true);
        window.scrollTo(0, 0);

        setTimeout(() => {
            onReturn();
        }, 3000);
    };

    return (
        <div className="container mt-3 animate__animated animate__fadeIn">
            {isFinished && (
                <div className="alert alert-success border-0 shadow-lg rounded-4 d-flex align-items-center mb-4 animate__animated animate__bounceIn" role="alert">
                    <i className="bi bi-check-circle-fill me-3 fs-4"></i>
                    <div>
                        <strong className="d-block">Order Successful!</strong>
                        <span className="small">Salamat, {deliveryDetails?.name}! Ang iyong order ay natanggap na namin.</span>
                    </div>
                </div>
            )}

            <div className={`bg-white p-4 p-md-5 rounded-5 shadow-lg mx-auto border-0 ${isFinished ? 'opacity-50' : ''}`} style={{ maxWidth: '500px', transition: '0.3s' }}>

                <div className="text-center mb-4">
                    <div className="mb-3">
                        <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '4.5rem' }}></i>
                    </div>
                    <h2 className="fw-bold m-0" style={{ color: '#b0926a' }}>Order Confirmed!</h2>
                    <p className="text-muted small">Order Received!</p>
                </div>

                {/* ESTIMATED ARRIVAL */}
                <div className="p-3 rounded-4 mb-3 border border-warning-subtle shadow-sm" style={{ backgroundColor: '#fffdf0' }}>
                    <div className="d-flex align-items-center">
                        <i className="bi bi-truck text-warning fs-4 me-3"></i>
                        <div>
                            <p className="mb-0 text-muted extra-small fw-bold text-uppercase" style={{ fontSize: '0.6rem' }}>Estimated Arrival</p>
                            <p className="mb-0 fw-bold text-dark" style={{ fontSize: '0.85rem' }}>{getDeliveryEstimate()}</p>
                        </div>
                    </div>
                </div>

                {/* SHIPPING & CONTACT DETAILS SECTION */}
                <div className="bg-light p-3 rounded-4 mb-4 border-0">
                    <h6 className="fw-bold mb-3 d-flex align-items-center" style={{ fontSize: '0.85rem' }}>
                        <i className="bi bi-geo-alt-fill text-danger me-2"></i> Shipping Details
                    </h6>
                    <div className="ps-2 border-start border-2 border-secondary-subtle">
                        <p className="mb-1 fw-bold text-dark" style={{ fontSize: '0.9rem' }}>
                            {deliveryDetails?.name || 'GUEST CUSTOMER'}
                        </p>
                        <p className="mb-1 text-secondary small">
                            <i className="bi bi-telephone me-2"></i> {deliveryDetails?.phone || 'No contact provided'}
                        </p>
                        <p className="mb-0 text-secondary small">
                            <i className="bi bi-house-door me-2"></i> {deliveryDetails?.address || 'No address provided'}
                        </p>
                    </div>
                </div>

                {/* ORDER INFO */}
                <div className="px-2 mb-4">
                    <div className="d-flex justify-content-between mb-2">
                        <span className="text-secondary small fw-semibold">Order Ref:</span>
                        <span className="fw-bold text-dark small">{paymentRef || 'GLW-COD-PENDING'}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                        <span className="text-secondary small fw-semibold">Status:</span>
                        <span className="badge bg-white text-success border border-success rounded-pill px-3">
                            Ready for Shipout
                        </span>
                    </div>
                </div>

                <hr className="my-4 opacity-25" />

                {/* PURCHASE SUMMARY */}
                <h6 className="fw-bold mb-3" style={{ fontSize: '0.9rem' }}>Items Purchased:</h6>
                <div className="item-list mb-3" style={{ maxHeight: '200px', overflowY: 'auto', scrollbarWidth: 'none' }}>
                    {cart && cart.length > 0 ? (
                        cart.map((item, index) => (
                            <div key={index} className="d-flex align-items-center mb-3">
                                <div className="bg-white p-1 rounded-3 border me-3 shadow-sm">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                        className="rounded-2"
                                    />
                                </div>
                                <div className="flex-grow-1">
                                    <p className="mb-0 fw-bold small text-dark">{item.name}</p>
                                    <p className="mb-0 text-muted extra-small">Qty: {item.quantity || 1}</p>
                                </div>
                                <div className="fw-bold text-dark" style={{ fontSize: '0.9rem' }}>
                                    ₱{(item.price * (item.quantity || 1)).toLocaleString()}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-muted py-3 small">No items found.</p>
                    )}
                </div>

                {/* TOTAL */}
                <div className="d-flex justify-content-between align-items-center pt-3 border-top border-2">
                    <span className="fw-bold text-dark">Total Paid:</span>
                    <span className="fs-4 fw-bold" style={{ color: '#b0926a' }}>
                        ₱{total.toLocaleString()}
                    </span>
                </div>

                {!isFinished ? (
                    <button
                        className="btn w-100 py-3 rounded-pill fw-bold text-white shadow-sm mt-4"
                        style={{ backgroundColor: '#b0926a', border: 'none' }}
                        onClick={handleDonePaying}
                    >
                        DONE PAYING
                    </button>
                ) : (
                    <div className="text-center text-muted small py-2 mt-2">
                        <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                        Redirecting to shop...
                    </div>
                )}
            </div>
        </div>
    );
};

export default Receipt;