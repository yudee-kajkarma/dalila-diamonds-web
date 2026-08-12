"use client";

import Image from "next/image";
import Link from "next/link";
import { Marcellus, Jost } from "next/font/google";
import { getLocalizedPath, type Locale } from "@/lib/i18n/config";

const marcellus = Marcellus({ subsets: ["latin"], weight: "400" });
const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  specs: string;
}

interface ProductsSectionProps {
  locale: Locale;
  sectionTitle?: string;
  viewAllText?: string;
}

const getProductsData = (locale: Locale) => {
  const translations = {
    en: {
      title: "Featured Diamond Selection",
      viewAll: "View All Products",
      products: [
        {
          id: 1,
          name: "Round Brilliant Diamond",
          price: "€4,250",
          image: "/DiamondsinBlubg/Round.jpg",
          specs: "1.02ct, F, VS2, Excellent Cut",
        },
        {
          id: 2,
          name: "Princess Cut Diamond",
          price: "€3,890",
          image: "/DiamondsinBlubg/Princess.jpg",
          specs: "0.85ct, G, VS1, Very Good Cut",
        },
        {
          id: 3,
          name: "Oval Diamond",
          price: "€5,120",
          image: "/DiamondsinBlubg/Oval.jpg",
          specs: "1.25ct, E, VVS2, Excellent Cut",
        },
        {
          id: 4,
          name: "Emerald Cut Diamond",
          price: "€6,750",
          image: "/DiamondsinBlubg/Emerald.jpg",
          specs: "1.50ct, D, VVS1, Very Good Cut",
        },
        {
          id: 5,
          name: "Heart Shape Diamond",
          price: "€3,450",
          image: "/DiamondsinBlubg/Heart.jpg",
          specs: "0.75ct, H, VS2, Good Cut",
        },
        {
          id: 6,
          name: "Cushion Cut Diamond",
          price: "€4,890",
          image: "/DiamondsinBlubg/Cushion.jpg",
          specs: "1.10ct, F, VS1, Very Good Cut",
        },
      ],
    },
    de: {
      title: "Ausgewählte Diamant-Kollektion",
      viewAll: "Alle Produkte ansehen",
      products: [
        {
          id: 1,
          name: "Runder Brillant Diamant",
          price: "€4.250",
          image: "/DiamondsinBlubg/Round.jpg",
          specs: "1,02ct, F, VS2, Exzellenter Schliff",
        },
        {
          id: 2,
          name: "Princess Schliff Diamant",
          price: "€3.890",
          image: "/DiamondsinBlubg/Princess.jpg",
          specs: "0,85ct, G, VS1, Sehr guter Schliff",
        },
        {
          id: 3,
          name: "Ovaler Diamant",
          price: "€5.120",
          image: "/DiamondsinBlubg/Oval.jpg",
          specs: "1,25ct, E, VVS2, Exzellenter Schliff",
        },
        {
          id: 4,
          name: "Smaragd Schliff Diamant",
          price: "€6.750",
          image: "/DiamondsinBlubg/Emerald.jpg",
          specs: "1,50ct, D, VVS1, Sehr guter Schliff",
        },
        {
          id: 5,
          name: "Herz Form Diamant",
          price: "€3.450",
          image: "/DiamondsinBlubg/Heart.jpg",
          specs: "0,75ct, H, VS2, Guter Schliff",
        },
        {
          id: 6,
          name: "Kissen Schliff Diamant",
          price: "€4.890",
          image: "/DiamondsinBlubg/Cushion.jpg",
          specs: "1,10ct, F, VS1, Sehr guter Schliff",
        },
      ],
    },
    fr: {
      title: "Sélection de Diamants Vedettes",
      viewAll: "Voir Tous les Produits",
      products: [
        {
          id: 1,
          name: "Diamant Rond Brillant",
          price: "€4.250",
          image: "/DiamondsinBlubg/Round.jpg",
          specs: "1,02ct, F, VS2, Taille Excellente",
        },
        {
          id: 2,
          name: "Diamant Taille Princesse",
          price: "€3.890",
          image: "/DiamondsinBlubg/Princess.jpg",
          specs: "0,85ct, G, VS1, Très Bonne Taille",
        },
        {
          id: 3,
          name: "Diamant Ovale",
          price: "€5.120",
          image: "/DiamondsinBlubg/Oval.jpg",
          specs: "1,25ct, E, VVS2, Taille Excellente",
        },
        {
          id: 4,
          name: "Diamant Taille Émeraude",
          price: "€6.750",
          image: "/DiamondsinBlubg/Emerald.jpg",
          specs: "1,50ct, D, VVS1, Très Bonne Taille",
        },
        {
          id: 5,
          name: "Diamant Forme Cœur",
          price: "€3.450",
          image: "/DiamondsinBlubg/Heart.jpg",
          specs: "0,75ct, H, VS2, Bonne Taille",
        },
        {
          id: 6,
          name: "Diamant Taille Coussin",
          price: "€4.890",
          image: "/DiamondsinBlubg/Cushion.jpg",
          specs: "1,10ct, F, VS1, Très Bonne Taille",
        },
      ],
    },
    it: {
      title: "Selezione di Diamanti in Evidenza",
      viewAll: "Visualizza Tutti i Prodotti",
      products: [
        {
          id: 1,
          name: "Diamante Rotondo Brillante",
          price: "€4.250",
          image: "/DiamondsinBlubg/Round.jpg",
          specs: "1,02ct, F, VS2, Taglio Eccellente",
        },
        {
          id: 2,
          name: "Diamante Taglio Principessa",
          price: "€3.890",
          image: "/DiamondsinBlubg/Princess.jpg",
          specs: "0,85ct, G, VS1, Taglio Molto Buono",
        },
        {
          id: 3,
          name: "Diamante Ovale",
          price: "€5.120",
          image: "/DiamondsinBlubg/Oval.jpg",
          specs: "1,25ct, E, VVS2, Taglio Eccellente",
        },
        {
          id: 4,
          name: "Diamante Taglio Smeraldo",
          price: "€6.750",
          image: "/DiamondsinBlubg/Emerald.jpg",
          specs: "1,50ct, D, VVS1, Taglio Molto Buono",
        },
        {
          id: 5,
          name: "Diamante Forma Cuore",
          price: "€3.450",
          image: "/DiamondsinBlubg/Heart.jpg",
          specs: "0,75ct, H, VS2, Taglio Buono",
        },
        {
          id: 6,
          name: "Diamante Taglio Cuscino",
          price: "€4.890",
          image: "/DiamondsinBlubg/Cushion.jpg",
          specs: "1,10ct, F, VS1, Taglio Molto Buono",
        },
      ],
    },
    nl: {
      title: "Uitgelichte Diamant Selectie",
      viewAll: "Bekijk Alle Producten",
      products: [
        {
          id: 1,
          name: "Ronde Briljant Diamant",
          price: "€4.250",
          image: "/DiamondsinBlubg/Round.jpg",
          specs: "1,02ct, F, VS2, Uitstekende Slijpvorm",
        },
        {
          id: 2,
          name: "Prinses Slijpvorm Diamant",
          price: "€3.890",
          image: "/DiamondsinBlubg/Princess.jpg",
          specs: "0,85ct, G, VS1, Zeer Goede Slijpvorm",
        },
        {
          id: 3,
          name: "Ovale Diamant",
          price: "€5.120",
          image: "/DiamondsinBlubg/Oval.jpg",
          specs: "1,25ct, E, VVS2, Uitstekende Slijpvorm",
        },
        {
          id: 4,
          name: "Smaragd Slijpvorm Diamant",
          price: "€6.750",
          image: "/DiamondsinBlubg/Emerald.jpg",
          specs: "1,50ct, D, VVS1, Zeer Goede Slijpvorm",
        },
        {
          id: 5,
          name: "Hart Vorm Diamant",
          price: "€3.450",
          image: "/DiamondsinBlubg/Heart.jpg",
          specs: "0,75ct, H, VS2, Goede Slijpvorm",
        },
        {
          id: 6,
          name: "Kussen Slijpvorm Diamant",
          price: "€4.890",
          image: "/DiamondsinBlubg/Cushion.jpg",
          specs: "1,10ct, F, VS1, Zeer Goede Slijpvorm",
        },
      ],
    },
    es: {
      title: "Selección de Diamantes Destacados",
      viewAll: "Ver Todos los Productos",
      products: [
        {
          id: 1,
          name: "Diamante Redondo Brillante",
          price: "€4.250",
          image: "/DiamondsinBlubg/Round.jpg",
          specs: "1,02ct, F, VS2, Corte Excelente",
        },
        {
          id: 2,
          name: "Diamante Corte Princesa",
          price: "€3.890",
          image: "/DiamondsinBlubg/Princess.jpg",
          specs: "0,85ct, G, VS1, Muy Buen Corte",
        },
        {
          id: 3,
          name: "Diamante Ovalado",
          price: "€5.120",
          image: "/DiamondsinBlubg/Oval.jpg",
          specs: "1,25ct, E, VVS2, Corte Excelente",
        },
        {
          id: 4,
          name: "Diamante Corte Esmeralda",
          price: "€6.750",
          image: "/DiamondsinBlubg/Emerald.jpg",
          specs: "1,50ct, D, VVS1, Muy Buen Corte",
        },
        {
          id: 5,
          name: "Diamante Forma Corazón",
          price: "€3.450",
          image: "/DiamondsinBlubg/Heart.jpg",
          specs: "0,75ct, H, VS2, Buen Corte",
        },
        {
          id: 6,
          name: "Diamante Corte Cojín",
          price: "€4.890",
          image: "/DiamondsinBlubg/Cushion.jpg",
          specs: "1,10ct, F, VS1, Muy Buen Corte",
        },
      ],
    },
  };

  return translations[locale] || translations.en;
};

export default function ProductsSection({ locale, sectionTitle, viewAllText }: ProductsSectionProps) {
  const data = getProductsData(locale);
  const localizedPath = (path: string) => getLocalizedPath(path, locale);

  return (
    <section className="mb-16 py-8">
      <div className="text-center mb-10">
        <div className="w-24 h-1.5 bg-gradient-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full mx-auto" />
        <h2 className={`text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 ${marcellus.className}`}>
          {sectionTitle || data.title}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {data.products.map((product) => (
          <Link
            key={product.id}
            href={localizedPath("/inventory")}
            className="group bg-white border border-gray-200 hover:border-[#c89e3a]/60 hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            {/* Product Image */}
            <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-[#c89e3a]/0 group-hover:bg-[#c89e3a]/10 transition-colors duration-300" />
            </div>

            {/* Product Info */}
            <div className="p-5">
              <div className="w-10 h-0.5 bg-[#c89e3a] mb-3" />
              <h3 className={`text-lg font-bold text-[#1a1a1a] mb-2 group-hover:text-[#c89e3a] transition-colors ${marcellus.className}`}>
                {product.name}
              </h3>
              <p className={`text-sm text-gray-600 mb-3 ${jost.className}`}>
                {product.specs}
              </p>
              <div className="flex items-center justify-between">
                <span className={`text-xl font-bold text-[#c89e3a] ${jost.className}`}>
                  {product.price}
                </span>
                <span className={`text-xs font-medium text-gray-500 group-hover:text-[#c89e3a] transition-colors ${jost.className}`}>
                  {viewAllText || data.viewAll} →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center">
        <Link
          href={localizedPath("/inventory")}
          className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3.5 text-sm transition-colors ${jost.className}`}
        >
          {viewAllText || data.viewAll}
        </Link>
      </div>
    </section>
  );
}