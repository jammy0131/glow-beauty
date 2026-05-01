import React from 'react';

const initialProducts = [
  { id: 1, name: "Hydrating Glow Serum", category: "Skincare", price: 1250, badge: "New", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "Velvet Matte Lipstick", category: "Makeup", price: 550, badge: "Best Seller", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "Crystal Face Roller", category: "Tools", price: 890, badge: "Limited", image: "https://images.unsplash.com/photo-1714176774596-45946a7325fd?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 4, name: "Night Repair Cream", category: "Skincare", price: 2100, badge: "Popular", image: "https://images.unsplash.com/photo-1630854984065-dcf945c6f47d?q=80&w=799&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 5, name: "Precision Eyeliner", category: "Makeup", price: 350, badge: "New", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZP862WHQ9bhd2-AcVpmOi3m4v1D1XXr_Bsg&s" },
  { id: 6, name: "Professional Brush Set", category: "Tools", price: 1800, badge: "Essentials", image: "https://images.unsplash.com/photo-1600228390270-970186129936?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 7, name: "Lavender Body Scrub", category: "Body Care", price: 420, badge: "Eco", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCwQl7W5reRWq5b6jeGE1d7qwNhjmSqtC5QQ&s" },
  { id: 8, name: "Sun Protection SPF 50", category: "Skincare", price: 680, badge: "Top Rated", image: "https://k2pharmacy.ph/cdn/shop/files/NiveaSunProtectandMoistureSpf50125mL1_batcheditor_fotor_grande.jpg?v=1724046560" },
  { id: 9, name: "Midnight Rose Perfume", category: "Fragrance", price: 3200, badge: "Luxury", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLOAkhp5HG_6bSf8pOM3b8WO20sHcjmpm6pA&s" },
  { id: 10, name: "Volumizing Mascara", category: "Makeup", price: 480, badge: "New", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM_RA1UUwXa3PT2l4LeVDb_u1Af6e9sKvdbQ&s" },
  { id: 11, name: "Argan Oil Hair Mask", category: "Hair Care", price: 950, badge: "Best Seller", image: "https://images.unsplash.com/photo-1667242003572-96caaf8ac5c4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 12, name: "Refreshing Toner", category: "Skincare", price: 320, badge: "Sale", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf_M6jkDXdgtg9I9-ryQ0itOUhIGw68_IU8w&s" },
  { id: 13, name: "Peach Blossom Blush", category: "Makeup", price: 590, badge: "New", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2zPy10ywTG_mKZZSYcK_E52XlhcPAXfg5Qg&s" },
  { id: 14, name: "Vitamin C Serum", category: "Skincare", price: 1450, badge: "Trending", image: "https://images.unsplash.com/photo-1723951174326-2a97221d3b7f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 15, name: "Electric Facial Cleanser", category: "Tools", price: 2800, badge: "High Tech", image: "https://i5.walmartimages.com/seo/Electric-Facial-Cleansing-Brush-System-Battery-Operated-Face-Cleanser-Spin-Massager-w-5-Heads_c933e1e5-ee12-4b3b-af74-ce5935adad43_1.2ed11377aa0c9bb5d365b64e6198aa3a.jpeg" },
  { id: 16, name: "Citrus Body Wash", category: "Body Care", price: 380, badge: "Fresh", image: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/cmo/cmo00444/l/28.jpg" },
  { id: 17, name: "Coconut Hair Serum", category: "Hair Care", price: 720, badge: "Eco", image: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/pal/pal03320/l/62.jpg" },
  { id: 18, name: "Setting Spray 24h", category: "Makeup", price: 850, badge: "Long Lasting", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSre96KiorpcmYyy4TH0i7fd-dPGW7Wa7x1RQ&s" },
  { id: 19, name: "Cooling Eye Gel", category: "Skincare", price: 520, badge: "Must Have", image: "https://m.media-amazon.com/images/I/71kknn-6BlL.jpg" },
  { id: 20, name: "Nourishing Hand Cream", category: "Body Care", price: 290, badge: "Small", image: "https://media.amway.com.ph/sys-master/images/h2f/h0a/10696580825118/125902-en-US-1800px-01_amway-WF_Product_588Wx588H" }
];

const ProductCard = ({ onSelect, onAddToCart, searchQuery, selectedCategory }) => {

  const filteredProducts = initialProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="row g-4">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div key={product.id} className="col-md-4 col-lg-3">
            <div
              className="card h-100 border-0 shadow-sm p-3 rounded-4 product-card"
              onClick={() => onSelect(product)}
              style={{ cursor: 'pointer' }}
            >
              {product.badge && (
                <span className="badge position-absolute top-0 start-0 m-3 rounded-pill px-3 py-2"
                  style={{ backgroundColor: '#b0926a', zIndex: 1 }}>
                  {product.badge}
                </span>
              )}

              <img
                src={product.image}
                alt={product.name}
                className="rounded-4 mb-3"
                style={{ height: '200px', objectFit: 'cover' }}
              />

              <h6 className="fw-bold mb-1 text-truncate">{product.name}</h6>
              <p className="text-muted small mb-3">{product.category}</p>

              <div className="d-flex justify-content-between align-items-center mt-auto">
                <span className="fw-bold" style={{ color: '#b0926a' }}>
                  ₱{product.price.toLocaleString()}
                </span>
                
                {/* IN-UPDATE NA BUTTON COLOR DITO */}
                <button
                  className="btn text-white btn-sm rounded-pill px-3 border-0"
                  style={{ backgroundColor: '#b0926a' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-12 text-center py-5">
          <p className="text-muted">No products found.</p>
        </div>
      )}
    </div>
  );
};

export default ProductCard;