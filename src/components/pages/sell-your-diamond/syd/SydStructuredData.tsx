import {
  SYD_CANONICAL_URL,
  SYD_HERO_IMAGE_URL,
  SYD_PAGE_DESCRIPTION,
  getSydContent,
} from "@/lib/i18n/sydTranslations";

export default function SydStructuredData() {
  const content = getSydContent();
  const faqs = content.faqs.items;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.daliladiamonds.com/#organization",
        name: "Dalila Diamonds",
        url: "https://www.daliladiamonds.com/",
        logo: {
          "@type": "ImageObject",
          url: "https://www.daliladiamonds.com/dalila_img/Dalila_Logo.png",
        },
        email: "business@daliladiamonds.com",
        telephone: "+32 3 613 94 74",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Hoveniersstraat 30, Box 105, Suite 326",
          postalCode: "2018",
          addressLocality: "Antwerp",
          addressCountry: "BE",
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Diamond evaluation enquiries",
          telephone: "+32 487 93 93 51",
          email: "business@daliladiamonds.com",
          availableLanguage: ["English"],
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://www.daliladiamonds.com/#website",
        url: "https://www.daliladiamonds.com/",
        name: "Dalila Diamonds",
        publisher: {
          "@id": "https://www.daliladiamonds.com/#organization",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${SYD_CANONICAL_URL}#webpage`,
        url: SYD_CANONICAL_URL,
        name: "Sell Your Diamond in Antwerp, Belgium",
        description: SYD_PAGE_DESCRIPTION,
        inLanguage: "en-GB",
        isPartOf: {
          "@id": "https://www.daliladiamonds.com/#website",
        },
        about: {
          "@id": `${SYD_CANONICAL_URL}#service`,
        },
        breadcrumb: {
          "@id": `${SYD_CANONICAL_URL}#breadcrumb`,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: SYD_HERO_IMAGE_URL,
          width: 1600,
          height: 900,
          caption: "Natural diamond and ring prepared for a private Antwerp evaluation",
        },
      },
      {
        "@type": "Service",
        "@id": `${SYD_CANONICAL_URL}#service`,
        name: "Natural Diamond Buying and Evaluation Service",
        serviceType: "Natural diamond buying and physical evaluation",
        description:
          "Confidential preliminary review and physical evaluation for eligible natural diamonds and diamond jewellery through Dalila Diamonds in Antwerp.",
        url: SYD_CANONICAL_URL,
        provider: {
          "@id": "https://www.daliladiamonds.com/#organization",
        },
        areaServed: [
          {
            "@type": "Country",
            name: "Belgium",
          },
          {
            "@type": "Place",
            name: "Europe",
          },
        ],
        audience: {
          "@type": "Audience",
          audienceType: "Private natural-diamond and diamond-jewellery sellers",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SYD_CANONICAL_URL}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.daliladiamonds.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Sell Your Diamond",
            item: SYD_CANONICAL_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SYD_CANONICAL_URL}#faq`,
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
