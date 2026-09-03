import { siteConfig } from "../config/site";
import type { Location } from "../data/locations";

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

export function createTaxiServiceJsonLd(location: Location) {
  return {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    name: siteConfig.name,
    url: absoluteUrl(location.url),
    image: absoluteUrl("/images/hero-nuit.webp"),
    telephone: siteConfig.phoneInternational,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "11 chemin de Combes d’Oly",
      postalCode: "31320",
      addressLocality: "Castanet-Tolosan",
      addressCountry: "FR",
    },
    areaServed: {
      "@type": "City",
      name: location.city,
    },
    availableLanguage: "fr",
  };
}
