/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Language } from '../types';

interface AwardBadgesProps {
  lang: Language;
}

export default function AwardBadges({ lang }: AwardBadgesProps) {
  const isAr = lang === 'ar';
  
  // Custom awards data matching the image
  const awards = [
    { id: 1, type: 'gold', year: '2023', text: 'GOLD', textAr: 'ذهبية', bg: 'from-amber-100 to-amber-200', border: 'border-amber-400/60', textCol: 'text-amber-800' },
    { id: 2, type: 'gold', year: '2024', text: 'GOLD', textAr: 'ذهبية', bg: 'from-amber-100/90 to-amber-200/90', border: 'border-amber-400/60', textCol: 'text-amber-800' },
    { id: 3, type: 'bronze', year: '2023', text: 'BRONZE', textAr: 'برونزية', bg: 'from-orange-100 to-orange-200', border: 'border-orange-400/50', textCol: 'text-orange-800' },
    { id: 4, type: 'bronze', year: '2024', text: 'BRONZE', textAr: 'برونزية', bg: 'from-orange-100/90 to-orange-200/90', border: 'border-orange-400/50', textCol: 'text-orange-800' },
  ];

  return (
    <div id="award-badges-container" className="flex items-center -space-x-4 md:-space-x-6 select-none">
      {awards.map((award, idx) => (
        <motion.div
          key={award.id}
          id={`award-badge-${award.id}`}
          className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br ${award.bg} border-2 ${award.border} shadow-sm flex flex-col items-center justify-center p-1 cursor-help`}
          initial={{ opacity: 0, x: isAr ? -30 : 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + idx * 0.15, type: 'spring', stiffness: 80 }}
          whileHover={{ 
            y: -8, 
            scale: 1.1, 
            zIndex: 30,
            transition: { duration: 0.2 } 
          }}
          title={isAr ? `جائزة الورقة ال${award.textAr} لعام ${award.year}` : `The Golden Leaf ${award.text} Award ${award.year}`}
        >
          {/* Circular SVG content for Laurel / Text */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full p-1.5 animate-spin-slow opacity-25">
            <path id={`badge-textPath-${award.id}`} d="M 50,15 A 35,35 0 1,1 49.9,15" fill="none" />
            <text className="text-[7.5px] font-sans font-medium uppercase tracking-[0.1em] fill-neutral-800">
              <textPath href={`#badge-textPath-${award.id}`} startOffset="50%" textAnchor="middle">
                THE GOLDEN LEAF AWARDS •
              </textPath>
            </text>
          </svg>

          {/* Center visual: elegant minimal leaf spray */}
          <div className="flex flex-col items-center justify-center text-center z-10">
            {/* Minimalist vector leaf */}
            <svg viewBox="0 0 24 24" className={`w-6 h-6 md:w-7 md:h-7 ${award.textCol} fill-none stroke-current stroke-1.5`}>
              <path d="M12 22C12 22 17 17 17 12C17 7 12 2 12 2C12 2 7 7 7 12C7 17 12 22 12 22Z" />
              <path d="M12 2V22" />
              <path d="M12 8C14 9.5 15.5 11 15.5 12.5" />
              <path d="M12 13C14 14.5 15.5 16 15.5 17.5" />
              <path d="M12 8C10 9.5 8.5 11 8.5 12.5" />
              <path d="M12 13C10 14.5 8.5 16 8.5 17.5" />
            </svg>
            <span className={`text-[8px] md:text-[9px] font-serif font-semibold ${award.textCol} tracking-wider mt-0.5`}>
              {isAr ? award.textAr : award.text}
            </span>
            <span className="text-[7px] md:text-[8px] font-mono text-neutral-600 font-medium">
              {award.year}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
