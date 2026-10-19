import React, { useState } from 'react';
import { Flame, Leaf, ChevronRight, Compass } from 'lucide-react';
import { Language, FULL_TRANSLATIONS } from '../lib/translations';

interface MenuCourseJourneyProps {
  currentLanguage?: Language;
}

export const MenuCourseJourney: React.FC<MenuCourseJourneyProps> = ({ currentLanguage = 'en' }) => {
  const t = FULL_TRANSLATIONS[currentLanguage] || FULL_TRANSLATIONS.en;
  const courses = t.courses;
  const [activeCourseIndex, setActiveCourseIndex] = useState(0);

  const activeCourse = courses[activeCourseIndex] || courses[0];

  return (
    <section id="menu" className="relative px-6 py-24 md:px-12 md:py-36 bg-[#0b0a09]">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end border-b border-white/10 pb-10">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-[#c7a85c] mb-4">
              <Flame size={14} className="text-[#c7a85c]" />
              <span>02 / {t.navMenu}</span>
            </div>
            <h2 className="font-serif text-5xl md:text-8xl leading-[0.88] tracking-[-0.04em] text-[#f6f2e9]">
              {t.menuHeading1} <br />
              <em className="font-normal text-[#c7a85c]">{t.menuHeading2}</em>
            </h2>
          </div>

          <div className="flex flex-col gap-4 max-w-md">
            <p className="text-sm leading-relaxed text-white/60">
              {t.menuSub}
            </p>

            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-[#141210] w-fit shadow-inner">
              <Leaf size={13} className="text-[#c7a85c]" />
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#e5c97d]">
                {t.menuPairingBadge}
              </span>
            </div>
          </div>
        </div>

        {/* Course Journey Timeline */}
        <div className="mt-14 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          {/* Course List Navigation */}
          <div className="grid gap-2 border-t border-white/10 pt-2">
            {courses.map((course, idx) => {
              const isActive = activeCourseIndex === idx;
              return (
                <button
                  key={course.step}
                  onClick={() => setActiveCourseIndex(idx)}
                  className={`group flex items-start justify-between gap-4 p-4.5 rounded-xl text-left transition-all duration-150 active:scale-[0.985] cursor-pointer ${
                    isActive
                      ? 'border border-[#c7a85c] bg-[#171410] shadow-[0_4px_16px_rgba(0,0,0,0.6)]'
                      : 'border border-transparent hover:border-white/15 hover:bg-[#12100d]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`font-serif text-sm pt-0.5 tracking-wider ${
                        isActive ? 'text-[#c7a85c]' : 'text-white/30 group-hover:text-white/60'
                      }`}
                    >
                      {course.step}
                    </span>
                    <div>
                      <h4
                        className={`font-serif text-lg md:text-xl transition-colors ${
                          isActive ? 'text-white' : 'text-white/70 group-hover:text-white'
                        }`}
                      >
                        {course.name}
                      </h4>
                      <p className="text-[11px] uppercase tracking-[0.14em] text-white/40 mt-1">
                        {course.tagline}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#c7a85c]/80 shrink-0 pt-1">
                    {course.flameTemp}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Course Dossier */}
          <div className="rounded-2xl border border-[#c7a85c]/35 bg-[#14120f] p-6 md:p-8 shadow-2xl relative card-3d-hover">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#c7a85c]">
                Act {activeCourse.step} of 07 · Seasonal Stage
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                {activeCourse.season}
              </span>
            </div>

            <div className="mt-6">
              <h3 className="font-serif text-3xl md:text-4xl text-white leading-tight">
                {activeCourse.name}
              </h3>
              <p className="text-xs uppercase tracking-[0.16em] text-[#e5c97d] mt-2">
                {activeCourse.tagline}
              </p>
              <p className="text-sm leading-relaxed text-white/70 mt-4">
                {activeCourse.notes}
              </p>
            </div>

            {/* Botanical Pairing Spotlight */}
            <div className="mt-8 rounded-xl border border-white/10 bg-[#0c0b09] p-5 shadow-inner">
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-[0.22em] text-[#c7a85c] flex items-center gap-1.5">
                  <Leaf size={13} />
                  <span>Artisanal Botanical Infusion</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.16em] text-white/40">
                  House Fermentation
                </span>
              </div>

              <h4 className="font-serif text-xl text-white mt-2 leading-snug">
                {activeCourse.botanicalPairing}
              </h4>
            </div>

            {/* Reservation quick bridge with tactile button */}
            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
              <div>
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 block">Tasting Price</span>
                <span className="font-serif text-xl text-white mt-0.5">$185 per guest</span>
              </div>

              <a
                href="#reserve"
                className="btn-gold-3d flex items-center gap-2 rounded-full px-5 py-2.5 text-[10px] uppercase tracking-[0.2em]"
              >
                <span>Reserve This Menu</span>
                <ChevronRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
