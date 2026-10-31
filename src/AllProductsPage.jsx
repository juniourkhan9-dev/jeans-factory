import React, { useState } from 'react';

export default function AllProductsPage({ allProducts, onSelectProduct, onAddToCart, onBack, wishlist, onToggleWishlist }) {
  const [selectedAudience, setSelectedAudience] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');

  const audiences = ['ALL', 'Men', 'Women', 'Kids', 'Teens & Gen-Z'];
  const categories = ['ALL', 'Tops', 'Bottoms', 'Outerwear'];

  // Filter products
  const filteredProducts = allProducts.filter((p) => {
    const matchAudience = selectedAudience === 'ALL' || p.audience === selectedAudience;
    const matchCat = selectedCategory === 'ALL' || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        p.subCategory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchAudience && matchCat && matchSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return a.id - b.id;
  });

  return (
    <div className="all-products-page">
      {/* Catalog Header */}
      <div className="catalog-hero-header">
        <div className="container">
          <div className="catalog-breadcrumb">
            <button className="back-btn-link" onClick={onBack}>
              <i className="fa-solid fa-arrow-left"></i> Home
            </button>
            <span className="breadcrumb-separator">/</span>
            <strong>All Collections & Sub-Categories</strong>
          </div>
          <h1 className="catalog-title">ALL APPAREL & CLOTHING DROPS</h1>
          <p className="catalog-subtitle">
            Explore authentic hand-crafted denim washes, tailored outerwear, relaxed tees, and knitwear across all segments.
          </p>
        </div>
      </div>

      <div className="container catalog-body">
        {/* Filters and Controls Bar */}
        <div className="catalog-controls-bar">
          {/* Audience Filter Pills */}
          <div className="filter-pills-row">
            <span className="filter-label">Audience:</span>
            {audiences.map((aud) => (
              <button
                key={aud}
                className={`filter-pill ${selectedAudience === aud ? 'active' : ''}`}
                onClick={() => setSelectedAudience(aud)}
              >
                {aud}
              </button>
            ))}
          </div>

          {/* Search in Catalog */}
          <div className="catalog-search-input">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input 
              type="text" 
              placeholder="Search in all clothing..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Second Filter & Sorting Bar */}
        <div className="sub-filter-row">
          <div className="category-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`tab-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="sort-box">
            <label>Sort By:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="featured">Featured Styles</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
            </select>
            <span className="total-count-badge">({sortedProducts.length} items)</span>
          </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length === 0 ? (
          <div className="empty-catalog-state">
            <i className="fa-solid fa-shirt"></i>
            <h3>No clothing matches found</h3>
            <p>Try resetting your filter or search keywords to view all collections.</p>
            <button 
              className="btn btn-dark btn-sm"
              onClick={() => { setSelectedAudience('ALL'); setSelectedCategory('ALL'); setSearchQuery(''); }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="catalog-grid-display">
            {sortedProducts.map((p) => {
              const isFav = wishlist.includes(p.id);
              return (
                <div 
                  key={p.id} 
                  className="product-card clickable-card"
                  onClick={() => onSelectProduct(p)}
                >
                  <div className="product-thumb">
                    {p.badge && <span className="product-badge">{p.badge}</span>}
                    <img src={p.images[0]} alt={p.name} />
                    <button 
                      className={`wishlist-heart ${isFav ? 'liked' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(p);
                      }}
                      aria-label="Wishlist"
                    >
                      <i className={isFav ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                    </button>
                    <div className="quick-add-overlay">
                      <button 
                        className="btn btn-sm btn-dark" 
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(p, 1);
                        }}
                      >
                        <i className="fa-solid fa-bag-shopping"></i> Quick Add
                      </button>
                    </div>
                  </div>
                  <div className="product-info">
                    <span className="product-subcat">{p.audience} • {p.subCategory}</span>
                    <h3 className="product-name">{p.name}</h3>
                    <div className="product-price">
                      ₹{p.price.toLocaleString('en-IN')}
                      {p.originalPrice && <span className="orig-price">₹{p.originalPrice}</span>}
                    </div>
                    <div className="color-swatches">
                      {p.colors.map((c, i) => (
                        <span 
                          key={i} 
                          className="swatch" 
                          style={{ backgroundColor: c.code }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
