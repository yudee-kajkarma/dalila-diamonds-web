/**
 * Single source of truth for Google fonts.
 *
 * next/font runs its loader once per module-scope call, and the loader's
 * internal cssCache/fontCache are single-use (they delete the entry after one
 * hit), so duplicating these declarations across component files multiplies the
 * number of build-time requests to fonts.googleapis.com. At ~276 call sites the
 * burst was large enough that Google served a throttled response, which the
 * loader could not parse -- failing the Vercel build. Import from here instead
 * of calling the loaders again.
 *
 * Each `variable` name is load-bearing: globals.css declares --font-jost and
 * --font-playfair, and components apply `.variable` to scope the next/font
 * override. Do not rename them.
 *
 * Weights are the union of every set previously declared across the codebase,
 * so no call site loses a weight it was relying on.
 */
import { Marcellus, Jost, Maven_Pro, Playfair_Display } from "next/font/google";

export const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const mavenPro = Maven_Pro({
  variable: "--font-maven-pro",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
