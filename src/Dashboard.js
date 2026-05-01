import React from 'react';

const Dashboard = ({ product, reviews, onBack, onAddToCart, onWriteReview, onDeleteReview }) => {
    const productReviews = reviews.filter(r => r.productId === product.id);
    return (
        <div className="mt-4">
            <button className="btn btn-link text-muted p-0 mb-4 text-decoration-none" onClick={onBack}><i className="bi bi-arrow-left me-2"></i>Back to Gallery</button>
            <div className="row">
                <div className="col-lg-7">
                    <div className="bg-white border rounded-5 shadow-sm p-5 text-center d-flex align-items-center justify-content-center" style={{ minHeight: '400px' }}>
                         <img src={product.image} alt={product.name} className="img-fluid rounded-4" style={{maxHeight: '550px'}} />
                    </div>
                </div>
                <div className="col-lg-5 ps-lg-5 mt-4 mt-lg-0">
                    <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2 mb-3 fw-bold">{product.category}</span>
                    <h1 className="fw-bold display-6 mb-2">{product.name}</h1>
                    <p className="fw-bold display-6 mb-4 text-primary">₱{product.price.toLocaleString()}</p>
                    <button className="btn w-100 py-3 rounded-pill fw-bold text-white shadow-lg mb-5" style={{ backgroundColor: '#b0926a' }} onClick={() => onAddToCart(product)}>Add to Bag</button>
                    
                    <h6 className="fw-bold mb-3">Community Reviews</h6>
                    <div className="bg-white p-4 rounded-4 border shadow-sm mb-4">
                        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {productReviews.length === 0 ? <p className="text-muted fst-italic small">No reviews yet.</p> : 
                            productReviews.map(rev => (
                                <div key={rev.id} className="border-bottom mb-4 pb-3 position-relative d-flex justify-content-between align-items-start">
                                    <div>
                                        <div className="text-warning small mb-1">
                                            {[...Array(5)].map((_, i) => <i key={i} className={`bi ${i < rev.rating ? 'bi-star-fill' : 'bi-star'}`}></i>)}
                                        </div>
                                        <div className="fw-bold text-dark mb-1" style={{fontSize: '0.85rem'}}>{rev.userName}</div>
                                        <p className="text-muted mb-0 small">"{rev.comment}"</p>
                                    </div>
                                    {rev.isUser && <button className="btn btn-sm text-danger" onClick={() => onDeleteReview(rev.id)}><i className="bi bi-trash"></i></button>}
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className="btn btn-outline-primary w-100 py-3 rounded-pill fw-bold" onClick={onWriteReview}><i className="bi bi-pencil-square me-2"></i>Write a Review</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;