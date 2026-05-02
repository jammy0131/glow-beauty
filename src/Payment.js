import React, { useState, useEffect } from 'react';

const Payment = ({ paymentMethod, setPaymentMethod, onConfirm }) => {
    const [refNumber, setRefNumber] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('idle'); // 'idle', 'scanning', 'detected'
    const [showNotify, setShowNotify] = useState(false);

    // Initial Setup kapag nagpalit ng Payment Method
    useEffect(() => {
        setPaymentStatus('idle'); // Reset status sa idle kapag nagpalit ng mode
        setShowNotify(false);
        if (paymentMethod !== 'Cash') {
            const randomRef = Math.random().toString(36).substring(2, 10).toUpperCase();
            setRefNumber(`GLW-${randomRef}`);
        }
    }, [paymentMethod]);

    // Function na tatawagin kapag pinindot ang button
    const handleStartScan = () => {
        setPaymentStatus('scanning');
        
        // Simulation ng Scan Detection pagkatapos pindutin
        setTimeout(() => {
            setPaymentStatus('detected');
            setShowNotify(true);
        }, 3000); // 3 seconds bago ma-detect
    };

    // Auto-hide para sa Notification
    useEffect(() => {
        if (showNotify) {
            const hideTimer = setTimeout(() => {
                setShowNotify(false);
            }, 4000);
            return () => clearTimeout(hideTimer);
        }
    }, [showNotify]);

    return (
        <>
            {/* FLOATING NOTIFICATION */}
            {showNotify && (
                <div className="position-fixed top-0 start-50 translate-middle-x mt-3 animate__animated animate__fadeInDown animate__faster"
                    style={{ zIndex: 9999, width: '90%', maxWidth: '420px' }}>
                    <div className="bg-white shadow-lg border-0 p-3 d-flex align-items-center"
                        style={{ borderRadius: '20px' }}>
                        <div className="rounded-3 d-flex align-items-center justify-content-center me-3"
                            style={{ width: '45px', height: '45px', backgroundColor: '#007bff' }}>
                            <i className="bi bi-bag-check text-white fs-4"></i>
                        </div>
                        <div className="text-start">
                            <div className="fw-bold text-dark" style={{ fontSize: '0.95rem' }}>GLOW BEAUTY</div>
                            <div className="text-muted small">Scan Detected! Tap 'Pay Now' to finish.</div>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white p-5 rounded-5 shadow-lg mx-auto text-center"
                style={{ maxWidth: '500px', border: '1px solid #f3eee8' }}>

                <h3 className="fw-bold mb-4" style={{ color: '#333' }}>Payment Method</h3>

                <div className="d-flex mb-4 border rounded-2 overflow-hidden" style={{ borderColor: '#ddd' }}>
                    {['GCash', 'Maya', 'Cash'].map(m => (
                        <button
                            key={m}
                            className={`btn w-100 py-3 fw-bold transition-all ${paymentMethod === m ? 'text-white' : 'text-primary'}`}
                            style={{
                                backgroundColor: paymentMethod === m ? '#007bff' : 'white',
                                border: 'none',
                                borderRadius: 0,
                                fontSize: '0.85rem'
                            }}
                            onClick={() => setPaymentMethod(m)}
                        >
                            {m}
                        </button>
                    ))}
                </div>

                {(paymentMethod === 'GCash' || paymentMethod === 'Maya') && (
                    <div className="py-2">
                        <div className="mb-3">
                            <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${paymentMethod}-${refNumber}`}
                                alt="QR"
                                className="p-2 border"
                                style={{
                                    borderRadius: '15px',
                                    // Blur effect habang nag-scan
                                    filter: paymentStatus === 'scanning' ? 'blur(2px) grayscale(0.5)' : 'none',
                                    opacity: paymentStatus === 'idle' ? '0.5' : '1',
                                    transition: 'all 0.5s ease'
                                }}
                            />
                        </div>
                        <div className="mb-4">
                            <span className="small text-muted">Order Ref: <strong className="text-dark">{refNumber}</strong></span>
                            {paymentStatus === 'idle' && <p className="text-primary small mt-2 fw-bold">Click button below to start scanning</p>}
                        </div>
                    </div>
                )}

                {paymentMethod === 'Cash' && (
                    <div className="py-5 mb-4">
                        <i className="bi bi-truck display-1 mb-3" style={{ color: '#b0926a' }}></i>
                        <p className="fw-bold mb-1">Cash on Delivery</p>
                        <p className="text-muted small">Ready your payment upon delivery.</p>
                    </div>
                )}

                <button
                    className="btn w-100 py-3 rounded-pill fw-bold text-white shadow-sm transition-all"
                    style={{
                        backgroundColor: (paymentStatus === 'detected' || paymentMethod === 'Cash') ? '#198754' : (paymentStatus === 'scanning' ? '#6c757d' : '#007bff'),
                        border: 'none',
                        fontSize: '1.1rem'
                    }}
                    onClick={() => {
                        if (paymentMethod === 'Cash' || paymentStatus === 'detected') {
                            onConfirm(refNumber);
                        } else {
                            handleStartScan();
                        }
                    }}
                    disabled={paymentStatus === 'scanning'}
                >
                    {paymentMethod === 'Cash' ? (
                        "Confirm Order"
                    ) : paymentStatus === 'idle' ? (
                        `Pay with ${paymentMethod}`
                    ) : paymentStatus === 'scanning' ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Scanning QR...
                        </>
                    ) : (
                        "Confirm Payment"
                    )}
                </button>
            </div>
        </>
    );
};

export default Payment;