/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, X, HelpCircle } from 'lucide-react';
import { Language, ActivePanel, CartItem, TeaProduct } from './types';
import { TRANSLATIONS } from './data';
import Header from './components/Header';
import AwardBadges from './components/AwardBadges';
import ActivePanelDrawer from './components/ActivePanelDrawer';
import ProductDetailModal from './components/ProductDetailModal';
import UniqueFlavors from './components/UniqueFlavors';
import FarmsStory from './components/FarmsStory';
import Sustainability from './components/Sustainability';
import ContactPage from './components/ContactPage';
import ShopPage from './components/ShopPage';

// Reference the generated background image as a static path
const flatlayImage = '/src/assets/images/artisan_tea_flatlay_1783411234222.jpg';

export default function App() {
  // Global States
  const [language, setLanguage] = useState<Language>('ar');

  // Helper functions for SEO-friendly custom path-based routing
  const pathnameToPanel = (path: string): ActivePanel => {
    const cleanPath = path.replace(/^\/|\/$/g, '');
    if (!cleanPath) return null;
    const validPanels: Exclude<ActivePanel, null>[] = [
      'shop', 'subscription', 'about', 'inspiration', 'contact', 'account', 'search', 'cart', 'sustainability', 'farms'
    ];
    if (validPanels.includes(cleanPath as any)) {
      return cleanPath as ActivePanel;
    }
    return null;
  };

  const panelToPathname = (panel: ActivePanel): string => {
    return panel ? `/${panel}` : '/';
  };

  const [activePanel, setActivePanelState] = useState<ActivePanel>(() => {
    return pathnameToPanel(window.location.pathname);
  });

  const setActivePanel = (panel: ActivePanel) => {
    setActivePanelState(panel);
    const newPath = panelToPathname(panel);
    if (window.location.pathname !== newPath) {
      window.history.pushState(null, '', newPath);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setActivePanelState(pathnameToPanel(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<TeaProduct | null>(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [checkoutInfo, setCheckoutInfo] = useState<{ simulated?: boolean; message?: string; recipient?: string } | null>(null);

  const isAr = language === 'ar';
  const t = TRANSLATIONS[language];

  // Helper: toggle language (retained for backward compatibility but disabled)
  const handleLanguageToggle = () => {
    // Locked to Arabic
  };

  // Helper: add item to shopping cart
  const handleAddToCart = (product: TeaProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    // Optionally auto-open cart panel on add so user gets instant visual confirmation
    setActivePanel('cart');
  };

  // Helper: update item quantity in cart
  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  // Helper: remove item from cart
  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Helper: simulate checkout
  const handleCheckout = (info?: { simulated?: boolean; message?: string; recipient?: string }) => {
    setCheckoutInfo(info || null);
    setCheckoutSuccess(true);
    setCartItems([]); // empty the cart on successful checkout
    setActivePanel(null); // close the drawer
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Dynamic overlays & layouts based on language alignment
  const textAlignmentClass = isAr ? 'text-right' : 'text-left';
  const flexAlignmentClass = isAr ? 'items-end' : 'items-start';
  const overlayGradient = isAr
    ? 'bg-gradient-to-l from-black/80 via-black/45 to-black/10'
    : 'bg-gradient-to-r from-black/80 via-black/45 to-black/10';

  return (
    <div
      id="app-root-viewport"
      className="relative min-h-screen w-full overflow-y-auto overflow-x-hidden scroll-smooth font-sans select-none bg-stone-950 text-white"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* PERSISTENT HEADER NAVIGATION BAR */}
      <Header
        lang={language}
        onLanguageToggle={handleLanguageToggle}
        onOpenPanel={setActivePanel}
        cartCount={cartCount}
        activePanel={activePanel}
      />

      {/* SECTION 1: THE IMPERIAL HERO LANDING */}
      <section id="hero-section" className="relative h-screen w-full flex flex-col justify-between overflow-hidden">
        {/* 1. IMMERSIVE HERO BACKGROUND PHOTO */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-stone-900">
          <motion.img
            src={flatlayImage}
            alt="Artisan Tea Flatlay background"
            className="w-full h-full object-cover opacity-90 scale-105"
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.95 }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            referrerPolicy="no-referrer"
          />
          {/* Dynamic Shadow Overlay ensuring premium text-to-background contrast */}
          <div className={`absolute inset-0 z-10 transition-all duration-500 ${overlayGradient}`} />
          {/* Smooth transition from dark hero image to the light UniqueFlavors background */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#fbf9f6] via-[#fbf9f6]/70 to-transparent z-15 pointer-events-none" />
        </div>

        {/* Padding placeholder for visual alignment */}
        <div className="h-10 w-full" />

        {/* 3. HERO CONTENT CONTAINER (Centered visually with offset padding for high-end aesthetic) */}
        <main
          id="hero-content"
          className={`relative z-20 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 flex flex-col justify-center ${flexAlignmentClass} ${textAlignmentClass} pt-28 pb-16`}
        >
          <div className="max-w-2xl space-y-6 md:space-y-8">
            
            {/* Main Editorial Header Title */}
            <motion.h1
              id="hero-headline"
              className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-wide text-white leading-[1.12] drop-shadow-sm"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {t.heroTitle}
            </motion.h1>

            {/* Subtitle description with high legibility */}
            <motion.p
              id="hero-subheading"
              className="text-stone-200/90 font-sans font-light text-xs sm:text-sm md:text-base leading-relaxed md:max-w-md drop-shadow-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {t.heroSubtitle}
            </motion.p>

            {/* Call to Action Shop button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="pt-2"
            >
              <button
                id="hero-cta-btn"
                onClick={() => setActivePanel('shop')}
                className="group px-6 sm:px-9 py-3.5 sm:py-4 border border-white hover:border-tea-gold bg-transparent hover:bg-white hover:text-stone-950 transition-all duration-300 text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-white cursor-pointer hover:shadow-lg transform active:scale-95"
              >
                {t.heroButton}
              </button>
            </motion.div>
          </div>
        </main>

        {/* 4. FOOTER REGION: Hosting prestigous Awards badges */}
        <footer
          id="app-footer-bar"
          className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-8 pb-8 flex flex-col items-center justify-center gap-6"
        >
          {/* Scalable overlapping Award Badges */}
          <AwardBadges lang={language} />
        </footer>
      </section>

      {/* SECTION 2: MAGNIFICENT INTERACTIVE UNIQUE FLAVORS CANNED SHOWCASE */}
      <UniqueFlavors lang={language} />

      {/* 5. INTERACTIVE SIDE DRAWER PANELS (AnimatePresence handles slide exit) */}
      <AnimatePresence>
        {activePanel && activePanel !== 'sustainability' && activePanel !== 'contact' && activePanel !== 'farms' && activePanel !== 'shop' && (
          <ActivePanelDrawer
            panel={activePanel}
            onClose={() => setActivePanel(null)}
            lang={language}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onAddToCart={handleAddToCart}
            onOpenProductDetail={setSelectedProduct}
            onCheckout={handleCheckout}
          />
        )}
      </AnimatePresence>

      {/* 5.5. FULL PAGE SUSTAINABILITY COMPONENT */}
      <AnimatePresence>
        {activePanel === 'sustainability' && (
          <Sustainability
            lang={language}
            onClose={() => setActivePanel(null)}
          />
        )}
      </AnimatePresence>

      {/* 5.6. FULL PAGE CONTACT COMPONENT */}
      <AnimatePresence>
        {activePanel === 'contact' && (
          <ContactPage
            lang={language}
            onClose={() => setActivePanel(null)}
            onOpenPanel={setActivePanel}
            cartCount={cartCount}
          />
        )}
      </AnimatePresence>

      {/* 5.7. FULL PAGE FARMS STORY COMPONENT */}
      <AnimatePresence>
        {activePanel === 'farms' && (
          <FarmsStory
            lang={language}
            onClose={() => setActivePanel(null)}
          />
        )}
      </AnimatePresence>

      {/* 5.8. FULL PAGE SHOP COMPONENT */}
      <AnimatePresence>
        {activePanel === 'shop' && (
          <ShopPage
            lang={language}
            onClose={() => setActivePanel(null)}
            onAddToCart={handleAddToCart}
            onOpenProductDetail={setSelectedProduct}
            cartCount={cartCount}
          />
        )}
      </AnimatePresence>

      {/* 6. DETAILED TEA PRODUCT MODAL (Activated from drawer click) */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            lang={language}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={(prod) => {
              handleAddToCart(prod);
              setSelectedProduct(null); // close modal on add to let cart open
            }}
          />
        )}
      </AnimatePresence>

      {/* 7. CHECKOUT SUCCESS SIMULATION MODAL */}
      <AnimatePresence>
        {checkoutSuccess && (
          <div id="checkout-success-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              className="bg-white rounded-2xl max-w-md w-full p-8 text-center shadow-2xl relative border border-stone-100 animate-fade-in"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <button
                id="close-success-btn"
                onClick={() => {
                  setCheckoutSuccess(false);
                  setCheckoutInfo(null);
                }}
                className={`absolute top-4 ${isAr ? 'left-4' : 'right-4'} text-stone-400 hover:text-stone-700 w-7 h-7 flex items-center justify-center rounded-full bg-stone-50 cursor-pointer`}
              >
                <X className="w-4 h-4" />
              </button>

              <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4 stroke-[1.2]" />
              <h3 className="font-serif text-xl font-medium text-stone-900 mb-2">
                {isAr ? 'تم إرسال طلبك بنجاح!' : 'Order Placed Successfully!'}
              </h3>
              <p className="text-stone-500 text-xs md:text-sm leading-relaxed mb-4">
                {isAr 
                  ? 'تم استلام طلبك للمنتجات الفاخرة وسنتواصل معك قريباً لتأكيد الشحن.' 
                  : 'Your order for premium, artisan teas has been submitted directly.'}
              </p>

              {checkoutInfo?.message && (
                <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-3.5 mb-6 text-[11px] text-stone-600 leading-normal text-left max-h-[140px] overflow-y-auto font-mono">
                  <span className="font-semibold block text-stone-800 mb-1">
                    {isAr ? '⚙️ حالة خادم البريد:' : '⚙️ Order Server Status:'}
                  </span>
                  {checkoutInfo.message}
                  {checkoutInfo.recipient && (
                    <div className="mt-1.5 pt-1.5 border-t border-stone-200/50 text-stone-500 font-sans">
                      <strong>{isAr ? 'المرسل إليه:' : 'Target Recipient:'}</strong> {checkoutInfo.recipient}
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={() => {
                  setCheckoutSuccess(false);
                  setCheckoutInfo(null);
                }}
                className="w-full py-3 rounded-lg bg-tea-charcoal text-white text-xs uppercase tracking-widest font-bold hover:bg-[#8e7046] transition-colors cursor-pointer"
              >
                {isAr ? 'العودة للمتجر البطيء' : 'Return to Slow Brewing'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
