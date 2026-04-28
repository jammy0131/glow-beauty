import React from 'react';

const products = [
    { id: 1, name: "Hydrating Glow Serum", category: "Skincare", price: 45.00, icon: "bi-droplet-half", badge: "New" },
    { id: 2, name: "Velvet Matte Lipstick", category: "Makeup", price: 22.00, icon: "bi-palette", badge: "Best Seller" },
    { id: 3, name: "Crystal Face Roller", category: "Tools", price: 30.00, icon: "bi-gem", badge: "Limited" }
];

const Gallery = ({ onSelect, onAdd }) => (
    <>
        <div className="p-5 rounded-5 mb-5 text-center shadow-sm" style={{ background: '#E0E7FF' }}>
            <h1 className="fw-bold display-4 mb-4">Summer Radiance Collection</h1>
            <input type="text" className="form-control rounded-pill py-3 px-4 mx-auto shadow-sm" style={{ maxWidth: '600px' }} placeholder="Search products..." />
        </div>
        <div className="row g-4">
            {products.map(p => (
                <div key={p.id} className="col-md-4">
                    <div className="card h-100 border-0 shadow-sm p-4 rounded-5" onClick={() => onSelect(p)}>
                        <span className="badge bg-black rounded-pill position-absolute m-3">{p.badge}</span>
                        <div className="bg-light-purple p-5 rounded-4 mb-3 text-center">
                            <i className={`bi ${p.icon} text-primary`} style={{ fontSize: '4rem' }}></i>
                        </div>
                        <h6 className="fw-bold">{p.name}</h6>
                        <div className="d-flex justify-content-between align-items-center">
                            <span className="text-primary fw-bold fs-5">${p.price.toFixed(2)}</span>
                            <button className="btn btn-dark rounded-pill px-3" onClick={(e) => { e.stopPropagation(); onAdd(p); }}>Add</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </>
);

export default Gallery;