const ReviewModal = ({ show, onClose, onPostReview, currentReview, onDeleteReview }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState('');
    const [username, setUsername] = useState('');

    // I-sync ang data kung may existing review na
    useEffect(() => {
        if (currentReview) {
            setRating(currentReview.rating);
            setComment(currentReview.comment);
            setUsername(currentReview.username);
        } else {
            setRating(0);
            setComment('');
            setUsername('');
        }
    }, [currentReview, show]);

    if (!show) return null;

    return (
        <div style={backdropStyle}>
            <div className="bg-white p-4 rounded-5 shadow-lg position-relative" style={{ width: '90%', maxWidth: '450px' }}>
                <button className="btn-close position-absolute top-0 end-0 m-4" onClick={onClose}></button>
                <h4 className="fw-bold mb-4 text-center mt-2">Write a Review</h4>
                
                <div className="mb-3">
                    <input 
                        type="text" 
                        className="form-control rounded-pill py-2 px-3 bg-light border-0" 
                        placeholder="Your Name" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="text-center mb-4">
                    <div className="d-flex justify-content-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <i 
                                key={star}
                                className={`bi fs-1 ${star <= (hover || rating) ? 'bi-star-fill text-warning' : 'bi-star text-secondary'}`}
                                style={{ cursor: 'pointer', transition: '0.2s' }}
                                onMouseEnter={() => setHover(star)}
                                onMouseLeave={() => setHover(0)}
                                onClick={() => setRating(star)}
                            ></i>
                        ))}
                    </div>
                    <p className="text-muted small mt-2">{rating > 0 ? `${rating} Stars Selected` : 'Tap stars to rate'}</p>
                </div>

                <textarea 
                    className="form-control rounded-4 p-3 bg-light border-0 mb-4" 
                    rows="4" 
                    placeholder="Share your experience..." 
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>

                <div className="d-flex flex-column gap-2">
                    <button className="btn btn-primary rounded-pill fw-bold py-2" onClick={() => {
                        if(rating === 0 || !username) alert('Please provide your name and a rating!');
                        else { 
                            onPostReview({ username, rating, comment }); 
                            onClose(); 
                        }
                    }}>
                        {currentReview ? 'Update Review' : 'Post Review'}
                    </button>
                    
                    {currentReview && (
                        <button className="btn btn-outline-danger rounded-pill fw-bold py-2" onClick={() => {
                            if(window.confirm('Delete this review?')) {
                                onDeleteReview();
                                onClose();
                            }
                        }}>
                            Delete Review
                        </button>
                    )}
                    
                    <button className="btn btn-link text-muted text-decoration-none" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};