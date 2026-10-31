import React, { useState, useEffect } from 'react';
import { allProducts } from './productsData';
import ProductDetailPage from './ProductDetailPage';
import AllProductsPage from './AllProductsPage';

// Full Page / 100vh Hero Slider Backgrounds
const heroSlides = [
  {
    tag: "AUTHENTIC DENIM & MODERN CUTS",
    title: "WEAR YOUR",
    titleEm: "CONFIDENCE",
    desc: "Signature washes, crafted fits, timeless style. Jeans Factory has everything you need to look and feel your absolute best every single day.",
    btnPrimary: "SHOP NEW IN",
    btnSecondary: "EXPLORE COLLECTIONS",
    bgImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=85",
    badgeTitle: "JEANS FACTORY",
    badgeSub: "EST. 1998 DENIM CO."
  },
  {
    tag: "THE DENIM LAB 2026",
    title: "SIGNATURE",
    titleEm: "WIDE-LEG & RAW",
    desc: "Engineered from sustainable organic Turkish denim. Designed for maximum movement, breathable comfort, and effortless street prestige.",
    btnPrimary: "DISCOVER DENIM",
    btnSecondary: "FIT FINDER",
    bgImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=2000&q=85",
    badgeTitle: "DENIM LAB",
    badgeSub: "HANDCRAFTED WASHES"
  },
  {
    tag: "NEW SEASON ARRIVALS",
    title: "ELEVATED",
    titleEm: "AUTUMN ESSENTIALS",
    desc: "Layer up in plush wool knitwear, structured oversized jackets, and tailored Italian denim washes that command respect everywhere you step.",
    btnPrimary: "SHOP THE LOOK",
    btnSecondary: "VIEW LOOKBOOK",
    bgImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=2000&q=85",
    badgeTitle: "AUTUMN EDIT",
    badgeSub: "LIMITED EDITION"
  },
  {
    tag: "SUSTAINABLE LUXURY",
    title: "CRAFTED FOR",
    titleEm: "GENERATIONS",
    desc: "100% recyclable organic cotton and zero-waste water purification techniques. Look extraordinary while respecting our planet.",
    btnPrimary: "EXPLORE SUSTAINABILITY",
    btnSecondary: "OUR STORY",
    bgImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2000&q=85",
    badgeTitle: "CONSCIOUS FIT",
    badgeSub: "ZERO WASTE DENIM"
  }
];

const categories = [
  { name: 'Tops', img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=300&q=80' },
  { name: 'Bottoms', img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=300&q=80' },
  { name: 'Outerwear', img: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=300&q=80' },
  { name: 'Knitwear', img: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=300&q=80' },
  { name: 'Shirts', img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=300&q=80' },
  { name: 'Denim', img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=300&q=80' },
  { name: 'Sale', isSale: true }
];

// 4 Feature Boxes: Men, Women, Kids, Teens & Gen-Z
const collections = [
  {
    tag: "GENTS DENIM & SHIRTS",
    title: 'Men',
    desc: 'Structured fits, rugged trucker jackets & raw selvedge denim.',
    itemsCount: '180+ Styles',
    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80'
  },
  {
    tag: "SIGNATURE STYLES",
    title: 'Women',
    desc: 'Flattering high-rise wide legs, effortless knitwear & chic cuts.',
    itemsCount: '240+ Styles',
    img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80'
  },
  {
    tag: "PLAY & COMFORT",
    title: 'Kids',
    desc: 'Durable stretch denim & comfy everyday cotton essentials.',
    itemsCount: '95+ Styles',
    img: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=700&q=80'
  },
  {
    tag: "STREETWEAR & MODERN",
    title: 'Teens & Gen-Z',
    desc: 'Oversized silhouettes, cargo jeans, relaxed vibes & drop fits.',
    itemsCount: '130+ Styles',
    img: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=700&q=80'
  }
];

export default function App() {
  // Navigation Routing State ('home' | 'product-detail' | 'all-products')
  const [currentPage, setCurrentPage] = useState('home');
  const [activeProduct, setActiveProduct] = useState(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  
  // AI Assistant Chat Widget State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Namaste! Main aapka Jeans Factory shopping assistant hoon ✨\nAapko Men, Women, Kids ya All Clothes collection mein se kya dekhna hai?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Auto Slider Effect (Changes every 5 seconds)
  useEffect(() => {
    if (currentPage !== 'home' || isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, currentPage]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // Toast helper
  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg('');
    }, 2800);
  };

  // Open Product Details
  const handleOpenProduct = (product) => {
    setActiveProduct(product);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open All Products (View All)
  const handleOpenAllProducts = () => {
    setCurrentPage('all-products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Go Back Home
  const handleGoHome = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add to cart
  const addToCart = (product, qty = 1) => {
    const size = product.selectedSize || product.sizes?.[0] || 'Standard';
    const color = product.selectedColor || product.colors?.[0]?.name || 'Standard';
    const cartItemId = `${product.id}-${size}-${color}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { ...product, cartItemId, size, color, qty }];
    });
    showToast(`${product.name} bag mein add ho gaya! (₹${product.price})`);
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  // Toggle wishlist
  const toggleWishlist = (product) => {
    if (wishlist.includes(product.id)) {
      setWishlist((prev) => prev.filter((id) => id !== product.id));
      showToast(`Wishlist se hata diya gaya`);
    } else {
      setWishlist((prev) => [...prev, product.id]);
      showToast(`${product.name} wishlist mein add ho gaya ❤️`);
    }
  };

  // Chat message sending
  const handleSendMessage = (textToSend) => {
    const query = textToSend || chatInput;
    if (!query.trim()) return;

    const newMsgs = [...chatMessages, { sender: 'user', text: query }];
    setChatMessages(newMsgs);
    if (!textToSend) setChatInput('');

    setTimeout(() => {
      let reply = "Humare paas Men, Women, Kids aur Teens ke liye pure denim washes aur modern cuts available hain!";
      const lower = query.toLowerCase();

      if (lower.includes('all') || lower.includes('view')) {
        handleOpenAllProducts();
        reply = "Aapke liye humne 'All Collections' page open kar diya hai! Yahan par aap sabhi kapde filter kar sakte hain.";
      } else if (lower.includes('men') || lower.includes('man')) {
        reply = "Men's Collection mein Selvedge Denim, Relaxed Cargo Jeans aur Denim Jackets available hain!";
      } else if (lower.includes('women') || lower.includes('woman')) {
        reply = "Women's Collection mein High-Waist Wide Leg Jeans (₹2,499) aur Ribbed Tops (₹1,499) trending hain!";
      } else if (lower.includes('kid')) {
        reply = "Kids Collection mein stretchable, super soft & durable jeans start ho rahi hain ₹1,199 se!";
      } else if (lower.includes('teen') || lower.includes('adult') || lower.includes('gen-z')) {
        reply = "Teens & Gen-Z segment mein Baggy Cargo Jeans aur Oversized Hoodies top trending hain!";
      }

      setChatMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
    }, 500);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const slide = heroSlides[currentSlide];

  return (
    <div className="app-root">
      {/* Top Announcement Bar */}
      <div className="announcement-bar">
        <div className="container bar-content">
          <p>FREE SHIPPING ON ORDERS OVER ₹999 | EASY 30-DAY RETURNS</p>
          <div className="top-links">
            <a href="#stores"><i className="fa-solid fa-location-dot"></i> Store Locator</a>
            <span>•</span>
            <a href="#help"><i className="fa-regular fa-circle-question"></i> Help</a>
            <span>•</span>
            <a href="#account"><i className="fa-regular fa-user"></i> Sign In</a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="header transparent-header">
        <div className="container navbar">
          {/* Logo */}
          <button className="brand-logo btn-logo" onClick={handleGoHome}>
            <div className="logo-mark">
              <svg viewBox="0 0 40 40" width="34" height="34" fill="none">
                <circle cx="20" cy="20" r="18" stroke="#111" strokeWidth="2.5" strokeDasharray="80 15" />
                <path d="M14 13C14 13 18 11 23 15C28 19 25 25 21 27" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="20" cy="20" r="2.5" fill="#111" />
              </svg>
            </div>
            <div className="brand-text">
              <span className="main-title">JEANS FACTORY</span>
              <span className="sub-title">EST. DENIM CO.</span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="nav-menu">
            <button className={`nav-link ${currentPage === 'home' ? 'active' : ''}`} onClick={handleGoHome}>HOME</button>
            <button className={`nav-link ${currentPage === 'all-products' ? 'active' : ''}`} onClick={handleOpenAllProducts}>ALL CLOTHING</button>
            <button className="nav-link" onClick={handleOpenAllProducts}>WOMEN</button>
            <button className="nav-link" onClick={handleOpenAllProducts}>MEN</button>
            <button className="nav-link" onClick={handleOpenAllProducts}>KIDS</button>
            <button className="nav-link" onClick={handleOpenAllProducts}>DENIM LAB</button>
            <button className="nav-link sale-tag" onClick={handleOpenAllProducts}>SALE</button>
          </nav>

          {/* Header Action Icons */}
          <div className="header-actions">
            <div className="search-box">
              <input 
                type="text" 
                placeholder="Search jeans, shirts, jackets..." 
                onFocus={handleOpenAllProducts}
              />
              <button className="search-btn" aria-label="Search" onClick={handleOpenAllProducts}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>

            <button className="icon-btn" aria-label="Profile"><i className="fa-regular fa-user"></i></button>
            
            <button className="icon-btn wishlist-btn" aria-label="Wishlist" onClick={handleOpenAllProducts}>
              <i className="fa-regular fa-heart"></i>
              {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
            </button>

            <button className="icon-btn cart-btn" onClick={() => setIsCartOpen(true)} aria-label="Cart">
              <i className="fa-solid fa-bag-shopping"></i>
              {cart.length > 0 && <span className="badge">{cart.reduce((a, c) => a + c.qty, 0)}</span>}
            </button>

            <button 
              className="hamburger-btn" 
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)} 
              aria-label="Toggle Navigation"
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileNavOpen && (
          <div className="mobile-nav">
            <button className="mob-link" onClick={() => { handleGoHome(); setIsMobileNavOpen(false); }}>Home</button>
            <button className="mob-link" onClick={() => { handleOpenAllProducts(); setIsMobileNavOpen(false); }}>All Clothing</button>
            <button className="mob-link" onClick={() => { handleOpenAllProducts(); setIsMobileNavOpen(false); }}>Women</button>
            <button className="mob-link" onClick={() => { handleOpenAllProducts(); setIsMobileNavOpen(false); }}>Men</button>
            <button className="mob-link" onClick={() => { handleOpenAllProducts(); setIsMobileNavOpen(false); }}>Kids</button>
            <button className="mob-link sale" onClick={() => { handleOpenAllProducts(); setIsMobileNavOpen(false); }}>Sale %</button>
          </div>
        )}
      </header>

      {/* VIEW ROUTING: HOME PAGE */}
      {currentPage === 'home' && (
        <main>
          {/* FULL PAGE 100VH AUTO SLIDER */}
          <section 
            className="fullscreen-hero"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Background Fullscreen Slider Images */}
            <div className="hero-bg-slider">
              {heroSlides.map((s, idx) => (
                <div 
                  key={idx}
                  className={`hero-bg-slide ${idx === currentSlide ? 'active' : ''}`}
                  style={{ backgroundImage: `url(${s.bgImage})` }}
                >
                  <div className="hero-overlay-gradient"></div>
                </div>
              ))}
            </div>

            {/* Hero Slide Content Overlaid on Full Page */}
            <div className="container full-hero-content">
              <div className="hero-text-box" key={`slide-box-${currentSlide}`}>
                <span className="hero-glass-tag">{slide.tag}</span>
                <h1 className="hero-full-title">
                  {slide.title} <br />
                  <em>{slide.titleEm}</em>
                </h1>
                <p className="hero-full-desc">{slide.desc}</p>
                
                <div className="hero-buttons">
                  <button className="btn btn-dark-glass" onClick={handleOpenAllProducts}>
                    {slide.btnPrimary} <i className="fa-solid fa-arrow-right"></i>
                  </button>
                  <button className="btn btn-outline-glass" onClick={handleOpenAllProducts}>
                    {slide.btnSecondary}
                  </button>
                </div>
              </div>

              {/* Floating Brand Stamp & Progress Line Indicators */}
              <div className="hero-slider-nav-panel">
                <div className="floating-hero-stamp">
                  <svg viewBox="0 0 40 40" width="28" height="28" fill="none">
                    <circle cx="20" cy="20" r="18" stroke="#111" strokeWidth="2.2" />
                    <path d="M14 13C14 13 18 11 23 15C28 19 25 25 21 27" stroke="#111" strokeWidth="2.2" strokeLinecap="round" />
                    <circle cx="20" cy="20" r="2.5" fill="#111" />
                  </svg>
                  <div>
                    <strong>{slide.badgeTitle}</strong>
                    <span>{slide.badgeSub}</span>
                  </div>
                </div>

                <div className="hero-progress-nav">
                  <div className="progress-bars-container">
                    {heroSlides.map((_, i) => (
                      <button 
                        key={i} 
                        className={`slide-bar-item ${i === currentSlide ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(i)}
                        aria-label={`Slide ${i + 1}`}
                      >
                        <span className="bar-fill"></span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Floating Trust Bar */}
            <div className="hero-bottom-trust">
              <div className="container">
                <div className="trust-bar-glass">
                  <div className="trust-item">
                    <div className="trust-icon"><i className="fa-solid fa-truck-fast"></i></div>
                    <div className="trust-text">
                      <strong>FREE SHIPPING</strong>
                      <span>On orders over ₹999</span>
                    </div>
                  </div>
                  <div className="trust-item">
                    <div className="trust-icon"><i className="fa-solid fa-rotate-left"></i></div>
                    <div className="trust-text">
                      <strong>EASY RETURNS</strong>
                      <span>30-day return policy</span>
                    </div>
                  </div>
                  <div className="trust-item">
                    <div className="trust-icon"><i className="fa-solid fa-shield-halved"></i></div>
                    <div className="trust-text">
                      <strong>SECURE PAYMENT</strong>
                      <span>100% UPI & Card checkout</span>
                    </div>
                  </div>
                  <div className="trust-item">
                    <div className="trust-icon"><i className="fa-solid fa-store"></i></div>
                    <div className="trust-text">
                      <strong>STORES NEAR YOU</strong>
                      <span>Find a Jeans Factory store</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4 Feature Audience Boxes: Men, Women, Kids, Teens & Gen-Z */}
          <section className="section collections-section" id="collections">
            <div className="container">
              <div className="section-header">
                <div>
                  <h2 className="section-title">SHOP BY CATEGORY & AUDIENCE</h2>
                  <p className="section-subtitle">Dedicated collections for Men, Women, Kids and Teens.</p>
                </div>
                <div className="header-nav-controls">
                  <button className="view-all-link btn-text-link" onClick={handleOpenAllProducts}>
                    View all collections <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>

              <div className="collections-grid">
                {collections.map((c, i) => (
                  <div 
                    key={i} 
                    className="collection-card audience-card clickable-card"
                    onClick={handleOpenAllProducts}
                  >
                    <img src={c.img} alt={c.title} />
                    <div className="collection-overlay">
                      <span className="audience-tag">{c.tag}</span>
                      <h4>{c.title}</h4>
                      <p>{c.desc}</p>
                      <div className="card-footer-action">
                        <button className="btn btn-sm btn-light-pill">
                          EXPLORE {c.title.toUpperCase()} <i className="fa-solid fa-arrow-right"></i>
                        </button>
                        <span className="styles-badge">{c.itemsCount}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Shop By Specific Product Category */}
          <section className="section category-section" id="categories">
            <div className="container">
              <div className="section-header">
                <div>
                  <h2 className="section-title">SHOP BY ESSENTIALS</h2>
                </div>
                <div className="header-nav-controls">
                  <button className="view-all-link btn-text-link" onClick={handleOpenAllProducts}>
                    View all items <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>

              <div className="category-grid">
                {categories.map((cat, idx) => (
                  <div 
                    key={idx} 
                    className="category-card clickable-card"
                    onClick={handleOpenAllProducts}
                  >
                    <div className={`cat-avatar ${cat.isSale ? 'sale-bubble' : ''}`}>
                      {cat.isSale ? (
                        <span>SALE</span>
                      ) : (
                        <img src={cat.img} alt={cat.name} />
                      )}
                    </div>
                    <span className="cat-label">{cat.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* NEW ARRIVALS SECTION: Removed Left/Right Arrows as requested */}
          <section className="section arrivals-section" id="newarrivals">
            <div className="container">
              <div className="section-header">
                <div>
                  <h2 className="section-title">NEW ARRIVALS</h2>
                  <p className="section-subtitle">Fresh styles. Just in.</p>
                </div>
                <div className="header-nav-controls">
                  {/* Clean View All Button with arrow buttons completely removed */}
                  <button className="view-all-link-highlight" onClick={handleOpenAllProducts}>
                    View all <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>

              <div className="products-grid">
                {allProducts.slice(0, 6).map((p) => {
                  const isFav = wishlist.includes(p.id);
                  return (
                    <div 
                      key={p.id} 
                      className="product-card clickable-card"
                      onClick={() => handleOpenProduct(p)}
                    >
                      <div className="product-thumb">
                        {p.badge && <span className="product-badge">{p.badge}</span>}
                        <img src={p.images[0]} alt={p.name} />
                        <button 
                          className={`wishlist-heart ${isFav ? 'liked' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(p);
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
                              addToCart(p, 1);
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
                              className={`swatch ${i === 0 ? 'active' : ''}`} 
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
            </div>
          </section>

          {/* Promo Grid */}
          <section className="section promo-section">
            <div className="container promo-grid">
              <div className="promo-card student-promo">
                <div className="promo-content">
                  <span className="promo-tag">STUDENTS GET</span>
                  <h3 className="promo-big">10% OFF</h3>
                  <p>Verify your student status and save extra on all denim.</p>
                  <button className="btn btn-light btn-pill" onClick={handleOpenAllProducts}>GET DISCOUNT</button>
                </div>
                <div className="promo-image">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" alt="Student Promo" />
                </div>
              </div>

              <div className="promo-card season-promo">
                <div className="promo-content">
                  <span className="promo-tag">NEW SEASON</span>
                  <h3 className="promo-mid">NEW LOOK</h3>
                  <p>Discover the latest denim trends curated for you.</p>
                  <button className="btn btn-outline-dark btn-pill" onClick={handleOpenAllProducts}>SHOP NOW</button>
                </div>
                <div className="promo-image">
                  <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=400&q=80" alt="New Season Look" />
                </div>
              </div>

              <div className="promo-card store-promo">
                <div className="promo-content">
                  <span className="promo-tag"><i className="fa-solid fa-location-dot"></i> VISIT US IN STORE</span>
                  <h3 className="promo-mid">Find your nearest<br />Jeans Factory store.</h3>
                  <button className="btn btn-light-trans btn-pill" onClick={() => alert("Finding closest Jeans Factory stores near you...")}>FIND STORE</button>
                </div>
                <div className="promo-image-bg">
                  <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80" alt="Storefront" />
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* VIEW ROUTING: PRODUCT DETAIL PAGE */}
      {currentPage === 'product-detail' && activeProduct && (
        <ProductDetailPage 
          product={activeProduct}
          allProducts={allProducts}
          onBack={handleGoHome}
          onSelectProduct={handleOpenProduct}
          onAddToCart={addToCart}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
        />
      )}

      {/* VIEW ROUTING: ALL PRODUCTS PAGE */}
      {currentPage === 'all-products' && (
        <AllProductsPage 
          allProducts={allProducts}
          onSelectProduct={handleOpenProduct}
          onAddToCart={addToCart}
          onBack={handleGoHome}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
        />
      )}

      {/* Sustainable Values Bar */}
      <div className="bottom-values-bar">
        <div className="container values-flex">
          <div className="val-box">
            <i className="fa-solid fa-recycle"></i>
            <div>
              <h5>SUSTAINABLE MATERIALS</h5>
              <p>Better for you. Better for the planet.</p>
            </div>
          </div>
          <div className="val-box">
            <i className="fa-solid fa-seedling"></i>
            <div>
              <h5>ETHICAL PRODUCTION</h5>
              <p>Made with care, fairness and respect.</p>
            </div>
          </div>
          <div className="val-box">
            <i className="fa-solid fa-heart-pulse"></i>
            <div>
              <h5>COMMUNITY FOCUSED</h5>
              <p>Fashion that gives back to people.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container footer-top">
          <div className="footer-col brand-col">
            <button className="brand-logo btn-logo" onClick={handleGoHome}>
              <div className="logo-mark">
                <svg viewBox="0 0 40 40" width="30" height="30" fill="none">
                  <circle cx="20" cy="20" r="18" stroke="#fff" strokeWidth="2.5" strokeDasharray="80 15" />
                  <path d="M14 13C14 13 18 11 23 15C28 19 25 25 21 27" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="20" cy="20" r="2.5" fill="#fff" />
                </svg>
              </div>
              <span className="main-title text-white">JEANS FACTORY</span>
            </button>
            <p className="footer-desc">
              Crafting premium denim wear and modern wardrobe essentials since 1998. Designed for everyday confidence, comfort, and longevity.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" aria-label="TikTok"><i className="fa-brands fa-tiktok"></i></a>
              <a href="#" aria-label="Pinterest"><i className="fa-brands fa-pinterest"></i></a>
              <a href="#" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>SHOP</h4>
            <ul>
              <li><button className="footer-link-btn" onClick={handleOpenAllProducts}>Men's Denim</button></li>
              <li><button className="footer-link-btn" onClick={handleOpenAllProducts}>Women's Jeans</button></li>
              <li><button className="footer-link-btn" onClick={handleOpenAllProducts}>Kids Collection</button></li>
              <li><button className="footer-link-btn" onClick={handleOpenAllProducts}>Teens & Gen-Z</button></li>
              <li><button className="footer-link-btn" onClick={handleOpenAllProducts}>Bestsellers</button></li>
              <li><button className="footer-link-btn" onClick={handleOpenAllProducts}>Sale & Clearance</button></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>CUSTOMER SERVICE</h4>
            <ul>
              <li><a href="#">Track Your Order</a></li>
              <li><a href="#">Returns & Exchanges</a></li>
              <li><a href="#">Denim Fit Guide</a></li>
              <li><a href="#">Shipping Information</a></li>
              <li><a href="#">Store Locator</a></li>
              <li><a href="#">Contact & Support</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>ABOUT US</h4>
            <ul>
              <li><a href="#">Our Story</a></li>
              <li><a href="#">Sustainability Pledges</a></li>
              <li><a href="#">Denim Innovation Lab</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Student Discount</a></li>
            </ul>
          </div>

          <div className="footer-col newsletter-col">
            <h4>STAY IN TOUCH</h4>
            <p>Subscribe to get 15% off your first order and exclusive access to denim drops.</p>
            <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); showToast("Thanks for subscribing!"); }}>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit" className="btn-primary-send"><i className="fa-solid fa-arrow-right"></i></button>
            </form>
          </div>
        </div>

        <div className="container footer-bottom">
          <p>&copy; 2026 Jeans Factory Co. All rights reserved.</p>
          <div className="legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Preferences</a>
          </div>
        </div>
      </footer>

      {/* Side Cart Drawer */}
      <div 
        className={`cart-drawer-overlay ${isCartOpen ? 'active' : ''}`} 
        onClick={() => setIsCartOpen(false)} 
      />
      <aside className={`cart-drawer ${isCartOpen ? 'active' : ''}`}>
        <div className="cart-drawer-header">
          <h3>Your Bag ({cart.reduce((a, c) => a + c.qty, 0)})</h3>
          <button className="close-drawer-btn" onClick={() => setIsCartOpen(false)}>&times;</button>
        </div>
        <div className="cart-items-list">
          {cart.length === 0 ? (
            <div className="empty-cart-msg">
              <i className="fa-solid fa-bag-shopping"></i>
              <p>Your bag is currently empty.</p>
              <button className="btn btn-dark btn-sm" onClick={() => { setIsCartOpen(false); handleOpenAllProducts(); }}>
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.cartItemId} className="cart-item-row">
                <img src={item.images?.[0]} alt={item.name} className="cart-item-thumb" />
                <div className="cart-item-details">
                  <div className="cart-item-title">{item.name}</div>
                  <div className="cart-item-meta">Size: {item.size} • Color: {item.color}</div>
                  <div className="cart-item-price">₹{item.price.toLocaleString('en-IN')} × {item.qty}</div>
                </div>
                <button className="cart-item-remove" onClick={() => removeFromCart(item.cartItemId)}>
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-subtotal">
              <span>Subtotal</span>
              <strong>₹{subtotal.toLocaleString('en-IN')}</strong>
            </div>
            <p className="free-shipping-note">GST & delivery charges calculated at checkout.</p>
            <button className="btn btn-dark btn-block" onClick={() => alert("Proceeding to checkout...")}>
              Checkout (₹{subtotal.toLocaleString('en-IN')})
            </button>
          </div>
        )}
      </aside>

      {/* Floating AI Shopping Assistant */}
      <div 
        className="ai-chat-bubble" 
        onClick={() => setIsChatOpen(!isChatOpen)}
        title="Chat with Shopping Buddy"
      >
        <div className="bubble-inner">
          <span className="ai-avatar-letter">JF</span>
          <span className="bubble-badge"></span>
        </div>
      </div>

      <div className={`ai-chat-popup ${isChatOpen ? 'active' : ''}`}>
        <div className="ai-chat-header">
          <div className="ai-header-info">
            <div className="ai-bot-avatar">JF</div>
            <div>
              <h4>Jeans Factory AI <span className="beta-badge">BETA</span></h4>
              <span className="status-online">● Online assistant</span>
            </div>
          </div>
          <div className="ai-header-actions">
            <button className="chat-ctrl-btn" onClick={() => setIsChatOpen(false)}><i className="fa-solid fa-minus"></i></button>
            <button className="chat-ctrl-btn" onClick={() => setIsChatOpen(false)}><i className="fa-solid fa-xmark"></i></button>
          </div>
        </div>

        <div className="ai-chat-body">
          {chatMessages.map((m, idx) => (
            <div key={idx} className={`ai-message ${m.sender}`}>
              <div className="message-bubble">{m.text}</div>
            </div>
          ))}

          <div className="chat-pills">
            <button className="pill-btn" onClick={() => handleSendMessage('Show all clothes')}>View All Clothes</button>
            <button className="pill-btn" onClick={() => handleSendMessage('Show Men Collection')}>Men Collection</button>
            <button className="pill-btn" onClick={() => handleSendMessage('Show Women Collection')}>Women Collection</button>
            <button className="pill-btn" onClick={() => handleSendMessage('Show Kids Jeans')}>Kids Jeans</button>
          </div>
        </div>

        <div className="ai-chat-footer">
          <form 
            className="chat-input-row" 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
          >
            <input 
              type="text" 
              placeholder="Ask me anything..." 
              value={chatInput} 
              onChange={(e) => setChatInput(e.target.value)} 
            />
            <button type="submit" className="send-btn"><i className="fa-solid fa-paper-plane"></i></button>
          </form>
        </div>
      </div>

      {/* Floating Toast */}
      <div className={`toast ${toastMsg ? 'show' : ''}`}>{toastMsg}</div>
    </div>
  );
}
