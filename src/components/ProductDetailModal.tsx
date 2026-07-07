/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { X, Thermometer, Clock, MapPin, Star, Award, Heart } from 'lucide-react';
import { TeaProduct, Language } from '../types';

interface ProductDetailModalProps {
  product: TeaProduct;
  lang: Language;
  onClose: () => void;
  onAddToCart: (product: TeaProduct) => void;
}

export default function ProductDetailModal({ product, lang, onClose, onAddToCart }: ProductDetailModalProps) {
  const isAr = lang === 'ar';

  return (
    <div id="product-detail-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      {/* Backdrop trigger */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <motion.div
        id="product-modal-card"
        className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto z-10 flex flex-col md:flex-row text-stone-800"
        dir={isAr ? 'rtl' : 'ltr'}
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
      >
        {/* Close Button */}
        <button
          id="close-modal-btn"
          onClick={onClose}
          className={`absolute top-4 ${isAr ? 'left-4' : 'right-4'} z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/15 text-stone-700 transition-all cursor-pointer`}
          title={isAr ? 'إغلاق' : 'Close'}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left/Right Column: High-Res Image with organic styling */}
        <div className="md:w-1/2 relative min-h-[300px] md:min-h-[500px]">
          <img
            src={product.image}
            alt={isAr ? product.nameAr : product.name}
            className="absolute inset-0 w-full h-full object-cover rounded-t-2xl md:rounded-t-none md:rounded-l-2xl"
            referrerPolicy="no-referrer"
          />
          {/* Subtle vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:bg-gradient-to-r md:from-black/10 md:to-transparent" />
          
          {/* Sourcing Badge */}
          <div className={`absolute bottom-4 ${isAr ? 'right-4' : 'left-4'} bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-stone-100 flex items-center space-x-2 space-x-reverse shadow-md`}>
            <MapPin className="w-4 h-4 text-tea-gold" />
            <span className="text-xs font-serif font-semibold tracking-wide text-stone-700">
              {isAr ? product.originAr : product.origin}
            </span>
          </div>
        </div>

        {/* Right/Left Column: Detailed Editorial Copy */}
        <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Header: Category & Rating */}
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.25em] font-sans font-semibold text-tea-gold">
                {isAr ? product.categoryAr : product.category}
              </span>
              <div className="flex items-center space-x-1 space-x-reverse text-amber-500 bg-amber-50/70 px-2 py-0.5 rounded-full text-xs">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-mono font-medium">{product.rating}</span>
                <span className="text-stone-400">({product.reviews})</span>
              </div>
            </div>

            {/* Title & Tagline */}
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-medium tracking-wide text-stone-900 leading-tight">
                {isAr ? product.nameAr : product.name}
              </h2>
              <p className="text-stone-500 italic text-sm md:text-base mt-2 font-serif">
                "{isAr ? product.taglineAr : product.tagline}"
              </p>
            </div>

            {/* Sourcing Narrative */}
            <div className="border-t border-stone-100 pt-5">
              <p className="text-xs md:text-sm text-stone-600 leading-relaxed font-sans">
                {isAr ? product.descriptionAr : product.description}
              </p>
            </div>

            {/* Brewing Ritual Steps */}
            <div className="bg-stone-50/60 border border-stone-100/80 rounded-xl p-4.5 grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-9 h-9 rounded-full bg-tea-gold/10 flex items-center justify-center text-tea-gold">
                  <Thermometer className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                    {isAr ? 'حرارة الماء' : 'Water Temp'}
                  </span>
                  <span className="text-xs font-mono font-semibold text-stone-700">
                    {isAr ? product.tempAr : product.temp}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-9 h-9 rounded-full bg-tea-gold/10 flex items-center justify-center text-tea-gold">
                  <Clock className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                    {isAr ? 'مدة التخمير' : 'Steep Time'}
                  </span>
                  <span className="text-xs font-mono font-semibold text-stone-700">
                    {isAr ? product.timeAr : product.time}
                  </span>
                </div>
              </div>
            </div>

            {/* Sourcing Guarantees */}
            <div className="flex items-center space-x-4 space-x-reverse text-stone-500 text-xs">
              <div className="flex items-center space-x-1.5 space-x-reverse">
                <Award className="w-4.5 h-4.5 text-tea-gold/80" />
                <span>{isAr ? 'عضوي معتمد' : '100% Organic'}</span>
              </div>
              <div className="flex items-center space-x-1.5 space-x-reverse">
                <Heart className="w-4.5 h-4.5 text-tea-gold/80" />
                <span>{isAr ? 'خالٍ من البلاستيك' : 'Plastic-free Bags'}</span>
              </div>
            </div>
          </div>

          {/* Pricing & Checkout Action */}
          <div className="border-t border-stone-100 pt-6 mt-8 flex items-center justify-between">
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-semibold mb-1">
                {isAr ? 'سعر العبوة' : 'Single Tin Price'}
              </span>
              <span className="text-2xl font-serif font-semibold text-stone-900">
                ${product.price}.00
              </span>
            </div>
            <button
              id={`modal-add-to-cart-${product.id}`}
              onClick={() => onAddToCart(product)}
              className="px-6 py-3 rounded-lg bg-tea-charcoal hover:bg-tea-gold text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer transform active:scale-95"
            >
              {isAr ? 'إضافة للسلة' : 'ADD TO CART'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
