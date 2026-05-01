import React from 'react';

const Checkout = ({ orderData, setOrderData, onContinue }) => {
    // Logic para i-check kung valid lahat ng fields
    const isFormValid = orderData.name?.trim() && 
                        orderData.phone?.trim() && 
                        orderData.address?.trim();

    return (
        <div className="bg-white p-5 rounded-5 shadow-sm mx-auto animate__animated animate__fadeIn" 
             style={{ 
                 maxWidth: '500px', 
                 border: '1px solid rgba(0,0,0,0.03)',
                 marginTop: '2rem' 
             }}>
            
            <div className="text-center mb-5">
                <h2 className="fw-bold d-flex align-items-center justify-content-center m-0" 
                    style={{ color: '#b0926a', letterSpacing: '1px' }}>
                    <i className="bi bi-geo-alt-fill me-3" style={{ fontSize: '1.8rem' }}></i> 
                    Delivery Details
                </h2>
            </div>
            
            <div className="mb-4">
                <label className="small fw-bold ms-2 mb-2 text-secondary d-block">Recipient Name</label>
                <input
                    className="form-control rounded-pill py-3 px-4 border-0 shadow-none"
                    placeholder="Enter your full name"
                    value={orderData.name}
                    onChange={(e) => setOrderData({...orderData, name: e.target.value})}
                    style={{ 
                        fontSize: '0.95rem', 
                        backgroundColor: '#f8f9fa',
                        transition: 'background-color 0.3s ease'
                    }}
                />
            </div>

            <div className="mb-4">
                <label className="small fw-bold ms-2 mb-2 text-secondary d-block">Contact Number</label>
                <input
                    className="form-control rounded-pill py-3 px-4 border-0 shadow-none"
                    placeholder="09xx xxx xxxx"
                    value={orderData.phone}
                    onChange={(e) => setOrderData({...orderData, phone: e.target.value})}
                    style={{ 
                        fontSize: '0.95rem', 
                        backgroundColor: '#f8f9fa' 
                    }}
                />
            </div>

            <div className="mb-5">
                <label className="small fw-bold ms-2 mb-2 text-secondary d-block">Complete Address</label>
                <textarea
                    className="form-control rounded-4 py-3 px-4 border-0 shadow-none"
                    placeholder="House Number, Street, Barangay, City"
                    rows="4"
                    value={orderData.address}
                    onChange={(e) => setOrderData({...orderData, address: e.target.value})}
                    style={{ 
                        fontSize: '0.95rem', 
                        backgroundColor: '#f8f9fa', 
                        resize: 'none' 
                    }}
                ></textarea>
            </div>

            <div className="px-2">
                <button
                    className="btn w-100 py-3 rounded-pill fw-bold text-white shadow-sm mb-3"
                    style={{ 
                        backgroundColor: isFormValid ? '#b0926a' : '#d1c4b4', 
                        border: 'none',
                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        cursor: isFormValid ? 'pointer' : 'not-allowed',
                        transform: isFormValid ? 'scale(1)' : 'scale(0.98)'
                    }}
                    onClick={() => isFormValid && onContinue()}
                    disabled={!isFormValid}
                >
                    {isFormValid ? 'Continue to Payment' : 'Please fill up all fields'}
                </button>
            </div>
            
            <div className="text-center">
                <small className="text-muted d-flex align-items-center justify-content-center" style={{ opacity: 0.8 }}>
                    <i className="bi bi-shield-check me-2 text-success"></i> 
                    Your details are safe with us.
                </small>
            </div>
        </div>
    );
};

export default Checkout;