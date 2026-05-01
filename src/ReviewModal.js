import React, { useState } from 'react';

const backdropStyle = {
    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 2000,
    display: 'flex', alignItems: 'center', justifyContent: 'center'
};

const ReviewModal = ({ productId, onClose, onSave }) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [reviewerName, setReviewerName] = useState("");

    const handleSubmit = () => {
        if(!reviewerName.trim() || !comment.trim()) return alert("Please fill in your name and comment.");
        
        onSave({
            id: Date.now(),
            productId: productId,
            userName: reviewerName,
            rating: rating,
            comment: comment,
            isUser: true
        });
        onClose();
    };

    return (
        <div style={backdropStyle}>
            <div className="bg-white p-5 rounded-5 shadow-lg text-center" style={{ maxWidth: '400px', width: '90%' }}>
                <h4 className="fw-bold mb-4">Your Feedback</h4>
                <div className="mb-4 fs-2 text-warning">
                    {[1, 2, 3, 4, 5].map(n => (
                        <i 
                            key={n} 
                            className={`bi ${n <= rating ? 'bi-star-fill' : 'bi-star'} px-1`} 
                            style={{ cursor: 'pointer' }} 
                            onClick={() => setRating(n)}
                        ></i>
                    ))}
                </div>
                <input 
                    type="text" 
                    className="form-control rounded-pill mb-3 bg-light py-2 px-4 border-0 shadow-sm" 
                    placeholder="Your Name" 
                    value={reviewerName} 
                    onChange={(e) => setReviewerName(e.target.value)} 
                />
                <textarea 
                    className="form-control rounded-4 mb-4 bg-light py-3 px-4 border-0 shadow-sm" 
                    rows="3" 
                    placeholder="Write your thoughts..." 
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <button 
                    className="btn w-100 py-3 rounded-pill fw-bold text-white" 
                    style={{ backgroundColor: '#1a2a3a' }} 
                    onClick={handleSubmit}
                >
                    Submit Experience
                </button>
                <button 
                    className="btn btn-link btn-sm text-muted mt-3 text-decoration-none" 
                    onClick={onClose}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ReviewModal;