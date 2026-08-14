'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { marcellus, jost } from "@/lib/fonts";
import { useLanguage } from '@/context/LanguageContext';
import { getResourceNavLabel, RESOURCE_NAV_ITEMS } from '@/lib/resourceNavLinks';

interface ResourceSidebarProps {
  currentPage: 'premium-b2b' | 'sell-diamond' | 'elongated-cushion' | 'diamond-grading-report-guide' | 'diamond-quality-chart' | 'diamond-fluorescence-guide' | 'diamond-culet-guide' | 'diamond-girdle-guide' | 'diamond-size-chart' | 'natural-vs-lab-grown-diamonds' | 'diamond-valuation-calculator' | 'where-to-sell-diamond-ring' | 'how-to-sell-diamond-ring' | 'diamond-appraisal-antwerp-belgium' | 'sell-diamond-without-certificate';
}

const ResourceSidebar = React.memo(({ currentPage }: ResourceSidebarProps) => {
  const { locale, dictionary } = useLanguage();
  const localizedPath = (path: string) => {
    if (!locale || locale === "en") return path;
    return `/${locale}${path}`;
  };

  const allPages = RESOURCE_NAV_ITEMS.map((item) => ({
    key: item.key,
    title: getResourceNavLabel(dictionary, item),
    href: item.href,
  }));

  const otherPages = allPages.filter((page) => page.key !== currentPage);

  return (
    <div className="space-y-6">
      {/* Resources list — article-page style, no box/scrollbar */}
      <div>
        <h3 className={`text-xl font-bold text-[#1a1a1a] mb-5 ${marcellus.className}`}>
          {dictionary?.nav?.resources || "Our Resources"}
        </h3>
        <ul className="space-y-3">
          {otherPages.map((page) => (
            <li key={page.key}>
              <Link
                href={localizedPath(page.href)}
                className={`group flex items-start justify-between gap-3 py-1 text-gray-700 hover:text-[#c89e3a] transition-colors ${jost.className}`}
                scroll={false}
              >
                <span className="text-sm leading-snug flex-1">
                  {page.title}
                </span>
                <ArrowRight
                  size={14}
                  className="shrink-0 mt-0.5 text-gray-400 group-hover:text-[#c89e3a] group-hover:translate-x-1 transition-all"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Find Us card — matches article sidebar */}
      <div className="bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a] text-white p-6 shadow-lg">
        <h3 className={`text-xl font-bold mb-4 ${marcellus.className}`}>Find Us</h3>
        <div className={`space-y-3 text-sm text-gray-200 ${jost.className}`}>
          <div className="flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#c89e3a] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <p className="font-medium text-white mb-1">Dalila Diamonds</p>
              <p className="leading-relaxed">
                Hoveniersstraat 30, Box - 105<br />
                Suite 326, 2018 Antwerpen<br />
                Belgium
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#c89e3a] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <a href="mailto:business@daliladiamonds.com" className="hover:text-[#c89e3a] transition-colors">
              business@daliladiamonds.com
            </a>
          </div>
          <div className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#c89e3a] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <a href="tel:+32487939351" className="hover:text-[#c89e3a] transition-colors">
              +32 487 93 93 51
            </a>
          </div>
        </div>
      </div>

      {/* Browse Inventory CTA — matches article sidebar */}
      <div className="bg-[#c89e3a] text-white p-6 shadow-lg">
        <h3 className={`text-xl font-bold mb-3 ${marcellus.className}`}>
          {dictionary?.nav?.inventory || "Browse Our Inventory"}
        </h3>
        <p className={`text-sm mb-4 text-white/90 ${jost.className}`}>
          Discover our exquisite collection of premium diamonds
        </p>
        <Link
          href={localizedPath("/inventory")}
          className={`w-full bg-white text-[#2d2d2d] py-2.5 px-4 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 group font-semibold ${jost.className}`}
        >
          <span>View Inventory</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
});

ResourceSidebar.displayName = 'ResourceSidebar';

export default ResourceSidebar;
