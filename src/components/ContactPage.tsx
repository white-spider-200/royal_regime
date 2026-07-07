/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  X, Mail, Phone, MapPin, Search, User, ShoppingBag, 
  ChevronDown, Facebook, Instagram, Youtube, Linkedin, Check, Loader2 
} from 'lucide-react';
import { Language, ActivePanel } from '../types';

interface ContactPageProps {
  lang: Language;
  onClose: () => void;
  onOpenPanel: (panel: ActivePanel) => void;
  cartCount: number;
}

export default function ContactPage({ lang, onClose, onOpenPanel, cartCount }: ContactPageProps) {
  const isAr = lang === 'ar';

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  // Handle CAPTCHA checkbox click
  const handleCaptchaClick = () => {
    if (captchaChecked || captchaLoading) return;
    setCaptchaLoading(true);
    setTimeout(() => {
      setCaptchaLoading(false);
      setCaptchaChecked(true);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaChecked) {
      setFormError(isAr ? 'يرجى تأكيد أنك لست برنامج روبوت أولاً.' : 'Please verify you are not a robot first.');
      return;
    }
    setFormError('');
    setSubmitted(true);
    setTimeout(() => {
      // Reset form
      setFormData({
        name: '',
        title: '',
        email: '',
        subject: '',
        message: ''
      });
      setCaptchaChecked(false);
    }, 4000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Flower field background image from project assets
  const bannerImage = '/src/assets/images/chamomile_irrigation_field_1783414904690.jpg';

  return (
    <motion.div
      id="contact-full-page"
      className="fixed inset-0 z-30 overflow-y-auto bg-stone-100 text-stone-800 scrollbar-thin select-none pt-24 md:pt-32"
      dir="rtl" // Force RTL to preserve the exact Arabic layout of the uploaded image
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ type: 'spring', damping: 28, stiffness: 180 }}
    >
      {/* 2. HEADER HERO BANNER (Orange flower field background) */}
      <section 
        id="contact-hero-banner"
        className="relative h-[55vh] min-h-[350px] w-full flex items-center justify-center overflow-hidden bg-stone-900 text-white"
      >
        <div className="absolute inset-0 z-0">
          <img
            src={bannerImage}
            alt="Royal Herbs Chamomile Field"
            className="w-full h-full object-cover filter brightness-[0.70] contrast-[1.05]"
            referrerPolicy="no-referrer"
          />
          {/* Subtle vignette/shading overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/45" />
        </div>

        {/* Center Title */}
        <div className="relative z-10 text-center space-y-3 px-4">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wide text-white drop-shadow-md select-text"
          >
            ابقى على تواصل
          </motion.h1>
        </div>

        {/* Chevron down indicator */}
        <div className="absolute bottom-6 inset-x-0 flex justify-center z-10 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/80" />
        </div>
      </section>

      {/* 3. CONTACT INFO (Orange Box) & MAP (Split Grid) */}
      <section id="info-map-section" className="w-full grid grid-cols-1 lg:grid-cols-12 items-stretch bg-white">
        
        {/* Left: Contact Info Orange Box (Col span 5) */}
        <div className="lg:col-span-5 bg-[#f59e1d] p-8 sm:p-12 md:p-16 flex flex-col justify-center text-white text-right">
          <div className="max-w-md mx-auto lg:mx-0 w-full space-y-10">
            
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-wide border-b border-white/20 pb-4">
              الاتصال بنا
            </h2>

            {/* Contact details with icons aligned on the right */}
            <div className="space-y-7 text-sm sm:text-base">
              
              {/* Phone */}
              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="bg-white/10 p-3 rounded-full shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className="space-y-1">
                  <span className="text-white/70 block text-xs">رقم الهاتف</span>
                  <a 
                    href="tel:19746" 
                    className="font-mono font-bold text-lg sm:text-xl hover:underline"
                  >
                    هاتف : 19746
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="bg-white/10 p-3 rounded-full shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div className="space-y-1">
                  <span className="text-white/70 block text-xs">البريد الإلكتروني</span>
                  <a 
                    href="mailto:info@royalherbs.com" 
                    className="font-mono font-bold text-base sm:text-lg hover:underline break-all"
                  >
                    info@royalherbs.com
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="bg-white/10 p-3 rounded-full shrink-0">
                  <MapPin className="w-5 h-5 text-white mt-0.5" />
                </div>
                <div className="space-y-1">
                  <span className="text-white/70 block text-xs">المقر الرئيسي</span>
                  <p className="font-sans font-medium leading-relaxed">
                    اوتومان جروب، اعشاب رويال ش.م.م، شبرامنت، الجيزة، مصر
                  </p>
                </div>
              </div>
            </div>

            {/* Social media connections */}
            <div className="pt-6 border-t border-white/20 flex items-center justify-start space-x-5 space-x-reverse">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="bg-white/10 hover:bg-white hover:text-[#f59e1d] p-3 rounded-full transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="bg-white/10 hover:bg-white hover:text-[#f59e1d] p-3 rounded-full transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                className="bg-white/10 hover:bg-white hover:text-[#f59e1d] p-3 rounded-full transition-all duration-300"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="bg-white/10 hover:bg-white hover:text-[#f59e1d] p-3 rounded-full transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

          </div>
        </div>

        {/* Right: Live Interactive Google Maps Embed (Col span 7) */}
        <div className="lg:col-span-7 relative min-h-[350px] lg:min-h-auto w-full bg-stone-100 overflow-hidden">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.9150604169654!2d31.1834222!3d29.9329444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145847cd3ef396ab%3A0x8673f8ff52ff372a!2sRoyal%20Herbs!5e0!3m2!1sar!2seg!4v1783411234222"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: '450px' }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="خريطة مقر رويال هيربس"
            className="w-full h-full filter saturate-[0.85] contrast-[1.02]"
          />
        </div>

      </section>

      {/* 4. SEND US A MESSAGE FORM (Light lime background section) */}
      <section 
        id="send-message-section"
        className="bg-[#cfdfa0] py-16 px-6 sm:px-12 md:px-24 border-t border-[#cfdfb5]"
      >
        <div className="max-w-3xl mx-auto space-y-10 text-center">
          
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-snug">
            أرسل لنا رسالة
          </h2>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5 text-right">
              
              {/* Row 1: Name & Title */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="الاسم"
                    className="w-full px-4 py-3 bg-white border border-stone-200/50 text-stone-900 rounded-sm focus:ring-2 focus:ring-[#8e7046] focus:border-transparent outline-none text-right placeholder-stone-400 font-sans text-sm md:text-base shadow-2xs"
                  />
                </div>
                <div className="space-y-1">
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="اللقب"
                    className="w-full px-4 py-3 bg-white border border-stone-200/50 text-stone-900 rounded-sm focus:ring-2 focus:ring-[#8e7046] focus:border-transparent outline-none text-right placeholder-stone-400 font-sans text-sm md:text-base shadow-2xs"
                  />
                </div>
              </div>

              {/* Row 2: Email & Subject */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="البريد الإلكتروني"
                    className="w-full px-4 py-3 bg-white border border-stone-200/50 text-stone-900 rounded-sm focus:ring-2 focus:ring-[#8e7046] focus:border-transparent outline-none text-right placeholder-stone-400 font-sans text-sm md:text-base shadow-2xs"
                  />
                </div>
                <div className="space-y-1">
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="الموضوع"
                    className="w-full px-4 py-3 bg-white border border-stone-200/50 text-stone-900 rounded-sm focus:ring-2 focus:ring-[#8e7046] focus:border-transparent outline-none text-right placeholder-stone-400 font-sans text-sm md:text-base shadow-2xs"
                  />
                </div>
              </div>

              {/* Textarea: Message */}
              <div className="space-y-1">
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="الرسالة"
                  className="w-full px-4 py-3 bg-white border border-stone-200/50 text-stone-900 rounded-sm focus:ring-2 focus:ring-[#8e7046] focus:border-transparent outline-none text-right placeholder-stone-400 font-sans text-sm md:text-base shadow-2xs h-36 resize-none"
                />
              </div>

              {/* Error block if any */}
              {formError && (
                <div className="text-red-700 font-bold text-xs bg-red-100/80 px-4 py-2 rounded-sm border border-red-200">
                  {formError}
                </div>
              )}

              {/* 5. GORGEOUS CUSTOM RECAPTCHA WIDGET */}
              <div className="flex justify-end pt-2">
                <div 
                  onClick={handleCaptchaClick}
                  className={`bg-stone-50 border border-stone-300/80 rounded-sm p-3.5 flex items-center justify-between w-full max-w-[310px] shadow-xs cursor-pointer select-none hover:bg-stone-100 transition-colors ${
                    captchaChecked ? 'border-emerald-500 bg-emerald-50/20' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="relative flex items-center justify-center w-7 h-7">
                      {captchaLoading ? (
                        <Loader2 className="w-5 h-5 text-[#8e7046] animate-spin" />
                      ) : captchaChecked ? (
                        <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center animate-scale-up">
                          <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 border-2 border-stone-300 rounded bg-white hover:border-stone-400 transition-colors" />
                      )}
                    </div>
                    <span className="text-xs font-sans font-semibold text-stone-700">
                      {captchaChecked ? 'تم التحقق بنجاح' : 'أنا لست برنامج روبوت'}
                    </span>
                  </div>

                  {/* reCAPTCHA Brand logo */}
                  <div className="flex flex-col items-center space-y-0.5 opacity-90 pr-1">
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z" fill="#4285f4" />
                    </svg>
                    <span className="text-[7.5px] text-stone-400 font-bold tracking-tight">reCAPTCHA</span>
                    <span className="text-[6px] text-stone-300 leading-none">الخصوصية - الشروط</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#8e7046] hover:bg-[#725a38] text-white py-4 px-12 text-center uppercase tracking-widest font-bold text-sm transition-all shadow-md hover:shadow-lg rounded-sm cursor-pointer transform active:scale-98"
                >
                  إرسال
                </button>
              </div>

            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/80 border border-white/50 rounded-lg p-10 max-w-lg mx-auto text-center space-y-4 shadow-sm"
            >
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 animate-scale-up">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                تم الإرسال بنجاح!
              </h3>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                شكراً لتواصلك معنا يا <span className="font-bold">{formData.name || 'عزيزنا'}</span>. لقد تم استلام استفسارك بنجاح وسيقوم فريق رويال هيربس بالتواصل معك عبر البريد الإلكتروني في غضون ٢٤ ساعة.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-xs uppercase tracking-widest font-bold text-[#8e7046] hover:underline pt-2 cursor-pointer block mx-auto"
              >
                إرسال استفسار آخر
              </button>
            </motion.div>
          )}

        </div>
      </section>

      {/* 5. IMMERSIVE BROWN BRAND FOOTER (Matching the footer columns) */}
      <footer className="bg-[#4a3b2c] text-stone-200 py-16 px-6 sm:px-12 md:px-24 border-t border-stone-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          
          {/* Col 1: Explore */}
          <div className="space-y-4 text-right">
            <h4 className="font-serif font-bold text-white text-base tracking-wider uppercase border-b border-white/10 pb-2">
              استكشف
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li>
                <button 
                  onClick={() => {
                    onOpenPanel(null);
                    onClose();
                  }} 
                  className="hover:text-[#f59e1d] transition-colors cursor-pointer text-right w-full"
                >
                  الرئيسية
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    onClose();
                    onOpenPanel('farms');
                  }} 
                  className="hover:text-[#f59e1d] transition-colors cursor-pointer text-right w-full"
                >
                  مزارعنا
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    onClose();
                    onOpenPanel('shop');
                  }} 
                  className="hover:text-[#f59e1d] transition-colors cursor-pointer text-right w-full"
                >
                  منتجاتنا
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    onClose();
                    onOpenPanel('subscription');
                  }} 
                  className="hover:text-[#f59e1d] transition-colors cursor-pointer text-right w-full"
                >
                  السوق الالكتروني
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    onClose();
                    onOpenPanel('sustainability');
                  }} 
                  className="hover:text-[#f59e1d] transition-colors cursor-pointer text-right w-full"
                >
                  مسئوليتنا
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Useful links */}
          <div className="space-y-4 text-right">
            <h4 className="font-serif font-bold text-white text-base tracking-wider uppercase border-b border-white/10 pb-2">
              روابط مفيدة
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li>
                <button onClick={() => alert('قسم الأخبار قريباً!')} className="hover:text-[#f59e1d] transition-colors cursor-pointer text-right w-full">
                  الأخبار
                </button>
              </li>
              <li>
                <button onClick={() => alert('بوابة التوظيف والوظائف قريباً!')} className="hover:text-[#f59e1d] transition-colors cursor-pointer text-right w-full">
                  وظائف
                </button>
              </li>
              <li>
                <button onClick={() => {}} className="text-[#f59e1d] font-bold cursor-default text-right w-full">
                  تواصل معانا
                </button>
              </li>
              <li>
                <button onClick={() => alert('بوابة الشركاء قيد الصيانة حالياً.')} className="hover:text-[#f59e1d] transition-colors cursor-pointer text-right w-full">
                  عايز تبقى شريك لينا؟
                </button>
              </li>
              <li>
                <button onClick={() => alert('الأحكام والشروط قيد المراجعة القانونية.')} className="hover:text-[#f59e1d] transition-colors cursor-pointer text-right w-full">
                  الأحكام والشروط
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Stay in touch contact details */}
          <div className="space-y-4 text-right">
            <h4 className="font-serif font-bold text-white text-base tracking-wider uppercase border-b border-white/10 pb-2">
              ابقى على تواصل
            </h4>
            <ul className="space-y-3.5 text-xs sm:text-sm">
              <li className="flex items-center space-x-2.5 space-x-reverse text-stone-200 justify-start">
                <Phone className="w-4.5 h-4.5 text-[#f59e1d] shrink-0" />
                <a href="tel:19746" className="font-mono hover:underline">19746</a>
              </li>
              <li className="flex items-center space-x-2.5 space-x-reverse text-stone-200 justify-start">
                <Mail className="w-4.5 h-4.5 text-[#f59e1d] shrink-0" />
                <a href="mailto:info@royalherbs.com" className="font-mono hover:underline">info@royalherbs.com</a>
              </li>
              <li className="flex items-start space-x-2.5 space-x-reverse text-stone-200 justify-start">
                <MapPin className="w-4.5 h-4.5 text-[#f59e1d] mt-0.5 shrink-0" />
                <span className="leading-relaxed">اوتومان جروب، اعشاب رويال ش.م.م، شبرامنت، الجيزة، مصر</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Follow Us & Brand detail */}
          <div className="space-y-4 text-right">
            <h4 className="font-serif font-bold text-white text-base tracking-wider uppercase border-b border-white/10 pb-2">
              تابعنا
            </h4>
            <p className="text-xs sm:text-sm leading-relaxed text-stone-300">
              شاي رويال أسوشيتس: تأسست عام ١٩٨٥ لتقديم أجود الأعشاب والمحاصيل الطبيعية الحرفية بطريقة مستدامة ومسؤولة بيئياً ومجتمعياً.
            </p>
            
            {/* Social icons row */}
            <div className="flex items-center justify-start space-x-4 space-x-reverse pt-2 text-stone-200">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#f59e1d] transition-colors"><Facebook className="w-4 h-4" /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#f59e1d] transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-[#f59e1d] transition-colors"><Youtube className="w-4 h-4" /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#f59e1d] transition-colors"><Linkedin className="w-4 h-4" /></a>
            </div>

            <div className="pt-4 flex items-center space-x-3 space-x-reverse">
              <button 
                onClick={() => {
                  onOpenPanel(null);
                  onClose();
                }} 
                className="text-stone-300 hover:text-white text-xs font-semibold underline"
              >
                العربية
              </button>
              <span className="text-stone-500">|</span>
              <button 
                onClick={() => {
                  onOpenPanel(null);
                  onClose();
                }} 
                className="text-stone-400 hover:text-white text-xs"
              >
                English
              </button>
            </div>
          </div>

        </div>

        {/* copyright subfooter */}
        <div className="max-w-6xl mx-auto border-t border-white/5 mt-12 pt-6 text-center text-[11px] text-stone-400 font-mono flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© 1985-2026 ROYAL HERBS ASSOCIATES. جميع الحقوق محفوظة.</span>
          <span className="flex items-center space-x-1 space-x-reverse">
            <span>صُنع بكل حب واستدامة في مصر</span>
          </span>
        </div>
      </footer>

    </motion.div>
  );
}
