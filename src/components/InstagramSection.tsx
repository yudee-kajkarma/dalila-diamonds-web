"use client";
import Image from 'next/image';
import React from 'react';
import { Marcellus} from "next/font/google";
import { useLanguage } from "@/context/LanguageContext";

const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: "400",
});
const instaImages = [
	'/insta/insta1.jpg',
	'/insta/insta2.jpg',
	'/insta/insta3.jpg',
];

const instaLink = 'https://www.instagram.com/p/DO56RDlDKde/';


const InstaSection = () => {
  const { dictionary } = useLanguage();
  return (
	<section className={`text-center py-8 bg-white ${marcellus.variable}`} style={{ background: '#fff' }}>
	<h2 className="text-2xl font-bold mb-2 text-[#222]" style={{ fontFamily: 'var(--font-marcellus)' }}>
	  {dictionary?.home?.instagramTitle || "Our Instagram"}
	</h2>
	<div className="text-lg font-medium mb-6 text-[#8a3ab9]" style={{ fontFamily: 'var(--font-marcellus)', color: '#8a3ab9' }}>
	  @daliladiamonds
	</div>
	<div
	  className="grid grid-cols-3 gap-2 justify-center bg-white"
	  style={{ background: '#fff', maxWidth: 600, margin: '0 auto' }}
	>
	  {instaImages.map((src, idx) => (
		<a
		  key={src}
		  href={instaLink}
		  target="_blank"
		  rel="noopener noreferrer"
		  className="overflow-hidden shadow-md transition-transform duration-200 hover:scale-105 border border-gray-200 bg-white"
		  style={{ background: '#fff', width: '100%' }}
		>
		  <div className="relative w-full aspect-square">
			<Image
			  src={src}
			  alt={`Instagram post ${idx + 1}`}
			  fill
			  className="object-cover w-full h-full bg-white"
			  style={{ background: '#fff' }}
			/>
		  </div>
		</a>
	  ))}
	</div>
    </section>
  );
};

export default InstaSection;
