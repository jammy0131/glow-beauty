import React from 'react';
import ProductCard from './ProductCard';

const Gallery = ({ onSelectProduct, onAddToCart, searchQuery, setSearchQuery, selectedCategory }) => {
    return (
        <div className="container mt-4">
            {/* Banner - Pinalitan ang backgroundColor mula #d1e3ff (blue) patungong Purple/Magenta theme */}
            <div 
                className="rounded-4 p-5 mb-5 text-center shadow-sm" 
                style={{ 
                    backgroundColor: 'b0926a', // Ito ang Purple/Magenta base na hango sa iyong logo theme
                    minHeight: '300px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center' 
                }}
            >
                {/* Ginawang puti (white) ang text para mabasa sa dark background */}
                <h1 className="display-4 fw-bold mb-4" style={{ color: '#ffffff' }}>Summer Radiance Collection</h1>
                
                {/* Search Bar sa loob ng Banner */}
                <div className="mx-auto w-100" style={{ maxWidth: '600px' }}>
                    <div className="input-group bg-white rounded-pill overflow-hidden px-3 shadow-sm">
                        <span className="input-group-text bg-transparent border-0">
                            <i className="bi bi-search text-muted"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control border-0 py-3 shadow-none"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <ProductCard 
                onSelect={onSelectProduct}
                onAddToCart={onAddToCart}
                searchQuery={searchQuery}
                selectedCategory={selectedCategory} 
            />
        </div>
    );
};

export default Gallery;