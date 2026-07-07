/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, Search, Globe } from 'lucide-react';
import { Language, ActivePanel } from '../types';
import { TRANSLATIONS } from '../data';

interface HeaderProps {
  lang: Language;
  onLanguageToggle: () => void;
  onOpenPanel: (panel: ActivePanel) => void;
  cartCount: number;
  activePanel: ActivePanel;
}

export default function Header({
  lang,
  onLanguageToggle,
  onOpenPanel,
  cartCount,
  activePanel,
}: HeaderProps) {
  const isAr = lang === 'ar';
  const t = TRANSLATIONS[lang];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Solid style when scrolled OR inside any subfolder page
  const isSolid = isScrolled || activePanel !== null;

  // Left side nav items as requested
  const leftNavItems: ActivePanel[] = ['shop', 'farms', 'sustainability', 'contact'];

  return (
    <header
      id="main-app-header"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 select-none ${
        isSolid
          ? 'bg-[#fdfcf9]/95 backdrop-blur-md text-stone-900 shadow-sm border-b border-stone-200/50 py-3 md:py-4 px-6 sm:px-12'
          : 'bg-transparent text-white/90 py-5 md:py-8 px-6 sm:px-12'
      }`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-3 items-center w-full">
        
        {/* Left Column: Navigation Links or Mobile Hamburger Toggle */}
        <div className="flex items-center justify-start">
          {/* Desktop Navigation Links with larger text and extra spacing */}
          <nav 
            id="desktop-left-nav" 
            className="hidden lg:flex items-center space-x-10 lg:space-x-12 space-x-reverse text-[14px] md:text-[15px] tracking-[0.24em] font-sans font-medium"
          >
            {leftNavItems.map((item) => (
              <button
                key={item}
                id={`nav-${item}`}
                onClick={() => onOpenPanel(item)}
                className={`transition-colors duration-300 cursor-pointer uppercase py-1 ${
                  isSolid ? 'hover:text-[#8e7046]' : 'hover:text-tea-gold'
                }`}
              >
                {t[item]}
              </button>
            ))}
          </nav>

          {/* Mobile Left: Menu Toggle Button */}
          <div className="lg:hidden">
            <button
              id="mobile-hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
              title={isAr ? 'القائمة' : 'Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Center Column: Perfectly Centered Scalable Vector Typographic Brand Logo */}
        <div className="flex items-center justify-center">
          <div 
            id="logo-brand-container" 
            onClick={() => onOpenPanel(null)}
            className="flex flex-col items-center justify-center cursor-pointer transform hover:scale-[1.03] transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <div className={`bg-[#fdfcf9] border border-[#8e7046] rounded-sm flex flex-col items-center justify-center transition-all duration-500 ${
              isSolid 
                ? 'w-[110px] h-[82px] md:w-[125px] md:h-[95px] px-3 py-1.5' 
                : 'w-[125px] h-[95px] md:w-[145px] md:h-[110px] px-4 py-2.5'
            }`}>
              <svg viewBox="0 0 100 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Symmetrical Heraldic Royal Crest */}
                <g stroke="#8e7046" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" fill="none">
                  {/* Central shield/bud/crest element */}
                  <path d="M50 20 C47 20, 45 23, 45 26 C45 30, 50 34, 50 34 C50 34, 55 30, 55 26 C55 23, 53 20, 50 20 Z" fill="#8e7046" fillOpacity="0.15" />
                  <path d="M50 22 L50 31" strokeWidth="0.8" />
                  
                  {/* Left rearing lion/deer */}
                  <path d="M42 32 C38 31, 35 28, 35 25 C35 21, 39 19, 41 16 C39 16, 37 17, 36 19 C34 21, 33 24, 34 27 C35 30, 38 32, 42 32 Z" fill="#8e7046" fillOpacity="0.1" />
                  <path d="M34 25 C32 24, 30 22, 31 19 C32 16, 35 15, 37 17" />
                  <path d="M37 21 C35 20, 33 19, 32 21" />
                  <path d="M46 29 C44 28, 43 26, 44 24" strokeWidth="0.8" />

                  {/* Right rearing lion/deer (mirrored) */}
                  <path d="M58 32 C62 31, 65 28, 65 25 C65 21, 61 19, 59 16 C61 16, 63 17, 64 19 C66 21, 67 24, 66 27 C65 30, 62 32, 58 32 Z" fill="#8e7046" fillOpacity="0.1" />
                  <path d="M66 25 C68 24, 70 22, 69 19 C68 16, 65 15, 63 17" />
                  <path d="M63 21 C65 20, 67 19, 68 21" />
                  <path d="M54 29 C56 28, 57 26, 56 24" strokeWidth="0.8" />

                  {/* Symmetrical crown on top */}
                  <path d="M47 16 L50 18 L53 16 L52 14 L48 14 Z" fill="#8e7046" strokeWidth="0.8" />

                  {/* Base decorative ribbon line */}
                  <path d="M28 33.5 Q50 36.5 72 33.5" strokeWidth="0.9" />
                  <path d="M32 35 Q50 38 68 35" strokeWidth="0.5" strokeDasharray="1 1" />
                </g>
                
                {/* BRAND TEXT: ROYAL */}
                <text 
                  x="50" 
                  y="57" 
                  textAnchor="middle" 
                  fill="#8e7046" 
                  style={{
                    fontFamily: "'Times New Roman', Georgia, Garamond, serif",
                    fontWeight: 'bold',
                    fontSize: '19px',
                    letterSpacing: '0.12em'
                  }}
                >
                  ROYAL
                </text>

                {/* EST. 1985 */}
                <text 
                  x="50" 
                  y="69" 
                  textAnchor="middle" 
                  fill="#8e7046" 
                  style={{
                    fontFamily: "'Times New Roman', Georgia, Garamond, serif",
                    fontWeight: '500',
                    fontSize: '7px',
                    letterSpacing: '0.18em'
                  }}
                >
                  EST. 1985
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* Right Column: Cart Indicator */}
        <div className="flex items-center justify-end">
          <div 
            id="desktop-right-nav" 
            className="flex items-center text-[13.5px] md:text-[14.5px] tracking-[0.24em] font-sans font-medium"
          >
            {/* Cart Trigger (Plain text CART (0) matching the image exactly, no fill bubbles) */}
            <button
              id="nav-cart"
              onClick={() => onOpenPanel('cart')}
              className={`transition-colors duration-300 cursor-pointer uppercase py-1 ${
                isSolid ? 'hover:text-[#8e7046]' : 'hover:text-tea-gold'
              }`}
            >
              <span>
                {isAr ? `${t.cart} (${cartCount})` : `CART (${cartCount})`}
              </span>
            </button>
          </div>
        </div>

      </div>

      {/* Collapsible Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-overlay"
          className={`lg:hidden absolute top-full inset-x-0 py-6 px-6 space-y-4 shadow-xl animate-fade-in ${
            isSolid 
              ? 'bg-[#fdfcf9]/95 backdrop-blur-md border-b border-stone-200/50 text-stone-900' 
              : 'bg-stone-950/95 backdrop-blur-md border-b border-white/5 text-white'
          }`}
        >
          <div className="flex flex-col space-y-3.5 text-xs uppercase tracking-[0.2em] font-sans font-medium text-right">
            {leftNavItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  onOpenPanel(item);
                  setMobileMenuOpen(false);
                }}
                className={`transition-colors cursor-pointer border-b pb-2 w-full text-right ${
                  isSolid 
                    ? 'hover:text-[#8e7046] border-stone-100' 
                    : 'hover:text-tea-gold border-white/5'
                }`}
              >
                {t[item]}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

