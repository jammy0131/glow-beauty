import React from 'react';

const Payment = ({ refId, method, setMethod, total, onConfirmOrder, onBack }) => (
    <div className="bg-white p-4 p-md-5 rounded-5 shadow-lg mx-auto text-center" style={{ maxWidth: '650px' }}>
        <button className="btn btn-link text-dark p-0 mb-4 text-decoration-none" onClick={onBack}>
            <i className="bi bi-arrow-left me-2"></i>Back to Checkout
        </button>
        <h1 className="fw-bold text-center mb-5">Payment Method</h1>
        <div className="btn-group w-100 mb-5 shadow-sm rounded-pill overflow-hidden border">
            {['GCash', 'Maya', 'Cash'].map(m => (
                <button key={m} className={`btn py-3 fs-6 fw-bold ${method === m ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setMethod(m)}>{m}</button>
            ))}
        </div>
        {method !== 'Cash' && (
            <div className="text-center bg-light p-4 rounded-4 mb-5 border shadow-sm">
                <p className="small mb-3">Scan QR code using your {method} app</p>
                <div className="mx-auto bg-white rounded-4 d-flex align-items-center justify-content-center p-3 shadow" style={{ width: '150px', height: '150px' }}>
                    <i className="bi bi-qr-code-scan fs-1"></i>
                </div>
                <p className="mt-3 mb-0 small text-muted">Ref: <span className="fw-bold text-dark">{refId}</span></p>
            </div>
        )}
        <div className="text-center mb-4">
            <p className="small text-muted mb-0">Total Amount:</p>
            <p className="m-0 fs-1 fw-bold text-primary">${total.toFixed(2)}</p>
        </div>
        <button className="btn btn-success w-100 py-3 rounded-pill fw-bold btn-lg shadow-lg" onClick={onConfirmOrder}>
            Confirm and Place Order
        </button>
    </div>
);

export default Payment;