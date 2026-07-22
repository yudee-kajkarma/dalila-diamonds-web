import { ShowcaseSection } from "@/components/pages/seopage/SeoPageShowcase";
import { ContentSection } from "@/components/pages/seopage/SeoPageContent";

interface SellContent {
  whySellingSection: ContentSection[];
  valueSections: ShowcaseSection[];
  preparingSection: ContentSection[];
  sellingProcessSection: ContentSection[];
  servicesSections: ShowcaseSection[];
  safetyTipsSection: ContentSection[];
  commonMistakesSection: ContentSection[];
  bestPriceSection: ContentSection[];
  sellerSections: ShowcaseSection[];
  finalChecklistSection: ContentSection[];
  conclusionSection: ContentSection[];
  faqsSection: ContentSection[];
}

const contentByLocale: Record<string, SellContent> = {
  en: {
    whySellingSection: [
      {
        title: "Why Selling Diamonds Requires Care and Planning",
        content: "Selling a diamond isn't like selling an old phone or a piece of furniture. It's more like selling a tiny treasure—valuable, emotional, and sometimes confusing to price.\n\nWhether it's an engagement ring, heirloom jewelry, or a loose stone, you want the process to be smooth, secure, and profitable.\n\nMany people worry: Will I get the right price? Is the buyer trustworthy? Is it safe to sell online?\n\nThe good news? With the right preparation and a trusted buyer like Dalila Diamonds, selling your diamond can be simple and stress-free.",
      },
    ],
    valueSections: [
      {
        label: "UNDERSTANDING DIAMOND VALUE",
        heading: "Understanding the Real<br />Value of Your Diamond",
        description:
          "<p class='mb-4'><strong>The 4Cs Explained</strong></p><p class='mb-4'>Every diamond's value depends on the famous 4Cs:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Cut</strong> – Determines sparkle and brilliance</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Color</strong> – The less color, the higher the value</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Clarity</strong> – Fewer inclusions mean better quality</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Carat</strong> – The weight of the diamond</span></li></ul><p class='mb-4'>Think of the 4Cs like a diamond's report card. The stronger the grades, the higher the resale value.</p><p><strong>Market Demand and Pricing Trends</strong></p><p>Diamond prices aren't fixed forever. Market demand, design trends, and global supply chains influence resale value. For example, classic round diamonds usually sell faster than unusual cuts.</p>",
        imageSrc: "/selllSafe/loose.jpg",
        imageAlt: "Diamond 4Cs evaluation",
        imagePosition: "left",
      },
      {
        label: "CHOOSING A TRUSTED BUYER",
        heading: "Choosing a Trusted<br />Diamond Buyer",
        description:
          "<p class='mb-4'><strong>Signs of a Reliable Diamond Company</strong></p><p class='mb-4'>A trustworthy buyer should offer:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Transparent pricing process</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Professional evaluation</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Secure shipping or in-person inspection</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Clear payment terms</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Positive customer reputation</span></li></ul><p class='mb-4'>A premium company explains how they calculate value instead of giving vague offers.</p><p class='mb-4'><strong>Risks of Selling to Unverified Buyers</strong></p><p class='mb-4'>Selling to unknown individuals or unverified dealers can lead to:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Underpricing</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Payment delays</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Fraud risks</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>No documentation</span></li></ul><p>If a deal sounds too quick or too good to be true, it probably is.</p>",
        imageSrc: "/selllSafe/sell-diamonds.jpg",
        imageAlt: "Trusted diamond buyer selection",
        imagePosition: "right",
      },
    ],
    preparingSection: [
      {
        title: "Preparing Your Diamond Before Selling",
        content: "Before selling, gather all necessary documentation to increase buyer confidence and boost your selling price.\n\nCollect Certificates and Documents: Original purchase invoice, diamond grading certificate (GIA, IGI, etc.), warranty papers, and previous appraisals. These documents increase buyer confidence and can boost your selling price.\n\nClean and Inspect Your Jewelry: Presentation matters. A professionally cleaned diamond looks brighter and more appealing. Even a simple gentle cleaning at home can improve its appearance.\n\nInspect the setting for damage. Loose prongs or scratches may affect valuation. Professional inspection ensures you get accurate pricing.",
      },
    ],
    sellingProcessSection: [
      {
        title: "Step-by-Step Process to Sell Your Diamond",
        content: "Selling your diamond should feel easy — not stressful. Here's how a professional process works.\n\nStep 1 – Submit Your Details: Start by sharing basic information about your diamond (type of jewelry, carat size, certification, photos). This helps experts estimate preliminary value.\n\nStep 2 – Professional Evaluation: Next comes the detailed inspection. Experts examine authenticity, quality grading, market demand, and condition of the piece. This ensures a fair and accurate valuation.\n\nStep 3 – Transparent Offer: After evaluation, you receive a clear offer based on real market value — no hidden deductions or last-minute surprises. You can accept or decline. No pressure.\n\nStep 4 – Secure Payment: Once accepted, payment is processed securely through verified banking channels. Fast, safe, and documented.",
      },
    ],
    servicesSections: [
      {
        label: "WHY DALILA DIAMONDS",
        heading: "Why Dalila Diamonds is<br />a Premium Diamond Supplier",
        description:
          "<p class='mb-4'><strong>Global Industry Network</strong></p><p class='mb-4'>A strong global network allows diamond companies to offer competitive prices. Buyers connected with international jewelers and retailers can resell diamonds efficiently, which means better offers for sellers.</p><p class='mb-4'><strong>Trusted by Retailers and Jewelers</strong></p><p class='mb-4'>Being recognized as a premium diamond supplier for B2B business in Belgium means working with:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Jewelry retailers</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Diamond wholesalers</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Manufacturers</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Luxury brands</span></li></ul><p>This professional demand ensures consistent valuation standards and fair market pricing.</p>",
        imageSrc: "/selllSafe/step_4.png",
        imageAlt: "Dalila Diamonds global network",
        imagePosition: "left",
      },
      {
        label: "ONLINE VS OFFLINE SELLING",
        heading: "Benefits of Selling<br />Diamonds Online vs Offline",
        description:
          "<p class='mb-4'>Selling online through a trusted company offers:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Convenience from home</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Professional remote evaluation</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Access to global buyers</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Faster offers</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Secure insured shipping</span></li></ul><p>Offline selling may feel traditional, but it often limits you to local buyers and fewer price comparisons.</p>",
        imageSrc: "/selllSafe/recieve_your_payment.png",
        imageAlt: "Online diamond selling advantages",
        imagePosition: "right",
      },
    ],
    safetyTipsSection: [
      {
        title: "Safety Tips When Selling High-Value Jewelry",
        content: "Protect yourself and your valuable diamond with these essential safety guidelines.\n\nAvoid Cash-Only Deals: Large cash transactions are risky and often untraceable. Always prefer bank transfers, verified payment receipts, and written agreements.\n\nVerify Company Credentials: Before selling, check website authenticity, read customer reviews, confirm physical office presence, and ensure secure communication.\n\nUse Insured Shipping: If sending your diamond, always use fully insured and tracked shipping services. Never send valuables without proper insurance coverage.\n\nA genuine diamond company never hides its details and provides transparent communication throughout the process.",
      },
    ],
    commonMistakesSection: [
      {
        title: "Common Mistakes to Avoid When Selling Diamonds",
        content: "Many sellers lose money due to simple errors that can easily be avoided.\n\nSelling without certification – Always get your diamond certified by recognized labs like GIA or IGI for better pricing.\n\nAccepting the first offer immediately – Compare multiple offers to understand true market value.\n\nNot researching market value – Know what similar diamonds are selling for before accepting any offer.\n\nIgnoring buyer reputation – Always verify the buyer's credentials and read reviews from other sellers.\n\nRushing due to urgency – Patience can significantly increase your final price. Don't let time pressure force a bad deal.",
      },
    ],
    bestPriceSection: [
      {
        title: "How to Get the Best Price for Your Diamond",
        content: "Maximize your diamond's value with smart timing and strategic approach.\n\nTiming the Sale: Demand rises during wedding seasons, festive periods, and high jewelry retail cycles. Selling during strong demand can improve offers.\n\nComparing Multiple Offers: Always compare at least 2–3 quotes. This helps you understand realistic market value and avoid underpricing.\n\nPresent Complete Documentation: Having all certificates, purchase receipts, and appraisals ready increases buyer confidence and can boost your price by 15-20%.\n\nProfessional Cleaning: A well-maintained, clean diamond photographs better and makes a stronger impression during evaluation.",
      },
    ],
    sellerSections: [
      {
        label: "WHO CAN SELL DIAMONDS",
        heading: "Who Can Sell<br />Diamonds to Dalila Diamonds",
        description:
          "<p class='mb-4'>Almost anyone can sell:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Individuals with old jewelry</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>People upgrading rings</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Families selling heirlooms</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Investors liquidating assets</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Retailers clearing inventory</span></li></ul><p>Every diamond has value when assessed professionally.</p>",
        imageSrc: "/selllSafe/step_2.png",
        imageAlt: "Who can sell diamonds",
        imagePosition: "left",
      },
      {
        label: "TYPES OF DIAMONDS",
        heading: "Selling Engagement Rings,<br />Heirlooms, and Loose Diamonds",
        description:
          "<p class='mb-4'>Different types of diamonds require different evaluation approaches:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Engagement rings</strong> – Value depends on stone + setting</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Heirlooms</strong> – Antique value may increase price</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Loose diamonds</strong> – Easier to grade and often faster to sell</span></li></ul><p>Professional buyers consider both emotional and market worth.</p>",
        imageSrc: "/selllSafe/diamondwork.png",
        imageAlt: "Different types of diamond jewelry",
        imagePosition: "right",
      },
    ],
    finalChecklistSection: [
      {
        title: "Final Checklist Before Selling Your Diamond",
        content: "Before finalizing the sale, confirm all these essential points.\n\n✓ Certification ready – Your diamond grading certificate from GIA, IGI, or other recognized labs.\n\n✓ Photos taken – Clear, high-quality images from multiple angles showing the diamond's brilliance.\n\n✓ Jewelry cleaned – Professional cleaning or gentle home cleaning completed.\n\n✓ Buyer verified – Company credentials, reviews, and reputation checked thoroughly.\n\n✓ Payment method confirmed – Secure bank transfer or verified payment system agreed upon.\n\n✓ Offer reviewed carefully – Compare with market values and other offers received.",
      },
    ],
    conclusionSection: [
      {
        title: "Sell Your Diamond Safely and Seamlessly",
        content: "Make your diamond selling experience smooth, secure, and rewarding.\n\nSelling your diamond doesn't have to be complicated or risky. With the right preparation, understanding of value, and a trusted professional buyer, the process can be smooth, secure, and rewarding.\n\nWhether you're selling an engagement ring, heirloom, or loose stone, choosing a reliable company ensures transparency, fair pricing, and safe payment.\n\nIf you want a hassle-free experience backed by industry trust and global demand, working with a recognized premium diamond supplier for B2B business like Dalila Diamonds can make all the difference.\n\nSell smart, stay safe, and let your diamond find its next brilliant story.",
      },
    ],
    faqsSection: [
      {
        title: "Frequently Asked Questions",
        content: "Q: How do I know my diamond's resale value?\n\nA: A professional evaluation considering the 4Cs, certification, and current market demand determines accurate resale value.\n\nQ: Is it safe to sell diamonds online?\n\nA: Yes, if you choose a verified company offering insured shipping, transparent valuation, and secure payments.\n\nQ: Do I need a certificate to sell my diamond?\n\nA: Not mandatory, but certification increases trust and usually results in a higher price.\n\nQ: How long does the selling process take?\n\nA: With a professional buyer, it can take from a few days to a week, depending on evaluation and payment processing.\n\nQ: Can I sell broken or old diamond jewelry?\n\nA: Yes. Even damaged settings or old designs hold value because the diamond itself is evaluated.",
      },
    ],
  },
  de: {
    whySellingSection: [
      {
        title: "Warum der Verkauf von Diamanten Sorgfalt und Planung erfordert",
        content: "Der Verkauf eines Diamanten ist nicht wie der Verkauf eines alten Telefons oder eines Möbelstücks. Es ähnelt vielmehr dem Verkauf eines kleinen Schatzes – wertvoll, emotional aufgeladen und manchmal schwierig zu bewerten.\n\nEgal, ob es sich um einen Verlobungsring, ein Familienerbstück oder einen losen Stein handelt, Sie möchten, dass der Prozess reibungslos, sicher und rentabel verläuft.\n\nViele Menschen sorgen sich: Bekomme ich den richtigen Preis? Ist der Käufer vertrauenswürdig? Ist es sicher, online zu verkaufen?\n\nDie gute Nachricht? Mit der richtigen Vorbereitung und einem vertrauenswürdigen Käufer wie Dalila Diamonds kann der Verkauf Ihres Diamanten einfach und stressfrei sein.",
      },
    ],
    valueSections: [
      {
        label: "DIAMANTENWERT VERSTEHEN",
        heading: "Verstehen Sie den tatsächlichen<br />Wert Ihres Diamanten",
        description:
          "<p class='mb-4'><strong>Die 4Cs erklärt</strong></p><p class='mb-4'>Der Wert jedes Diamanten hängt von den bekannten 4Cs ab:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Schliff (Cut)</strong> – Bestimmt das Funkeln und die Brillanz</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Farbe (Color)</strong> – Je weniger Farbe, desto höher der Wert</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Reinheit (Clarity)</strong> – Weniger Einschlüsse bedeuten bessere Qualität</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Karat (Carat)</strong> – Das Gewicht des Diamanten</span></li></ul><p class='mb-4'>Betrachten Sie die 4Cs wie das Zeugnis eines Diamanten. Je besser die Noten, desto höher der Wiederverkaufswert.</p><p><strong>Marktnachfrage und Preistrends</strong></p><p>Diamantenpreise sind nicht für immer festgelegt. Marktnachfrage, Designtrends und globale Lieferketten beeinflussen den Wiederverkaufswert. Beispielsweise verkaufen sich klassische runde Diamanten in der Regel schneller als ungewöhnliche Schliffe.</p>",
        imageSrc: "/selllSafe/loose.jpg",
        imageAlt: "Diamond 4Cs evaluation",
        imagePosition: "left",
      },
      {
        label: "EINEN VERTRAUENSWÜRDIGEN KÄUFER WÄHLEN",
        heading: "Auswahl eines vertrauenswürdigen<br />Diamantenkäufers",
        description:
          "<p class='mb-4'><strong>Merkmale eines zuverlässigen Diamantenunternehmens</strong></p><p class='mb-4'>Ein vertrauenswürdiger Käufer sollte Folgendes bieten:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Einen transparenten Preisfindungsprozess</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Eine professionelle Bewertung</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Sicheren Versand oder persönliche Inspektion</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Klare Zahlungsbedingungen</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Einen guten Ruf bei den Kunden</span></li></ul><p class='mb-4'>Ein erstklassiges Unternehmen erklärt Ihnen, wie es den Wert berechnet, anstatt Ihnen vage Angebote zu machen.</p><p class='mb-4'><strong>Risiken beim Verkauf an nicht verifizierte Käufer</strong></p><p class='mb-4'>Der Verkauf an unbekannte Personen oder nicht verifizierte Händler kann zu folgenden Problemen führen:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Unterbewertung (zu niedrige Preise)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Zahlungsverzögerungen</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Betrugsrisiko</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Fehlende Dokumentation</span></li></ul><p>Wenn ein Geschäft zu schnell geht oder zu gut klingt, um wahr zu sein, ist es das meistens auch.</p>",
        imageSrc: "/selllSafe/sell-diamonds.jpg",
        imageAlt: "Trusted diamond buyer selection",
        imagePosition: "right",
      },
    ],
    preparingSection: [
      {
        title: "Vorbereitung Ihres Diamanten vor dem Verkauf",
        content: "Sammeln Sie vor dem Verkauf alle notwendigen Dokumente, um das Vertrauen der Käufer zu stärken und Ihren Verkaufspreis zu optimieren.\n\nSammeln Sie Zertifikate und Dokumente: Die Original-Kaufrechnung, das Diamantengraduierungszertifikat (GIA, IGI usw.), Garantiepapiere und frühere Gutachten. Diese Dokumente erhöhen das Vertrauen des Käufers und können Ihren Verkaufspreis steigern.\n\nReinigen und inspizieren Sie Ihren Schmuck: Die Präsentation ist entscheidend. Ein professionell gereinigter Diamant sieht brillanter und attraktiver aus. Selbst eine einfache, sanfte Reinigung zu Hause kann sein Erscheinungsbild verbessern.\n\nÜberprüfen Sie die Fassung auf Beschädigungen. Lose Krallen oder Kratzer können die Bewertung beeinflussen. Eine professionelle Inspektion stellt sicher, dass Sie eine genaue Bewertung erhalten.",
      },
    ],
    sellingProcessSection: [
      {
        title: "Schritt-für-Schritt-Ablauf beim Verkauf Ihres Diamanten",
        content: "Schritt 1 – Details einreichen: Teilen Sie zunächst grundlegende Informationen über Ihren Diamanten mit (Art des Schmucks, Karatgewicht, Zertifizierung, Fotos). Dies hilft Experten, eine erste Wertschätzung vorzunehmen.\n\nSchritt 2 – Professionelle Bewertung: Als Nächstes folgt die detaillierte Inspektion. Experten prüfen die Echtheit, die Qualitätsstufe, die Marktnachfrage und den Zustand des Stücks. Dies garantiert eine faire und präzise Bewertung.\n\nSchritt 3 – Transparentes Angebot: Nach der Bewertung erhalten Sie ein klares Angebot, das auf dem realen Marktwert basiert — ohne versteckte Abzüge oder Überraschungen in letzter Minute. Sie können annehmen oder ablehnen. Ganz ohne Druck.\n\nSchritt 4 – Sichere Zahlung: Sobald das Angebot angenommen wurde, wird die Zahlung sicher über verifizierte Bankkanäle abgewickelt. Schnell, sicher und dokumentiert.",
      },
    ],
    servicesSections: [
      {
        label: "WARUM DALILA DIAMONDS",
        heading: "Warum Dalila Diamonds ein erstklassiger<br />Lieferant und Partner ist",
        description:
          "<p class='mb-4'><strong>Globales Branchennetzwerk</strong></p><p class='mb-4'>Ein starkes globales Netzwerk ermöglicht es Diamantenunternehmen, wettbewerbsfähige Preise anzubieten. Käufer, die mit internationalen Juwelieren und Einzelhändlern verbunden sind, können Diamanten effizient weiterverkaufen, was bessere Angebote für die Verkäufer bedeutet.</p><p class='mb-4'><strong>Vertrauen bei Einzelhändlern und Juwelieren</strong></p><p class='mb-4'>Als erstklassiger Diamantenlieferant für das B2B-Geschäft in Belgien anerkannt zu sein, bedeutet die Zusammenarbeit mit:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Einzelhändlern für Schmuck</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Diamantengroßhändlern</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Herstellern und Produzenten</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Luxusmarken</span></li></ul><p>Diese professionelle Nachfrage sorgt für einheitliche Bewertungsstandards und eine faire, marktgerechte Preisgestaltung.</p>",
        imageSrc: "/selllSafe/step_4.png",
        imageAlt: "Dalila Diamonds global network",
        imagePosition: "left",
      },
      {
        label: "ONLINE VS. OFFLINE VERKAUFEN",
        heading: "Vorteile des Online-Verkaufs<br />von Diamanten im Vergleich zu Offline",
        description:
          "<p class='mb-4'>Der Online-Verkauf über ein vertrauenswürdiges Unternehmen bietet folgende Vorteile:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Bequemlichkeit von zu Hause aus</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Professionelle Fernbewertung</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Zugriff auf globale Käufer</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Schnellere Angebote</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Sicherer, versicherter Versand</span></li></ul><p>Der Offline-Verkauf mag traditionell erscheinen, schränkt Sie jedoch oft auf lokale Käufer und weniger Preisvergleiche ein.</p>",
        imageSrc: "/selllSafe/recieve_your_payment.png",
        imageAlt: "Online diamond selling advantages",
        imagePosition: "right",
      },
    ],
    safetyTipsSection: [
      {
        title: "Sicherheitstipps beim Verkauf von wertvollem Schmuck",
        content: "Schützen Sie sich und Ihren wertvollen Diamanten mit diesen wichtigen Sicherheitsrichtlinien.\n\nVermeiden Sie reine Bargeschäfte: Große Bargeldtransaktionen sind riskant und oft nicht zurückverfolgbar. Bevorzugen Sie immer Banküberweisungen, verifizierte Zahlungsbelege und schriftliche Vereinbarungen.\n\nÜberprüfen Sie die Zugangsdaten des Unternehmens: Überprüfen Sie vor dem Verkauf die Authentizität der Website, lesen Sie Kundenbewertungen, bestätigen Sie das Vorhandensein eines physischen Büros und sorgen Sie für eine sichere Kommunikation.\n\nNutzen Sie den versicherten Versand: Wenn Sie Ihren Diamanten einsenden, nutzen Sie immer voll versicherte und nachverfolgbare Versanddienste. Versenden Sie Wertsachen niemals ohne ausreichenden Versicherungsschutz.\n\nEin seriöses Diamantenunternehmen verbirgt niemals seine Daten und sorgt während des gesamten Prozesses für eine transparente Kommunikation.",
      },
    ],
    commonMistakesSection: [
      {
        title: "Häufige Fehler, die Sie beim Verkauf von Diamanten vermeiden sollten",
        content: "Viele Verkäufer verlieren Geld aufgrund einfacher Fehler, die sich leicht vermeiden lassen.\n\nVerkauf ohne Zertifizierung – Lassen Sie Ihren Diamanten immer von anerkannten Labors wie GIA oder IGI zertifizieren, um einen besseren Preis zu erzielen.\n\nSofortige Annahme des ersten Angebots – Vergleichen Sie mehrere Angebote, um den tatsächlichen Marktwert zu verstehen.\n\nKeine Recherche zum Marktwert – Informieren Sie sich vor der Annahme eines Angebots darüber, zu welchen Preisen ähnliche Diamanten gehandelt werden.\n\nIgnorieren des Rufs des Käufers – Überprüfen Sie immer die Glaubwürdigkeit des Käufers und lesen Sie Bewertungen anderer Verkäufer.\n\nEile aufgrund von Dringlichkeit – Geduld kann Ihren Endpreis erheblich steigern. Lassen Sie sich nicht durch Zeitdruck zu einem schlechten Geschäft drängen.",
      },
    ],
    bestPriceSection: [
      {
        title: "So erzielen Sie den besten Preis für Ihren Diamanten",
        content: "Maximieren Sie den Wert Ihres Diamanten durch kluges Timing und einen strategischen Ansatz.\n\nTiming des Verkaufs: Die Nachfrage steigt während der Hochzeitssaison, zu Feiertagen und in den Haupteinkaufsphasen des Luxuseinzelhandels. Der Verkauf bei starker Nachfrage kann die Angebote verbessern.\n\nVergleich mehrerer Angebote: Vergleichen Sie immer mindestens 2-3 Angebote. Dies hilft Ihnen, einen realistischen Marktwert zu verstehen und Unterbewertungen zu vermeiden.\n\nVollständige Unterlagen vorlegen: Wenn Sie alle Zertifikate, Kaufbelege und Gutachten parat haben, erhöht dies das Vertrauen des Käufers und kann den Preis um 15-20% steigern.\n\nProfessionelle Reinigung: Ein gut gepflegter, sauberer Diamant lässt sich besser fotografieren und hinterlässt bei der Bewertung einen stärkeren Eindruck.",
      },
    ],
    sellerSections: [
      {
        label: "WER DIAMANTEN VERKAUFEN KANN",
        heading: "Wer Diamanten an Dalila Diamonds<br />verkaufen kann",
        description:
          "<p class='mb-4'>Fast jeder kann verkaufen:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Einzelpersonen mit altem Schmuck</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Personen, die ein Ring-Upgrade wünschen</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Familien, die Erbstücke verkaufen</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Investoren, die Vermögenswerte liquidieren</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Händler, die Lagerbestände abbauen</span></li></ul><p>Jeder Diamant hat einen Wert, wenn er professionell bewertet wird.</p>",
        imageSrc: "/selllSafe/step_2.png",
        imageAlt: "Who can sell diamonds",
        imagePosition: "left",
      },
      {
        label: "ARTEN VON DIAMANTEN",
        heading: "Verkauf von Verlobungsringen,<br />Erbstücken und losen Diamanten",
        description:
          "<p class='mb-4'>Verschiedene Arten von Diamanten erfordern unterschiedliche Bewertungsansätze:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Verlobungsringe</strong> – Der Wert hängt vom Stein + der Fassung ab</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Erbstücke</strong> – Der antike Wert kann den Preis erhöhen</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Lose Diamanten</strong> – Einfacher zu bewerten und oft schneller zu verkaufen</span></li></ul><p>Professionelle Käufer berücksichtigen sowohl den emotionalen als auch den Marktwert.</p>",
        imageSrc: "/selllSafe/diamondwork.png",
        imageAlt: "Different types of diamond jewelry",
        imagePosition: "right",
      },
    ],
    finalChecklistSection: [
      {
        title: "Letzte Checkliste vor dem Verkauf Ihres Diamanten",
        content: "Bestätigen Sie vor dem endgültigen Verkauf alle diese wesentlichen Punkte.\n\n✓ Zertifizierung bereit – Ihr Diamantengraduierungszertifikat von GIA, IGI oder einem anderen anerkannten Labor.\n\n✓ Fotos aufgenommen – Klare, hochwertige Bilder aus verschiedenen Blickwinkeln, die das Funkeln des Diamanten zeigen.\n\n✓ Schmuck gereinigt – Professionelle Reinigung oder schonende Reinigung zu Hause abgeschlossen.\n\n✓ Käufer verifiziert – Zugangsdaten, Bewertungen und Ruf des Unternehmens gründlich überprüft.\n\n✓ Zahlungsmethode bestätigt – Sichere Banküberweisung oder verifiziertes Zahlungssystem vereinbart.\n\n✓ Angebot sorgfältig geprüft – Vergleichen Sie es mit den Marktwerten und anderen Angeboten, die Sie erhalten haben.",
      },
    ],
    conclusionSection: [
      {
        title: "Verkaufen Sie Ihren Diamanten sicher und nahtlos",
        content: "Machen Sie den Verkauf Ihres Diamanten zu einer reibungslosen, sicheren und lohnenden Erfahrung.\n\nDer Verkauf Ihres Diamanten muss weder kompliziert noch riskiert sein. Mit der richtigen Vorbereitung, dem Verständnis des Wertes und einem vertrauenswürdigen professionellen Käufer kann der Prozess reibungslos, sicher und lohnend verlaufen.\n\nEgal, ob Sie einen Verlobungsring, ein Erbstück oder einen losen Stein verkaufen: Die Wahl eines zuverlässigen Unternehmens garantiert Transparenz, faire Preise und eine sichere Zahlung.\n\nWenn Sie eine problemlose Erfahrung wünschen, die auf Branchenvertrauen und globaler Nachfrage basiert, kann die Zusammenarbeit mit einem anerkannten Premium-Diamantenlieferanten für B2B-Geschäfte wie Dalila Diamonds den entscheidenden Unterschied ausmachen.\n\nVerkaufen Sie klug, bleiben Sie sicher und lassen Sie Ihren Diamanten seine nächste glänzende Geschichte finden.",
      },
    ],
    faqsSection: [
      {
        title: "Häufig gestellte Fragen (FAQ)",
        content: "F: Woher kenne ich den Wiederverkaufswert meines Diamanten?\n\nA: Eine professionelle Bewertung, die die 4Cs, die Zertifizierung und die aktuelle Marktnachfrage berücksichtigt, ermittelt den genauen Wiederverkaufswert.\n\nF: Ist es sicher, Diamanten online zu verkaufen?\n\nA: Ja, wenn Sie sich für ein verifiziertes Unternehmen entscheiden, das versicherten Versand, transparente Bewertung und sichere Zahlungen bietet.\n\nF: Benötige ich ein Zertifikat, um meinen Diamanten zu verkaufen?\n\nA: Dies ist nicht zwingend erforderlich, aber eine Zertifizierung erhöht das Vertrauen und führt in der Regel zu einem höheren Preis.\n\nF: Wie lange dauert der Verkaufsprozess?\n\nA: Bei einem professionellen Käufer kann dies je nach Bewertung und Zahlungsabwicklung einige Tage bis eine Woche dauern.\n\nF: Kann ich beschädigten oder alten Diamantschmuck verkaufen?\n\nA: Ja. Auch beschädigte Fassungen oder alte Designs behalten ihren Wert, da der Diamant selbst bewertet wird.",
      },
    ],
  },
  nl: {
    whySellingSection: [
      {
        title: "Waarom het verkopen van diamanten zorg en planning vereist",
        content: "Het verkopen van een diamant is niet zoals het verkopen van een oude telefoon of een meubelstuk. Het is meer als het verkopen van een schat — waardevol, emotioneel geladen en soms complex om te prijzen.\n\nOf het nu gaat om een verlovingsring, een erfstuk of een losse steen, u wilt dat het proces soepel, veilig en rendabel verloopt.\n\nVeel mensen maken zich zorgen: Krijg ik wel de juiste prijs? Is de koper betrouwbaar? Is het veilig om online te verkopen?\n\nHet goede nieuws? Met de juiste voorbereiding en een vertrouwde koper als Dalila Diamonds kan de verkoop van uw diamant eenvoudig en stressvrij verlopen.",
      },
    ],
    valueSections: [
      {
        label: "DIAMANTWAARDE BEGRIJPEN",
        heading: "De werkelijke waarde van<br />uw diamant begrijpen",
        description:
          "<p class='mb-4'><strong>De 4C's uitgelegd</strong></p><p class='mb-4'>De waarde van elke diamant hangt af van de bekende 4C's:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Slijpvorm (Cut)</strong> – Bepaalt de schittering en glans</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Kleur (Color)</strong> – Hoe minder kleur, hoe hoger de waarde</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Zuiverheid (Clarity)</strong> – Minder insluitsels betekenen een betere kwaliteit</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Karaat (Carat)</strong> – Het gewicht van de diamant</span></li></ul><p class='mb-4'>Zie de 4C's als het rapport van een diamant. Hoe sterker de beoordelingen, hoe hoger de inkoopwaarde.</p><p><strong>Marktvraag en prijstrends</strong></p><p>Diamantprijzen staan niet voor altijd vast. De marktvraag, designtrends en wereldwijde toeleveringsketens beïnvloeden de restwaarde. Klassieke ronde diamanten verkopen bijvoorbeeld meestal sneller dan ongebruikelijke vormen.</p>",
        imageSrc: "/selllSafe/loose.jpg",
        imageAlt: "Beoordeling van de 4C's",
        imagePosition: "left",
      },
      {
        label: "EEN BETROUWBARE KOPER KIEZEN",
        heading: "Een betrouwbare<br />diamantinkoper kiezen",
        description:
          "<p class='mb-4'><strong>Kenmerken van een betrouwbaar diamantbedrijf</strong></p><p class='mb-4'>Een betrouwbare koper moet het volgende bieden:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Een transparant prijsbepalingsproces</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Een professionele beoordeling</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Veilige verzending of persoonlijke inspectie</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Duidelijke betalingsvoorwaarden</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Een goede reputatie bij klanten</span></li></ul><p class='mb-4'>Een premium bedrijf legt uit hoe zij de waarde berekenen in plaats van vage biedingen te doen.</p><p class='mb-4'><strong>Risico's van verkopen aan niet-geverifieerde kopers</strong></p><p class='mb-4'>Verkopen aan onbekende personen of niet-geverifieerde handelaren kan leiden tot:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Te lage prijsbiedingen (onderwaardering)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Betalingsvertragingen</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Risico op fraude</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Ontbreken van documentatie</span></li></ul><p>Als een deal te snel gaat of te mooi klinkt om waar te zijn, dan is dat meestal ook zo.</p>",
        imageSrc: "/selllSafe/sell-diamonds.jpg",
        imageAlt: "Keuze van betrouwbare diamantinkoper",
        imagePosition: "right",
      },
    ],
    preparingSection: [
      {
        title: "Uw diamant voorbereiden op de verkoop",
        content: "Verzamel voor de verkoop alle nodige documenten om het vertrouwen van de koper te vergroten en uw verkoopprijs te optimaliseren.\n\nVerzamel certificaten en documenten: De originele aankoopfactuur, het diamantgradatiecertificaat (GIA, IGI, enz.), garantiepapieren en eerdere taxaties. Deze documenten verhogen het vertrouwen van de koper en kunnen uw verkoopprijs verhogen.\n\nReinig en inspecteer uw sieraden: Presentatie is belangrijk. Een professioneel gereinigde diamant ziet er schitterender en aantrekkelijker uit. Zelfs een eenvoudige, zachte reiniging thuis kan het uiterlijk verbeteren.\n\nControleer de zetting op beschadigingen. Losse klauwen of krassen kunnen de waardebepaling beïnvloeden. Een professionele inspectie zorgt ervoor dat u een nauwkeurige waardebepaling krijgt.",
      },
    ],
    sellingProcessSection: [
      {
        title: "Stappenplan voor het verkopen van uw diamant",
        content: "Stap 1 – Gegevens indienen: Deel eerst basisinformatie over uw diamant (type sieraad, karaatgewicht, certificering, foto's). Dit helpt experts om een eerste inschatting te maken.\n\nStap 2 – Professionele beoordeling: Vervolgens vindt de gedetailleerde inspectie plaats. Experts controleren de echtheid, de kwaliteitsklasse, de marktvraag en de staat van het sieraad. Dit garandeert een eerlijke en nauwkeurige waardebepaling.\n\nStap 3 – Transparant aanbod: Na de beoordeling ontvangt u een helder aanbod op basis van de reële marktwaarde — zonder verborgen kosten of verrassingen op het laatste moment. U bent vrij om dit te accepteren of te weigeren. Zonder druk.\n\nStap 4 – Veilige betaling: Zodra het aanbod is geaccepteerd, wordt de betaling veilig verwerkt via geverifieerde bankkanalen. Snel, veilig en gedocumenteerd.",
      },
    ],
    servicesSections: [
      {
        label: "WAAROM DALILA DIAMONDS",
        heading: "Waarom Dalila Diamonds een premium<br />leverancier en inkooppartner is",
        description:
          "<p class='mb-4'><strong>Wereldwijd B2B-netwerk</strong></p><p class='mb-4'>Een sterk wereldwijd netwerk stelt diamantbedrijven in staat om concurrerende prijzen te bieden. Kopers die verbonden zijn met internationale juweliers en retailers kunnen diamanten efficiënt doorverkopen, wat betere aanbiedingen oplevert voor verkopers.</p><p class='mb-4'><strong>Vertrouwd door retailers en juweliers</strong></p><p class='mb-4'>Erkend worden als een premium diamantleverancier voor B2B-activiteiten in België betekent nauwe samenwerking met:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Retailers in fijne sieraden</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Diamantgroothandelaren</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Fabrikanten en ateliers</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Luxemerken</span></li></ul><p>Deze professionele vraag zorgt voor consistente beoordelingsnormen en eerlijke, marktconforme prijzen.</p>",
        imageSrc: "/selllSafe/step_4.png",
        imageAlt: "Dalila Diamonds netwerk",
        imagePosition: "left",
      },
      {
        label: "ONLINE VS OFFLINE VERKOPEN",
        heading: "Voordelen van online verkopen<br />in vergelijking met offline",
        description:
          "<p class='mb-4'>Online verkopen via een betrouwbaar bedrijf biedt de volgende voordelen:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Gemak vanuit uw eigen huis</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Professionele beoordeling op afstand</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Toegang tot wereldwijde kopers</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Snellere aanbiedingen</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Veilige, verzekerde verzending</span></li></ul><p>Offline verkopen lijkt traditioneel, maar beperkt u vaak tot lokale kopers en minder prijsvergelijkingen.</p>",
        imageSrc: "/selllSafe/recieve_your_payment.png",
        imageAlt: "Voordelen online verkopen",
        imagePosition: "right",
      },
    ],
    safetyTipsSection: [
      {
        title: "Veiligheidstips bij het verkopen van waardevolle sieraden",
        content: "Bescherm uzelf en uw waardevolle diamant met deze essentiële veiligheidsrichtlijnen.\n\nVermijd transacties met alleen contant geld: Grote contante transacties zijn riskant en vaak niet traceerbaar. Geef altijd de voorkeur aan bankoverschrijvingen, geverifieerde betalingsbewijzen en schriftelijke overeenkomsten.\n\nControleer de gegevens van het bedrijf: Controleer voor de verkoop de authenticiteit van de website, lees klantbeoordelingen, bevestig de fysieke aanwezigheid van een kantoor en zorg voor veilige communicatie.\n\nGebruik verzekerde verzending: Als u uw diamant opstuurt, gebruik dan altijd volledig verzekerde en traceerbare verzenddiensten. Verzend kostbaarheden nooit zonder voldoende verzekeringsdekking.\n\nEen gerenommeerd diamantbedrijf verbergt nooit zijn gegevens en zorgt voor transparante communicatie gedurende het hele proces.",
      },
    ],
    commonMistakesSection: [
      {
        title: "Veelgemaakte fouten om te vermijden bij diamantverkoop",
        content: "Veel verkopers verliezen geld door eenvoudige fouten die gemakkelijk te vermijden zijn.\n\nVerkopen zonder certificaat – Laat uw diamant altijd certificeren door erkende laboratoria zoals GIA of IGI voor een betere prijsbepaling.\n\nHet eerste aanbod direct accepteren – Vergelijk meerdere aanbiedingen om de werkelijke marktwaarde te begrijpen.\n\nGeen onderzoek doen naar de marktwaarde – Informeer uzelf over de prijzen van vergelijkbare diamanten voordat u een aanbod accepteert.\n\nDe reputatie van de koper negeren – Controleer altijd de geloofwaardigheid van de koper en lees beoordelingen van andere verkopers.\n\nHaast door urgentie – Geduld kan uw uiteindelijke prijs aanzienlijk verhogen. Laat tijdsdruk u niet dwingen tot een slechte deal.",
      },
    ],
    bestPriceSection: [
      {
        title: "Hoe u de beste prijs voor uw diamant krijgt",
        content: "Maximaliseer de waarde van uw diamant door slimme timing en een strategische aanpak.\n\nTiming van de verkoop: De vraag stijgt tijdens het trouwseizoen, de feestdagen en in de belangrijkste inkoopfases van de luxedetailhandel. Verkopen tijdens periodes met veel vraag kan de aanbiedingen verbeteren.\n\nVergelijking van meerdere aanbiedingen: Vergelijk altijd minstens 2 tot 3 aanbiedingen. Dit helpt u om een realistische marktwaarde te begrijpen en onderwaardering te voorkomen.\n\nVollledige documentatie overleggen: Als u alle certificaten, aankoopbewijzen en taxaties bij de hand heeft, vergroot dit het vertrouwen van de koper en kan dit de prijs met 15-20% verhogen.\n\nProfessionele reiniging: Een goed onderhouden, schone diamant laat zich beter fotograferen en laat bij de beoordeling een sterkere indruk achter.",
      },
    ],
    sellerSections: [
      {
        label: "WIE KAN DIAMANTEN VERKOPEN",
        heading: "Wie diamanten aan Dalila Diamonds<br />kan verkopen",
        description:
          "<p class='mb-4'>Vrijwel iedereen kan verkopen:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Particulieren met oude sieraden</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Mensen die een upgrade van een ring wensen</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Families die erfstukken verkopen</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Beleggers die activa liquideren</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Handelaren die hun voorraden willen afbouwen</span></li></ul><p>Elke diamant heeft waarde als deze professioneel wordt beoordeeld.</p>",
        imageSrc: "/selllSafe/step_2.png",
        imageAlt: "Wie kan diamanten verkopen",
        imagePosition: "left",
      },
      {
        label: "SOORTEN DIAMANTEN",
        heading: "Verkoop van verlovingsringen,<br />erfstukken en losse diamanten",
        description:
          "<p class='mb-4'>Verschillende soorten diamanten vereisen een verschillende beoordelingsaanpak:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Verlovingsringen</strong> – De waarde hangt af van de steen + de zetting</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Erfstukken</strong> – Antieke waarde kan de prijs verhogen</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Losse diamanten</strong> – Gemakkelijker te beoordelen en vaak sneller te verkopen</span></li></ul><p>Professionele kopers houden rekening met zowel de emotionele waarde als de marktwaarde.</p>",
        imageSrc: "/selllSafe/diamondwork.png",
        imageAlt: "Soorten diamantensieraden",
        imagePosition: "right",
      },
    ],
    finalChecklistSection: [
      {
        title: "Laatste checklist voor de verkoop van uw diamant",
        content: "Controleer voor de definitieve verkoop al deze essentiële punten.\n\n✓ Certificering gereed – Uw diamantgradatiecertificaat van GIA, IGI of een ander erkend laboratorium.\n\n✓ Foto's gemaakt – Duidelijke, hoogwaardige foto's vanuit verschillende hoeken die de schittering van de diamant tonen.\n\n✓ Sieraden gereinigd – Professionele reiniging of voorzichtige reiniging thuis voltooid.\n\n✓ Koper geverifieerd – Gegevens, beoordelingen en reputatie van het bedrijf grondig gecontroleerd.\n\n✓ Betalingsmethode bevestigd – Veilige bankoverschrijving of geverifieerd betalingssysteem overeengekomen.\n\n✓ Aanbod zorgvuldig beoordeeld – Vergelijk het met de marktwaarden en andere aanbiedingen die u heeft ontvangen.",
      },
    ],
    conclusionSection: [
      {
        title: "Verkoop uw diamant veilig en eenvoudig",
        content: "Maak van het verkopen van uw diamant een soepele, veilige en lonende ervaring.\n\nHet verkopen van uw diamant hoeft niet ingewikkeld of riskant te zijn. Met de juiste voorbereiding, inzicht in de waarde en een betrouwbare professionele koper kan het proces soepel, veilig en lonend verlopen.\n\nOf u nu een verlovingsring, een erfstuk of een losse steen verkoopt: de keuze voor een betrouwbaar bedrijf garandeert transparantie, eerlijke prijzen en een veilige betaling.\n\nAls u een probleemloze ervaring wilt op basis van vertrouwen in de sector en wereldwijde vraag, kan de samenwerking met een erkende premium diamantleverancier voor B2B-activiteiten zoals Dalila Diamonds het verschil maken.\n\nVerkoop slim, blijf veilig en laat uw diamant zijn volgende glanzende verhaal vinden.",
      },
    ],
    faqsSection: [
      {
        title: "Veelgestelde vragen",
        content: "V: Hoe ken ik de inkoopwaarde van mijn diamant?\n\nA: Een professionele taxatie die rekening houdt met de 4C's, certificering en de huidige marktvraag bepaalt de nauwkeurige inkoopwaarde.\n\nV: Is het veilig om diamanten online te verkopen?\n\nA: Ja, als u kiest voor een geverifieerd bedrijf dat verzekerde verzending, transparante waardebepaling en veilige betalingen biedt.\n\nV: Heb ik een certificaat nodig om mijn diamant te verkopen?\n\nA: Het is niet verplicht, maar een certificering vergroot het vertrouwen en leidt meestal tot een hogere prijs.\n\nV: Hoe lang duurt het verkoopproces?\n\nA: Bij een professionele koper kan dit, afhankelijk van de taxatie en betalingsverwerking, een paar dagen tot een week duren.\n\nV: Kan ik beschadigde of oude diamanten sieraden verkopen?\n\nA: Ja. Zelfs beschadigde zettingen of oude ontwerpen behouden hun waarde omdat de diamant zelf wordt beoordeeld.",
      },
    ],
  },
  fr: {
    whySellingSection: [
      {
        title: "Pourquoi vendre des diamants exige soin et planification",
        content: "Vendre un diamant n'est pas comme vendre un vieux téléphone ou un meuble. C'est plutôt vendre un petit trésor — précieux, chargé d'émotion et parfois difficile à estimer.\n\nQu'il s'agisse d'une alliance, d'un bijou de famille ou d'une pierre non montée, vous voulez que la transaction soit fluide, sécurisée et rentable.\n\nBeaucoup de personnes s'inquiètent : vais-je obtenir le juste prix ? L'acheteur est-il fiable ? Est-il sûr de vendre en ligne ?\n\nLa bonne nouvelle ? Avec une bonne préparation et un acheteur de confiance comme Dalila Diamonds, vendre votre diamant peut être simple et sans stress.",
      },
    ],
    valueSections: [
      {
        label: "COMPRENDRE LA VALEUR D'UN DIAMANT",
        heading: "Comprendre la valeur réelle<br />de votre diamant",
        description:
          "<p class='mb-4'><strong>Les 4C expliqués</strong></p><p class='mb-4'>La valeur de chaque diamant dépend des fameux 4C :</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Taille (Cut)</strong> – Détermine la brillance et l'éclat</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Couleur (Color)</strong> – Moins il y a de couleur, plus la valeur est élevée</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Pureté (Clarity)</strong> – Moins il y a d'inclusions, meilleure est la qualité</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Carat (Carat)</strong> – Le poids du diamant</span></li></ul><p class='mb-4'>Considérez les 4C comme le bulletin de notes d'un diamant. Plus les notes sont élevées, plus sa valeur de revente l'est.</p><p><strong>Demande du marché et tendances de prix</strong></p><p>Le cours des diamants n'est pas fixe. La demande, les tendances de design et l'état du marché mondial influencent la valeur. Les diamants ronds traditionnels se vendent par exemple plus rapidement que les tailles originales.</p>",
        imageSrc: "/selllSafe/loose.jpg",
        imageAlt: "Évaluation des 4C du diamant",
        imagePosition: "left",
      },
      {
        label: "CHOISIR UN ACHETEUR FIABLE",
        heading: "Choisir un acheteur<br />de diamants de confiance",
        description:
          "<p class='mb-4'><strong>Critères d'un établissement diamantaire sérieux</strong></p><p class='mb-4'>Un acheteur de confiance doit offrir :</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Un processus d'estimation transparent</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Une expertise professionnelle</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Un envoi sécurisé ou une inspection physique</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Des modalités de paiement claires</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Une excellente réputation clients</span></li></ul><p class='mb-4'>Une maison sérieuse vous explique comment elle calcule la valeur au lieu de formuler des offres floues.</p><p class='mb-4'><strong>Risques liés aux acheteurs non agréés</strong></p><p class='mb-4'>Vendre à des personnes inconnues ou à des marchands non vérifiés présente des risques :</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Sous-estimation flagrante</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Délais de paiement suspects</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Risques de fraude</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Absence de documents légaux</span></li></ul><p>Si une transaction paraît trop rapide ou trop belle pour être vraie, la prudence est de mise.</p>",
        imageSrc: "/selllSafe/sell-diamonds.jpg",
        imageAlt: "Sélection d'un acheteur de diamants fiable",
        imagePosition: "right",
      },
    ],
    preparingSection: [
      {
        title: "Préparer votre diamant avant la vente",
        content: "Avant de vendre, rassemblez tous les documents nécessaires afin de renforcer la confiance des acheteurs et d'optimiser votre prix de vente.\n\nRassemblez les certificats et documents : Facture d'achat d'origine, certificat de classification du diamant (GIA, IGI, etc.), documents de garantie et expertises antérieures. Ces documents augmentent la confiance de l'acheteur et peuvent valoriser votre offre.\n\nNettoyez et inspectez vos bijoux : La présentation compte. Un diamant nettoyé professionnellement paraît plus brillant et attrayant. Même un nettoyage doux et simple à la maison peut améliorer son apparence.\n\nInspectez la monture pour détecter tout dommage. Des griffes desserrées ou des rayures peuvent affecter l'estimation. Une inspection professionnelle garantit une évaluation juste.",
      },
    ],
    sellingProcessSection: [
      {
        title: "Le processus étape par étape pour vendre votre diamant",
        content: "Étape 1 – Soumission des détails : Commencez par partager les informations de base sur votre diamant (type de bijou, poids en carats, certification, photos). Cela aide nos experts à réaliser une première estimation.\n\nÉtape 2 – Évaluation professionnelle : Vient ensuite l'inspection minutieuse. Les experts vérifient l'authenticité, la qualité de la taille, la demande du marché et l'état général. Cela assure une estimation équitable et précise.\n\nStep 3 – Offre transparente : Après évaluation, vous recevez une offre claire basée sur la valeur réelle du marché — sans frais cachés ni surprises de dernière minute. Vous êtes libre d'accepter ou de refuser. Sans pression.\n\nÉtape 4 – Paiement sécurisé : Une fois acceptée, la transaction est réglée de manière sécurisée par virement bancaire. Rapide, sûr et documenté.",
      },
    ],
    servicesSections: [
      {
        label: "POURQUOI DALILA DIAMONDS",
        heading: "Pourquoi Dalila Diamonds est un fournisseur<br />haut de gamme et un partenaire de confiance",
        description:
          "<p class='mb-4'><strong>Réseau sectoriel mondial</strong></p><p class='mb-4'>Un réseau mondial solide permet aux maisons diamantaires de proposer des prix compétitifs. Les acheteurs en lien direct avec des joailliers et détaillants internationaux peuvent revendre les pierres efficacement, ce qui garantit de meilleures offres pour les vendeurs.</p><p class='mb-4'><strong>La confiance des joailliers et détaillants</strong></p><p class='mb-4'>Être reconnu comme un fournisseur de diamants haut de gamme pour l'activité B2B en Belgique implique des partenariats avec :</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Des détaillants en joaillerie</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Des grossistes en diamants</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Des fabricants et ateliers</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Des marques de luxe</span></li></ul><p>Cette demande professionnelle garantit des normes d'évaluation constantes et des prix conformes au marché mondial.</p>",
        imageSrc: "/selllSafe/step_4.png",
        imageAlt: "Réseau Dalila Diamonds",
        imagePosition: "left",
      },
      {
        label: "VENTE EN LIGNE VS EN BOUTIQUE",
        heading: "Avantages de la vente de diamants<br />en ligne par rapport au physique",
        description:
          "<p class='mb-4'>Vendre en ligne à un établissement de confiance offre les avantages suivants :</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Simplicité depuis votre domicile</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Évaluation professionnelle à distance</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Accès aux acheteurs mondiaux</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Obtention rapide des offres</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Envoi sécurisé avec assurance</span></li></ul><p>La vente en boutique physique peut sembler rassurante, mais elle vous limite souvent à des acheteurs locaux et à moins de comparaisons.</p>",
        imageSrc: "/selllSafe/recieve_your_payment.png",
        imageAlt: "Avantages de la vente de diamant en ligne",
        imagePosition: "right",
      },
    ],
    safetyTipsSection: [
      {
        title: "Conseils de sécurité lors de la vente de bijoux de valeur",
        content: "Protégez-vous et protégez votre précieux diamant grâce à ces règles de sécurité indispensables.\n\nÉvitez les règlements en espèces : Les grosses transactions en liquide sont risquées et souvent impossibles à tracer. Privilégiez toujours les virements bancaires, les reçus vérifiés et les contrats écrits.\n\nVérifiez les références de la société : Avant de vendre, vérifiez l'authenticité du site web, lisez les avis clients, confirmez l'existence d'un bureau physique et communiquez via des canaux sécurisés.\n\nUtilisez des envois assurés : Si vous envoyez votre diamant, optez toujours pour des services d'expédition entièrement assurés avec suivi. N'envoyez jamais d'objets de valeur sans une couverture d'assurance adéquate.\n\nUne maison diamantaire sérieuse ne masque jamais ses coordonnées et garantit une communication claire tout au long du processus.",
      },
    ],
    commonMistakesSection: [
      {
        title: "Erreurs courantes à éviter lors de la vente de diamants",
        content: "De nombreux vendeurs perdent de l'argent en raison d'erreurs simples qui peuvent facilement être évitées.\n\nVendre sans certificat – Faites toujours certifier votre diamant par des laboratoires reconnus comme le GIA ou l'IGI pour obtenir une meilleure estimation.\n\nAccepter immédiatement la première offre – Comparez plusieurs propositions pour cerner la valeur réelle sur le marché.\n\nNe pas étudier le cours du marché – Renseignez-vous sur les prix de vente de diamants similaires avant d'accepter une offre.\n\nIgnorer la réputation de l'acheteur – Vérifiez toujours le sérieux de l'acheteur et consultez les avis d'autres vendeurs.\n\nSe presser par urgence – La patience peut augmenter sensiblement votre prix final. Ne laissez pas la pression du temps vous pousser vers une mauvaise transaction.",
      },
    ],
    bestPriceSection: [
      {
        title: "Comment obtenir le meilleur prix pour votre diamant",
        content: "Maximisez la valeur de votre diamant grâce à un calendrier intelligent et une approche stratégique.\n\nChoisir le bon moment : La demande augmente pendant la saison des mariages, les fêtes de fin d'année et les cycles d'achat de la haute joaillerie. Vendre pendant les périodes de forte demande peut améliorer les offres.\n\nComparer plusieurs offres : Comparez toujours au moins 2 ou 3 estimations. Cela vous aide à comprendre la valeur réelle sur le marché et à éviter les sous-estimations.\n\nPrésenter un dossier complet : Avoir tous les certificats, factures d'achat et anciennes expertises sous la main rassure l'acheteur et peut augmenter le prix de 15 à 20 %.\n\nNettoyage professionnel : Un diamant propre et bien entretenu se photographie mieux et produit une impression plus forte lors de l'estimation.",
      },
    ],
    sellerSections: [
      {
        label: "QUI PEUT VENDRE DES DIAMANTS",
        heading: "Qui peut vendre des diamants<br />à Dalila Diamonds",
        description:
          "<p class='mb-4'>Pratiquement tout le monde peut vendre :</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Des particuliers possédant d'anciens bijoux</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Des personnes souhaitant modifier une bague</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Des familles vendant des bijoux d'héritage</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Des investisseurs liquidant des placements</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Des professionnels réduisant leurs stocks</span></li></ul><p>Chaque diamant a une valeur lorsqu'il est estimé par un professionnel.</p>",
        imageSrc: "/selllSafe/step_2.png",
        imageAlt: "Qui peut vendre des diamants",
        imagePosition: "left",
      },
      {
        label: "TYPES DE DIAMANTS",
        heading: "Vente de bagues de fiançailles,<br />bijoux d'héritage et diamants non montés",
        description:
          "<p class='mb-4'>Les différents types de diamants requièrent des méthodes d'estimation distinctes :</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Bagues de fiançailles</strong> – La valeur dépend de la pierre + de la monture</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Héritage</strong> – Une valeur historique ou antique peut majorer le prix</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Diamants non montés</strong> – Plus faciles à classer et souvent plus rapides à vendre</span></li></ul><p>Les acheteurs professionnels prennent en compte à la fois la valeur affective et la valeur marchande.</p>",
        imageSrc: "/selllSafe/diamondwork.png",
        imageAlt: "Types de bijoux en diamant",
        imagePosition: "right",
      },
    ],
    finalChecklistSection: [
      {
        title: "Liste de contrôle finale avant de vendre votre diamant",
        content: "Avant de finaliser la vente, confirmez tous ces points essentiels.\n\n✓ Certificat prêt – Votre certificat de classification du diamant du GIA, de l'IGI ou d'un autre laboratoire reconnu.\n\n✓ Photos prises – Des images nettes et de haute qualité sous différents angles montrant la brillance de la pierre.\n\n✓ Bijoux nettoyés – Nettoyage professionnel ou nettoyage doux à la maison effectué.\n\n✓ Acheteur vérifié – Références, avis et réputation de la société vérifiés minutieusement.\n\n✓ Mode de paiement validé – Virement bancaire sécurisé ou système de paiement agréé convenu.\n\n✓ Offre étudiée avec soin – Comparez l'offre avec les cours du marché et les autres estimations reçues.",
      },
    ],
    conclusionSection: [
      {
        title: "Vendez votre diamant en toute sécurité et simplicité",
        content: "Faites de la vente de votre diamant une expérience fluide, sûre et avantageuse.\n\nVendre votre diamant ne doit pas être complexe ni risqué. Avec une bonne préparation, une bonne compréhension de la valeur et un acheteur professionnel de confiance, le processus peut être fluide, sûr et avantageux.\n\nQue vous vendiez une bague de fiançailles, un bijou d'héritage ou une pierre non montée, le choix d'un établissement sérieux garantit transparence, prix équitables et paiement sécurisé.\n\nSi vous souhaitez une transaction sereine appuyée sur la confiance du secteur et une demande internationale, s'adresser à un fournisseur de diamants premium reconnu pour le B2B comme Dalila Diamonds peut faire toute la différence.\n\nVendez intelligemment, restez en sécurité et laissez votre diamant écrire sa prochaine belle histoire.",
      },
    ],
    faqsSection: [
      {
        title: "Questions fréquemment posées",
        content: "Q : Comment connaître la valeur de revente de mon diamant ?\n\nR : Une expertise professionnelle tenant compte des 4C, du certificat et de la demande du marché permet de déterminer la valeur exacte.\n\nQ : Est-il sûr de vendre des diamants en ligne ?\n\nR : Oui, à condition de choisir une société agréée offrant des envois assurés, une estimation claire et des règlements sécurisés.\n\nQ : Dois-je posséder un certificat pour vendre mon diamant ?\n\nR : Ce n'est pas obligatoire, mais un certificat augmente la confiance et permet d'obtenir un meilleur tarif.\n\nQ : Combien de temps prend le processus de vente ?\n\nR : Avec un acheteur professionnel, cela peut prendre de quelques jours à une semaine selon les formalités d'expertise et de paiement.\n\nQ : Puis-je vendre des bijoux en diamant anciens ou cassés ?\n\nR : Oui. Même les montures abîmées ou les designs anciens conservent leur valeur car le diamant lui-même est expertisé.",
      },
    ],
  },
  es: {
    whySellingSection: [
      {
        title: "Por qué vender diamantes requiere cuidado y planificación",
        content: "Vender un diamante no es como vender un teléfono viejo o un mueble. Es más bien como vender un pequeño tesoro — valioso, con carga emocional y, a veces, difícil de valorar.\n\nYa sea un anillo de compromiso, una joya familiar o una piedra suelta, desea que el proceso sea sencillo, seguro y rentable.\n\nA muchas personas les preocupa: ¿obtendré el precio justo? ¿El comprador es confiable? ¿Es seguro vender en línea ?\n\n¿La buena noticia? Con la preparación adecuada y un comprador de confianza como Dalila Diamonds, vender su diamante puede ser simple y sin estrés.",
      },
    ],
    valueSections: [
      {
        label: "COMPRENDER EL VALOR DEL DIAMANTE",
        heading: "Comprender el valor real<br />de su diamante",
        description:
          "<p class='mb-4'><strong>Las 4C explicadas</strong></p><p class='mb-4'>El valor de cada diamante depende de las famosas 4C:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Corte (Cut)</strong> – Determina el brillo y el centelleo</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Color (Color)</strong> – Cuanto menos color, mayor es el valor</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Pureza (Clarity)</strong> – Menos inclusiones significan mejor calidad</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Quilates (Carat)</strong> – El peso del diamante</span></li></ul><p class='mb-4'>Piense en las 4C como la boleta de calificaciones de un diamante. Cuanto más altas sean las calificaciones, mayor será su valor de reventa.</p><p><strong>Demanda del mercado y tendencias de precios</strong></p><p>Los precios de los diamantes no son fijos. La demanda, las tendencias de diseño y las cadenas de suministro mundiales influyen en el valor de reventa. Los diamantes redondos clásicos, por ejemplo, suelen venderse más rápido que las tallas inusuales.</p>",
        imageSrc: "/selllSafe/loose.jpg",
        imageAlt: "Evaluación de las 4C del diamante",
        imagePosition: "left",
      },
      {
        label: "ELEGIR UN COMPRADOR DE CONFIANZA",
        heading: "Elegir un comprador<br />de diamantes de confianza",
        description:
          "<p class='mb-4'><strong>Señales de una empresa de diamantes seria</strong></p><p class='mb-4'>Un comprador de confianza debe ofrecer:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Proceso de fijación de precios transparente</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Evaluación profesional</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Envío seguro o inspección en persona</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Condiciones de pago claras</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Excelente reputación entre los clientes</span></li></ul><p class='mb-4'>Una firma premium le explica cómo calculan el valor en lugar de darle ofertas confusas.</p><p class='mb-4'><strong>Riesgos de vender a compradores no verificados</strong></p><p class='mb-4'>Vender a personas desconocidas o a intermediarios no verificados presenta riesgos:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Subvaloración significativa</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Retrasos en el pago</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Riesgos de fraude</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Falta de documentos</span></li></ul><p>Si una transacción parece demasiado rápida o demasiado buena para ser verdad, probablemente no lo sea.</p>",
        imageSrc: "/selllSafe/sell-diamonds.jpg",
        imageAlt: "Selección de comprador de diamantes confiable",
        imagePosition: "right",
      },
    ],
    preparingSection: [
      {
        title: "Preparación de su diamante antes de venderlo",
        content: "Antes de vender, reúna toda la documentación necesaria para aumentar la confianza de los compradores y optimizar su precio de venta.\n\nReúna los certificados y documentos : Factura original de compra, certificado de clasificación del diamante (GIA, IGI, etc.), documentos de garantía y valoraciones anteriores. Estos documentos incrementan la confianza del comprador y pueden valorizar su oferta.\n\nLimpie e inspeccione sus joyas : La presentación es importante. Un diamante limpio profesionalmente luce más brillante y atractivo. Incluso una limpieza suave en casa puede mejorar su apariencia.\n\nInspeccione la montura para detectar daños. Las garras flojas o los arañazos pueden afectar la valoración. Una inspección profesional garantiza una tasación justa.",
      },
    ],
    sellingProcessSection: [
      {
        title: "El proceso paso a paso para vender su diamante",
        content: "Paso 1 – Envíe los detalles: Comience por compartir información básica sobre su diamante (tipo de joya, quilates, certificación, fotos). Esto ayuda a nuestros expertos a realizar una estimación inicial.\n\nPaso 2 – Evaluación profesional: A continuación, se realiza la inspección minuciosa. Los expertos comprueban la autenticidad, la calidad de la talla, la demanda del mercado y el estado general. Esto asegura una tasación justa y precisa.\n\nPaso 3 – Oferta transparente: Tras la evaluación, recibe una oferta clara basada en el valor real del mercado — sin cargos ocultos ni sorpresas de último momento. Es libre de aceptar o rechazar. Sin presión.\n\nPaso 4 – Pago seguro: Una vez aceptada, la transacción se procesa de manera segura a través de transferencias bancarias. Rápido, seguro y documentado.",
      },
    ],
    servicesSections: [
      {
        label: "POR QUÉ DALILA DIAMONDS",
        heading: "Por qué Dalila Diamonds es un proveedor<br />premium y un socio de confianza",
        description:
          "<p class='mb-4'><strong>Red global del sector</strong></p><p class='mb-4'>Una red mundial sólida permite a las firmas de diamantes ofrecer precios competitivos. Los compradores conectados con joyerías y minoristas internacionales pueden revender las piedras eficientemente, lo que garantiza mejores ofertas para los vendedores.</p><p class='mb-4'><strong>La confianza de los minoristas y joyeros</strong></p><p class='mb-4'>Ser reconocido como un proveedor de diamantes premium para el negocio B2B en Bélgica implica colaboraciones con:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Minoristas de joyería fina</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Mayoristas de diamantes</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Fabricantes y talleres</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Marcas de lujo</span></li></ul><p>Esta demanda profesional garantiza estándares de valoración uniformes y precios acordes con el mercado mundial.</p>",
        imageSrc: "/selllSafe/step_4.png",
        imageAlt: "Red Dalila Diamonds",
        imagePosition: "left",
      },
      {
        label: "VENTA EN LÍNEA VS EN TIENDA",
        heading: "Ventajas de vender diamantes<br />en línea frente a tienda física",
        description:
          "<p class='mb-4'>Vender en línea a una empresa de confianza ofrece las siguientes ventajas:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Comodidad desde su hogar</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Evaluación profesional a distancia</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Acceso a compradores globales</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Obtención rápida de ofertas</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Envío seguro con cobertura de seguro</span></li></ul><p>La venta en tienda física puede parecer tradicional, pero a menudo le limita a compradores locales y a menos comparaciones de precios.</p>",
        imageSrc: "/selllSafe/recieve_your_payment.png",
        imageAlt: "Ventajas de la venta de diamantes en línea",
        imagePosition: "right",
      },
    ],
    safetyTipsSection: [
      {
        title: "Consejos de seguridad al vender joyas de valor",
        content: "Protéjase y proteja su valioso diamante con estas pautas de seguridad esenciales.\n\nEvite transacciones solo en efectivo: Las transacciones de grandes sumas en efectivo son riesgosas y difíciles de rastrear. Prefiera siempre transferencias bancarias, recibos de pago verificados y acuerdos por escrito.\n\nVerifique las credenciales de la empresa: Antes de vender, compruebe la autenticidad del sitio web, lea opiniones de clientes, confirme la existencia de una oficina física y comuníquese por canales seguros.\n\nUtilice envíos asegurados: Si envía su diamante, use siempre servicios de mensajería totalmente asegurados y con seguimiento. Nunca envíe objetos de valor sin una cobertura de seguro adecuada.\n\nUna empresa de diamantes seria nunca oculta sus datos y garantiza una comunicación clara durante todo el proceso.",
      },
    ],
    commonMistakesSection: [
      {
        title: "Errores comunes a evitar al vender diamantes",
        content: "Muchos vendedores pierden dinero debido a errores simples que pueden evitarse fácilmente.\n\nVender sin certificado – Haga certificar siempre su diamante por laboratorios reconocidos como el GIA o el IGI para obtener un mejor precio.\n\nAceptar inmediatamente la primera oferta – Compare múltiples propuestas para entender el valor real del mercado.\n\nNo investigar el precio del mercado – Infórmese sobre los precios de venta de diamantes similares antes de aceptar una oferta.\n\nIgnorar la reputación del comprador – Verifique siempre la credibilidad del comprador y consulte las opiniones de otros vendedores.\n\nTener prisa por urgencia – La paciencia puede aumentar sensiblemente su precio final. No deje que la prisa le empuje a una mala transacción.",
      },
    ],
    bestPriceSection: [
      {
        title: "Cómo obtener el mejor precio por su diamante",
        content: "Maximice el valor de su diamante gracias a un calendario inteligente y un enfoque estratégico.\n\nElegir el momento de venta: La demanda aumenta durante la temporada de bodas, periodos festivos y ciclos de compra de la alta joyería. Vender durante periodos de alta demanda puede mejorar las ofertas.\n\nComparar múltiples ofertas: Compare siempre al menos 2 o 3 presupuestos. Esto le ayuda a comprender el valor real en el mercado y a evitar subvaloraciones.\n\nPresentar un expediente completo: Tener todos los certificados, facturas de compra y tasaciones anteriores a mano genera confianza y puede aumentar el precio entre un 15 y un 20%.\n\nLimpieza profesional: Un diamante limpio y bien mantenido se fotografía mejor y produce una impresión más fuerte durante la evaluación.",
      },
    ],
    sellerSections: [
      {
        label: "QUIÉN PUEDE VENDER DIAMANTES",
        heading: "Quién puede vender diamantes<br />a Dalila Diamonds",
        description:
          "<p class='mb-4'>Casi cualquier persona puede vender:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Particulares con joyas antiguas</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Personas que desean mejorar un anillo</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Familias que venden joyas heredadas</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Inversores que liquidan activos</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Minoristas que liquidan inventario</span></li></ul><p>Cada diamante tiene valor cuando se evalúa profesionalmente.</p>",
        imageSrc: "/selllSafe/step_2.png",
        imageAlt: "Quién puede vender diamantes",
        imagePosition: "left",
      },
      {
        label: "TIPOS DE DIAMANTES",
        heading: "Venta de anillos de compromiso,<br />joyas heredadas y diamantes sueltos",
        description:
          "<p class='mb-4'>Los diferentes tipos de diamantes requieren distintos métodos de evaluación:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Anillos de compromiso</strong> – El valor depende de la piedra + de la montura</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Joyas heredadas</strong> – Un valor antiguo o de época puede incrementar el precio</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Diamantes sueltos</strong> – Más fáciles de clasificar y a menudo más rápidos de vender</span></li></ul><p>Los compradores profesionales tienen en cuenta tanto el valor sentimental como el valor de mercado.</p>",
        imageSrc: "/selllSafe/diamondwork.png",
        imageAlt: "Tipos de joyas de diamantes",
        imagePosition: "right",
      },
    ],
    finalChecklistSection: [
      {
        title: "Lista de control final antes de vender su diamante",
        content: "Antes de finalizar la venta, confirme todos estos puntos esenciales.\n\n✓ Certificado listo – Su certificado de clasificación del diamante del GIA, del IGI u otro laboratorio reconocido.\n\n✓ Fotos tomadas – Imágenes nítidas y de alta calidad desde múltiples ángulos que muestren el brillo de la piedra.\n\n✓ Joyas limpias – Limpieza profesional o limpieza suave en casa realizada.\n\n✓ Comprador verificado – Credenciales, opiniones y reputación de la empresa verificadas minuciosamente.\n\n✓ Método de pago confirmado – Transferencia bancaria segura o sistema de pago verificado acordado.\n\n✓ Oferta revisada cuidadosamente – Compare con los precios del mercado y las otras estimaciones recibidas.",
      },
    ],
    conclusionSection: [
      {
        title: "Venda su diamante de forma segura y sencilla",
        content: "Haga de la venta de su diamante una experiencia fluida, segura y provechosa.\n\nVender su diamante no tiene por qué ser complejo ni riesgoso. Con la preparación adecuada, el entendimiento del valor y un comprador profesional de confianza, el proceso puede ser fluido, seguro y provechoso.\n\nYa sea que venda un anillo de compromiso, una joya heredada o una piedra suelta, elegir una empresa seria garantiza transparencia, precios razonables y pago seguro.\n\nSi desea una transacción sin complicaciones respaldada por la confianza del sector y la demanda internacional, colaborar con un proveedor de diamantes premium reconocido para B2B como Dalila Diamonds puede marcar la diferencia.\n\nVenda inteligentemente, manténgase a salvo y deje que su diamante encuentre su siguiente historia brillante.",
      },
    ],
    faqsSection: [
      {
        title: "Preguntas frecuentes",
        content: "P: ¿Cómo sé el valor de reventa de mi diamante?\n\nR: Una evaluación profesional que tenga en cuenta las 4C, la certificación y la demanda del mercado permite determinar el valor de reventa exacto.\n\nP: ¿Es seguro vender diamantes en línea?\n\nR: Sí, siempre que elija una empresa autorizada que ofrezca envíos asegurados, una tasación clara y pagos seguros.\n\nP: ¿Necesito un certificado para vender mi diamante?\n\nR: No es obligatorio, pero un certificado genera confianza y suele resultar en un precio más alto.\n\nP: ¿Cuánto tiempo tarda el proceso de venta?\n\nR: Con un comprador profesional, puede tardar desde unos días hasta una semana dependiendo de las formalidades de evaluación y pago.\n\nP: ¿Puedo vender joyas de diamantes antiguas o dañadas?\n\nR: Sí. Incluso las monturas dañadas o los diseños antiguos conservan su valor porque el diamante en sí es evaluado.",
      },
    ],
  },
  it: {
    whySellingSection: [
      {
        title: "Perché vendere diamanti richiede cura e pianificazione",
        content: "Vendere un diamante non è come vendere un vecchio telefono o un mobile. Assomiglia di più alla vendita di un piccolo tesoro — prezioso, carico di emozione e a volte difficile da valutare.\n\nChe si tratti di una fede, di un gioiello di famiglia o di una pietra sfusa, desiderate che la transazione sia fluida, sicura e redditizia.\n\nMolte persone si preoccupano: otterrò il giusto prezzo? L'acquirente è affidabile? È sicuro vendere online?\n\nLa buona notizia? Con la giusta preparazione e un acquirente di fiducia come Dalila Diamonds, vendere il vostro diamante può essere semplice e senza stress.",
      },
    ],
    valueSections: [
      {
        label: "COMPRENDERE IL VALORE DEL DIAMANTE",
        heading: "Comprendere il valore reale<br />del vostro diamante",
        description:
          "<p class='mb-4'><strong>Le 4C spiegate</strong></p><p class='mb-4'>Il valore di ciascun diamante dipende dalle famose 4C:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Taglio (Cut)</strong> – Determina la brillantezza e lo splendore</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Colore (Color)</strong> – Meno colore c'è, maggiore è il valore</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Purezza (Clarity)</strong> – Meno inclusioni significano migliore qualità</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Carati (Carat)</strong> – Il peso del diamante</span></li></ul><p class='mb-4'>Pensate alle 4C come alla pagella di un diamante. Più alti sono i voti, maggiore sarà il suo valore di rivendita.</p><p><strong>Domanda del mercato e tendenze dei prezzi</strong></p><p>I prezzi dei diamanti non sono fissi. La domanda, le tendenze di design e le catene di fornitura globali influenzano il valore. I diamanti rotondi classici si vendono ad esempio più rapidamente rispetto ai tagli particolari.</p>",
        imageSrc: "/selllSafe/loose.jpg",
        imageAlt: "Valutazione delle 4C del diamante",
        imagePosition: "left",
      },
      {
        label: "SCEGLIERE UN ACQUIRENTE AFFIDABILE",
        heading: "Scegliere un acquirente<br />di diamanti di fiducia",
        description:
          "<p class='mb-4'><strong>Caratteristiche di una società di diamanti seria</strong></p><p class='mb-4'>Un acquirente di fiducia deve offrire:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Un processo di stima trasparente</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Una valutazione professionale</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Una spedizione sicura o un'ispezione fisica</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Modalità di pagamento chiare</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Un'ottima reputazione clienti</span></li></ul><p class='mb-4'>Un'azienda premium vi spiega come calcola il valore invece di formularvi offerte vaghe.</p><p class='mb-4'><strong>Rischi legati ad acquirenti non verificati</strong></p><p class='mb-4'>Vendere a persone sconosciute o a commercianti non verificati presenta dei rischi:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Sottovalutazione significativa</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Ritardi di pagamento sospetti</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Rischi di truffe</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Assenza di documenti legali</span></li></ul><p>Se una transazione appare troppo rapida o troppo bella per essere vera, la prudenza è d'obbligo.</p>",
        imageSrc: "/selllSafe/sell-diamonds.jpg",
        imageAlt: "Selezione di acquirente di diamanti affidabile",
        imagePosition: "right",
      },
    ],
    preparingSection: [
      {
        title: "Preparare il vostro diamante prima della vendita",
        content: "Prima di vendere, raccogliete tutti i documenti necessari al fine di rafforzare la fiducia degli acquirenti e ottimizzare il prezzo di vendita.\n\nRaccogliete i certificati e i documenti : Fattura d'acquisto originale, certificato di classificazione del diamante (GIA, IGI, ecc.), documenti di garanzia e perizie precedenti. Questi documenti aumentano la fiducia dell'acquirente e possono valorizzare la vostra offerta.\n\nPulite e ispezionate i vostri gioielli : La presentazione conta. Un diamante pulito professionalmente appare più brillante e attraente. Anche una pulizia semplice e delicata a casa può migliorare il suo aspetto.\n\nIspezionate la montatura per rilevare eventuali danni. Griffe allentate o graffi possono influenzare la valutazione. Un'ispezione professionale garantisce una stima equa.",
      },
    ],
    sellingProcessSection: [
      {
        title: "Il processo passo dopo passo per vendere il vostro diamante",
        content: "Passo 1 – Invio dei dettagli: Cominciate condividendo informazioni di base sul vostro diamante (tipo di gioiello, carati, certificazione, foto). Questo aiuta i nostri esperti a realizzare una stima iniziale.\n\nPasso 2 – Valutazione professionale: Segue poi l'ispezione minuziosa. Gli esperti verificano l'autenticità, la qualità del taglio, la domanda del mercato e lo stato generale. Questo assicura una stima equa e precisa.\n\nPasso 3 – Offerta trasparente: Dopo la valutazione, ricevete un'offerta chiara basata sul valore reale del mercato — senza costi nascosti o sorprese dell'ultimo minuto. Siete liberi di accettare o rifiutare. Senza pressioni.\n\nPasso 4 – Pagamento sicuro: Una volta accettata, la transazione viene regolata in modo sicuro tramite bonifico bancario. Rapido, sicuro e documentato.",
      },
    ],
    servicesSections: [
      {
        label: "PERCHÉ DALILA DIAMONDS",
        heading: "Perché Dalila Diamonds è un fornitore<br />di fascia alta e un partner di fiducia",
        description:
          "<p class='mb-4'><strong>Rete globale del settore</strong></p><p class='mb-4'>Una rete mondiale solida consente alle aziende di diamanti di offrire prezzi competitivi. Gli acquirenti in contatto diretto con gioiellieri e dettaglianti internazionali possono rivendere le pietre in modo efficiente, il che garantisce migliori offerte per i venditori.</p><p class='mb-4'><strong>La fiducia dei gioiellieri e dei dettaglianti</strong></p><p class='mb-4'>Essere riconosciuto come un fornitore di diamanti premium per l'attività B2B in Belgio implica collaborazioni con:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Dettaglianti di gioielleria raffinata</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Grossisti di diamanti</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Produttori e laboratori</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Marchi di lusso</span></li></ul><p>Questa domanda professionale garantisce standard di valutazione costanti e prezzi conformi al mercato mondiale.</p>",
        imageSrc: "/selllSafe/step_4.png",
        imageAlt: "Rete Dalila Diamonds",
        imagePosition: "left",
      },
      {
        label: "VENDITA ONLINE VS IN NEGOZIO",
        heading: "Vantaggi della vendita di diamanti<br />online rispetto al negozio fisico",
        description:
          "<p class='mb-4'>Vendere online a un'azienda di fiducia offre i seguenti vantaggi:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Comodità da casa vostra</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Valutazione professionale a distanza</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Accesso agli acquirenti globali</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Ottenimento rapido delle offerte</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Spedizione sicura con assicurazione</span></li></ul><p>La vendita in negozio fisico può sembrare tradizionale, ma spesso vi limita ad acquirenti locali e a meno confronti di prezzo.</p>",
        imageSrc: "/selllSafe/recieve_your_payment.png",
        imageAlt: "Vantaggi della vendita di diamanti online",
        imagePosition: "right",
      },
    ],
    safetyTipsSection: [
      {
        title: "Consigli di sicurezza nella vendita di gioielli di valore",
        content: "Proteggetevi e proteggete il vostro prezioso diamante grazie a queste regole di sicurezza indispensabili.\n\nEvitate i pagamenti in contanti : Le transazioni di grandi somme in contanti sono rischiose e difficili da tracciare. Privilegiate sempre bonifici bancari, ricevute verificate e contratti scritti.\n\nVerificate i riferimenti della società : Prima di vendere, verificate l'autenticità del sito web, leggete le recensioni dei clienti, confermate l'esistenza di un ufficio fisico e comunicate attraverso canali sicuri.\n\nUtilizzate spedizioni assicurate : Se spedite il vostro diamante, optate sempre per servizi di spedizione interamente assicurati con tracciamento. Non spedite mai oggetti di valore senza un'adeguata copertura assicurativa.\n\nUn'azienda di diamanti seria non nasconde mai i propri contatti e garantisce una comunicazione chiara durante tutto il processo.",
      },
    ],
    commonMistakesSection: [
      {
        title: "Errori comuni da evitare nella vendita di diamanti",
        content: "Molti venditori perdono denaro a causa di errori semplici che possono essere facilmente evitati.\n\nVendere senza certificato – Fate sempre certificare il vostro diamante da laboratori riconosciuti come il GIA o l'IGI per ottenere un'offerta migliore.\n\nAccettare immediatamente la prima offerta – Confrontate più proposte per capire il valore reale sul mercato.\n\nNon studiare i listini del mercato – Informatevi sui prezzi di vendita di diamanti simili prima di accettare un'offerta.\n\nIgnorare la reputazione dell'acquirente – Verificate sempre la serietà dell'acquirente e consultate le recensioni di altri venditori.\n\nAvere fretta – La pazienza può aumentare sensibilmente il vostro prezzo finale. Non lasciate che la fretta vi spinga verso una cattiva transazione.",
      },
    ],
    bestPriceSection: [
      {
        title: "Come ottenere il miglior prezzo per il vostro diamante",
        content: "Massimizzate il valore del vostro diamante grazie a una tempistica intelligente e a un approccio strategico.\n\nScegliere il momento giusto : La domanda aumenta durante la stagione dei matrimoni, le festività e i cicli di acquisto dell'alta gioielleria. Vendere durante i periodi di forte domanda può migliorare le offerte.\n\nConfrontare più offerte : Confrontate sempre almeno 2 o 3 stime. Questo vi aiuta a capire il valore reale sul mercato e ad evitare sottovalutazioni.\n\nPresentare un fascicolo completo : Avere tutti i certificati, le fatture d'acquisto e le vecchie stime a portata di mano rassicura l'acquirente e può aumentare il prezzo del 15-20%.\n\nPulizia professionale : Un diamante pulito e ben mantenuto si fotografa meglio e produce un'impressione più forte durante la valutazione.",
      },
    ],
    sellerSections: [
      {
        label: "CHI PUÒ VENDERE DIAMANTI",
        heading: "Chi può vendere diamanti<br />a Dalila Diamonds",
        description:
          "<p class='mb-4'>Praticamente tutti possono vendere:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Privati in possesso di vecchi gioielli</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Persone che desiderano modificare un anello</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Famiglie che vendono gioielli d'eredità</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Investitori che liquidano patrimoni</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Operatori commerciali che riducono le scorte</span></li></ul><p>Ogni diamante ha un valore se valutato da un professionista.</p>",
        imageSrc: "/selllSafe/step_2.png",
        imageAlt: "Chi può vendere diamanti",
        imagePosition: "left",
      },
      {
        label: "TIPI DI DIAMANTE",
        heading: "Vendita di anelli di fidanzamento,<br />gioielli di eredità e diamanti sfusi",
        description:
          "<p class='mb-4'>I diversi tipi di diamanti richiedono metodi di valutazione distinti:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Anelli di fidanzamento</strong> – Il valore dipende dalla pietra + dalla montatura</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Eredità</strong> – Un valore antico o d'epoca può maggiorare il prezzo</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Diamanti sfusi</strong> – Più facili da classificare e spesso più veloci da vendere</span></li></ul><p>Gli acquirenti professionali tengono conto sia del valore affettivo sia del valore di mercato.</p>",
        imageSrc: "/selllSafe/diamondwork.png",
        imageAlt: "Tipi di gioielli con diamanti",
        imagePosition: "right",
      },
    ],
    finalChecklistSection: [
      {
        title: "Lista di controllo finale prima di vendere il vostro diamante",
        content: "Prima di finalizzare la vendita, confermate tutti questi punti essenziali.\n\n✓ Certificato pronto – Il vostro certificato di classificazione del diamante del GIA, dell'IGI o di un altro laboratorio riconosciuto.\n\n✓ Foto scattate – Immagini nitide e di alta qualità da più angolazioni che mostrino la brillantezza della pietra.\n\n✓ Gioielli puliti – Pulizia professionale o pulizia delicata a casa completata.\n\n✓ Acquirente verificato – Riferimenti, recensioni e reputazione della società verificati minuziosamente.\n\n✓ Metodo di pagamento confermato – Bonifico bancario sicuro o sistema di pagamento verificato concordato.\n\n✓ Offerta esaminata con cura – Confrontate l'offerta con i listini di mercato e le altre stime ricevute.",
      },
    ],
    conclusionSection: [
      {
        title: "Vendete il vostro diamante in tutta sicurezza e semplicità",
        content: "Rendete la vendita del vostro diamante un'esperienza fluida, sicura e conveniente.\n\nVendere il vostro diamante non deve essere complesso o rischioso. Con la giusta preparazione, comprensione del valore e un acquirente professionale di fiducia, il processo può essere fluido, sicuro e conveniente.\n\nChe vendiate un anello di fidanzamento, un gioiello di eredità o una pietra sfusa, la scelta di una società seria garantisce trasparenza, prezzi equi e pagamento sicuro.\n\nSe desiderate una transazione serena basata sulla fiducia del settore e una domanda internazionale, collaborare con un fornitore di diamanti premium riconosciuto per il B2B come Dalila Diamonds può fare la differenza.\n\nVendete con intelligenza, restate al sicuro e lasciate che il vostro diamante trovi la sua prossima bella storia.",
      },
    ],
    faqsSection: [
      {
        title: "Domande frequenti",
        content: "D: Come conosco il valore di rivendita del mio diamante?\n\nR: Una valutazione professionale che tiene conto delle 4C, del certificato e della domanda del mercato consente di determinare il valore di rivendita esatto.\n\nD: È sicuro vendere diamanti online?\n\nR: Sì, a condizione di scegliere una società autorizzata che offre spedizioni assicurate, una stima chiara e pagamenti sicuri.\n\nD: Ho bisogno di un certificato per vendere il mio diamante?\n\nR: Non è obbligatorio, ma un certificato aumenta la fiducia e consente di ottenere un prezzo superiore.\n\nD: Quanto tempo richiede il processo di vendita?\n\nR: Con un acquirente professionale, può richiedere da pochi giorni a una settimana a seconda delle formalità di stima e pagamento.\n\nD: Posso vendere gioielli in diamanti antichi o rotti?\n\nR: Sì. Anche le montature danneggiate o i design antichi conservano il proprio valore poiché il diamante stesso viene valutato.",
      },
    ],
  },
};

export function getSellContent(locale: string): SellContent {
  const normLocale = locale || "en";
  return contentByLocale[normLocale] || contentByLocale["en"];
}
