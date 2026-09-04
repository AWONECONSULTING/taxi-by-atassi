export type Location = {
  slug: string;
  city: string;
  url: string;
  title: string;
  description: string;
  heroTitle: string;
  heroText: string;
  localTitle: string;
  localText: string;
  nearbySlugs: string[];
};

export type ServiceArea = {
  label: string;
  url?: string;
};

export const serviceAreas: ServiceArea[] = [
  { label: "Taxi Castanet-Tolosan", url: "/" },
  { label: "Taxi Toulouse et ses environs", url: "/taxi-toulouse/" },
  { label: "Taxi Aéroport Toulouse-Blagnac", url: "/taxi-blagnac/" },
  { label: "Taxi Gare Toulouse-Matabiau" },
  { label: "Taxi Labège – Innopole – Diagora" },
  { label: "Taxi Hôpital Rangueil – Larrey" },
  { label: "Taxi Ramonville-Saint-Agne – Métro Ramonville" },
  { label: "Taxi MEETT – Parc des Expositions Toulouse" },
];

export const locations: Location[] = [
  {
    slug: "",
    city: "Castanet-Tolosan",
    url: "/",
    title: "Taxi Castanet-Tolosan | Transport 24h/24 – Taxi by Atassi",
    description:
      "Taxi à Castanet-Tolosan disponible 24h/24 pour vos trajets privés et professionnels, transports conventionnés et transports scolaires.",
    heroTitle: "Votre taxi à Castanet-Tolosan",
    heroText: "Un service fiable, ponctuel et confortable pour tous vos déplacements en région toulousaine.",
    localTitle: "Taxi à Castanet-Tolosan et dans le Sud-Est toulousain",
    localText:
      "Basé à Castanet-Tolosan, Taxi by Atassi vous accompagne pour vos trajets locaux, vos rendez-vous à Toulouse et vos transferts vers les gares ou l’aéroport. Réservez à l’avance ou contactez-nous pour une demande immédiate.",
    nearbySlugs: ["taxi-toulouse", "taxi-blagnac"],
  },
  {
    slug: "taxi-toulouse",
    city: "Toulouse",
    url: "/taxi-toulouse/",
    title: "Taxi Toulouse 24h/24 | Taxi by Atassi",
    description:
      "Réservez votre taxi à Toulouse pour un trajet privé ou professionnel, un transport médical conventionné ou un déplacement planifié.",
    heroTitle: "Réservez votre taxi à Toulouse",
    heroText: "Déplacez-vous sereinement dans Toulouse et sa métropole, de jour comme de nuit.",
    localTitle: "Vos déplacements à Toulouse en toute sérénité",
    localText:
      "Taxi by Atassi assure vos courses dans Toulouse, vos rendez-vous professionnels, vos sorties ainsi que vos liaisons avec les gares Matabiau et Saint-Agne. Chaque trajet est préparé avec ponctualité, discrétion et attention.",
    nearbySlugs: ["", "taxi-blagnac"],
  },
  {
    slug: "taxi-blagnac",
    city: "Blagnac",
    url: "/taxi-blagnac/",
    title: "Taxi Blagnac et transfert aéroport | Taxi by Atassi",
    description:
      "Taxi à Blagnac pour vos transferts vers l’aéroport Toulouse-Blagnac et vos déplacements dans l’agglomération toulousaine.",
    heroTitle: "Votre transfert taxi à Blagnac",
    heroText: "Un trajet planifié et confortable vers l’aéroport Toulouse-Blagnac ou votre prochaine destination.",
    localTitle: "Transferts vers l’aéroport Toulouse-Blagnac",
    localText:
      "Pour un départ matinal, une arrivée tardive ou un déplacement professionnel, Taxi by Atassi organise votre liaison avec l’aéroport Toulouse-Blagnac. La prise en charge est planifiée pour vous permettre de voyager sans précipitation.",
    nearbySlugs: ["taxi-toulouse", ""],
  },
];

export const mainLocation = locations[0];

export function getLocalPageLocations() {
  return locations.filter((location) => location.slug);
}

export function getLocationBySlug(slug: string) {
  return locations.find((location) => location.slug === slug);
}

export function getNeighborLocations(location: Location) {
  return location.nearbySlugs
    .map((slug) => getLocationBySlug(slug))
    .filter((item): item is Location => Boolean(item));
}
