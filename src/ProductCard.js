import React from 'react';

export default function ProductCard({ product, onSelectProduct, onAddToCart }) {
    return (
        <div className="col-md-4">
            <div className="card p-3" onClick={() => onSelectProduct(product)}>
                <img src={product.image} alt="" />
                <h6>{product.name}</h6>
                <p>${product.price}</p>

                <button onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                }}>
                    Add
                </button>
            </div>
        </div>
    );
}