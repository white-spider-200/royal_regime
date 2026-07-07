/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Square, Wind } from 'lucide-react';
import { Language } from '../types';

interface BreathingRitualProps {
  lang: Language;
}

type BreathPhase = 'idle' | 'inhale' | 'hold-in' | 'exhale' | 'hold-out';

export default function BreathingRitual({ lang }: BreathingRitualProps) {
  const [phase, setPhase] = useState<BreathPhase>('idle');
  const [secondsLeft, setSecondsLeft] = useState(4);
  const isAr = lang === 'ar';

  const phasesInfo: Record<BreathPhase, { text: string; textAr: string; color: string; scale: number }> = {
    idle: { text: 'Mindful Brewing Ritual', textAr: 'طقوس التخمير الواعي', color: 'text-stone-400', scale: 1 },
    inhale: { text: 'Breathe In Slowly', textAr: 'شهيق ببطء', color: 'text-tea-gold', scale: 1.5 },
    'hold-in': { text: 'Hold and Savor', textAr: 'احبس النفس واستمتع', color: 'text-amber-600', scale: 1.5 },
    exhale: { text: 'Release and Let Go', textAr: 'زفير ببطء وهدوء', color: 'text-stone-500', scale: 0.9 },
    'hold-out': { text: 'Rest in Stillness', textAr: 'استرخِ في السكون', color: 'text-stone-400', scale: 0.9 },
  };

  useEffect(() => {
    if (phase === 'idle') return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // Progress to the next phase
          if (phase === 'inhale') {
            setPhase('hold-in');
            return 4; // hold for 4 seconds
          } else if (phase === 'hold-in') {
            setPhase('exhale');
            return 4; // exhale for 4 seconds
          } else if (phase === 'exhale') {
            setPhase('hold-out');
            return 4; // hold for 4 seconds
          } else {
            setPhase('inhale');
            return 4; // inhale for 4 seconds
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase]);

  const handleStart = () => {
    setPhase('inhale');
    setSecondsLeft(4);
  };

  const handleStop = () => {
    setPhase('idle');
  };

  return (
    <div id="breathing-ritual" className="bg-stone-50/50 border border-stone-100 rounded-xl p-6 md:p-8 flex flex-col items-center justify-center text-center max-w-md mx-auto">
      <div className="mb-4">
        <Wind className="w-8 h-8 text-tea-gold mx-auto mb-2" />
        <h3 className="font-serif text-lg md:text-xl font-medium tracking-wide">
          {isAr ? 'تأمل تخمير الشاي' : 'The Tea Brewer\'s Breath'}
        </h3>
        <p className="text-xs md:text-sm text-stone-500 max-w-xs mt-1">
          {isAr
            ? 'قم بمزامنة أنفاسك مع دورة تخمير الشاي لتهدئة عقلك وإحياء حواسك.'
            : 'Sync your breath with the slow steeping cycle of your tea to cultivate absolute presence.'}
        </p>
      </div>

      {/* Interactive Breath Circle */}
      <div id="breathing-circle-container" className="relative w-48 h-48 flex items-center justify-center my-6">
        {/* Outer Pulsing Waves */}
        <AnimatePresence>
          {phase !== 'idle' && (
            <motion.div
              className="absolute inset-0 rounded-full bg-tea-gold/5 border border-tea-gold/10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: phasesInfo[phase].scale * 1.3,
                opacity: [0.1, 0.4, 0.1]
              }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: 'easeInOut' 
              }}
            />
          )}
        </AnimatePresence>

        {/* Core Breathing Circle */}
        <motion.div
          id="breathing-core-circle"
          className="w-32 h-32 rounded-full border border-stone-200 bg-white shadow-md flex flex-col items-center justify-center p-4 z-10"
          animate={{
            scale: phasesInfo[phase].scale,
            borderColor: phase === 'idle' ? '#e7e5e4' : '#c5a880',
            boxShadow: phase === 'idle' 
              ? '0 4px 6px -1px rgb(0 0 0 / 0.05)' 
              : '0 10px 15px -3px rgb(197 168 128 / 0.2)'
          }}
          transition={{ duration: 4, ease: 'easeInOut' }}
        >
          {phase === 'idle' ? (
            <button
              id="start-breath-btn"
              onClick={handleStart}
              className="w-12 h-12 rounded-full bg-tea-gold hover:bg-tea-gold-dark text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </button>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <span className={`text-[11px] uppercase tracking-widest font-semibold ${phasesInfo[phase].color} mb-1 transition-colors duration-500`}>
                {isAr ? phasesInfo[phase].textAr : phasesInfo[phase].text}
              </span>
              <span className="text-3xl font-mono font-light text-stone-800">
                {secondsLeft}
              </span>
            </div>
          )}
        </motion.div>
      </div>

      {phase !== 'idle' && (
        <button
          id="stop-breath-btn"
          onClick={handleStop}
          className="flex items-center space-x-2 border border-stone-200 hover:border-stone-400 text-stone-600 hover:text-stone-800 text-xs tracking-wider px-3 py-1.5 rounded-full transition-all cursor-pointer"
        >
          <Square className="w-3.5 h-3.5 fill-current" />
          <span>{isAr ? 'إيقاف الطقس' : 'Stop Ritual'}</span>
        </button>
      )}
    </div>
  );
}
