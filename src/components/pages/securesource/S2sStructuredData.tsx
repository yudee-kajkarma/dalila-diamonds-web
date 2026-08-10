const s2sStructuredDataGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.daliladiamonds.com/#organization",
      name: "Dalila Diamonds",
      alternateName: "Dalila",
      url: "https://www.daliladiamonds.com/",
      logo: {
        "@type": "ImageObject",
        "@id": "https://www.daliladiamonds.com/#logo",
        url: "https://www.daliladiamonds.com/dalila_img/mobile-logo.png",
        contentUrl: "https://www.daliladiamonds.com/dalila_img/mobile-logo.png",
      },
      description:
        "Dalila Diamonds is an Antwerp-based natural diamond company providing secure diamond sourcing, customised diamond sourcing, quality control and professional diamond purchasing services.",
      email: "business@daliladiamonds.com",
      telephone: "+32 487 93 93 51",
      vatID: "BE0736671250",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Hoveniersstraat 30, Box 105, Suite 326",
        postalCode: "2018",
        addressLocality: "Antwerp",
        addressCountry: "BE",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          "@id": "https://www.daliladiamonds.com/#sales-contact",
          contactType: "sales and diamond sourcing enquiries",
          telephone: "+32 487 93 93 51",
          email: "business@daliladiamonds.com",
          url: "https://www.daliladiamonds.com/contact",
          areaServed: "EU",
          availableLanguage: ["English", "Dutch", "French"],
          hoursAvailable: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "17:00",
          },
        },
        {
          "@type": "ContactPoint",
          contactType: "landline enquiries",
          telephone: "+32 3 613 94 74",
          email: "business@daliladiamonds.com",
          areaServed: "EU",
        },
      ],
      sameAs: ["https://www.instagram.com/daliladiamonds/"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        "@id": "https://www.daliladiamonds.com/#service-catalogue",
        name: "Dalila Diamonds Services",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@type": "Offer",
              url: "https://www.daliladiamonds.com/secure-to-source",
              itemOffered: { "@id": "https://www.daliladiamonds.com/secure-to-source#service" },
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@type": "Offer",
              url: "https://www.daliladiamonds.com/diamond-source",
              itemOffered: { "@id": "https://www.daliladiamonds.com/diamond-source#service" },
            },
          },
          {
            "@type": "ListItem",
            position: 3,
            item: {
              "@type": "Offer",
              url: "https://www.daliladiamonds.com/sell-your-diamond",
              itemOffered: { "@id": "https://www.daliladiamonds.com/sell-your-diamond#service" },
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.daliladiamonds.com/#website",
      url: "https://www.daliladiamonds.com/",
      name: "Dalila Diamonds",
      publisher: { "@id": "https://www.daliladiamonds.com/#organization" },
      inLanguage: "en",
    },
    {
      "@type": ["WebPage", "FAQPage"],
      "@id": "https://www.daliladiamonds.com/secure-to-source#webpage",
      url: "https://www.daliladiamonds.com/secure-to-source",
      name: "Diamond Sourcing Service in Antwerp | Dalila Diamonds",
      description:
        "Shortlist a loose natural diamond online and let Dalila Diamonds coordinate quality control, euro payment and secure delivery to Belgium or another EU country.",
      isPartOf: { "@id": "https://www.daliladiamonds.com/#website" },
      about: { "@id": "https://www.daliladiamonds.com/secure-to-source#service" },
      breadcrumb: { "@id": "https://www.daliladiamonds.com/secure-to-source#breadcrumb" },
      inLanguage: "en",
      potentialAction: [
        {
          "@type": "CommunicateAction",
          name: "Contact Dalila Diamonds",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://www.daliladiamonds.com/contact",
            actionPlatform: [
              "https://schema.org/DesktopWebPlatform",
              "https://schema.org/MobileWebPlatform",
            ],
          },
          recipient: { "@id": "https://www.daliladiamonds.com/#organization" },
        },
        {
          "@type": "CommunicateAction",
          name: "Call Dalila Diamonds Now",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "tel:+32487939351",
            actionPlatform: [
              "https://schema.org/AndroidPlatform",
              "https://schema.org/IOSPlatform",
            ],
          },
          recipient: { "@id": "https://www.daliladiamonds.com/#sales-contact" },
        },
      ],
      mainEntity: [
        {
          "@type": "Question",
          name: "What does diamond sourcing mean?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Diamond sourcing is the process of finding, reviewing and purchasing a diamond that meets defined requirements such as shape, carat weight, colour, clarity, cut, grading report and budget. It may also include documentation review, quality control, payment and delivery coordination.",
          },
        },
        {
          "@type": "Question",
          name: "What is S2S – Secure To Source?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "S2S is Dalila Diamonds' service for professional buyers who have already found a loose natural diamond online. The buyer shares the selected diamond details, and Dalila Diamonds coordinates the applicable quality-control, payment and delivery process.",
          },
        },
        {
          "@type": "Question",
          name: "Does Dalila Diamonds choose the diamond through S2S?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. With S2S, the buyer finds or shortlists the diamond. Buyers who want Dalila Diamonds to search for suitable options should use DS4U – Diamond Source For You.",
          },
        },
        {
          "@type": "Question",
          name: "Where can I find a diamond for an S2S request?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can browse a trusted online diamond platform and send Dalila Diamonds the relevant listing, stock number and grading-report information. The ability to proceed depends on the platform, supplier, diamond availability and transaction requirements.",
          },
        },
        {
          "@type": "Question",
          name: "Does S2S cover natural or lab-grown diamonds?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The S2S service is positioned around sourcing loose natural diamonds. Buyers should confirm the diamond type and service availability with Dalila Diamonds before completing an order.",
          },
        },
        {
          "@type": "Question",
          name: "What diamond details should I submit?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Send the listing link or stock number, shape, carat weight, colour, clarity, cut information, grading laboratory, report number, fluorescence, listed price and required delivery destination.",
          },
        },
        {
          "@type": "Question",
          name: "Does Dalila Diamonds check the grading report?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Dalila Diamonds reviews the grading information available for the selected stone as part of the applicable quality-control process. The exact verification possible depends on the diamond, report, supplier and transaction.",
          },
        },
        {
          "@type": "Question",
          name: "Can I pay for the diamond in euros?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Euro payment is available for confirmed S2S transactions. Payment instructions, the diamond price and applicable service charges are supplied before the order proceeds.",
          },
        },
        {
          "@type": "Question",
          name: "How quickly can a diamond arrive in Belgium?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Orders completed by Wednesday evening are generally scheduled to arrive in Belgium by the following Wednesday. Timing remains subject to confirmation, supplier availability, public holidays, carrier schedules and other external circumstances.",
          },
        },
        {
          "@type": "Question",
          name: "Can Dalila Diamonds deliver the diamond outside Belgium?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Delivery to other EU countries can be arranged for an additional fee. Availability, cost, documentation and the expected delivery schedule are confirmed for each destination.",
          },
        },
        {
          "@type": "Question",
          name: "Is there an additional fee for S2S?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. An S2S service fee applies, and delivery outside Belgium may require an additional shipping fee. The applicable charges are confirmed before payment.",
          },
        },
        {
          "@type": "Question",
          name: "Can I submit several diamonds for comparison?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Buyers can submit several shortlisted diamonds with their listings and available grading information. Dalila Diamonds can review the submitted details before the next step is confirmed.",
          },
        },
        {
          "@type": "Question",
          name: "Is S2S available for jewellers and diamond professionals?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. S2S is designed for jewellers, manufacturers, diamond dealers, designers and other professional buyers who source loose natural diamonds online.",
          },
        },
        {
          "@type": "Question",
          name: "What happens if the shortlisted diamond is unavailable?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Online diamond availability can change quickly. If the stone is no longer available, the buyer may submit another shortlisted diamond or use DS4U to request help finding a suitable alternative.",
          },
        },
      ],
    },
    {
      "@type": "Service",
      "@id": "https://www.daliladiamonds.com/secure-to-source#service",
      name: "S2S – Secure To Source",
      alternateName: "Secure Diamond Sourcing",
      serviceType: "Secure natural diamond sourcing and quality-control coordination",
      url: "https://www.daliladiamonds.com/secure-to-source",
      description:
        "A diamond sourcing service for professional buyers who have already shortlisted a loose natural diamond online and require quality-control coordination, euro payment and scheduled delivery to Belgium or another EU country.",
      provider: { "@id": "https://www.daliladiamonds.com/#organization" },
      areaServed: [
        { "@type": "Country", name: "Belgium" },
        { "@type": "AdministrativeArea", name: "European Union" },
      ],
      audience: {
        "@type": "BusinessAudience",
        audienceType:
          "Jewellers, diamond dealers, jewellery manufacturers, designers and professional diamond buyers",
      },
      availableChannel: [
        {
          "@type": "ServiceChannel",
          name: "S2S online enquiry",
          serviceUrl: "https://www.daliladiamonds.com/contact",
        },
        {
          "@type": "ServiceChannel",
          name: "S2S telephone enquiry",
          servicePhone: { "@id": "https://www.daliladiamonds.com/#sales-contact" },
        },
      ],
      potentialAction: [
        {
          "@type": "CommunicateAction",
          name: "Contact Us About S2S",
          target: "https://www.daliladiamonds.com/contact",
          recipient: { "@id": "https://www.daliladiamonds.com/#organization" },
        },
        {
          "@type": "CommunicateAction",
          name: "Call Now",
          target: "tel:+32487939351",
          recipient: { "@id": "https://www.daliladiamonds.com/#sales-contact" },
        },
      ],
      mainEntityOfPage: { "@id": "https://www.daliladiamonds.com/secure-to-source#webpage" },
    },
    {
      "@type": "Service",
      "@id": "https://www.daliladiamonds.com/diamond-source#service",
      name: "DS4U – Diamond Source For You",
      serviceType: "Custom natural diamond sourcing",
      url: "https://www.daliladiamonds.com/diamond-source",
      description:
        "A customised diamond sourcing service through which Dalila Diamonds searches its worldwide network for natural diamonds matching the buyer's specifications and budget.",
      provider: { "@id": "https://www.daliladiamonds.com/#organization" },
      areaServed: "EU",
    },
    {
      "@type": "Service",
      "@id": "https://www.daliladiamonds.com/sell-your-diamond#service",
      name: "SYD – Sell Your Diamonds",
      serviceType: "Natural diamond evaluation and purchasing",
      url: "https://www.daliladiamonds.com/sell-your-diamond",
      description:
        "Professional evaluation and purchasing of loose natural diamonds, diamond jewellery, inherited pieces and independently graded stones.",
      provider: { "@id": "https://www.daliladiamonds.com/#organization" },
      areaServed: "EU",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.daliladiamonds.com/secure-to-source#breadcrumb",
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
          name: "S2S – Secure To Source",
          item: "https://www.daliladiamonds.com/secure-to-source",
        },
      ],
    },
  ],
};

export default function S2sStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(s2sStructuredDataGraph) }}
    />
  );
}
