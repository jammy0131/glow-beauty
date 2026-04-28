import React from 'react';

const Checkout = ({ total, onNext, onBack }) => (
    <div className="p-5 rounded-5 shadow-sm mx-auto bg-white" style={{ maxWidth: '600px' }}>
        <h2 className="fw-bold text-center mb-5">Delivery Details</h2>
        <form onSubmit={(e) => {
            e.preventDefault();
            onNext({ name: e.target.name.value, address: e.target.address.value });
        }}>
            <input name="name" className="form-control rounded-pill mb-4 py-3 px-4 shadow-sm" placeholder="Full Name" required />
            <input name="phone" className="form-control rounded-pill mb-4 py-3 px-4 shadow-sm" placeholder="Phone Number" required />
            <textarea name="address" className="form-control rounded-4 mb-4 p-4 shadow-sm" rows="3" placeholder="Full Address" required></textarea>
            
            <div className="p-3 rounded-pill mb-5 border text-center" style={{ background: '#E0E7FF' }}>
                <p className="m-0 text-muted">Estimated Arrival: <strong>Thu Apr 30 2026</strong></p>
            </div>

            <button type="submit" className="btn btn-dark w-100 py-3 rounded-pill fw-bold btn-lg">Continue to Payment</button>
        </form>
    </div>
);

export default Checkout;