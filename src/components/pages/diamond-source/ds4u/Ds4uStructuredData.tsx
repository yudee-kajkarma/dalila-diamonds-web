import {
  DS4U_CANONICAL_URL,
  DS4U_DATE_MODIFIED,
  DS4U_HERO_IMAGE_URL,
  DS4U_PAGE_DESCRIPTION,
  DS4U_PAGE_TITLE,
  getDs4uContent,
} from "@/lib/i18n/ds4uTranslations";

export default function Ds4uStructuredData() {
  const faqs = getDs4uContent().faqs.items;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${DS4U_CANONICAL_URL}#webpage`,
        url: DS4U_CANONICAL_URL,
        name: DS4U_PAGE_TITLE,
        description: DS4U_PAGE_DESCRIPTION,
        inLanguage: "en-GB",
        dateModified: DS4U_DATE_MODIFIED,
        isPartOf: {
          "@id": "https://www.daliladiamonds.com/#website",
        },
        about: {
          "@id": `${DS4U_CANONICAL_URL}#service`,
        },
        mainEntity: {
          "@id": `${DS4U_CANONICAL_URL}#service`,
        },
        breadcrumb: {
          "@id": `${DS4U_CANONICAL_URL}#breadcrumb`,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          "@id": `${DS4U_CANONICAL_URL}#primaryimage`,
          url: DS4U_HERO_IMAGE_URL,
          contentUrl: DS4U_HERO_IMAGE_URL,
          width: 1600,
          height: 900,
          caption: "Custom natural diamond sourcing consultation in Antwerp",
        },
      },
      {
        "@type": "Service",
        "@id": `${DS4U_CANONICAL_URL}#service`,
        name: "DS4U — Diamond Source For You",
        alternateName: "Custom Natural Diamond Sourcing",
        serviceType: "Custom natural diamond sourcing",
        url: DS4U_CANONICAL_URL,
        description:
          "A custom Antwerp diamond sourcing service for specific natural diamonds, rare shapes, matched pairs and exact jewellery requirements.",
        provider: {
          "@type": "Organization",
          "@id": "https://www.daliladiamonds.com/#organization",
          name: "Dalila Diamonds",
          url: "https://www.daliladiamonds.com/",
          telephone: "+32 487 93 93 51",
          email: "business@daliladiamonds.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Hoveniersstraat 30, Box 105, Suite 326",
            postalCode: "2018",
            addressLocality: "Antwerp",
            addressCountry: "BE",
          },
        },
        areaServed: [
          {
            "@type": "Country",
            name: "Belgium",
          },
          {
            "@type": "AdministrativeArea",
            name: "European Union",
          },
        ],
        audience: {
          "@type": "Audience",
          audienceType: "Jewellers, jewellery designers, retailers and natural diamond buyers",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${DS4U_CANONICAL_URL}#breadcrumb`,
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
            name: "Our Services",
            item: "https://www.daliladiamonds.com/#services",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Diamond Source For You",
            item: DS4U_CANONICAL_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${DS4U_CANONICAL_URL}#faq`,
        url: `${DS4U_CANONICAL_URL}#frequently-asked-questions`,
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
