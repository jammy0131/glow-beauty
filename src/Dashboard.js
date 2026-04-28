import React from 'react';

export default function Dashboard({ product, onBack, onAddToCart }) {
    if (!product) return null;

    return (
        <div>
            <button onClick={onBack}>Back</button>

            <h2>{product.name}</h2>
            <img src={product.image} alt="" width="200" />
            <p>${product.price}</p>

            <button onClick={() => onAddToCart(product)}>Add to Cart</button>
        </div>
    );
}