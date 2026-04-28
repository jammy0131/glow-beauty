import React from 'react';

const Receipt = ({ orderData, onDone }) => (
    <div className="p-5 rounded-5 shadow-sm mx-auto bg-white text-center" style={{ maxWidth: '500px' }}>
        <div className="text-success mb-4"><i className="bi bi-check-circle-fill display-1"></i></div>
        <h2 className="fw-bold mb-2">Order Success!</h2>
        <p className="text-muted mb-4">Thank you for your purchase, {orderData.info?.name}!</p>
        
        <div className="bg-light p-4 rounded-4 mb-4 text-start">
            <p className="small mb-1">Order Reference: <strong>{orderData.ref}</strong></p>
            <p className="small mb-1">Payment Method: <strong>{orderData.method}</strong></p>
            <p className="small mb-0">Delivery to: <strong>{orderData.info?.address}</strong></p>
        </div>

        <button className="btn btn-dark w-100 py-3 rounded-pill fw-bold" onClick={onDone}>Back to Home</button>
    </div>
);

export default Receipt;