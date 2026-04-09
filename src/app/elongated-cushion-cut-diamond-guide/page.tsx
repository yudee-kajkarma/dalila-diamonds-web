import { Marcellus, Jost } from "next/font/google";
import ElongatedCushionBanner from "@/components/pages/resources/ElongatedCushionBanner";
import ResourceSidebar from "@/components/pages/resources/ResourceSidebar";
import { ContentSection } from "@/components/pages/seopage/SeoPageContent";
import { Metadata } from "next";
import AnimatedContainer from "@/components/shared/AnimatedContainer";

export const metadata: Metadata = {
    title: "Elongated Cushion Cut Diamond Guide | Dalila Diamonds",
    description: "Discover everything you need to know about elongated cushion cut diamonds — proportions, colour, clarity, settings and more. Expert guidance from Dalila Diamonds.",
    alternates: {
        canonical: "https://www.daliladiamonds.com/elongated-cushion-cut-diamond-guide",
    },
};

const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: "400",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export default function ElongatedCushionCutDiamondGuidePage() {

  const historySection: ContentSection[] = [
    {
      title: "A Shape With History and Character",
      content: "To understand the elongated cushion, it helps to understand where the cushion cut itself came from. The shape traces its origins to the early nineteenth century, evolving from what jewellers of that era called the old mine cut. The old mine cut was a product of hand-craftsmanship rather than mathematical precision: stones were shaped by hand, with large facets, a high crown, a small table, and a rounded square outline that followed the natural crystal form of the rough diamond. These stones were designed to perform in candlelight \u2014 they produced warm, romantic flashes of colour rather than the white sparkle we associate with modern cuts.\n\nAs cutting technology advanced through the late nineteenth and early twentieth centuries, the cushion cut was gradually refined. Cutters introduced greater mathematical consistency, improved facet alignment, and optimised the proportions for electric light rather than candlelight. The result was a shape that retained all the romance and depth of the old mine cut but with far more reliable brilliance and symmetry.\n\nThe elongated variation emerged more recently, as jewellers and consumers discovered that stretching the length-to-width ratio transformed the stone\u2019s presence on the hand. A stone with a ratio of 1.20 or above reads differently from a square cushion: it appears longer, more slender, more contemporary, and often more unusual \u2014 the kind of ring that people notice and ask about. At Dalila Diamonds, the elongated cushion has become a signature shape for clients who want a diamond that feels personal rather than generic, distinctive rather than safe.",
    },
  ];

  const proportionsSection: ContentSection[] = [
    {
      title: "Understanding Proportions: The Detail That Defines a Stone",
      content: "The single most important characteristic of an elongated cushion cut is its length-to-width ratio. This figure, calculated by dividing the stone\u2019s length by its width, determines how elongated the outline appears. A ratio of 1.00 produces a perfect square. At 1.10, the stone begins to read as rectangular. The elongated cushion territory starts at approximately 1.15, and the sweet spot that most gemologists \u2014 and most of our clients \u2014 favour sits between 1.20 and 1.25.\n\nBelow 1.15, the stone tends to look like a conventional square cushion and loses the flattering elongation that makes this shape so appealing. Above 1.30, the proportions shift noticeably and the stone begins to resemble a radiant or oval cut, which may not be what you are looking for. The 1.20 to 1.25 range hits the balance perfectly: unmistakably elongated, genuinely flattering on a wide range of hand shapes and finger widths, but still recognisably a cushion.\n\nBeyond the length-to-width ratio, the two other critical proportions to evaluate are depth percentage and table percentage. Depth percentage is calculated by dividing the stone\u2019s depth by its width and expressing it as a percentage. For an elongated cushion, we recommend a depth between 60% and 67%. Stones cut shallower than 60% may appear larger face-up but will sacrifice brilliance and structural integrity. Stones cut deeper than 67% will retain carat weight in the depth of the stone rather than expressing it across the face \u2014 they look smaller than their carat weight suggests, and they often lack the liveliness that makes a diamond compelling.\n\nTable percentage \u2014 the size of the large flat facet on top of the stone as a proportion of the overall width \u2014 should sit between 58% and 68%. A table outside this range will affect how light enters and exits the stone, compromising the balance between brilliance and fire that is one of the cushion cut\u2019s most appealing qualities.\n\nOne reason these proportions matter so much for cushion cuts specifically is that, unlike round brilliants, fancy shapes such as the elongated cushion do not receive a cut grade from the Gemological Institute of America (GIA). A round brilliant graded \u201CExcellent\u201D by the GIA has passed a rigorous series of cut quality assessments. An elongated cushion with a GIA certificate will have a colour grade, a clarity grade, and measurements \u2014 but no cut grade. This places a greater responsibility on the buyer, or on the gemologist advising them, to evaluate the proportions directly. At Dalila Diamonds, our team reviews the proportion data of every stone we offer before it reaches our clients.",
    },
  ];

  const facetSection: ContentSection[] = [
    {
      title: "Cushion Brilliant vs Modified Cushion: Choosing Your Sparkle",
      content: "Within the category of elongated cushion cuts, there is a further distinction that significantly affects how a stone looks in person: the facet arrangement. There are two primary styles.\n\nThe cushion brilliant uses a facet pattern that is similar in structure to a round brilliant, producing a pattern of large, distinct sparkle \u2014 clear, bold flashes of white light and colour that are easy to read from a distance. This is the more traditional of the two looks, and it is particularly appealing to buyers who want the stone to perform visibly even in lower light conditions or when viewed across a room.\n\nThe modified cushion brilliant \u2014 often called the \u2018crushed ice\u2019 cushion \u2014 has additional facets below the girdle that create a very different visual effect. Instead of distinct flashes, the stone produces a continuous, shimmering internal pattern that resembles the surface of crushed ice or the texture of a snowflake. It is a more diffuse, contemporary look that photographs beautifully and tends to appeal to buyers with a modern aesthetic sensibility.\n\nNeither facet arrangement is objectively superior. The choice comes down to personal preference and how you intend to wear and view the stone. If you want something that commands attention in all lighting conditions and reads as a diamond instantly at arm\u2019s length, the cushion brilliant may be your preference. If you are drawn to something more quietly mesmerising \u2014 something that rewards close attention \u2014 the crushed ice pattern may resonate more strongly. At Dalila Diamonds, we are happy to show you examples of both styles in person or via our virtual consultation service.",
    },
  ];

  const colourSection: ContentSection[] = [
    {
      title: "Colour: What Grade Do You Actually Need?",
      content: "The cushion cut retains colour more readily than a round brilliant. This is a function of its facet arrangement and depth: the stone holds warmth in a way that a highly efficient round brilliant does not. For buyers seeking a white or near-colourless appearance, this has practical implications for which colour grade to prioritise.\n\nIf the stone will be set in a white metal \u2014 platinum, white gold, or palladium \u2014 the cool tone of the setting will make any warmth in the diamond more visible by contrast. In this case, we generally recommend a colour grade of H or above, with G or F being excellent choices for clients who want a reliably white appearance without paying for D, E, or F grades where the difference is imperceptible to the naked eye in most lighting conditions.\n\nIf the stone will be set in yellow gold or rose gold, the calculation changes. The warmth of the metal absorbs and masks the warmth of the diamond, allowing you to move comfortably into the I or even J colour range without any visible compromise in appearance. A J colour elongated cushion set in 18ct yellow gold can look every bit as beautiful as an H colour stone set in platinum \u2014 and typically at a meaningfully lower price point. At Dalila Diamonds, we will always show you how a stone performs in its intended setting before you commit.\n\nOne final note on colour: the elongated cushion can sometimes show a concentration of colour toward its corners or along its length. When evaluating stones, ask to see them face-up in the intended setting rather than relying solely on the colour grade printed on the certificate.",
    },
  ];

  const claritySection: ContentSection[] = [
    {
      title: "Clarity: Where to Focus Your Budget",
      content: "The cushion cut\u2019s facet structure is generally forgiving of inclusions, particularly those positioned toward the edges or corners of the stone. The large facets and dynamic light performance of the cushion mean that internal characteristics which would be conspicuous in a step-cut diamond \u2014 an emerald cut, for example \u2014 are far less visible in a cushion.\n\nFor most buyers, an eye-clean VS2 or SI1 stone represents excellent value in an elongated cushion. Eye-clean means that no inclusions are visible to the naked eye when the stone is viewed face-up from a normal viewing distance of approximately 15 to 20 centimetres. Achieving this standard in a VS2 or SI1 grade typically costs significantly less than a VVS2 or VS1 stone while producing a result that is visually indistinguishable to anyone other than a gemologist with a loupe.\n\nThat said, the position and nature of any inclusions matter as much as the grade itself. A VS2 stone with a large crystal inclusion directly beneath the table can be more visually impactful than an SI1 stone with feather inclusions tucked near the girdle. At Dalila Diamonds, we review the inclusion plot on every stone\u2019s certificate and, where possible, inspect the stone directly before we are confident recommending it to a client.\n\nIf you are purchasing a stone without the benefit of in-person inspection \u2014 for example, when sourcing a stone online \u2014 we strongly recommend requesting a magnified video of the stone alongside the certificate. A well-shot video will tell you far more than a grade on a page.",
    },
  ];

  const comparisonSection: ContentSection[] = [
    {
      title: "How the Elongated Cushion Compares to Similar Shapes",
      content: "Clients who are drawn to the elongated cushion are often simultaneously considering the oval cut, the radiant cut, or the elongated emerald cut. Each has a distinct character, and understanding the differences will help you confirm whether the elongated cushion is right for you.\n\nThe oval cut shares the elongated outline and the finger-flattering silhouette, but produces a different light performance. Ovals can be prone to what gemologists call the \u2018bow-tie effect\u2019 \u2014 a shadow across the centre of the stone caused by light escaping through the facets rather than returning to the eye. A well-cut oval minimises this, but it is always worth checking. The elongated cushion does not exhibit a bow-tie in the same way, and its softer corners feel more cushioned and romantic than the sharper tips of an oval.\n\nThe radiant cut is the elongated cushion\u2019s closest visual relative. Both are brilliant-cut rectangular shapes with cropped corners. The key difference is in the outline: the radiant cut has straight sides and a more angular appearance, while the cushion cut\u2019s sides curve gently inward, giving it that characteristic soft, pillowy feel. The choice between the two often comes down to whether you prefer a cleaner, more architectural look (radiant) or something warmer and more organic (cushion).\n\nThe elongated emerald cut offers a completely different kind of beauty. The step-cut facets of an emerald produce a hall-of-mirrors effect: deep, geometric, and architectural. It is a quieter, more minimal style compared to the fire and brilliance of the cushion. If you are drawn to both shapes, the question is whether you want a diamond that sparkles or one that glows.",
    },
  ];

  const settingSection: ContentSection[] = [
    {
      title: "Setting Your Elongated Cushion to Maximum Effect",
      content: "The elongated cushion is one of the most versatile diamond shapes when it comes to setting. Its softened corners and balanced proportions work well in a range of styles, from the most classic to the most contemporary.\n\nThe Four-Claw Solitaire \u2014 The simplest and most enduring choice. Four prongs positioned at the corners of the stone protect the most vulnerable points of the diamond without obscuring the face-up view. This setting maximises light entry from all directions and lets the stone\u2019s beauty speak without distraction. At Dalila Diamonds, we offer four-claw solitaires in platinum, 18ct white gold, 18ct yellow gold, and 18ct rose gold, with the option of tapered or cathedral bands to adjust the overall feel of the ring.\n\nThe Halo Setting \u2014 A halo of round brilliant or pav\u00e9-set diamonds surrounding the elongated cushion adds significant perceived size \u2014 typically making the centre stone appear 0.30 to 0.50 carats larger than its actual weight \u2014 and softens the outline further. A double halo intensifies this effect and adds a vintage feel that suits the romantic character of the cushion shape particularly well. For clients working with a defined budget, a halo setting allows a smaller centre stone to deliver the visual impact of a considerably larger one.\n\nThe East-West Setting \u2014 One of the most striking and contemporary ways to wear an elongated cushion is to rotate it 90 degrees, placing the long axis of the stone horizontally across the finger rather than vertically along it. This east-west orientation creates an architectural, fashion-forward look that has gained significant traction in recent seasons. It suits elongated cushions particularly well because the stone\u2019s length, displayed horizontally, creates a bold band of brilliance across the hand. At Dalila Diamonds, several of our most popular bespoke designs feature east-west elongated cushions in minimalist bezel settings.\n\nThree-Stone Settings \u2014 A three-stone setting \u2014 with the elongated cushion as the centre stone flanked by two matching or contrasting side stones \u2014 is a classically romantic choice with additional symbolic resonance (representing past, present, and future). Elongated cushions pair beautifully with tapered baguettes, half-moon shapes, or smaller cushion-cut diamonds as side stones. The key is ensuring the proportions of the side stones complement rather than compete with the centre stone.\n\nA Note on Prong Style \u2014 Whatever setting you choose, ensure the prongs are positioned at the corners of the stone. This protects the most vulnerable points of the diamond without masking the face-up view. Beaded prongs add a subtle vintage character; plain round prongs are cleaner and more contemporary.",
    },
  ];

  const buyingAdviceSection: ContentSection[] = [
    {
      title: "Buying an Elongated Cushion Cut Diamond: Practical Advice",
      content: "Before you begin searching for your stone, it helps to establish your priorities clearly. Most buyers are balancing four factors: carat weight (size), colour, clarity, and cut quality (proportions). The good news is that the elongated cushion\u2019s face-up size advantage \u2014 typically around 10% larger than a round brilliant of the same carat weight \u2014 means you can often achieve the visual presence you want at a lower carat weight than you might expect.\n\nIf size is your primary priority, focus your budget on a strong length-to-width ratio and acceptable depth percentage, and allow yourself more flexibility on colour (moving into the H\u2013I range) and clarity (targeting eye-clean SI1 or VS2). If colour and clarity are paramount, you may choose to accept a slightly lower carat weight in exchange for a cleaner, whiter stone.\n\nAlways request a GIA or AGS certificate for any stone you are considering. These are the two most reputable grading laboratories, and their assessments provide a reliable, standardised basis for comparison. Be cautious of certificates from less well-known laboratories, which may grade more generously and produce misleadingly favourable assessments.\n\nAt Dalila Diamonds, every stone we offer is accompanied by a certificate from a reputable grading laboratory, and our team is available to walk you through the proportions, inclusions, and overall character of any stone in our collection. We offer in-person consultations at our showroom and virtual consultations via video call for clients who are unable to visit us in person.",
    },
  ];

  const conclusionSection: ContentSection[] = [
    {
      title: "Why the Elongated Cushion Endures",
      content: "Diamond shapes fall in and out of fashion, but the elongated cushion has shown genuine staying power. It sits at a rare intersection: romantic without being conventional, distinctive without being eccentric, and flattering on almost every hand. It references the history of the old mine cut while feeling entirely contemporary. It works in a solitaire setting as well as it works in a halo. It suits yellow gold as beautifully as it suits platinum.\n\nMore than any of that, it is simply a beautiful shape. When the proportions are right and the stone has been cut with care, an elongated cushion delivers a depth and warmth of sparkle that is genuinely its own \u2014 different from a round brilliant, different from a radiant, different from an oval. It is a shape that rewards the eye the more you look at it.\n\nAt Dalila Diamonds, we take pride in curating elongated cushion cuts that meet an exacting standard of proportion, cut quality, and overall beauty. If you have questions about any of the information in this guide, or if you would like to begin exploring stones for your own piece, we would be delighted to hear from you.",
    },
  ];

  const renderContentSection = (section: ContentSection) => {
    return (
      <div className="mb-12">
        <AnimatedContainer direction="up">
          <div className="bg-white">
            <div className="w-24 h-1.5 bg-linear-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full"></div>

            <h2
              className={`text-3xl md:text-4xl lg:text-4xl font-bold text-[#1a1a1a] mb-6 leading-tight ${marcellus.className}`}
            >
              {section.title}
            </h2>

            {section.content && (
              <div
                className={`text-gray-700 text-base md:text-lg leading-relaxed mb-6 whitespace-pre-line ${jost.className}`}
              >
                {section.content}
              </div>
            )}

            {section.bulletPoints && section.bulletPoints.length > 0 && (
              <ul className={`space-y-4 ${jost.className}`}>
                {section.bulletPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700 text-base md:text-lg leading-relaxed">
                    <span className="text-[#c89e3a] mt-1 font-bold text-xl shrink-0">&bull;</span>
                    <span className="flex-1">{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </AnimatedContainer>
      </div>
    );
  };

  return (
    <div className={`${marcellus.variable} ${jost.variable} bg-white min-h-screen`}>
      <ElongatedCushionBanner />

      {/* Initial Content Section with Sidebar */}
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Sidebar */}
          <aside className="lg:w-56 w-full shrink-0">
            <AnimatedContainer direction="left">
              <div className="sticky top-4">
                <ResourceSidebar currentPage="elongated-cushion" />
              </div>
            </AnimatedContainer>
          </aside>

          {/* Right Content Area */}
          <main className="flex-1 w-full">
            <article className="pb-8">
              <div className="mb-12">
                <AnimatedContainer direction="up">
                  <div className="bg-white">
                    <div className="w-24 h-1.5 bg-linear-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full"></div>
                    <h2 className={`text-3xl md:text-4xl lg:text-4xl font-bold text-[#1a1a1a] mb-6 leading-tight ${marcellus.className}`}>
                      The Elongated Cushion Cut Diamond: A Complete Buyer{"\u2019"}s Guide from Dalila Diamonds
                    </h2>
                    <div className={`text-gray-700 text-base md:text-lg leading-relaxed mb-6 whitespace-pre-line ${jost.className}`}>
                      {"Few diamond shapes manage to feel both timeless and quietly modern at the same time. The elongated cushion cut is one of the rare exceptions. At "}<a href="https://www.daliladiamonds.com/" target="_blank" rel="noopener noreferrer" className="text-[#c89e3a] underline hover:text-[#a67e2e] transition-colors">Dalila Diamonds,</a>{" we have watched this shape rise steadily from a niche preference to one of the most requested silhouettes in our collection \u2014 and for good reason. It combines the soft, romantic character of the traditional cushion cut with the flattering, finger-lengthening elegance of an elongated outline, producing a stone that simply looks extraordinary on the hand.\n\nThis guide is designed to give you everything you need to make a truly confident, well-informed purchase. Whether you are just beginning to explore "}<a href="https://www.daliladiamonds.com/blogs/Diamond-necklace-guide-timeless-elegance" target="_blank" rel="noopener noreferrer" className="text-[#c89e3a] underline hover:text-[#a67e2e] transition-colors">diamond shapes</a>{" or you have already narrowed your choice to an elongated cushion and want to understand exactly what distinguishes a great stone from a mediocre one, we have written this with your questions in mind. We will cover the history of the cut, how to read proportions, what the grading reports do and do not tell you, how colour and clarity behave in this shape, and how to set it to maximum effect.\n\nAt Dalila Diamonds, we believe that buying a diamond should feel like a privilege, not a puzzle. Our goal with every guide, every consultation, and every stone we curate is to make that process as transparent and enjoyable as it deserves to be."}
                    </div>
                  </div>
                </AnimatedContainer>
              </div>
            </article>
          </main>
        </div>
      </div>

      {/* Full Width Content Sections */}
      <div className="w-full">
        <div className="container mx-auto max-w-7xl px-4 py-8">
          {renderContentSection(historySection[0])}
          {renderContentSection(proportionsSection[0])}
          {renderContentSection(facetSection[0])}
          {renderContentSection(colourSection[0])}
          {renderContentSection(claritySection[0])}
          {renderContentSection(comparisonSection[0])}
          {renderContentSection(settingSection[0])}
          {renderContentSection(buyingAdviceSection[0])}
          {renderContentSection(conclusionSection[0])}
        </div>
      </div>
    </div>
  );
}
