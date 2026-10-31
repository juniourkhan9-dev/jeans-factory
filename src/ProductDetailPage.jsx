import React, { useState } from 'react';

export default function ProductDetailPage({ product, allProducts, onBack, onSelectProduct, onAddToCart, wishlist, onToggleWishlist }) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  // Find similar options (same category or audience, excluding current product)
  const similarProducts = allProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || p.audience === product.audience))
    .slice(0, 4);

  const isFav = wishlist.includes(product.id);

  return (
    <div className="product-detail-page">
      {/* Breadcrumb Navigation */}
      <div className="container">
        <div className="detail-breadcrumb">
          <button className="back-btn-link" onClick={onBack}>
            <i className="fa-solid fa-arrow-left"></i> Back to Catalog
          </button>
          <span className="breadcrumb-separator">/</span>
          <span>{product.audience}</span>
          <span className="breadcrumb-separator">/</span>
          <span>{product.category}</span>
          <span className="breadcrumb-separator">/</span>
          <strong className="breadcrumb-current">{product.name}</strong>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <section className="section detail-section">
        <div className="container product-detail-layout">
          {/* Left: Gallery Thumbnails & Big View */}
          <div className="product-gallery">
            <div className="thumbnails-column">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  className={`thumb-btn ${selectedImage === img ? 'active' : ''}`}
                  onClick={() => setSelectedImage(img)}
                  aria-label={`Thumbnail ${idx + 1}`}
                >
                  <img src={img} alt={`${product.name} preview ${idx + 1}`} />
                </button>
              ))}
            </div>
            <div className="main-image-display">
              {product.badge && <span className="detail-badge">{product.badge}</span>}
              <button 
                className={`detail-wishlist-btn ${isFav ? 'liked' : ''}`}
                onClick={() => onToggleWishlist(product)}
                aria-label="Wishlist"
              >
                <i className={isFav ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
              </button>
              <img src={selectedImage} alt={product.name} className="main-zoom-img" />
            </div>
          </div>

          {/* Right: Product Info & Purchase Options */}
          <div className="product-purchase-box">
            <div className="detail-meta">
              <span className="detail-audience-tag">{product.audience} • {product.subCategory}</span>
              <h1 className="detail-title">{product.name}</h1>
              
              <div className="detail-rating-row">
                <span className="stars">★★★★★</span>
                <span className="rating-score">{product.rating}</span>
                <span className="reviews-count">({product.reviewsCount} customer reviews)</span>
              </div>

              <div className="detail-price-row">
                <span className="current-price">₹{product.price.toLocaleString('en-IN')}</span>
                {product.originalPrice && (
                  <>
                    <span className="original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                    <span className="discount-tag">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="taxes-note">Inclusive of all taxes. Free shipping on orders over ₹999.</p>
            </div>

            {/* Color Swatch Selector */}
            <div className="selection-group">
              <label className="selection-label">
                Color: <strong>{selectedColor}</strong>
              </label>
              <div className="color-swatches-lg">
                {product.colors.map((c, i) => (
                  <button
                    key={i}
                    className={`swatch-btn ${selectedColor === c.name ? 'active' : ''}`}
                    onClick={() => setSelectedColor(c.name)}
                    style={{ backgroundColor: c.code }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="selection-group">
              <div className="size-header-row">
                <label className="selection-label">
                  Select Size: <strong>{selectedSize}</strong>
                </label>
                <button className="size-guide-btn" onClick={() => alert("Size Guide: True to regular standard Indian/European sizing.")}>
                  <i className="fa-solid fa-ruler"></i> Size Guide
                </button>
              </div>
              <div className="sizes-grid">
                {product.sizes.map((sz, i) => (
                  <button
                    key={i}
                    className={`size-tile ${selectedSize === sz ? 'active' : ''}`}
                    onClick={() => setSelectedSize(sz)}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="action-row">
              <div className="quantity-counter">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>

              <button
                className="btn btn-dark add-to-bag-btn"
                onClick={() => onAddToCart({ ...product, selectedColor, selectedSize }, quantity)}
              >
                <i className="fa-solid fa-bag-shopping"></i> Add To Bag • ₹{(product.price * quantity).toLocaleString('en-IN')}
              </button>
            </div>

            {/* Trust Assurances */}
            <div className="detail-assurances">
              <div className="assurance-item">
                <i className="fa-solid fa-truck-fast"></i>
                <span>Dispatches in 24 Hours • Fast Delivery</span>
              </div>
              <div className="assurance-item">
                <i className="fa-solid fa-rotate-left"></i>
                <span>Easy 30-Day Hassle-Free Returns & Exchange</span>
              </div>
              <div className="assurance-item">
                <i className="fa-solid fa-shield-check"></i>
                <span>100% Authentic Jeans Factory Craftsmanship</span>
              </div>
            </div>

            {/* Description & Material Details */}
            <div className="detail-accordion">
              <h4 className="desc-heading">Description</h4>
              <p className="desc-text">{product.description}</p>
              
              <h4 className="desc-heading" style={{ marginTop: '16px' }}>Fabric & Care</h4>
              <ul className="details-bullets">
                {product.details.map((d, idx) => (
                  <li key={idx}><i className="fa-solid fa-check"></i> {d}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Options Recommendation Section */}
      <section className="section similar-options-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">SIMILAR OPTIONS YOU MAY LIKE</h2>
              <p className="section-subtitle">Complementary styles tailored for this look.</p>
            </div>
          </div>

          <div className="products-grid">
            {similarProducts.map((p) => {
              const isSimFav = wishlist.includes(p.id);
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
                      className={`wishlist-heart ${isSimFav ? 'liked' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(p);
                      }}
                      aria-label="Wishlist"
                    >
                      <i className={isSimFav ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                    </button>
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{p.name}</h3>
                    <div className="product-price">₹{p.price.toLocaleString('en-IN')}</div>
                    <div className="color-swatches">
                      {p.colors.map((c, i) => (
                        <span 
                          key={i} 
                          className="swatch" 
                          style={{ backgroundColor: c.code }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
