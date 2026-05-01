import React, { useState } from 'react';

const CustomerService = ({ preFilledOrderId, onBack, onSubmitReport }) => {
    const [issueType, setIssueType] = useState('Damaged Product');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({}); // Dito itatago ang mga validation errors

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const validateForm = () => {
        let newErrors = {};

        // 1. Description Validation: Dapat hindi empty at lagpas 20 chars
        if (!description.trim()) {
            newErrors.description = "Please provide a detailed description of the issue.";
        } else if (description.length < 20) {
            newErrors.description = "Description is too short. Please provide at least 20 characters.";
        }

        // 2. Image Validation: Required lalo na kung damaged product
        if (!image) {
            newErrors.image = "Please upload a photo as evidence of the issue.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // true kung walang error
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            const reportData = {
                orderId: preFilledOrderId || "N/A",
                issueType,
                description,
                image,
                dateSubmitted: new Date().toLocaleString()
            };
            onSubmitReport(reportData);
        }
    };

    return (
        <div className="container py-4 animate__animated animate__fadeIn">
            <div className="mx-auto" style={{ maxWidth: '600px' }}>
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                    <div className="p-4 text-white text-center" style={{ backgroundColor: '#b0926a' }}>
                        <h4 className="fw-bold mb-0">Customer Support</h4>
                        <p className="small mb-0 opacity-75">Tell us what happened with your order</p>
                    </div>
                    
                    <div className="card-body p-4">
                        <form onSubmit={handleSubmit}>
                            {/* ORDER ID - READ ONLY */}
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted text-uppercase">Order ID</label>
                                <input type="text" className="form-control bg-light border-0 py-2" value={preFilledOrderId || "GLW-XXXXX"} readOnly />
                            </div>

                            {/* ISSUE TYPE */}
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted text-uppercase">Issue Type</label>
                                <select className="form-select border-0 bg-light py-2" value={issueType} onChange={(e) => setIssueType(e.target.value)}>
                                    <option>Damaged Product</option>
                                    <option>Wrong Item Received</option>
                                    <option>Missing Item</option>
                                    <option>Delivery Delay</option>
                                    <option>Others</option>
                                </select>
                            </div>

                            {/* DESCRIPTION WITH ERROR MESSAGE */}
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted text-uppercase">Description</label>
                                <textarea 
                                    className={`form-control border-0 bg-light ${errors.description ? 'is-invalid' : ''}`}
                                    rows="4" 
                                    placeholder="Explain the problem clearly..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                                {errors.description && <div className="invalid-feedback small fw-bold">{errors.description}</div>}
                                <div className="text-end text-muted mt-1" style={{ fontSize: '0.7rem' }}>
                                    {description.length}/20 characters minimum
                                </div>
                            </div>

                            {/* IMAGE UPLOAD WITH PREVIEW & ERROR */}
                            <div className="mb-4">
                                <label className="form-label small fw-bold text-muted text-uppercase d-block">Evidence Photo</label>
                                {image ? (
                                    <div className="position-relative d-inline-block rounded-3 overflow-hidden border">
                                        <img src={image} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                                        <button type="button" className="btn-close btn-close-white position-absolute top-0 end-0 p-1 m-1 bg-dark opacity-75" onClick={() => setImage(null)}></button>
                                    </div>
                                ) : (
                                    <div className={`p-4 border-2 border-dashed rounded-4 text-center ${errors.image ? 'border-danger text-danger' : 'border-light-subtle text-muted'}`} style={{ backgroundColor: '#fafafa' }}>
                                        <i className="bi bi-camera fs-1"></i>
                                        <div className="mt-2 small">Click to upload photo</div>
                                        <input type="file" className="opacity-0 position-absolute w-100 h-100 top-0 start-0" accept="image/*" onChange={handleImageChange} style={{ cursor: 'pointer' }} />
                                    </div>
                                )}
                                {errors.image && <div className="text-danger small fw-bold mt-1">{errors.image}</div>}
                            </div>

                            {/* ACTION BUTTONS */}
                            <div className="d-flex gap-3 pt-2">
                                <button type="button" className="btn btn-outline-secondary flex-grow-1 rounded-pill py-2 fw-bold" onClick={onBack}>
                                    CANCEL
                                </button>
                                <button type="submit" className="btn btn-primary flex-grow-1 rounded-pill py-2 fw-bold" style={{ backgroundColor: '#b0926a', border: 'none' }}>
                                    SUBMIT REPORT
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerService;