import { ShowcaseSection } from "@/components/pages/seopage/SeoPageShowcase";
import { ContentSection } from "@/components/pages/seopage/SeoPageContent";

interface B2bContent {
  trustedSupplierSection: ContentSection[];
  initialSections: ShowcaseSection[];
  familyExpertiseSection: ContentSection[];
  antwerpAuthoritySection: ContentSection[];
  certificationSections: ShowcaseSection[];
  processSection: ContentSection[];
  servicesSections: ShowcaseSection[];
  sellDiamondsSection: ContentSection[];
  ethicsQualitySection: ContentSection[];
  logisticsMarketSections: ShowcaseSection[];
  whyChooseUsSection: ContentSection[];
  contactSection: ContentSection[];
}

const contentByLocale: Record<string, B2bContent> = {
  en: {
    trustedSupplierSection: [
      {
        title: "Dalila Diamonds | Trusted B2B Diamond Sourcing from Antwerp",
        content: "Dalila Diamonds is a premium B2B diamond supplier based in Antwerp, Belgium — the historic and globally recognized heart of the international diamond trade.\n\nWe specialize in supplying certified natural diamonds to jewelers, manufacturers, wholesalers, luxury retailers, and investment buyers worldwide. Our business is built on trust, transparency, precision sourcing, and long-term strategic partnerships.\n\nEvery diamond we deliver represents not only brilliance and rarity, but reliability and professional integrity backed by decades of expertise in the global diamond market.",
      },
    ],
    initialSections: [
      {
        label: "EXECUTIVE OVERVIEW",
        heading: "Premium B2B Diamond<br />Supplier in Belgium",
        description:
          "<p class='mb-4'>Dalila Diamonds is a premium B2B diamond supplier based in Antwerp, Belgium — the historic and globally recognized heart of the international diamond trade.</p><p class='mb-4'>We specialize in supplying certified natural diamonds to jewelers, manufacturers, wholesalers, luxury retailers, and investment buyers worldwide.</p><p class='mb-4'>Our business is built on trust, transparency, precision sourcing, and long-term strategic partnerships. Every diamond we deliver represents not only brilliance and rarity, but reliability and professional integrity.</p><p>With decades of family expertise and a global sourcing network, we ensure consistent quality, competitive pricing, and secure international logistics.</p>",
        imageSrc: "/b2b/looseround.webp",
        imageAlt: "Dalila Diamonds Antwerp",
        imagePosition: "right",
      },
      {
        label: "ABOUT DALILA DIAMONDS",
        heading: "Strategic Sourcing Partner<br />for Professional Buyers",
        description:
          "<p class='mb-4'>Dalila Diamonds was founded with a clear mission: to simplify diamond sourcing for professional B2B buyers.</p><p class='mb-4'>We understand that in the diamond industry, reliability and consistency are critical. Production schedules, inventory planning, and customer expectations depend on accurate grading, competitive pricing, and secure supply.</p><p class='mb-4'>Operating from Antwerp provides us direct access to one of the world's largest polished diamond inventories and established diamond exchanges. This allows us to work closely with manufacturers and primary suppliers, ensuring better pricing structures and priority access to premium goods.</p><p>We are not a transactional trading company — we are a strategic sourcing partner committed to supporting your long-term growth.</p>",
        imageSrc: "/b2b/business-partnership.jpg",
        imageAlt: "Diamond sourcing solutions",
        imagePosition: "left",
      },
    ],
    familyExpertiseSection: [
      {
        title: "50+ Years of Multi-Generational Diamond Expertise",
        content: "Behind Dalila Diamonds stands a multi-generational legacy of over 50 years in the diamond industry. This heritage is not just history — it's active expertise that delivers tangible value to our B2B clients every day.",
        bulletPoints: [
          "Deep Grading & Valuation Knowledge — Our family has spent decades mastering the nuances of the 4Cs, certification standards, and market pricing. We can assess quality instantly and negotiate fair prices.",
          "Strong Global Supplier Connections — Building relationships in the diamond industry takes years. Our family connections in Antwerp, Mumbai, Tel Aviv, and New York provide preferred access to premium stock.",
          "Market Insight & Pricing Intelligence — We have experienced multiple market cycles. This experience allows us to advise clients on timing, pricing trends, and investment opportunities.",
          "Exceptional Negotiation Skills — Decades of sourcing experience has refined our negotiation skills, helping us secure better terms and prices for our clients.",
          "Ethical & Responsible Trade Principles — Our family reputation is built on integrity. We have maintained ethical sourcing standards from the start, long before it became an industry requirement.",
          "Antwerp Diamond Community Trust — A reputation on the Antwerp Diamond Bourse is earned over generations. Our standing provides access to exclusive stock and favorable terms not open to newer market entrants.",
        ],
      },
    ],
    antwerpAuthoritySection: [
      {
        title: "Why Antwerp Matters in the Global Diamond Trade",
        content: "Antwerp has been the heart of the global diamond industry for over five centuries. Today, it remains the world's primary diamond trading hub, with approximately 84% of all rough diamonds and 50% of all polished diamonds passing through the city annually.\n\nDalila Diamonds operates within this historic ecosystem, providing buyers with access to trusted sourcing networks, transparent pricing mechanisms, and a reliability of supply consistency that only Antwerp can offer.\n\nOur presence in Belgium allows us to maintain close relationships with cutters, polishers, laboratories, and international logistics partners — ensuring efficient sourcing, certification, and delivery for professional buyers worldwide.\n\nWhen you partner with a Belgium-based supplier, you aren't just buying diamonds — you are accessing centuries of trading infrastructure, expertise, and trust.",
      },
    ],
    certificationSections: [
      {
        label: "CERTIFIED DIAMONDS & LAB STANDARDS",
        heading: "International Laboratory<br />Certification Standards",
        description:
          "<p class='mb-4'>We supply diamonds certified by leading international gemological laboratories, including GIA, IGI, HRD, and AGS.</p><p class='mb-4'>Certification ensures independent verification of:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Carat weight</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Color grade</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Clarity grade</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Cut quality and proportions</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Polish and symmetry</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Fluorescence levels</span></li></ul><p class='mb-4'>This guarantees transparency, consistency, and confidence throughout your supply chain.</p><p>We offer diamonds suitable for both commercial manufacturing and high-end luxury markets, all with internationally recognized grading reports.</p>",
        imageSrc: "/b2b/diamant-certificat-GIA.webp",
        imageAlt: "Certified diamonds",
        imagePosition: "left",
      },
      {
        label: "OUR DIAMOND COLLECTION",
        heading: "Full Range of Certified<br />Natural Diamonds",
        description:
          "<p class='mb-4'>Dalila Diamonds supplies polished natural diamonds in all major shapes, including round brilliant, princess, cushion, emerald, oval, pear, radiant, marquise, asscher, and heart shapes.</p><p class='mb-4'>Available across all quality spectrums:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Commercial goods (SI–I clarity, H–K color)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Triple Excellent cut diamonds</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>No-fluorescence diamonds</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Premium colorless stones (D–F)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>High-clarity diamonds (IF–VVS)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Large certified solitaires (2ct to 10ct+)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Investment-grade diamonds</span></li></ul><p>We also supply calibrated melee parcels and precision matched layouts for jewelry production.</p>",
        imageSrc: "/b2b/diamond-slp-cover-mobile.webp",
        imageAlt: "Diamond collection",
        imagePosition: "right",
      },
    ],
    processSection: [
      {
        title: "Our Professional Diamond Procurement Process",
        content: "We follow a structured, transparent procurement process designed to minimize risk and maximize value for B2B buyers:",
        bulletPoints: [
          "Requirement Analysis — We begin by understanding your exact specifications: shape, carat range, color, clarity, cut quality, certification preference, and budget parameters.",
          "Strategic Global Sourcing — Our network activates across Antwerp exchanges, trusted manufacturers, and international suppliers to locate diamonds matching your criteria.",
          "Laboratory Certification Verification — Every diamond undergoes certification authentication. We verify report numbers, laser inscriptions, and grading consistency.",
          "Quality Inspection & Grading Review — Our gemologists conduct independent inspection for proportions, symmetry, polish, fluorescence, and visual appeal to ensure quality standards.",
          "Secure International Dispatch — Once approved, diamonds are packaged, insured, and shipped via specialized logistics partners with full tracking and customs support.",
          "Post-Delivery Support — We provide ongoing support for any verification, documentation, or future sourcing requirements.",
        ],
      },
    ],
    servicesSections: [
      {
        label: "S2S – SECURE TO SOURCE",
        heading: "Structured Diamond<br />Procurement Solution",
        description:
          "<p class='mb-4'>Secure To Source (S2S) is our core B2B procurement solution designed for jewelers, wholesalers, and manufacturers seeking reliability and reduced sourcing risk.</p><p class='mb-4'>S2S provides:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Direct access to Antwerp inventories</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Certified stones with full documentation</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Competitive wholesale pricing</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Full quality control verification</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Insured international logistics</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Transparent documentation and invoicing</span></li></ul><p>This service is ideal for businesses requiring consistent supply, predictable pricing, and long-term partnership stability.</p>",
        imageSrc: "/b2b/stos.jpg",
        imageAlt: "Secure sourcing process",
        imagePosition: "left",
      },
      {
        label: "DS4U – DIAMOND SOURCE FOR YOU",
        heading: "Customized Sourcing<br />for Rare Requirements",
        description:
          "<p class='mb-4'>Diamond Source For You (DS4U) is our fully customized sourcing program for specific, rare, or high-value diamond requirements that require specialized search and procurement.</p><p class='mb-4'>Clients request:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Exact carat ranges and weight specifications</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Specific color and clarity combinations</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Matched pairs for earrings and layouts</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Bridal collections with consistent grading</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Rare fancy shapes and cuts</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>High-value investment-grade stones (5ct+)</span></li></ul><p>Our global sourcing network activates to locate, verify, negotiate, and securely deliver stones matching your precise criteria within agreed timelines.</p>",
        imageSrc: "/b2b/close-up.jpg",
        imageAlt: "Custom diamond sourcing",
        imagePosition: "right",
      },
    ],
    sellDiamondsSection: [
      {
        title: "SYD — Sell Your Diamonds: Professional Buyback Service",
        content: "Sell Your Diamonds (SYD) is our professional diamond purchasing and buyback service for B2B sellers, estates, liquidation scenarios, and inventory optimization needs.",
        bulletPoints: [
          "Loose Certified Diamonds (All Sizes) — We purchase individual stones and parcels from 0.30ct to 10ct+, with valid GIA, IGI, HRD, or AGS certification.",
          "High-Value Solitaires & Rare Stones — Exceptional stones with investment-grade characteristics, rare color grades (D-E-F), or superior clarity (IF-VVS) receive premium valuations.",
          "Investment-Grade Diamonds — We actively purchase diamonds held for investment purposes, providing liquidity and transparent pricing based on current market indices.",
          "Diamond Jewelry & Mounted Stones — We purchase fine jewelry pieces and can extract and revalue loose stones separately for maximum return.",
          "Estate Pieces & Collections — Family estates, vintage collections, and inherited jewelry receive professional evaluation and fair market pricing.",
          "Professional Evaluation Process — Certification verification, laser inscription check, independent gemological inspection, and transparent pricing based on Rapaport and IDEX benchmarks.",
          "Secure Payment via Bank Transfer — Once agreement is reached, payment is executed via secure international bank transfer with full documentation.",
        ],
      },
    ],
    ethicsQualitySection: [
      {
        title: "Ethical Sourcing & Quality Control",
        content: "Dalila Diamonds strictly complies with international diamond trade regulations and responsible sourcing frameworks. Our commitment to ethics and quality is non-negotiable.",
        bulletPoints: [
          "Kimberley Process Certification — All diamonds originate from conflict-free sources with full KP compliance and documentation.",
          "Anti-Money Laundering (AML) Compliance — We follow strict AML regulations and Know Your Customer (KYC) procedures for all B2B transactions.",
          "International Trade Compliance — Full adherence to customs regulations, export controls, and sanctions screening.",
          "Responsible Supply Chain Practices — We work exclusively with verified suppliers committed to ethical labor and environmental standards.",
          "Rigorous Quality Inspection — Every diamond undergoes certification authentication, proportion review, fluorescence confirmation, and final visual inspection before dispatch.",
        ],
      },
    ],
    logisticsMarketSections: [
      {
        label: "GLOBAL LOGISTICS & SECURE SHIPPING",
        heading: "Secure International<br />Shipping Solutions",
        description:
          "<p class='mb-4'>We provide fully insured international shipping through specialized diamond logistics partners with proven security protocols.</p><p class='mb-4'>Our logistics services include:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Tamper-proof secure packaging</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Full insurance coverage at declared value</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Customs documentation and duty calculation</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Express global delivery (24-72 hours)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Real-time tracking and communication</span></li></ul><p>Our logistics solutions protect high-value assets throughout international transportation, ensuring secure delivery to your location worldwide.</p>",
        imageSrc: "/b2b/flight.jpg",
        imageAlt: "Global shipping",
        imagePosition: "right",
      },
      {
        label: "MARKET EXPERTISE & PRICING STRATEGY",
        heading: "Competitive Pricing<br />Strategy & Market Analysis",
        description:
          "<p class='mb-4'>The diamond market is dynamic and influenced by global supply, demand, mining output, and pricing indices such as IDEX and Rapaport.</p><p class='mb-4'>We continuously monitor:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Wholesale market fluctuations and pricing trends</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Supply chain availability and inventory levels</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Global demand trends across regions</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Currency movements (USD/EUR/INR)</span></li></ul><p>This market intelligence allows us to provide accurate, competitive B2B pricing aligned with current market conditions, helping you maintain profitability and competitiveness.</p>",
        imageSrc: "/b2b/diamondsourceforyou.jpg",
        imageAlt: "Market pricing strategy",
        imagePosition: "left",
      },
    ],
    whyChooseUsSection: [
      {
        title: "Why Global Buyers Choose Dalila Diamonds",
        content: "Professional diamond buyers worldwide trust Dalila Diamonds as their strategic sourcing partner for certified natural diamonds. Here's why:",
        bulletPoints: [
          "Located in Antwerp, Belgium — Operating in the heart of the global diamond trade provides unmatched access to inventory, laboratories, and logistics infrastructure.",
          "Strict International Certification Standards — We supply only diamonds certified by GIA, IGI, HRD, and AGS, ensuring transparency and quality consistency.",
          "Transparent Wholesale Pricing Structure — No hidden markups. Our pricing reflects current market conditions with fair margins for sustainable partnership.",
          "50+ Years of Multi-Generational Expertise — Decades of family knowledge in grading, valuation, negotiation, and ethical trade practices.",
          "Long-Term Partnership Model — We focus on building lasting relationships, not one-time transactions. Priority access, flexible terms, and dedicated support.",
          "Secure Global Logistics Network — Fully insured international shipping with specialized carriers, customs support, and real-time tracking.",
          "Ethical & Compliant Trade Practices — Full compliance with Kimberley Process, AML regulations, and responsible sourcing standards.",
          "Comprehensive Service Portfolio — From standard procurement (S2S) to custom sourcing (DS4U) to diamond buyback (SYD), we support every B2B need.",
        ],
      },
    ],
    contactSection: [
      {
        title: "Connect with Dalila Diamonds",
        content: "Ready to establish a reliable diamond sourcing partnership? Contact our team in Antwerp to discuss your specific requirements, pricing, inventory access, and long-term collaboration opportunities.",
        bulletPoints: [
          "Company Name: Dalila Diamonds",
          "Physical Address: Hoveniersstraat 30, Box 105, Suite 326, 2018 Antwerp, Belgium",
          "Primary Phone: +32 3 613 94 74",
          "Mobile/WhatsApp: +32 487 93 93 51",
          "Business Email: business@daliladiamonds.com",
          "Office Hours: Monday–Friday, 9:00 AM – 6:00 PM CET (By appointment for international clients)",
          "Languages: English, Dutch, French, Hindi, Hebrew",
        ],
      },
    ],
  },
  de: {
    trustedSupplierSection: [
      {
        title: "Dalila Diamonds | Zuverlässige B2B-Diamantenbeschaffung aus Antwerpen",
        content: "Dalila Diamonds ist ein führender B2B-Diamantenlieferant mit Sitz in Antwerpen, Belgien — dem historischen und weltweit anerkannten Herzen des internationalen Diamantenhandels.\n\nWir sind spezialisiert auf die Lieferung von zertifizierten natürlichen Diamanten an Juweliere, Hersteller, Großhändler, Luxuseinzelhändler und Investitionskäufer weltweit. Unser Geschäft basiert auf Vertrauen, Transparenz, präziser Beschaffung und langfristigen strategischen Partnerschaften.\n\nJeder von uns gelieferte Diamant repräsentiert nicht nur Brillanz und Seltenheit, sondern auch Zuverlässigkeit und professionelle Integrität, gestützt auf jahrzehntelange Expertise im globalen Diamantenmarkt.",
      },
    ],
    initialSections: [
      {
        label: "ZUSAMMENFASSUNG",
        heading: "Erstklassiger B2B-Diamanten<br />lieferant in Belgien",
        description:
          "<p class='mb-4'>Dalila Diamonds ist ein erstklassiger B2B-Diamantenlieferant mit Sitz in Antwerpen, Belgien — dem historischen und weltweit anerkannten Herzen des internationalen Diamantenhandels.</p><p class='mb-4'>Wir sind spezialisiert auf die Lieferung von zertifizierten natürlichen Diamanten an Juweliere, Hersteller, Großhändler, Luxuseinzelhändler und Investitionskäufer weltweit.</p><p class='mb-4'>Unser Geschäft basiert auf Vertrauen, Transparenz, präziser Beschaffung und langfristigen strategischen Partnerschaften. Jeder von uns gelieferte Diamant repräsentiert nicht nur Brillanz und Seltenheit, sondern auch Zuverlässigkeit und professionelle Integrität.</p><p>Mit jahrzehntelanger familiärer Kompetenz und einem globalen Beschaffungsnetzwerk garantieren wir gleichbleibende Qualität, wettbewerbsfähige Preise und eine sichere internationale Logistik.</p>",
        imageSrc: "/b2b/looseround.webp",
        imageAlt: "Dalila Diamonds Antwerp",
        imagePosition: "right",
      },
      {
        label: "ÜBER DALILA DIAMONDS",
        heading: "Strategischer Sourcing-Partner<br />für professionelle Käufer",
        description:
          "<p class='mb-4'>Dalila Diamonds wurde mit einer klaren Mission gegründet: die Diamantenbeschaffung für professionelle B2B-Käufer zu vereinfachen.</p><p class='mb-4'>Wir wissen, dass in der Diamantenbranche Zuverlässigkeit und Konsistenz entscheidend sind. Produktionspläne, Bestandsplanung und Kundenerwartungen hängen von präziser Graduierung, wettbewerbsfähigen Preisen und sicherer Lieferung ab.</p><p class='mb-4'>Die Tätigkeit in Antwerpen bietet uns direkten Zugang zu einem der weltweit größten Bestände an geschliffenen Diamanten und zu etablierten Diamantenbörsen. Dies ermöglicht uns eine enge Zusammenarbeit mit Herstellern und Primärlieferanten, was zu besseren Preisstrukturen und bevorzugtem Zugriff auf Premium-Waren führt.</p><p>Wir sind kein rein transaktionales Handelsunternehmen — wir sind ein strategischer Beschaffungspartner, der sich für Ihr langfristiges Wachstum einsetzt.</p>",
        imageSrc: "/b2b/business-partnership.jpg",
        imageAlt: "Diamond sourcing solutions",
        imagePosition: "left",
      },
    ],
    familyExpertiseSection: [
      {
        title: "Über 50 Jahre familiäre Kompetenz im Diamantengeschäft",
        content: "Hinter Dalila Diamonds steht ein generationenübergreifendes Erbe von mehr als 50 Jahren in der Diamantenbranche. Dieses Erbe ist nicht nur Geschichte — es ist aktive Expertise, die unseren B2B-Kunden jeden Tag spürbaren Mehrwert bietet.",
        bulletPoints: [
          "Tiefes Wissen in der Diamantengraduierung und -bewertung — Unsere Familie hat Jahrzehnte damit verbracht, die Feinheiten der 4Cs, Zertifizierungsstandards und Marktbewertungen zu meistern. Wir können Qualität sofort einschätzen und faire Preise aushandeln.",
          "Starke weltweite Lieferantenbeziehungen — Beziehungen in der Diamantenbranche aufzubauen dauert Jahre. Unsere familiären Verbindungen in Antwerpen, Mumbai, Tel Aviv und New York bieten bevorzugten Zugang zu Premium-Beständen.",
          "Einblick und Marktpreis-Intelligenz — Wir haben mehrere Marktzyklen erlebt. Diese Erfahrung ermöglicht es uns, Kunden über den richtigen Zeitpunkt, Preistrends und Anlagemöglichkeiten zu beraten.",
          "Hervorragende Verhandlungsfähigkeiten — Jahrzehntelange Beschaffungserfahrung hat unsere Verhandlungsfähigkeiten verfeinert, wodurch wir bessere Konditionen und Preise für unsere Kunden erzielen.",
          "Ethische und verantwortungsvolle Handelsprinzipien — Unser familiärer Ruf basiert auf Integrität. Wir haben von Anfang an ethische Beschaffungsstandards eingehalten, lange bevor dies zu einer Branchenanforderung wurde.",
          "Vertrauen in der Diamanten-Community von Antwerpen — Ein Ruf an der Diamantenbörse von Antwerpen wird über Generationen erworben. Unser Ansehen bietet Zugang zu exklusiven Beständen und günstigen Konditionen, die neueren Marktteilnehmern nicht offenstehen.",
        ],
      },
    ],
    antwerpAuthoritySection: [
      {
        title: "Warum Antwerpen im globalen Diamantenhandel eine Schlüsselrolle spielt",
        content: "Antwerpen ist seit über fünf Jahrhunderten das Herz der weltweiten Diamantenindustrie. Heute ist es nach wie vor das größte Diamantenhandelszentrum der Welt, durch das jährlich rund 84% aller Rohdiamanten und 50% aller geschliffenen Diamanten fließen.\n\nDalila Diamonds arbeitet in diesem historischen Ökosystem und bietet Käufern Zugang zu vertrauenswürdigen Beschaffungsnetzwerken, transparenten Preismechanismen und einer zuverlässigen Lieferkonsistenz, wie sie nur Antwerpen bieten kann.\n\nUnsere Präsenz in Belgien ermöglicht es uns, enge Beziehungen zu Schleifern, Polierern, Laboratorien und internationalen Logistikpartnern zu pflegen — was eine effiziente Beschaffung, Zertifizierung und Lieferung für professionelle Käufer weltweit gewährleistet.\n\nWenn Sie mit einem in Belgien ansässigen Lieferanten zusammenarbeiten, kaufen Sie nicht nur Diamanten — Sie greifen auf Jahrhunderte an Handelsinfrastruktur, Fachwissen und Vertrauen zu.",
      },
    ],
    certificationSections: [
      {
        label: "ZERTIFIZIERTE DIAMANTEN & LABORSTANDARDS",
        heading: "Internationale Labor-<br />Zertifizierungsstandards",
        description:
          "<p class='mb-4'>Wir liefern Diamanten, die von führenden internationalen gemologischen Labors wie GIA, IGI, HRD und AGS zertifiziert wurden.</p><p class='mb-4'>Die Zertifizierung gewährleistet die unabhängige Überprüfung von:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Karatgewicht</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Farbstufe</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Reinheitsstufe</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Schliffqualität</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Proportionen und Symmetrie</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Fluoreszenz-Niveau</span></li></ul><p class='mb-4'>Dies garantiert Transparenz, Konsistenz und Vertrauen in Ihrer gesamten Lieferkette.</p><p>Wir bieten Diamanten an, die sich sowohl für die kommerzielle Herstellung als auch für anspruchsvolle Luxusmärkte eignen, alle mit international anerkannter Zertifizierung.</p>",
        imageSrc: "/b2b/diamant-certificat-GIA.webp",
        imageAlt: "Certified diamonds",
        imagePosition: "left",
      },
      {
        label: "UNSERE DIAMANTENKOLLEKTION",
        heading: "Vollständiges Sortiment<br />an zertifizierten Naturdiamanten",
        description:
          "<p class='mb-4'>Dalila Diamonds liefert geschliffene Naturdiamanten in allen gängigen Schliffformen, darunter runder Brillantschliff, Prinzess-, Kissen-, Smaragd-, Oval-, Tropfen-, Radiant-, Marquise-, Asscher- und Herzschliff.</p><p class='mb-4'>Erhältlich in allen Qualitätsstufen:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Handelsware (Reinheit SI–I, Farbe H–K)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Triple Excellent Schliff-Diamanten</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Diamanten ohne Fluoreszenz</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Erstklassige farblose Steine (D–F)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Diamanten mit hoher Reinheit (IF–VVS)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Große zertifizierte Solitäre (ab 2 Karat)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Diamanten als Wertanlage</span></li></ul><p>Wir liefern auch kalibrierte Melee-Diamanten und präzise abgestimmte Layouts für die Schmuckproduktion.</p>",
        imageSrc: "/b2b/diamond-slp-cover-mobile.webp",
        imageAlt: "Diamond collection",
        imagePosition: "right",
      },
    ],
    processSection: [
      {
        title: "Unser professioneller Diamantenbeschaffungsprozess",
        content: "Wir folgen einem strukturiertem, transparentem Beschaffungsprozess, um Risiken zu minimieren und den Wert für B2B-Einkäufer zu maximieren:",
        bulletPoints: [
          "Bedarfsanalyse — Zuerst ermitteln wir Ihre genauen Anforderungen: Form, Karatgewicht, Farbe, Reinheit, Schliffqualität, gewünschtes Labor und Budget.",
          "Strategische globale Suche — Unser Netzwerk sucht an den Antwerpener Börsen, bei vertrauenswürdigen Herstellern und internationalen Partnern nach passenden Steinen.",
          "Überprüfung der Laborzertifikate — Jeder Diamant wird auf Echtheit geprüft. Wir gleichen Zertifikatsnummern, Laser-Inschriften und Laborergebnisse ab.",
          "Qualitätskontrolle & detaillierte Inspektion — Unsere Gemmologen prüfen Proportionen, Symmetrie, Politur, Fluoreszenz und die optische Gesamtwirkung vor Ort.",
          "Sicherer internationaler Versand — Nach Ihrer Freigabe werden die Diamanten sicher verpackt, voll versichert und per Express-Werttransport inklusive Zollabwicklung geliefert.",
          "Nachbetreuung & Support — Auch nach Erhalt stehen wir Ihnen für Zertifikatsfragen, Dokumentationen und weitere Bestellungen jederzeit zur Verfügung.",
        ],
      },
    ],
    servicesSections: [
      {
        label: "S2S – SECURE TO SOURCE",
        heading: "Strukturierte Diamanten-<br />Beschaffungslösung",
        description:
          "<p class='mb-4'>Secure To Source (S2S) ist unsere B2B-Standardlösung für Juweliere, Großhändler und Hersteller, die eine zuverlässige Beschaffung bei minimalem Risiko suchen.</p><p class='mb-4'>S2S bietet:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Direkten Zugang zu den Antwerpener Diamantenbeständen</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Zertifizierte Steine mit vollständiger Dokumentation</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Wettbewerbsfähige Großhandelspreise</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Lückenlose Qualitätskontrolle und -prüfung</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Versicherten internationalen Werttransport</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Transparente Rechnungsstellung und Exportabwicklung</span></li></ul><p>Dieser Service ist ideal für Unternehmen, die Wert auf Kontinuität, transparente Kalkulationen und eine verlässliche Partnerschaft legen.</p>",
        imageSrc: "/b2b/stos.jpg",
        imageAlt: "Secure sourcing process",
        imagePosition: "left",
      },
      {
        label: "DS4U – DIAMOND SOURCE FOR YOU",
        heading: "Maßgeschneiderte Suche<br />für exklusive Anforderungen",
        description:
          "<p class='mb-4'>Diamond Source For You (DS4U) ist unser exklusiver Suchservice für spezielle, seltene oder besonders hochwertige Diamanten, die eine gezielte weltweite Recherche erfordern.</p><p class='mb-4'>Typische Anfragen unserer Kunden:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Exakte Karatgewichte und Abmessungen</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Sehr seltene Farb- und Reinheitskombinationen</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Perfekt aufeinander abgestimmte Paare (für Ohrringe/Layouts)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Brautschmuck-Kollektionen mit identischer Graduierung</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Exotische Fantasieschliffe und seltene Formen</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Große Solitäre ab 5 Karat als Wertanlage</span></li></ul><p>Unser globales Sourcing-Netzwerk findet, prüft und verhandelt die optimalen Steine für Sie und liefert diese fristgerecht und sicher an Ihr Unternehmen.</p>",
        imageSrc: "/b2b/close-up.jpg",
        imageAlt: "Custom diamond sourcing",
        imagePosition: "right",
      },
    ],
    sellDiamondsSection: [
      {
        title: "SYD — Sell Your Diamonds: Professioneller Rückkauf-Service",
        content: "Sell Your Diamonds (SYD) ist unser professioneller Ankauf- und Rückkauf-Service für B2B-Kunden, Nachlässe, Liquidationen und Bestandsoptimierungen.",
        bulletPoints: [
          "Lose zertifizierte Diamanten (alle Größen) — Wir kaufen Einzelsteine und Lots von 0,30ct bis über 10ct mit GIA-, IGI-, HRD- oder AGS-Zertifikat.",
          "Hochwertige Solitäre & seltene Sammlersteine — Erstklassige Diamanten mit exzellenten Qualitätsmerkmalen, D-E-F Farben oder IF-VVS Reinheiten.",
          "Anlagediamanten & Sachwerte — Wir kaufen Anlage-Diamanten an und bieten Ihnen sofortige Liquidität zu aktuellen Marktpreisen.",
          "Diamantschmuck & gefasste Steine — Wir bewerten und kaufen feine Schmuckstücke an und kalkulieren auf Wunsch den reinen Steinwert separat.",
          "Nachlässe, Erbschaften & Sammlungen — Private Nachlässe und historische Schmucksammlungen werden diskret und marktgerecht bewertet.",
          "Transparente Wertermittlung — Genaue Prüfung der Laborberichte, Laser-Gravuren, Maße und des Zustands auf Basis von Rapaport und IDEX Benchmarks.",
          "Sichere Abwicklung & Auszahlung — Nach Einigung erfolgt die Auszahlung sofort per gesicherter Banküberweisung inklusive aller Verträge.",
        ],
      },
    ],
    ethicsQualitySection: [
      {
        title: "Ethische Beschaffung & Qualitätskontrolle",
        content: "Dalila Diamonds hält sich strikt an internationale Handelsrichtlinien und Standards für eine verantwortungsvolle Beschaffung. Unser Versprechen für Ethik und Qualität gilt ausnahmslos.",
        bulletPoints: [
          "Kimberley-Prozess-Zertifizierung — Alle importierten Diamanten stammen nachweislich aus konfliktfreien Quellen.",
          "Geldwäscheprävention (AML) & KYC — Wir führen für jede B2B-Transaktion die gesetzlich vorgeschriebenen Identitäts- und Herkunftsprüfungen durch.",
          "Zoll- & Außenhandelskonformität — Vollständige Einhaltung aller EU-Zollbestimmungen, Exportvorschriften und Handelsembargos.",
          "Verantwortungsvolle Lieferketten — Wir arbeiten ausschließlich mit Herstellern zusammen, die faire Arbeitsbedingungen und Umweltstandards einhalten.",
          "Mehrstufige Qualitätsprüfung — Jeder Stein wird vor dem Versand gemmologisch auf Abweichungen, Politurfehler und Fluoreszenz hin kontrolliert.",
        ],
      },
    ],
    logisticsMarketSections: [
      {
        label: "GLOBALE LOGISTIK & SICHERER VERSAND",
        heading: "Sichere internationale<br />Logistiklösungen",
        description:
          "<p class='mb-4'>Wir versenden alle Diamanten voll versichert über spezialisierte Sicherheitskuriere mit lückenloser Sendungsverfolgung.</p><p class='mb-4'>Unsere Logistik-Dienstleistungen auf einen Blick:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Versiegelte Sicherheitsverpackungen (tamper-proof)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Vollkaskoversicherung zum deklarierten Warenwert</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Zollabwicklung und Frachtdokumentenerstellung</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Globale Expresszustellung (meist in 24–72 Std.)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Laufende Statusupdates und persönlicher Ansprechpartner</span></li></ul><p>Unsere Logistikpartner sind auf den Transport von hochkarätigen Werten spezialisiert, sodass Ihre Bestellung weltweit sicher ankommt.</p>",
        imageSrc: "/b2b/flight.jpg",
        imageAlt: "Global shipping",
        imagePosition: "right",
      },
      {
        label: "MARKTEXPERTISE & PREISSTRATEGIE",
        heading: "Wettbewerbsfähige Preise<br />durch weltweite Marktanalysen",
        description:
          "<p class='mb-4'>Der Diamantenmarkt ist dynamisch und wird von globalen Minenerträgen, der Nachfrage in den USA/Asien und Preisindizes wie IDEX und Rapaport beeinflusst.</p><p class='mb-4'>Wir analysieren kontinuierlich:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Kursschwankungen und Preisentwicklungen im Großhandel</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Verfügbarkeiten in den Minen und bei den Schleifereien</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Regionale Nachfragetrends (Europa, USA, Asien)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Währungskurse und Wechselwirkungen (USD/EUR/INR)</span></li></ul><p>Durch diese fundierte Marktanalyse können wir unseren B2B-Kunden jederzeit faire Großhandelspreise bieten, die sich am realen Weltmarkt orientieren.</p>",
        imageSrc: "/b2b/diamondsourceforyou.jpg",
        imageAlt: "Market pricing strategy",
        imagePosition: "left",
      },
    ],
    whyChooseUsSection: [
      {
        title: "Warum globale Einkäufer Dalila Diamonds wählen",
        content: "Professionelle Diamanteneinkäufer weltweit vertrauen Dalila Diamonds als ihrem strategischen Sourcing-Partner für zertifizierte natürliche Diamanten. Hier ist der Grund:",
        bulletPoints: [
          "Sitz in Antwerpen, Belgien — Die Tätigkeit im Herzen des weltweiten Diamantenhandels bietet unübertroffenen Zugang zu Beständen, Labors und Logistikinfrastruktur.",
          "Strenge internationale Zertifizierungsstandards — Wir liefern ausschließlich Diamanten mit Zertifikaten von GIA, IGI, HRD und AGS, was Transparenz und Qualitätskonsistenz garantiert.",
          "Transparente Großhandelspreisstruktur — Keine versteckten Aufschläge. Unsere Preise spiegeln die aktuellen Marktbedingungen mit fairen Margen für eine nachhaltige Partnerschaft wider.",
          "Über 50 Jahre familiäre Kompetenz — Jahrzehnte generationenübergreifenden Wissens in Graduierung, Bewertung, Verhandlung und ethischen Handelspraktiken.",
          "Langfristiges Partnerschaftsmodell — Wir konzentrieren uns auf den Aufbau dauerhafter Beziehungen, nicht auf einmalige Transaktionen. Bevorzugter Zugang, flexible Konditionen und engagierter Support.",
          "Sicheres globales Logistiknetzwerk — Voll versicherter internationaler Versand mit spezialisierten Transportunternehmen, zollrechtlicher Unterstützung und Echtzeit-Tracking.",
          "Ethische & gesetzeskonforme Handelspraktiken — Volle Übereinstimmung mit dem Kimberley-Prozess, AML-Vorschriften und Standards für verantwortungsvolle Beschaffung.",
          "Umfassendes Leistungsportfolio — Von der Standardbeschaffung (S2S) über die maßgeschneiderte Beschaffung (DS4U) bis hin zum Rückkauf (SYD) unterstützen wir jeden B2B-Bedarf.",
        ],
      },
    ],
    contactSection: [
      {
        title: "Treten Sie mit Dalila Diamonds in Kontakt",
        content: "Bereit, eine zuverlässige Partnerschaft zur Diamantenbeschaffung aufzubauen? Kontaktieren Sie unser Team in Antwerpen, um Ihre spezifischen Anforderungen, Preisgestaltung, den Zugang zum Inventar und langfristige Kooperationsmöglichkeiten zu besprechen.",
        bulletPoints: [
          "Firmenname: Dalila Diamonds",
          "Adresse: Hoveniersstraat 30, Box 105, Suite 326, 2018 Antwerpen, Belgien",
          "Telefon: +32 3 613 94 74",
          "Mobil/WhatsApp: +32 487 93 93 51",
          "E-Mail: business@daliladiamonds.com",
          "Bürozeiten: Montag–Freitag, 9:00 – 18:00 Uhr MEZ (Für internationale Kunden nach Vereinbarung)",
          "Sprachen: Englisch, Niederländisch, Französisch, Hindi, Hebräisch",
        ],
      },
    ],
  },
  nl: {
    trustedSupplierSection: [
      {
        title: "Dalila Diamonds | Betrouwbare B2B diamantinkoop uit Antwerpen",
        content: "Dalila Diamonds is een toonaangevende B2B-diamantleverancier gevestigd in Antwerpen, België — het historische en wereldwijd erkende hart van de internationale diamanthandel.\n\nWij zijn gespecialiseerd in het leveren van gecertificeerde natuurlijke diamanten aan juweliers, fabrikanten, groothandelaren, luxe retailers en beleggingskopers wereldwijd. Onze onderneming is gebouwd op vertrouwen, transparantie, nauwkeurige inkoop en strategische samenwerkingsverbanden op lange termijn.\n\nElke diamant die wij leveren staat niet alleen voor schittering en zeldzaamheid, maar ook voor betrouwbaarheid en professionele integriteit, ondersteund door decennia aan expertise in de wereldwijde diamantmarkt.",
      },
    ],
    initialSections: [
      {
        label: "EXECUTIVE OVERVIEW",
        heading: "Toonaangevende B2B diamant<br />leverancier in België",
        description:
          "<p class='mb-4'>Dalila Diamonds is een toonaangevende B2B-diamantleverancier gevestigd in Antwerpen, België — het historische en wereldwijd erkende hart van de internationale diamanthandel.</p><p class='mb-4'>Wij zijn gespecialiseerd in het leveren van gecertificeerde natuurlijke diamanten aan juweliers, fabrikanten, groothandelaren, luxe retailers en beleggingskopers wereldwijd.</p><p class='mb-4'>Onze onderneming is gebouwd op vertrouwen, transparantie, nauwkeurige inkoop en strategische samenwerkingsverbanden op lange termijn. Elke diamant die wij leveren vertegenwoordigt niet alleen schittering en zeldzaamheid, maar ook betrouwbaarheid en professionele integriteit.</p><p>Met decennia aan familie-expertise en een wereldwijd inkoopnetwerk zorgen wij voor consistente kwaliteit, concurrerende prijzen en veilige internationale logistiek.</p>",
        imageSrc: "/b2b/looseround.webp",
        imageAlt: "Dalila Diamonds Antwerpen",
        imagePosition: "right",
      },
      {
        label: "OVER DALILA DIAMONDS",
        heading: "Strategische inkooppartner<br />voor professionele kopers",
        description:
          "<p class='mb-4'>Dalila Diamonds is opgericht met een duidelijke missie: het vereenvoudigen van diamantinkoop voor professionele B2B-kopers.</p><p class='mb-4'>Wij begrijpen dat in de diamantindustrie betrouwbaarheid en consistentie cruciaal zijn. Productieschema's, voorraadplanning en klantverwachtingen zijn afhankelijk van nauwkeurige gradatie, concurrerende prijzen en een veilige levering.</p><p class='mb-4'>Werken vanuit Antwerpen geeft ons directe toegang tot een van 's werelds grootste voorraden geslepen diamanten en gevestigde diamantbeurzen. Hierdoor kunnen we nauw samenwerken met fabrikanten en primaire leveranciers, wat zorgt voor betere prijsstructuren en prioritaire toegang tot hoogwaardige goederen.</p><p>Wij zijn geen transactionele handelsonderneming — wij zijn een strategische inkooppartner die zich inzet voor uw groei op lange termijn.</p>",
        imageSrc: "/b2b/business-partnership.jpg",
        imageAlt: "Diamant inkoopoplossingen",
        imagePosition: "left",
      },
    ],
    familyExpertiseSection: [
      {
        title: "Meer dan 50 jaar familiale expertise in de diamantsector",
        content: "Achter Dalila Diamonds staat een erfgoed van meer dan 50 jaar in de diamantindustrie, verspreid over meerdere generaties. Dit erfgoed is niet alleen geschiedenis — het is actieve expertise die elke dag tastbare waarde levert aan onze B2B-klanten.",
        bulletPoints: [
          "Diepgaande kennis van gradatie en waardebepaling — Onze familie heeft decennia besteed aan het beheersen van de nuances van de 4C's, certificeringsnormen en marktprijzen. Wij kunnen kwaliteit direct beoordelen en eerlijke prijzen bedingen.",
          "Sterke wereldwijde leveranciersrelaties — Het opbouwen van relaties in de diamantsector kost jaren. Onze familiale connecties in Antwerpen, Mumbai, Tel Aviv en New York bieden bevoorrechte toegang tot premium voorraden.",
          "Marktinzicht en prijsinformatie — We hebben meerdere marktcycli meegemaakt. Deze ervaring stelt ons in staat klanten te adviseren over timing, prijstrends en investeringsmogelijkheden.",
          "Uitzonderlijke onderhandelingsvaardigheden — Decennia aan inkoopervaring heeft onze onderhandelingsvaardigheden verfijnd, waardoor we betere voorwaarden en prijzen voor onze klanten kunnen realiseren.",
          "Ethische en verantwoorde handelsprincipes — Onze familiale reputatie is gebouwd op integriteit. Wij hebben vanaf het begin ethische inkoopnormen gehandhaafd, lang voordat dit een industriële vereiste werd.",
          "Vertrouwen in de Antwerpse diamantgemeenschap — Een reputatie op de Antwerpse Diamantbeurs wordt over generaties heen verdiend. Onze status biedt toegang tot exclusieve voorraden en gunstige voorwaarden die niet openstaan voor nieuwere marktdeelnemers.",
        ],
      },
    ],
    antwerpAuthoritySection: [
      {
        title: "Waarom Antwerpen essentieel is in de wereldwijde diamanthandel",
        content: "Antwerpen is al meer dan vijf eeuwen het hart van de wereldwijde diamantindustrie. Vandaag de dag bleibt het 's werelds belangrijkste knooppunt voor diamanthandel, waar jaarlijks ongeveer 84% van alle ruwe diamanten en 50% van alle geslepen diamanten passeren.\n\nDalila Diamonds is actief binnen dit historische ecosysteem en biedt kopers toegang tot betrouwbare inkoopnetwerken, transparante prijsmechanismen en een leveringsconsistentie die alleen Antwerpen kan bieden.\n\nOnze aanwezigheid in België stelt ons in staat nauwe relaties te onderhouden met slijpers, polijsters, laboratoria en internationale logistieke partners — wat zorgt for een efficiënte inkoop, certificering en levering voor professionele kopers wereldwijd.\n\nWanneer u samenwerkt met een in België gevestigde leverancier, koopt u niet alleen diamanten — u krijgt toegang tot eeuwen aan handelsinfrastructuur, expertise en vertrouwen.",
      },
    ],
    certificationSections: [
      {
        label: "GECERTIFICEERDE DIAMANTEN & LABNORMEN",
        heading: "Internationale laboratoria<br />certificeringsnormen",
        description:
          "<p class='mb-4'>Wij leveren diamanten die zijn gecertificeerd door toonaangevende internationale gemmologische laboratoria, waaronder GIA, IGI, HRD en AGS.</p><p class='mb-4'>Certificering garandeert onafhankelijke verificatie van:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Karaatgewicht</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Kleurklasse</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Zuiverheidsklasse</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Slijpkwaliteit en verhoudingen</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Polijsting en symmetrie</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Fluorescentieniveaus</span></li></ul><p class='mb-4'>Dit garandeert transparantie, consistentie en vertrouwen in uw gehele toeleveringsketen.</p><p>Wij bieden diamanten aan die geschikt zijn voor zowel commerciële productie als het topsegment van de luxemarkt, allemaal voorzien van internationaal erkende certificaten.</p>",
        imageSrc: "/b2b/diamant-certificat-GIA.webp",
        imageAlt: "Gecertificeerde diamanten",
        imagePosition: "left",
      },
      {
        label: "ONZE DIAMANTENCOLLECTIE",
        heading: "Volledig assortiment van<br />gecertificeerde natuurlijke diamanten",
        description:
          "<p class='mb-4'>Dalila Diamonds levert geslepen natuurlijke diamanten in alle belangrijke vormen, waaronder rond briljant, prinses, kussen, emerald, ovaal, peer, radiant, marquise, asscher en hartvormen.</p><p class='mb-4'>Beschikbaar in alle kwaliteitscategorieën:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Commerciële goederen (SI-I zuiverheid, H-K kleur)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Triple Excellent geslepen diamanten</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Diamanten zonder fluorescentie</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Hoogwaardige kleurloze stenen (D-F)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Hoge zuiverheid diamanten (IF-VVS)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Grote gecertificeerde solitairen (2ct tot 10ct+)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Diamanten van beleggingskwaliteit</span></li></ul><p>We leveren ook gekalibreerde melee parcels en nauwkeurig afgestemde lay-outs voor sieradenproductie.</p>",
        imageSrc: "/b2b/diamond-slp-cover-mobile.webp",
        imageAlt: "Diamantencollectie",
        imagePosition: "right",
      },
    ],
    processSection: [
      {
        title: "Ons professioneel inkoopproces voor diamanten",
        content: "Wij volgen een gestructureerd, transparant inkoopproces om risico's te minimaliseren en waarde te maximaliseren voor B2B-kopers:",
        bulletPoints: [
          "Analyse van de vereisten — We beginnen met het begrijpen van uw exacte specificaties: vorm, karaatbereik, kleur, zuiverheid, slijpkwaliteit, certificaatvoorkeur en budgetparameters.",
          "Strategische wereldwijde inkoop — Ons netwerk wordt geactiveerd op de Antwerpse beurzen, bij vertrouwde fabrikanten en internationale leveranciers om diamanten te vinden die aan uw criteria voldoen.",
          "Verificatie van laboratoriumcertificaten — Elke diamant ondergaat een echtheidscontrole. We verifiëren rapportnummers, lasergravures en consistentie in gradatie.",
          "Kwaliteitsinspectie & beoordeling — Onze gemmologen voeren onafhankelijke inspecties uit op verhoudingen, symmetrie, polijstwerk, fluorescentie en visuele aantrekkingskracht om de kwaliteitsnormen te waarborgen.",
          "Veilig internationaal transport — Na goedkeuring worden de diamanten verpakt, verzekerd en verzonden via gespecialiseerde logistieke partners met volledige tracking en douane-ondersteuning.",
          "Ondersteuning na levering — Wij bieden voortdurende ondersteuning voor eventuele verificatie, documentatie of toekomstige inkoopbehoeften.",
        ],
      },
    ],
    servicesSections: [
      {
        label: "S2S – SECURE TO SOURCE",
        heading: "Gestructureerde inkoopoplossing<br />voor diamanten",
        description:
          "<p class='mb-4'>Secure To Source (S2S) is onze kernoplossing voor B2B-inkoop, ontworpen voor juweliers, groothandelaren en fabrikanten die op zoek zijn naar betrouwbaarheid en een verminderd inkooprisico.</p><p class='mb-4'>S2S biedt:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Directe toegang to Antwerpse voorraden</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Gecertificeerde stenen met volledige documentatie</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Concurrerende groothandelsprijzen</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Volledige verificatie van kwaliteitscontrole</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Verzekerde internationale logistiek</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Transparante documentatie en facturering</span></li></ul><p>Deze dienst is ideaal voor bedrijven die behoefte hebben aan een constante levering, voorspelbare prijzen en stabiliteit in de samenwerking op lange termijn.</p>",
        imageSrc: "/b2b/stos.jpg",
        imageAlt: "Veilig inkoopproces",
        imagePosition: "left",
      },
      {
        label: "DS4U – DIAMOND SOURCE FOR YOU",
        heading: "Inkoop op maat voor<br />specifieke of zeldzame wensen",
        description:
          "<p class='mb-4'>Diamond Source For You (DS4U) is ons volledig gepersonaliseerde inkoopprogramma voor specifieke, zeldzame of hoogwaardige diamanten die een gespecialiseerde zoektocht en aankoop vereisen.</p><p class='mb-4'>Klanten vragen om:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Exacte karaatbereiken en gewichtspecificaties</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Specifieke combinaties van kleur en zuiverheid</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Bij elkaar passende paren voor oorbellen en lay-outs</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Bruidscollecties met consistente gradatie</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Zeldzame fantasievormen en slijpvormen</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Hoogwaardige stenen van beleggingskwaliteit (5ct+)</span></li></ul><p>Ons wereldwijde inkoopnetwerk wordt geactiveerd om stenen te lokaliseren, te verifiëren, te onderhandelen en veilig te leveren die aan uw precieze criteria voldoen binnen de overeengekomen termijnen.</p>",
        imageSrc: "/b2b/close-up.jpg",
        imageAlt: "Diamantinkoop op maat",
        imagePosition: "right",
      },
    ],
    sellDiamondsSection: [
      {
        title: "SYD — Sell Your Diamonds: Professionele inkoop- en terugkoopdienst",
        content: "Sell Your Diamonds (SYD) is onze professionele aankoop- en terugkoopdienst voor B2B-verkopers, nalatenschappen, liquidatiescenario's en voorraadoptimalisatie.",
        bulletPoints: [
          "Losse gecertificeerde diamanten (alle maten) — Wij kopen individuele stenen en partijen aan van 0.30ct tot 10ct+, met een geldig GIA-, IGI-, HRD- of AGS-certificaat.",
          "Hoogwaardige solitairen & zeldzame stenen — Uitzonderlijke stenen met beleggingskenmerken, zeldzame kleurgraden (D-E-F) of superieure zuiverheid (IF-VVS) krijgen een exclusieve waardebepaling.",
          "Diamanten van beleggingskwaliteit — Wij kopen actief diamanten aan die voor beleggingsdoeleinden worden gehouden, en bieden liquiditeit en transparante prijzen op basis van actuele marktindices.",
          "Diamanten sieraden & gemonteerde stenen — Wij kopen fijne sieraden aan en kunnen losse stenen apart extraheren en herwaarderen voor een maximaal rendement.",
          "Nalatenschappen & collecties — Familielandgoederen, vintage collecties en geërfde sieraden krijgen een professionele evaluatie en marktconforme prijsstelling.",
          "Professioneel evaluatieproces — Certificaatverificatie, controle van lasergravures, onafhentelijke gemmologische inspectie en transparante prijsstelling gebaseerd op Rapaport en IDEX benchmarks.",
          "Veilige betaling via bankoverschrijving — Zodra er overeenstemming is bereikt, wordt de betaling uitgevoerd via een veilige bankoverschrijving met volledige documentatie.",
        ],
      },
    ],
    ethicsQualitySection: [
      {
        title: "Ethische inkoop & kwaliteitscontrole",
        content: "Dalila Diamonds voldoet strikt aan de internationale regelgeving voor de diamanthandel en richtlijnen voor verantwoorde inkoop. Onze toewijding aan ethiek en kwaliteit is onvoorwaardelijk.",
        bulletPoints: [
          "Kimberley-proces certificering — Alle diamanten zijn afkomstig van conflictvrije bronnen met volledige naleving en documentatie van het KP.",
          "Naleving van anti-witwaswetgeving (AML) — Wij volgen strikte AML-voorschriften en Know Your Customer (KYC) procedures voor alle B2B-transacties.",
          "Naleving van internationale handel — Volledige naleving van douanevoorschriften, exportcontroles en sanctiescreening.",
          "Verantwoorde toeleveringsketen — Wij werken uitsluitend samen met geverifieerde leveranciers die zich inzetten voor ethische arbeid en milieunormen.",
          "Strikte kwaliteitsinspectie — Elke diamant ondergaat verificatie van certificaten, beoordeling van verhoudingen, bevestiging van fluorescentie en een finale visuele inspectie voor verzending.",
        ],
      },
    ],
    logisticsMarketSections: [
      {
        label: "WERELDWIJDE LOGISTIEK & VEILIG TRANSPORT",
        heading: "Veilige internationale<br />transportoplossingen",
        description:
          "<p class='mb-4'>Wij bieden volledig verzekerde internationale verzending via gespecialiseerde transportpartners voor diamanten met beproefde beveiligingsprotocollen.</p><p class='mb-4'>Onze logistieke diensten omvatten:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Verzegelde, veilige verpakking</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Volledige verzerkeringsdekking tegen aangegeven waarde</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Douanedocumentatie en berekening van invoerrechten</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Snelle wereldwijde levering (24-72 uur)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Realtime tracking en communicatie</span></li></ul><p>Onze logistieke oplossingen beschermen hoogwaardige goederen tijdens internationaal transport en garanderen een veilige levering aan uw bedrijf wereldwijd.</p>",
        imageSrc: "/b2b/flight.jpg",
        imageAlt: "Wereldwijde verzending",
        imagePosition: "right",
      },
      {
        label: "MARKTEXPERTISE & PRIJSSTRATEGIE",
        heading: "Concurrerende prijsstrategie<br />& marktanalyse",
        description:
          "<p class='mb-4'>De diamantmarkt is dynamisch en wordt beïnvloed door wereldwijde vraag, aanbod, mijnproductie en prijsindices zoals IDEX en Rapaport.</p><p class='mb-4'>Wij monitoren continu:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Fluctuaties in de groothandelsmarkt en prijstrends</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Beschikbaarheid in de toeleveringsketen en voorraadniveaus</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Wereldwijde vraagtrends in verschillende regio's</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Valutabewegingen (USD/EUR/INR)</span></li></ul><p>Deze marktgegevens stellen ons in staat om nauwkeurige, concurrerende B2B-prijzen te bieden die aansluiten bij de huidige marktomstandigheden, zodat u uw winstgevendheid en concurrentiepositie kunt behouden.</p>",
        imageSrc: "/b2b/diamondsourceforyou.jpg",
        imageAlt: "Marktprijsstrategie",
        imagePosition: "left",
      },
    ],
    whyChooseUsSection: [
      {
        title: "Waarom wereldwijde kopers kiezen voor Dalila Diamonds",
        content: "Professionele diamantkopers over de hele wereld vertrouwen op Dalila Diamonds als hun strategische inkooppartner voor gecertificeerde natuurlijke diamanten. Dit is waarom:",
        bulletPoints: [
          "Gevestigd in Antwerpen, België — Actief zijn in het hart van de wereldwijde diamanthandel biedt ongeëvenaarde toegang tot voorraden, laboratoria en logistieke infrastructuur.",
          "Strikte internationale certificeringsnormen — Wij leveren uitsluitend diamanten gecertificeerd door GIA, IGI, HRD en AGS, wat transparantie en kwaliteitsconsistentie garandeert.",
          "Transparante groothandelsprijsstructuur — Geen verborgen toeslagen. Onze prijzen weerspiegelen de huidige marktomstandigheden met eerlijke marges voor een duurzame relatie.",
          "Meer dan 50 jaar expertise verspreid over generaties — Decennia aan familiekennis op het gebied van gradatie, waardebepaling, onderhandeling en ethische handelspraktiken.",
          "Samenwerkingsmodel op lange termijn — Wij richten ons op het opbouwen van duurzame relaties, niet op eenmalige transacties. Bevoorrechte toegang, flexibele voorwaarden en toegewijde ondersteuning.",
          "Veilig wereldwijd logistiek netwerk — Volledig verzekerd internationaal transport met gespecialiseerde vervoerders, douane-ondersteuning en realtime tracking.",
          "Ethische & conforme handelspraktijken — Volledige naleving van het Kimberley-proces, AML-voorschriften en normen voor verantwoorde inkoop.",
          "Uitgebreid dienstenportfolio — Van standaard inkoop (S2S) tot inkoop op maat (DS4U) en terugkoop van diamanten (SYD), wij ondersteunen elke B2B-behoefte.",
        ],
      },
    ],
    contactSection: [
      {
        title: "Neem contact op met Dalila Diamonds",
        content: "Klaar om een betrouwbare partner op te bouwen voor diamantinkoop? Neem contact op met ons team in Antwerpen om uw specifieke wensen, prijzen, toegang tot de voorraad en mogelijkheden voor langdurige samenwerking te bespreken.",
        bulletPoints: [
          "Bedrijfsnaam: Dalila Diamonds",
          "Adres: Hoveniersstraat 30, Bus 105, Suite 326, 2018 Antwerpen, België",
          "Telefoon: +32 3 613 94 74",
          "Mobiel/WhatsApp: +32 487 93 93 51",
          "E-mail: business@daliladiamonds.com",
          "Kantooruren: Maandag-Vrijdag, 9:00 - 18:00 uur CET (Op afspraak voor internationale klanten)",
          "Talen: Engels, Nederlands, Frans, Hindi, Hebreeuws",
        ],
      },
    ],
  },
  fr: {
    trustedSupplierSection: [
      {
        title: "Dalila Diamonds | Approvisionnement de confiance en diamants B2B d'Anvers",
        content: "Dalila Diamonds est un fournisseur de diamants B2B de premier plan basé à Anvers, en Belgique — le cœur historique et mondialement reconnu du commerce international de diamants.\n\nNous nous spécialisons dans la fourniture de diamants naturels certifiés aux bijoutiers, fabricants, grossistes, détaillants de luxe et acheteurs d'investissement du monde entier. Notre activité repose sur la confiance, la transparence, la précision de l'approvisionnement et les partenariats stratégiques à long terme.\n\nChaque diamant que nous livrons représente non seulement la brillance et la rareté, mais aussi la fiabilité et l'intégrité professionnelle, appuyées par des décennies d'expertise sur le marché mondial du diamant.",
      },
    ],
    initialSections: [
      {
        label: "APERÇU EXÉCUTIF",
        heading: "Fournisseur de Diamants B2B<br />Premium en Belgique",
        description:
          "<p class='mb-4'>Dalila Diamonds est un fournisseur de diamants B2B haut de gamme basé à Anvers, en Belgique — le cœur historique et mondialement reconnu du commerce international de diamants.</p><p class='mb-4'>Nous nous spécialisons dans la fourniture de diamants naturels certifiés aux bijoutiers, fabricants, grossistes, détaillants de luxe et acheteurs d'investissement du monde entier.</p><p class='mb-4'>Notre activité repose sur la confiance, la transparence, la précision de l'approvisionnement et les partenariats stratégiques à long terme. Chaque diamant que nous livrons représente non seulement la brillance et la rareté, mais aussi la fiabilité et l'intégrité professionnelle.</p><p>Avec des décennies d'expertise familiale et un réseau d'approvisionnement mondial, nous garantissons une qualité constante, des prix compétitifs et une logistique internationale sécurisée.</p>",
        imageSrc: "/b2b/looseround.webp",
        imageAlt: "Dalila Diamonds Anvers",
        imagePosition: "right",
      },
      {
        label: "À PROPOS DE DALILA DIAMONDS",
        heading: "Partenaire d'Approvisionnement Strategique<br />pour les Acheteurs Professionnels",
        description:
          "<p class='mb-4'>Dalila Diamonds a été fondée avec une mission claire : simplifier l'approvisionnement en diamants pour les acheteurs B2B professionnels.</p><p class='mb-4'>Nous savons que dans l'industrie du diamant, la fiabilité et la cohérence sont essentielles. Les calendriers de production, la planification des stocks et les attentes des clients dépendent d'une classification rigoureuse, de tarifs compétitifs et d'un approvisionnement sécurisé.</p><p class='mb-4'>Opérer depuis Anvers nous donne un accès direct à l'un des plus grands stocks de diamants polis au monde et aux bourses de diamants établies. Cela nous permet de collaborer étroitement avec les fabricants et les fournisseurs principaux, garantissant de meilleures structures tarifaires et un accès prioritaire aux articles haut de gamme.</p><p>Nous ne sommes pas une société de négoce transactionnelle — nous sommes un partenaire d'approvisionnement stratégique engagé à soutenir votre croissance à long terme.</p>",
        imageSrc: "/b2b/business-partnership.jpg",
        imageAlt: "Solutions d'approvisionnement en diamants",
        imagePosition: "left",
      },
    ],
    familyExpertiseSection: [
      {
        title: "Plus de 50 ans d'expertise familiale dans l'industrie du diamant",
        content: "Derrière Dalila Diamonds se cache un héritage multigénérationnel de plus de 50 ans dans l'industrie du diamant. Cet héritage n'est pas seulement de l'histoire — c'est une expertise active qui apporte une valeur tangible à nos clients B2B au quotidien.",
        bulletPoints: [
          "Connaissance approfondie de la classification et de l'évaluation — Notre famille a passé des décennies à maîtriser les nuances des 4C, les normes de certification et l'évaluation du marché. Nous pouvons évaluer la qualité instantanément et négocier des prix équitables.",
          "Relations solides avec des fournisseurs mondiaux — Établir des relations dans l'industrie du diamant prend des années. Nos connexions familiales à Anvers, Mumbai, Tel Aviv et New York offrent un accès privilégié aux stocks premium.",
          "Vision du marché et intelligence des prix — Nous avons traversé plusieurs cycles de marché. Cette expérience nous permet de conseiller nos clients sur le calendrier, les tendances de prix et les opportunités d'investissement.",
          "Capacités de négociation exceptionnelles — Des décennies d'expérience d'approvisionnement ont affiné nos compétences de négociation, nous aidant à obtenir de meilleures conditions et tarifs pour nos clients.",
          "Principes de commerce éthiques et responsables — Notre réputation familiale est bâtie sur l'intégrité. Nous maintenons des normes d'approvisionnement éthiques depuis le début, bien avant que cela ne devienne une exigence du secteur.",
          "Confiance de la communauté diamantaire d'Anvers — Une réputation à la Bourse du Diamant d'Anvers s'acquiert sur des générations. Notre statut offre un accès à des stocks exclusifs et à des conditions favorables inaccessibles aux nouveaux arrivants.",
        ],
      },
    ],
    antwerpAuthoritySection: [
      {
        title: "Pourquoi Anvers joue un rôle clé dans le commerce mondial du diamant",
        content: "Anvers est le cœur de l'industrie mondiale du diamant depuis plus de cinq siècles. Aujourd'hui, elle reste la plaque tournante principale du commerce de diamants, avec environ 84 % de tous les diamants bruts et 50 % de tous les diamants polis transitant par la ville chaque année.\n\nDalila Diamonds opère au sein de cet écosystème historique, offrant aux acheteurs un accès à des réseaux d'approvisionnement fiables, des mécanismes de tarification transparents et une régularité d'approvisionnement que seule Anvers peut offrir.\n\nNotre présence en Belgique nous permet de maintenir des relations étroites avec les tailleurs, les polisseurs, les laboratoires et les partenaires logistiques internationaux — assurant un approvisionnement, une certification et une livraison efficaces pour les acheteurs professionnels du monde entier.\n\nEn vous associant à un fournisseur basé en Belgique, vous n'achetez pas seulement des diamants — vous accédez à des siècles d'infrastructures commerciales, d'expertise et de confiance.",
      },
    ],
    certificationSections: [
      {
        label: "DIAMANTS CERTIFIÉS & NORMES DE LABORATOIRE",
        heading: "Normes internationales de<br />certification de laboratoire",
        description:
          "<p class='mb-4'>Nous fournissons des diamants certifiés par les plus grands laboratoires de gemmologie internationaux, notamment le GIA, l'IGI, le HRD et l'AGS.</p><p class='mb-4'>La certification garantit la vérification indépendante de :</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Le poids en carats</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Le degré de couleur</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Le degré de pureté</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>La qualité de la taille et les proportions</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Le poli et la symétrie</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Les niveaux de fluorescence</span></li></ul><p class='mb-4'>Cela garantit la transparence, la cohérence et la confiance tout au long de votre chaîne d'approvisionnement.</p><p>Nous proposons des diamants adaptés aussi bien à la fabrication commerciale qu'aux marchés du luxe haut de gamme, tous dotés de rapports d'évaluation internationalement reconnus.</p>",
        imageSrc: "/b2b/diamant-certificat-GIA.webp",
        imageAlt: "Diamants certifiés",
        imagePosition: "left",
      },
      {
        label: "NOTRE COLLECTION DE DIAMANTS",
        heading: "Gamme complète de diamants<br />naturels certifiés",
        description:
          "<p class='mb-4'>Dalila Diamonds fournit des diamants naturels polis de toutes les formes principales, notamment brillant rond, princesse, coussin, émeraude, ovale, poire, radiant, marquise, asscher et cœur.</p><p class='mb-4'>Disponible dans tous les spectres de qualité :</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Articles commerciaux (pureté SI–I, couleur H–K)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Diamants de taille Triple Excellent</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Diamants sans fluorescence</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Pierres incolores de qualité supérieure (D–F)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Diamants de haute pureté (IF–VVS)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Grands solitaires certifiés (de 2ct à 10ct+)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Diamants de qualité investissement</span></li></ul><p>Nous fournissons également des lots de mêlée calibrés et des assortiments assortis avec précision pour la production de bijoux.</p>",
        imageSrc: "/b2b/diamond-slp-cover-mobile.webp",
        imageAlt: "Collection de diamants",
        imagePosition: "right",
      },
    ],
    processSection: [
      {
        title: "Notre processus professionnel d'approvisionnement en diamants",
        content: "Nous suivons un processus d'approvisionnement structuré et transparent conçu pour minimiser les risques et maximiser la valeur pour les acheteurs B2B :",
        bulletPoints: [
          "Analyse des besoins — Nous commençons par comprendre vos spécifications exactes : forme, gamme de carats, couleur, pureté, qualité de taille, préférence de laboratoire et budget.",
          "Approvisionnement stratégique mondial — Notre réseau s'active sur les bourses d'Anvers, auprès de fabricants de confiance et de partenaires internationaux pour localiser les diamants correspondants.",
          "Vérification des certificats de laboratoire — Chaque diamant fait l'objet d'une authentification. Nous vérifions les numéros de rapport, les inscriptions laser et la cohérence de la classification.",
          "Inspection de la qualité — Nos gemmologues inspectent personnellement les proportions, la symétrie, le poli, la fluorescence et le rendu visuel global avant expédition.",
          "Expédition sécurisée — Une fois approuvés, les diamants sont emballés, assurés et expédiés par des transporteurs de valeurs express spécialisés, avec support douanier complet.",
          "Support après livraison — Nous restons disponibles pour tout besoin d'explication de certificat, de documentation ou de futures recherches.",
        ],
      },
    ],
    servicesSections: [
      {
        label: "S2S – SECURE TO SOURCE",
        heading: "Solution structurée<br />d'approvisionnement en diamants",
        description:
          "<p class='mb-4'>Secure To Source (S2S) est notre solution principale d'approvisionnement B2B conçue pour les bijoutiers, les grossistes et les fabricants qui recherchent la fiabilité et une réduction des risques.</p><p class='mb-4'>S2S offre :</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Accès direct aux inventaires d'Anvers</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Diamants certifiés avec documentation complète</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Tarifs de gros compétitifs</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Vérification complète du contrôle qualité</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Logistique internationale assurée</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Documentation et facturation transparentes</span></li></ul><p>Ce service est idéal pour les entreprises ayant besoin d'un approvisionnement régulier, de tarifs prévisibles et de stabilité relationnelle à long terme.</p>",
        imageSrc: "/b2b/stos.jpg",
        imageAlt: "Processus d'approvisionnement sécurisé",
        imagePosition: "left",
      },
      {
        label: "DS4U – DIAMOND SOURCE FOR YOU",
        heading: "Recherche sur mesure pour<br />des demandes spécifiques",
        description:
          "<p class='mb-4'>Diamond Source For You (DS4U) est notre programme d'approvisionnement entièrement personnalisé pour les demandes de diamants spécifiques, rares ou de grande valeur nécessitant des recherches ciblées.</p><p class='mb-4'>Nos clients demandent :</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Dimensions et carats précis</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Combinaisons rares de couleur et de pureté</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Paires assorties pour boucles d'oreilles ou parures</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Collections de mariage avec gradation homogène</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Formes fantaisie rares et tailles particulières</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Pierres d'investissement de grande valeur (plus de 5ct)</span></li></ul><p>Notre réseau d'approvisionnement s'active pour localiser, vérifier, négocier et livrer en toute sécurité les pierres correspondant à vos critères dans les délais convenus.</p>",
        imageSrc: "/b2b/close-up.jpg",
        imageAlt: "Recherche de diamants sur mesure",
        imagePosition: "right",
      },
    ],
    sellDiamondsSection: [
      {
        title: "SYD — Sell Your Diamonds : Service professionnel de rachat",
        content: "Sell Your Diamonds (SYD) est notre service professionnel d'achat et de rachat de diamants pour les vendeurs B2B, les successions, les situations de liquidation et l'optimisation des stocks.",
        bulletPoints: [
          "Diamants certifiés non montés (toutes tailles) — Nous achetons des stons individuels et des lots de 0,30 ct à plus de 10 ct, avec certificat GIA, IGI, HRD ou AGS.",
          "Solitaires de grande valeur & pierres rares — Pierres d'exception avec des critères d'investissement, des couleurs rares (D-E-F) ou une pureté supérieure (IF-VVS).",
          "Diamants d'investissement — Nous achetons activement des diamants de placement, offrant de la liquidité et des prix transparents basés sur les indices actuels.",
          "Bijoux en diamant & pierres montées — Nous achetons des bijoux de valeur et pouvons estimer séparément la valeur de la pierre et du métal.",
          "Successions, héritages & collections — Les bijoux de famille et les collections anciennes font l'objet d'une évaluation discrète et conforme au marché.",
          "Processus d'estimation transparent — Vérification du certificat, contrôle de l'inscription laser, inspection gemmologique et offre basée sur les cours Rapaport et IDEX.",
          "Paiement sécurisé par virement — Après accord, la transaction est exécutée par virement bancaire sécurisé sous 24 heures avec facture.",
        ],
      },
    ],
    ethicsQualitySection: [
      {
        title: "Approvisionnement éthique & contrôle qualité",
        content: "Dalila Diamonds respecte scrupuleusement la réglementation internationale du commerce des diamants et les normes de sourcing responsable. Notre engagement envers l'éthique est absolu.",
        bulletPoints: [
          "Certification du Processus de Kimberley — Tous nos diamants proviennent de sources sans conflit avec document de conformité.",
          "Lutte contre le blanchiment d'argent (AML) & KYC — Nous effectuons les contrôles d'identité réglementaires pour chaque transaction professionnelle.",
          "Conformité douanière internationale — Respect rigoureux des formalités d'exportation de l'UE et vérification des embargos.",
          "Chaîne d'approvisionnement responsable — Nous collaborons exclusivement avec des partenaires adhérant à des critères sociaux et écologiques stricts.",
          "Contrôle qualité rigoureux — Chaque diamant est vérifié gemmologiquement pour éliminer tout défaut de taille, de poli ou de fluorescence.",
        ],
      },
    ],
    logisticsMarketSections: [
      {
        label: "LOGISTIQUE GLOBALE & LIVRAISON SÉCURISÉE",
        heading: "Solutions sécurisées de<br />livraison internationale",
        description:
          "<p class='mb-4'>Nous livrons tous nos diamants avec une assurance totale via des transporteurs de valeurs spécialisés dotés de protocoles de haute sécurité.</p><p class='mb-4'>Nos services logistiques comprennent :</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Emballages scellés de sécurité (inviolables)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Assurance tous risques à hauteur de la valeur déclarée</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Formalités douanières et documents de transport</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Livraison express mondiale (en 24-72h)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Suivi en temps réel et interlocuteur dédié</span></li></ul><p>Nos partenaires sont experts du transport de marchandises de grande valeur, garantissant une livraison sans faille de votre commande.</p>",
        imageSrc: "/b2b/flight.jpg",
        imageAlt: "Livraison internationale",
        imagePosition: "right",
      },
      {
        label: "EXPERTISE DU MARCHÉ & PRIX COMPÉTITIFS",
        heading: "Stratégie de prix compétitifs<br />basée sur le marché mondial",
        description:
          "<p class='mb-4'>Le marché du diamant est changeant, influencé par la production des mines, la demande en Asie/USA et des indices de prix comme l'IDEX et le Rapaport.</p><p class='mb-4'>Nous suivons en permanence :</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Les fluctuations du marché de gros et les tendances des cours</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Les volumes de production des mines et ateliers</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>La demande régionale (Europe, Amérique, Asie)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>L'évolution des taux de change (USD/EUR/INR)</span></li></ul><p>Grâce à cette étude de marché continue, nous pouvons proposer à nos clients B2B des tarifs de gros justes et directement alignés sur la réalité du marché.</p>",
        imageSrc: "/b2b/diamondsourceforyou.jpg",
        imageAlt: "Stratégie de prix",
        imagePosition: "left",
      },
    ],
    whyChooseUsSection: [
      {
        title: "Pourquoi les acheteurs mondiaux choisissent Dalila Diamonds",
        content: "Les acheteurs professionnels de diamants du monde entier font confiance à Dalila Diamonds comme partenaire d'approvisionnement stratégique pour les diamants naturels certifiés. Voici pourquoi :",
        bulletPoints: [
          "Situé à Anvers, Belgique — Opérer au cœur du marché mondial du diamant offre un accès sans égal aux stocks, laboratoires et infrastructures logistiques.",
          "Normes de certification internationales strictes — Nous fournissons exclusivement des diamants avec certificats GIA, IGI, HRD et AGS, assurant transparence et régularité de qualité.",
          "Structure de prix de gros transparente — Aucun frais masqué. Nos prix reflètent les cours du marché avec des marges justes pour un partenariat durable.",
          "Plus de 50 ans d'expertise multigénérationnelle — Des décennies de savoir familial en classement, estimation, négociation et pratiques de commerce éthiques.",
          "Modèle de partenariat durable — Nous privilégions les relations à long terme plutôt que les ventes uniques. Accès prioritaire, conditions souples et support dédié.",
          "Logistique sécurisée globale — Expéditions assurées avec des transporteurs spécialisés de premier plan, aide au dédouanement et suivi régulier.",
          "Niveau de conformité élevé — Respect rigoureux du Processus de Kimberley, des lois antiblanchiment (AML) et des chartes éthiques.",
          "Offre de services globale — De l'achat régulier (S2S) à la recherche sur mesure (DS4U) et au rachat (SYD), nous couvrons tous les besoins B2B.",
        ],
      },
    ],
    contactSection: [
      {
        title: "Contactez Dalila Diamonds",
        content: "Prêt à construire un partenariat fiable pour votre approvisionnement en diamants ? Contactez nos équipes à Anvers pour étudier vos besoins, obtenir des accès à notre inventaire et échanger sur nos solutions de collaboration.",
        bulletPoints: [
          "Nom de la société : Dalila Diamonds",
          "Adresse physique : Hoveniersstraat 30, Boîte 105, Suite 326, 2018 Anvers, Belgique",
          "Téléphone principal : +32 3 613 94 74",
          "Mobile/WhatsApp : +32 487 93 93 51",
          "E-mail professionnel : business@daliladiamonds.com",
          "Heures d'ouverture : Lundi-Vendredi, 9h00 - 18h00 CET (Sur rendez-vous pour les clients hors UE)",
          "Langues parlées : Anglais, Néerlandais, Français, Hindi, Hébreu",
        ],
      },
    ],
  },
  es: {
    trustedSupplierSection: [
      {
        title: "Dalila Diamonds | Suministro de confianza de diamantes B2B de Amberes",
        content: "Dalila Diamonds es un proveedor líder de diamantes B2B con sede en Amberes, Bélgica — el corazón histórico y mundialmente reconocido del comercio internacional de diamantes.\n\nNos especializamos en el suministro de diamantes naturales certificados a joyeros, fabricantes, mayoristas, minoristas de lujo y compradores de inversión en todo el mundo. Nuestro negocio se basa en la confianza, la transparencia, el abastecimiento de precisión y las asociaciones estratégicas a largo plazo.\n\nCada diamante que entregamos representa no solo brillo y rareza, sino también confiabilidad e integridad profesional, respaldadas por décadas de experiencia en el mercado mundial de diamantes.",
      },
    ],
    initialSections: [
      {
        label: "RESUMEN EJECUTIVO",
        heading: "Proveedor Premium de Diamantes<br />B2B en Bélgica",
        description:
          "<p class='mb-4'>Dalila Diamonds es un proveedor premium de diamantes B2B con sede en Amberes, Bélgica — el corazón histórico y mundialmente reconocido del comercio internacional de diamantes.</p><p class='mb-4'>Nos especializamos en el suministro de diamantes naturales certificados a joyeros, fabricantes, mayoristas, minoristas de lujo y compradores de inversión en todo el mundo.</p><p class='mb-4'>Nuestro negocio se basa en la confianza, la transparencia, el abastecimiento de precisión y las asociaciones estratégicas a largo plazo. Cada diamante que entregamos representa no solo brillo y rareza, sino también confiabilidad e integridad profesional.</p><p>Con décadas de experiencia familiar y una red de suministro global, garantizamos una calidad constante, precios competitivos y logística internacional segura.</p>",
        imageSrc: "/b2b/looseround.webp",
        imageAlt: "Dalila Diamonds Amberes",
        imagePosition: "right",
      },
      {
        label: "ACERCA DE DALILA DIAMONDS",
        heading: "Socio de Abastecimiento Estratégico<br />para Compradores Profesionales",
        description:
          "<p class='mb-4'>Dalila Diamonds fue fundada con una misión clara: simplificar el abastecimiento de diamantes para los compradores B2B profesionales.</p><p class='mb-4'>Sabemos que en la industria del diamante, la confiabilidad y la consistencia son fundamentales. Los calendarios de producción, la planificación de existencias y las expectativas de los clientes dependen de una clasificación rigurosa, tarifas competitivas y un suministro seguro.</p><p class='mb-4'>Operar desde Amberes nos brinda acceso directo a uno de los mayores inventarios de diamantes pulidos del mundo y a las bolsas de diamantes establecidas. Esto nos permite colaborar estrechamente con fabricantes y proveedores principales, garantizando mejores estructuras de precios y acceso prioritario a artículos de primera calidad.</p><p>No somos una empresa comercial de transacciones — somos un socio de abastecimiento estratégico comprometido a respaldar su crecimiento a largo plazo.</p>",
        imageSrc: "/b2b/business-partnership.jpg",
        imageAlt: "Soluciones de abastecimiento de diamantes",
        imagePosition: "left",
      },
    ],
    familyExpertiseSection: [
      {
        title: "Más de 50 años de experiencia familiar en la industria del diamante",
        content: "Detrás de Dalila Diamonds se encuentra un legado multigeneracional de más de 50 años en la industria del diamante. Este patrimonio no es solo historia — es una experiencia activa que aporta un valor tangible a nuestros clientes B2B todos los días.",
        bulletPoints: [
          "Conocimiento profundo de la clasificación y valoración — Nuestra familia ha pasado décadas dominando las sutilezas de las 4C, las normas de certificación y la valoración del mercado. Podemos evaluar la calidad al instante y negociar precios justos.",
          "Conexiones sólidas con proveedores globales — Construir relaciones en la industria del diamante lleva años. Nuestras conexiones familiares en Amberes, Mumbai, Tel Aviv y Nueva York ofrecen un acceso privilegiado a existencias premium.",
          "Perspectiva del mercado e inteligencia de precios — Hemos atravesado múltiples ciclos de mercado. Esta experiencia nos permite asesorar a nuestros clientes sobre el momento óptimo, las tendencias de precios y las oportunidades de inversión.",
          "Capacidades de negociación excepcionales — Décadas de experiencia en el abastecimiento han perfeccionado nuestras habilidades de negociación, ayudándonos a obtener mejores condiciones y tarifas para nuestros clientes.",
          "Principios de comercio éticos y responsables — Nuestra reputación familiar se basa en la integridad. Mantenemos estándares de abastecimiento éticos desde el principio, mucho antes de que se convirtiera en una exigencia del sector.",
          "Confianza de la comunidad de diamantes de Amberes — Una reputación en la Bolsa de Diamantes de Amberes se adquiere a lo largo de generaciones. Nuestro prestigio ofrece acceso a existencias exclusivas y a condiciones favorables inaccesibles para los nuevos participantes.",
        ],
      },
    ],
    antwerpAuthoritySection: [
      {
        title: "Por qué Amberes es clave en el comercio mundial de diamantes",
        content: "Amberes ha sido el corazón de la industria mundial del diamante durante más de cinco siglos. Hoy en día, sigue siendo la principal plataforma de comercio de diamantes, con aproximadamente el 84% de todos los diamantes en bruto y el 50% de todos los diamantes pulidos pasando por la ciudad cada año.\n\nDalila Diamonds opera dentro de este ecosistema histórico, ofreciendo a los compradores acceso a redes de suministro confiables, mecanismos de precios transparentes y una regularidad de suministro que solo Amberes puede ofrecer.\n\nNuestra presencia en Bélgica nos permite mantener relaciones cercanas con talladores, pulidores, laboratorios y socios logísticos internacionales — asegurando un suministro, una certificación y una entrega eficientes para los compradores profesionales de todo el mundo.\n\nAl asociarse con un proveedor con sede en Bélgica, no solo compra diamantes — accede a siglos de infraestructura comercial, experiencia y confianza.",
      },
    ],
    certificationSections: [
      {
        label: "DIAMANTES CERTIFICADOS & NORMAS DE LABORATORIO",
        heading: "Normas internacionales de<br />certificación de laboratorio",
        description:
          "<p class='mb-4'>Suministramos diamantes certificados por los laboratorios gemológicos internacionales líderes, incluidos el GIA, el IGI, el HRD y el AGS.</p><p class='mb-4'>La certificación garantiza la verificación independiente de:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>El peso en quilates</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>El grado de color</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>El grado de pureza</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>La calidad del corte y las proporciones</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>El pulido y la simetría</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Los niveles de fluorescencia</span></li></ul><p class='mb-4'>Esto garantiza la transparencia, la coherencia y la confianza a lo largo de toda su cadena de suministro.</p><p>Ofrecemos diamantes adecuados tanto para la fabricación comercial como para los mercados de lujo de alta gama, todos con informes de evaluación reconocidos internacionalmente.</p>",
        imageSrc: "/b2b/diamant-certificat-GIA.webp",
        imageAlt: "Diamantes certificados",
        imagePosition: "left",
      },
      {
        label: "NUESTRA COLECCIÓN DE DIAMANTES",
        heading: "Gama completa de diamantes<br />naturales certificados",
        description:
          "<p class='mb-4'>Dalila Diamonds suministra diamantes naturales pulidos de todas las formas principales, incluyendo brillante redondo, princesa, cojín, esmeralda, óvalo, pera, radiante, marquesa, asscher y corazón.</p><p class='mb-4'>Disponible en todos los espectros de calidad:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Artículos comerciales (pureza SI–I, color H–K)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Diamantes de corte Triple Excellent</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Diamantes sin fluorescencia</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Piedras incoloras de calidad superior (D–F)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Diamantes de alta pureza (IF–VVS)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Grandes solitarios certificados (de 2ct a 10ct+)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Diamantes de calidad inversión</span></li></ul><p>También suministramos lotes de melee calibrados y conjuntos combinados con precisión para la producción de joyas.</p>",
        imageSrc: "/b2b/diamond-slp-cover-mobile.webp",
        imageAlt: "Colección de diamantes",
        imagePosition: "right",
      },
    ],
    processSection: [
      {
        title: "Nuestro proceso profesional de adquisición de diamantes",
        content: "Seguimos un proceso de adquisición estructurado y transparente diseñado para minimizar los riesgos y maximizar el valor para los compradores B2B:",
        bulletPoints: [
          "Análisis de los requisitos — Comenzamos por entender sus especificaciones exactas: forma, quilates, color, pureza, calidad del corte, preferencia de laboratorio y presupuesto.",
          "Abastecimiento estratégico global — Nuestra red se activa en las bolsas de Amberes, con fabricantes de confianza y socios internacionales para localizar los diamantes adecuados.",
          "Verificación de certificados de laboratorio — Cada diamante es sometido a una autenticación. Verificamos los números de informe, las inscripciones láser y la coherencia del análisis.",
          "Inspección de calidad — Nuestros gemólogos inspeccionan personalmente las proporciones, la simetría, el pulido, la fluorescencia y la apariencia visual general antes del envío.",
          "Envío seguro — Una vez aprobados, los diamantes son empaquetados, asegurados y enviados a través de transportistas de valores express especializados, con soporte aduanero completo.",
          "Soporte post-entrega — Seguimos a su disposición para cualquier necesidad de aclaración de certificados, documentación o futuras búsquedas.",
        ],
      },
    ],
    servicesSections: [
      {
        label: "S2S – SECURE TO SOURCE",
        heading: "Solución estructurada de<br />abastecimiento de diamantes",
        description:
          "<p class='mb-4'>Secure To Source (S2S) es nuestra solución principal de abastecimiento B2B diseñada para joyeros, mayoristas y fabricantes que buscan confiabilidad y una reducción de riesgos.</p><p class='mb-4'>S2S ofrece:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Acceso directo a los inventarios de Amberes</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Diamantes certificados con documentación completa</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Tarifas de mayorista competitivas</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Verificación completa del control de calidad</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Logística internacional asegurada</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Documentación y facturación transparentes</span></li></ul><p>Este servicio es ideal para empresas que necesitan un suministro constante, tarifas previsibles y estabilidad en la relación a largo plazo.</p>",
        imageSrc: "/b2b/stos.jpg",
        imageAlt: "Proceso de abastecimiento seguro",
        imagePosition: "left",
      },
      {
        label: "DS4U – DIAMOND SOURCE FOR YOU",
        heading: "Búsqueda a medida para<br />requisitos específicos",
        description:
          "<p class='mb-4'>Diamond Source For You (DS4U) es nuestro programa de abastecimiento completamente personalizado para demandas de diamantes específicas, raras o de gran valor que requieren búsquedas específicas.</p><p class='mb-4'>Nuestros clientes solicitan:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Dimensiones y quilates precisos</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Combinaciones raras de color y pureza</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Parejas combinadas para pendientes o conjuntos</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Colecciones de bodas con graduación homogénea</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Formas fantasía raras y cortes particulares</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Piedras de inversión de gran valor (más de 5ct)</span></li></ul><p>Nuestra red de abastecimiento se activa para localizar, verificar, negociar y entregar de manera segura las piedras que corresponden a sus criterios en los plazos acordados.</p>",
        imageSrc: "/b2b/close-up.jpg",
        imageAlt: "Búsqueda de diamantes a medida",
        imagePosition: "right",
      },
    ],
    sellDiamondsSection: [
      {
        title: "SYD — Sell Your Diamonds: Servicio profesional de recompra",
        content: "Sell Your Diamonds (SYD) es nuestro servicio profesional de compra y recompra de diamantes para vendedores B2B, herencias, liquidaciones y optimización de existencias.",
        bulletPoints: [
          "Diamantes certificados sueltos (todos los tamaños) — Compramos piedras individuales y lotes de 0.30 ct a más de 10 ct, con certificado GIA, IGI, HRD o AGS.",
          "Solitarios de gran valor y piedras raras — Piedras excepcionales con criterios de inversión, colores raros (D-E-F) o pureza superior (IF-VVS).",
          "Diamantes de inversión — Compramos diamantes de inversión, ofreciendo liquidez y precios transparentes basados en los índices de mercado actuales.",
          "Joyas de diamantes y piedras montadas — Compramos joyas de valor y podemos estimar por separado el valor de la piedra y del metal.",
          "Herencias, legados y colecciones — Las joyas de familia y las colecciones antiguas son valoradas de forma discreta y conforme al mercado.",
          "Proceso de estimación transparente — Verificación del certificado, control de la inscripción láser, inspección gemológica y oferta basada en los cursos Rapaport e IDEX.",
          "Pago seguro por transferencia — Tras el acuerdo, la transacción se ejecuta mediante transferencia bancaria segura en 24 horas con factura.",
        ],
      },
    ],
    ethicsQualitySection: [
      {
        title: "Abastecimiento ético y control de calidad",
        content: "Dalila Diamonds cumple estrictamente con las regulaciones internacionales del comercio de diamantes y las directrices de abastecimiento responsable. Nuestro compromiso con la ética es absoluto.",
        bulletPoints: [
          "Certificación del Proceso de Kimberley — Todos nuestros diamantes provienen de fuentes libres de conflicto con documentación de conformidad.",
          "Cumplimiento contra el lavado de dinero (AML) y KYC — Realizamos los controles de identidad obligatorios para cada transacción profesional.",
          "Conformidad aduanera internacional — Cumplimiento riguroso de las formalidades de exportación de la UE y verificación de embargos.",
          "Cadena de suministro responsable — Colaboramos exclusivamente con socios que se adhieren a criterios sociales y ecológicos estrictos.",
          "Control de calidad riguroso — Cada diamante se verifica gemológicamente antes del envío para eliminar cualquier defecto de corte, pulido o fluorescencia.",
        ],
      },
    ],
    logisticsMarketSections: [
      {
        label: "LOGÍSTICA GLOBAL & ENVÍO SEGURO",
        heading: "Soluciones seguras de<br />envío internacional",
        description:
          "<p class='mb-4'>Entregamos todos nuestros diamantes con seguro total a través de transportistas de valores especializados dotados de protocolos de alta seguridad.</p><p class='mb-4'>Nuestros servicios logísticos incluyen:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Embalajes sellados de seguridad (inviolables)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Seguro a todo riesgo a la altura del valor declarado</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Formalidades aduaneras y documentos de transporte</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Entrega exprés mundial (en 24-72 horas)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Seguimiento en tiempo real e interlocutor dedicado</span></li></ul><p>Nuestros socios son expertos en el transporte de mercancías de gran valor, garantizando una entrega impecable de su pedido.</p>",
        imageSrc: "/b2b/flight.jpg",
        imageAlt: "Envío internacional",
        imagePosition: "right",
      },
      {
        label: "EXPERTISE DEL MERCADO & PRECIOS COMPETITIVOS",
        heading: "Estrategia de precios competitivos<br />basada en el mercado mundial",
        description:
          "<p class='mb-4'>El mercado del diamante es dinámico e influenciado por la producción de las minas, la demanda en Asia/EE. UU. y los índices de precios como Rapaport e IDEX.</p><p class='mb-4'>Seguimos continuamente:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Fluctuaciones en el mercado de mayoristas y tendencias de los cursos</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Disponibilidad en la cadena de suministro y niveles de stock</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Tendencias de demanda regional (Europa, América, Asia)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Evolución de los tipos de cambio (USD/EUR/INR)</span></li></ul><p>Gracias a esta investigación de mercado continua, podemos ofrecer a nuestros clientes B2B tarifas de mayoristas justas y alineadas con la realidad del mercado.</p>",
        imageSrc: "/b2b/diamondsourceforyou.jpg",
        imageAlt: "Estrategia de precios",
        imagePosition: "left",
      },
    ],
    whyChooseUsSection: [
      {
        title: "Por qué los compradores globales eligen Dalila Diamonds",
        content: "Minoristas, joyeros y mayoristas profesionales de todo el mundo confían en Dalila Diamonds como su socio de abastecimiento de diamantes naturales. He aquí por qué:",
        bulletPoints: [
          "Con sede en Amberes, Bélgica — Operar en el centro del diamanthandel mundial proporciona un acceso inigualable a existencias, laboratorios e infraestructura de transporte.",
          "Estrictas normas de certificación internacional — Suministramos exclusivamente diamantes con certificados GIA, IGI, HRD y AGS, garantizando transparencia y calidad uniforme.",
          "Estructura de precios de mayorista transparente — Sin recargos ocultos. Nuestros precios reflejan el curso del mercado con márgenes razonables para una cooperación a largo plazo.",
          "Más de 50 años de experiencia familiar — Décadas de saber multigeneracional en clasificación, valoración, negociación y prácticas éticas.",
          "Modelo de cooperación a largo plazo — Privilegiamos las relaciones estables frente a las ventas puntuales. Acceso preferente, condiciones adaptables y soporte personalizado.",
          "Logística internacional segura — Envíos totalmente asegurados con empresas de transporte líderes, apoyo en aduanas y seguimiento en tiempo real.",
          "Alto nivel de cumplimiento — Respeto absoluto del Proceso de Kimberley, de las regulaciones contra el blanqueo (AML) y de los estándares éticos de suministro.",
          "Servicios globales integrados — Desde el suministro ordinario (S2S) hasta la búsqueda a medida (DS4U) y el rachat (SYD), cubrimos todas sus necesidades profesionales.",
        ],
      },
    ],
    contactSection: [
      {
        title: "Contacte con Dalila Diamonds",
        content: "¿Preparado para establecer una asociación estable de suministro de diamantes? Contacte con nuestro equipo en Amberes para evaluar sus requisitos, obtener acceso a nuestro stock e intercambiar propuestas sobre nuestras soluciones.",
        bulletPoints: [
          "Nombre de la empresa: Dalila Diamonds",
          "Dirección física: Hoveniersstraat 30, Apartado 105, Suite 326, 2018 Amberes, Bélgica",
          "Teléfono principal: +32 3 613 94 74",
          "Móvil/WhatsApp: +32 487 93 93 51",
          "Correo electrónico comercial: business@daliladiamonds.com",
          "Horario de oficina: Lunes–Viernes, 9:00 AM – 6:00 PM CET (Con cita previa para clientes fuera de la UE)",
          "Idiomas: Inglés, Neerlandés, Francés, Hindi, Hebreo",
        ],
      },
    ],
  },
  it: {
    trustedSupplierSection: [
      {
        title: "Dalila Diamonds | Approvvigionamento di diamanti B2B di fiducia da Anversa",
        content: "Dalila Diamonds è un fornitore leader di diamanti B2B con sede ad Anversa, in Belgio — il cuore storico e riconosciuto a livello mondiale del commercio internazionale di diamanti.\n\nSiamo specializzati nella fornitura di diamanti naturali certificati a gioiellieri, produttori, grossisti, dettaglianti di lusso e acquirenti di investimenti in tutto il mondo. La nostra attività si basa sulla fiducia, sulla trasparenza, sull'approvvigionamento di precisione e su partnership strategiche a lungo termine.\n\nOgni diamante che consegniamo rappresenta non solo brillantezza e rarità, ma anche affidabilità e integrità professionale, supportate da decenni di esperienza nel mercato mondiale dei diamanti.",
      },
    ],
    initialSections: [
      {
        label: "SINTESI DIRETTORE",
        heading: "Fornitore di Diamanti B2B<br />Premium in Belgio",
        description:
          "<p class='mb-4'>Dalila Diamonds è un fornitore premium di diamanti B2B con sede ad Anversa, in Belgio — il cuore storico e riconosciuto a livello mondiale del commercio internazionale di diamanti.</p><p class='mb-4'>Siamo specializzati nella fornitura di diamanti naturali certificati a gioiellieri, produttori, grossisti, dettaglianti di lusso e acquirenti di investimenti in tutto il mondo.</p><p class='mb-4'>La nostra attività si basa sulla fiducia, sulla trasparenza, sull'approvvigionamento di precisione e su partnership strategiche a lungo termine. Ogni diamante che consegniamo rappresenta non solo brillantezza e rarità, ma anche affidabilità e integrità professionale.</p><p>Con decenni di esperienza familiare e una rete di approvvigionamento globale, garantiamo qualità costante, prezzi competitivi e logistica internazionale sicura.</p>",
        imageSrc: "/b2b/looseround.webp",
        imageAlt: "Dalila Diamonds Anversa",
        imagePosition: "right",
      },
      {
        label: "SU DALILA DIAMONDS",
        heading: "Partner di Approvvigionamento Strategico<br />per Acquirenti Professionali",
        description:
          "<p class='mb-4'>Dalila Diamonds è stata fondata con una missione chiara: semplificare l'approvvigionamento di diamanti per gli acquirenti B2B professionali.</p><p class='mb-4'>Sappiamo che nel settore dei diamanti, l'affidabilità e la costanza sono fondamentali. I programmi di produzione, la pianificazione delle scorte e le aspettative dei clienti dipendono da una classificazione rigorosa, tariffe competitive e una fornitura sicura.</p><p class='mb-4'>Operare da Anversa ci dà accesso diretto a uno dei più grandi inventari di diamanti lucidati al mondo e alle borse di diamanti consolidate. Questo ci consente di collaborare a stretto contatto con produttori e fornitori primari, garantendo migliori strutture di prezzo e accesso prioritario ad articoli di prima qualità.</p><p>Non siamo una società commerciale di transazioni — siamo un partner di approvvigionamento strategico impegnato a sostenere la vostra crescita a lungo tempo.</p>",
        imageSrc: "/b2b/business-partnership.jpg",
        imageAlt: "Soluzioni di approvvigionamento di diamanti",
        imagePosition: "left",
      },
    ],
    familyExpertiseSection: [
      {
        title: "Oltre 50 anni di esperienza familiare nel settore dei diamanti",
        content: "Dietro Dalila Diamonds si nasconde un'eredità multigenerazionale di oltre 50 anni nel settore dei diamanti. Questo patrimonio non è solo storia — è un'esperienza attiva che apporta un valore tangibile ai nostri clienti B2B ogni giorno.",
        bulletPoints: [
          "Conoscenza profonda della classificazione e valutazione — La nostra famiglia ha trascorso decenni a padroneggiare le sottigliezze delle 4C, le norme di certificazione e la valutazione del mercato. Possiamo valutare la qualità all'istante e negoziare prezzi equi.",
          "Connessioni solide con fornitori globali — Costruire relazioni nel settore dei diamanti richiede anni. Le nostre connessioni familiari ad Anversa, Mumbai, Tel Aviv e New York offrono un accesso privilegiato a scorte premium.",
          "Prospettiva del mercato e intelligenza dei prezzi — Abbiamo attraversato molteplici cicli di mercato. Questa esperienza ci consente di consigliare i nostri clienti sul momento ottimale, le tendenze dei prezzi e le opportunità di investimento.",
          "Capacità di negoziazione eccezionali — Decenni di esperienza nell'approvvigionamento hanno perfezionato le nostre capacità di negoziazione, aiutandoci ad ottenere migliori condizioni e tariffe per i nostri clienti.",
          "Principi di commercio etici e responsabili — La nostra reputazione familiare si basa sull'integrità. Manteniamo standard di approvvigionamento etici fin dall'inizio, molto prima che diventasse un'esigenza del settore.",
          "Fiducia della comunità dei diamanti di Anversa — Una reputazione alla Borsa dei Diamanti di Anversa si acquisisce nel corso di generazioni. Il nostro prestigio offre accesso a scorte esclusive e a condizioni favorevoli inaccessibili per i nuovi partecipanti.",
        ],
      },
    ],
    antwerpAuthoritySection: [
      {
        title: "Perché Anversa gioca un ruolo chiave nel commercio mondiale di diamanti",
        content: "Anversa è il cuore dell'industria mondiale dei diamanti da oltre cinque secoli. Oggi, rimane la principale piattaforma di commercio di diamanti, con circa l'84% di tutti i diamanti grezzi e il 50% di tutti i diamanti lucidati che transitano per la città ogni anno.\n\nDalila Diamonds opera all'interno di questo ecosistema storico, offrendo agli acquirenti accesso a reti di fornitura affidabili, meccanismi di prezzo trasparenti e una regolarità di fornitura che solo Anversa può offrire.\n\nLa nostra presenza in Belgio ci consente di mantenere relazioni strette con tagliatori, lucidatori, laboratori e partner logistici internazionali — assicurando una fornitura, una certificazione e una consegna efficienti per gli acquirenti professionali di tutto il mondo.\n\nCollaborando con un fornitore con sede in Belgio, non acquistate solo diamanti — accedete a secoli di infrastruttura commerciale, esperienza e fiducia.",
      },
    ],
    certificationSections: [
      {
        label: "DIAMANTI CERTIFICATI & NORME DI LABORATORIO",
        heading: "Norme internazionali di<br />certificazione di laboratorio",
        description:
          "<p class='mb-4'>Forniamo diamanti certificati dai laboratori gemmologici internazionali leader, tra cui il GIA, l'IGI, l'HRD e l'AGS.</p><p class='mb-4'>La certificazione garantisce la verifica indipendente di:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Il peso in carati</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Il grado di colore</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Il grado di purezza</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>La qualità del taglio e le proporzioni</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>La lucidatura e la simmetria</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>I livelli di fluorescenza</span></li></ul><p class='mb-4'>Questo garantisce la trasparenza, la coerenza e la fiducia lungo tutta la vostra catena di fornitura.</p><p>Offriamo diamanti adatti sia alla produzione commerciale sia ai mercati del lusso di fascia alta, tutti dotati di rapporti di valutazione riconosciuti a livello internazionale.</p>",
        imageSrc: "/b2b/diamant-certificat-GIA.webp",
        imageAlt: "Diamanti certificati",
        imagePosition: "left",
      },
      {
        label: "LA NOSTRA COLLEZIONE DI DIAMANTI",
        heading: "Gamma completa di diamanti<br />naturali certificati",
        description:
          "<p class='mb-4'>Dalila Diamonds fornisce diamanti naturali lucidati di tutte le forme principali, tra cui brillante rotondo, princess, cushion, smeraldo, ovale, pera, radiant, marquise, asscher e cuore.</p><p class='mb-4'>Disponibile in tutti gli spettri di qualità:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Articoli commerciali (purezza SI–I, colore H–K)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Diamanti con taglio Triple Excellent</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Diamanti senza fluorescenza</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Pietre incolori di qualità superiore (D–F)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Diamanti di alta purezza (IF–VVS)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Grandi solitari certificati (da 2ct a 10ct+)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Diamanti di qualità investimento</span></li></ul><p>Forniamo anche lotti di melee calibrati e layout abbinati con precisione per la produzione di gioielli.</p>",
        imageSrc: "/b2b/diamond-slp-cover-mobile.webp",
        imageAlt: "Collezione di diamanti",
        imagePosition: "right",
      },
    ],
    processSection: [
      {
        title: "Il nostro processo professionale di approvvigionamento di diamanti",
        content: "Seguiamo un processo di approvvigionamento strutturato e trasparente progettato per ridurre al minimo i rischi e massimizzare il valore per gli acquirenti B2B:",
        bulletPoints: [
          "Analisi dei requisiti — Iniziamo comprendendo le vostre specifiche esatte: forma, carati, colore, purezza, qualità del taglio, preferenza di laboratorio e budget.",
          "Approvvigionamento strategico globale — La nostra rete si attiva nelle borse di Anversa, con produttori di fiducia e partner internazionali per localizzare i diamanti adatti.",
          "Verifica dei certificati di laboratorio — Ogni diamante è sottoposto ad autenticazione. Verifichiamo i numeri di rapporto, le iscrizioni laser e la coerenza dell'analisi.",
          "Ispezione di qualità — I nostri gemmologi ispezionano personalmente le proporzioni, la simmetria, la lucidatura, la fluorescenza e l'aspetto visivo generale prima della spedizione.",
          "Spedizione sicura — Una volta approvati, i diamanti vengono imballati, assicurati e spediti tramite vettori di valori express specializzati, con supporto doganale completo.",
          "Supporto post-consegna — Rimaniamo a vostra disposizione per qualsiasi necessità di chiarimento su certificati, documentazione o future ricerche.",
        ],
      },
    ],
    servicesSections: [
      {
        label: "S2S – SECURE TO SOURCE",
        heading: "Soluzione strutturata di<br />approvvigionamento di diamanti",
        description:
          "<p class='mb-4'>Secure To Source (S2S) è la nostra soluzione principale di approvvigionamento B2B progettata per gioiellieri, grossisti e produttori che cercano affidabilità e una riduzione dei rischi.</p><p class='mb-4'>S2S offre:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Accesso diretto agli inventari di Anversa</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Diamanti certificati con documentazione completa</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Tariffe all'ingrosso competitive</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Verifica completa del controllo di qualità</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Logistica internazionale assicurata</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Documentazione e fatturazione trasparenti</span></li></ul><p>Questo servizio è ideale per le aziende che necessitano di una fornitura costante, tariffe prevedibili e stabilità nella collaborazione a lungo termine.</p>",
        imageSrc: "/b2b/stos.jpg",
        imageAlt: "Processo di approvvigionamento sicuro",
        imagePosition: "left",
      },
      {
        label: "DS4U – DIAMOND SOURCE FOR YOU",
        heading: "Ricerca su misura per<br />requisiti specifici",
        description:
          "<p class='mb-4'>Diamond Source For You (DS4U) è il nostro programma di approvvigionamento completamente personalizzato per richieste di diamanti specifiche, rare o di grande valore che richiedono ricerche mirate.</p><p class='mb-4'>I nostri clienti richiedono:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Dimensioni e carati precisi</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Combinazioni rare di colore e purezza</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Coppie combinate per orecchini o parure</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Collezioni da sposa con gradazione omogenea</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Forme fantasia rare e tagli particolari</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Pietre di investimento di grande valore (oltre 5ct)</span></li></ul><p>La nostra rete di approvvigionamento si attiva per localizzare, verificare, negoziare e consegnare in modo sicuro le pietre corrispondenti ai vostri criteri nei tempi concordati.</p>",
        imageSrc: "/b2b/close-up.jpg",
        imageAlt: "Ricerca di diamanti su misura",
        imagePosition: "right",
      },
    ],
    sellDiamondsSection: [
      {
        title: "SYD — Sell Your Diamonds: Servizio professionale di riacquisto",
        content: "Sell Your Diamonds (SYD) è il nostro servizio professionale di acquisto e riacquisto di diamanti per venditori B2B, eredità, liquidazioni e ottimizzazione delle scorte.",
        bulletPoints: [
          "Diamanti certificati sfusi (tutte le dimensioni) — Acquistiamo pietre singole e lotti da 0.30 ct a oltre 10 ct, con certificato GIA, IGI, HRD o AGS.",
          "Solitari di grande valore e pietre rare — Pietre eccezionali con criteri di investimento, colori rari (D-E-F) o purezza superiore (IF-VVS).",
          "Diamanti da investimento — Acquistiamo diamanti da investimento, offrendo liquidità e prezzi trasparenti basati sui listini di mercato attuali.",
          "Gioielli con diamanti e pietre montate — Acquistiamo gioielli di valore e possiamo stimare separatamente il valore della pietra e del metallo.",
          "Eredità, lasciti e collezioni — I gioielli di famiglia e le collezioni antiche vengono valutati in modo discreto e conforme al mercato.",
          "Processo di stima trasparente — Verifica del certificato, controllo dell'iscrizione laser, ispezione gemmologica e offerta basata sui listini Rapaport e IDEX.",
          "Pagamento sicuro tramite bonifico — Dopo l'accordo, la transazione viene eseguita tramite bonifico bancario sicuro entro 24 ore con fattura.",
        ],
      },
    ],
    ethicsQualitySection: [
      {
        title: "Approvvigionamento etico & controllo qualità",
        content: "Dalila Diamonds rispetta scrupolosamente le normative internazionali del commercio dei diamanti e gli standard di sourcing responsabile. Il nostro impegno per l'etica è assoluto.",
        bulletPoints: [
          "Certificazione del Processo di Kimberley — Tutti i nostri diamanti provengono da fonti esenti da conflitti con documento di conformità.",
          "Conformità antiriciclaggio (AML) & KYC — Eseguiamo i controlli di identità regolamentari per ciascuna transazione professionale.",
          "Conformità doganale internazionale — Rispetto rigoroso delle formalità di esportazione dell'UE e verifica degli embarghi.",
          "Catena di fornitura responsabile — Collaboriamo esclusivamente con partner che aderiscono a criteri sociali ed ecologici rigidi.",
          "Controllo qualità rigoroso — Ciascun diamante viene verificato gemmologicamente prima della spedizione per escludere difetti di taglio, lucidatura o fluorescenza.",
        ],
      },
    ],
    logisticsMarketSections: [
      {
        label: "LOGISTICA GLOBALE & CONSEGNA SICURA",
        heading: "Soluzioni sicure di<br />consegna internazionale",
        description:
          "<p class='mb-4'>Consegniamo tutti i nostri diamanti con assicurazione totale tramite corrieri di valori specializzati dotati di protocolli di alta sicurezza.</p><p class='mb-4'>I nostri servizi logistici comprendono:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Imballaggi sigillati di sicurezza (inviolabili)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Assicurazione Kasko a altezza del valore dichiarato</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Formalità doganali e documenti di trasporto</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Consegna express mondiale (in 24-72 ore)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Tracciamento in tempo reale e referente dedicato</span></li></ul><p>I nostri partner sono esperti nel trasporto di merci di grande valore, garantendo una consegna impeccabile del vostro ordine.</p>",
        imageSrc: "/b2b/flight.jpg",
        imageAlt: "Spedizione internazionale",
        imagePosition: "right",
      },
      {
        label: "ESPERIENZA DEL MERCATO & PREZZI COMPETITIVI",
        heading: "Strategia di prezzi competitivi<br />basata sul mercato mondiale",
        description:
          "<p class='mb-4'>Il mercato dei diamanti è dinamico, influenzato dalla produzione delle miniere, dalla domanda in Asia/USA e dagli indici dei prezzi come Rapaport e IDEX.</p><p class='mb-4'>Seguiamo continuamente:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Fluttuazioni nel mercato dei grossisti e tendenze dei listini</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Disponibilità nella catena di fornitura e livelli di magazzino</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Tendenze di domanda regionale (Europa, America, Asia)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Evoluzione dei tassi di cambio (USD/EUR/INR)</span></li></ul><p>Grazie a questa ricerca di mercato continua, possiamo offrire ai nostri clienti B2B tariffe all'ingrosso eque e direttamente allineate con la realtà del mercato.</p>",
        imageSrc: "/b2b/diamondsourceforyou.jpg",
        imageAlt: "Strategia dei prezzi",
        imagePosition: "left",
      },
    ],
    whyChooseUsSection: [
      {
        title: "Perché gli acquirenti globali scelgono Dalila Diamonds",
        content: "Dettaglianti, gioiellieri e grossisti professionisti di tutto il mondo si fidano di Dalila Diamonds come loro partner di approvvigionamento di diamanti naturali. Ecco perché:",
        bulletPoints: [
          "Con sede ad Anvers, Belgio — Operare nel centro del diamanthandel mondiale fornisce un accesso impareggiabile a scorte, laboratori e infrastrutture di trasporto.",
          "Rigorose norme di certificazione internazionale — Suministriamo esclusivamente diamanti con certificati GIA, IGI, HRD e AGS, garantendo trasparenza e qualità uniforme.",
          "Struttura dei prezzi all'ingrosso trasparente — Senza ricarichi nascosti. I nostri prezzi riflettono l'andamento del mercato con margini ragionevoli per una cooperazione a lungo termine.",
          "Oltre 50 anni di esperienza familiare — Decenni di sapere multigenerazionale in classificazione, valutazione, negoziazione e pratiche etiche.",
          "Modello di cooperazione a lungo termine — Privilegiamo le relazioni stabili rispetto alle vendite singole. Accesso preferenziale, condizioni flessibili e supporto personalizzato.",
          "Logistica internazionale sicura — Spedizioni interamente assicurate con aziende di trasporto leader, supporto doganale e tracciamento in tempo reale.",
          "Alto livello di conformità — Rispetto assoluto del Processo di Kimberley, delle regolamentazioni antiriciclaggio (AML) e degli standard etici di fornitura.",
          "Servizi globali integrati — Dall'acquisto regolare (S2S) alla ricerca su misura (DS4U) e al riacquisto (SYD), copriamo tutte le vostre esigenze professionali.",
        ],
      },
    ],
    contactSection: [
      {
        title: "Contattate Dalila Diamonds",
        content: "Pronto a costruire una partnership stabile per il vostro approvvigionamento di diamanti? Contattate i nostri team ad Anversa per studiare le vostre esigenze, ottenere l'accesso al nostro stock e scambiare proposte sulle nostre soluzioni.",
        bulletPoints: [
          "Nome della società: Dalila Diamonds",
          "Indirizzo fisico: Hoveniersstraat 30, Casella 105, Suite 326, 2018 Anversa, Belgio",
          "Telefono principale: +32 3 613 94 74",
          "Mobile/WhatsApp: +32 487 93 93 51",
          "E-mail professionale: business@daliladiamonds.com",
          "Orario di ufficio: Lunedì–Venerdì, 9:00 AM – 6:00 PM CET (Su appuntamento per i clienti extra UE)",
          "Lingue parlate: Inglese, Olandese, Francese, Hindi, Ebraico",
        ],
      },
    ],
  },
};

export function getB2bContent(locale: string): B2bContent {
  const normLocale = locale || "en";
  return contentByLocale[normLocale] || contentByLocale["en"];
}
