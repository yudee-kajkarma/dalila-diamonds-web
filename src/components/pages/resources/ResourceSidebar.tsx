'use client';

import React from 'react';
import Link from 'next/link';
import { Marcellus } from 'next/font/google';
import { useLanguage } from '@/context/LanguageContext';
import { getResourceNavLabel, RESOURCE_NAV_ITEMS } from '@/lib/resourceNavLinks';

const marcellus = Marcellus({
  variable: '--font-marcellus',
  subsets: ['latin'],
  weight: '400',
});

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
    <div className="lg:col-span-1">
      <div className="sticky top-24">
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
          <div className="bg-linear-to-r from-slate-900 to-slate-800 px-6 py-4">
            <h2 className={`${marcellus.className} text-xl text-white`}>
              {dictionary?.nav?.resources || "Our Resources"}
            </h2>
          </div>
          
          <div className="max-h-[min(70vh,28rem)] overflow-y-auto overscroll-contain p-3 space-y-0.5">
            {otherPages.map((page) => (
              <Link
                key={page.key}
                href={localizedPath(page.href)}
                className="block group hover:bg-slate-50 px-2 py-2 rounded-md transition-colors duration-200"
                scroll={false}
              >
                <h3 className={`${marcellus.className} text-sm leading-snug text-slate-900 group-hover:text-[#c89e3a] transition-colors duration-200`}>
                  {page.title}
                </h3>
              </Link>
            ))}
          </div>

          <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">
            <Link 
              href={localizedPath("/inventory")}
              className="inline-flex items-center text-sm font-medium text-slate-900 hover:text-[#c89e3a] transition-colors duration-300"
            >
              {dictionary?.nav?.inventory || "Browse Our Inventory"}
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});

ResourceSidebar.displayName = 'ResourceSidebar';

export default ResourceSidebar;
