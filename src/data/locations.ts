export type Location = {
  slug: string;
  city: string;
  url: string;
  title: string;
  description: string;
  heroTitle: string;
  heroText: string;
  bookingText: string;
  classicText: string;
  medicalText: string;
  schoolText: string;
  localEyebrow: string;
  localTitle: string;
  localText: string;
  nearbySlugs: string[];
};

export type ServiceArea = {
  label: string;
  url: string;
};

export const serviceAreas: ServiceArea[] = [
  { label: "Taxi Castanet-Tolosan", url: "/" },
  { label: "Taxi Toulouse et ses environs", url: "/taxi-toulouse/" },
  { label: "Taxi Aéroport Toulouse-Blagnac", url: "/taxi-blagnac/" },
  { label: "Taxi Gare Toulouse-Matabiau", url: "/taxi-gare-toulouse-matabiau/" },
  { label: "Taxi Labège – Innopole – Diagora", url: "/taxi-labege-innopole-diagora/" },
  { label: "Taxi Hôpital Rangueil – Larrey", url: "/taxi-hopital-rangueil-larrey/" },
  { label: "Taxi Ramonville-Saint-Agne – Métro Ramonville", url: "/taxi-ramonville-saint-agne/" },
  { label: "Taxi MEETT – Parc des Expositions Toulouse", url: "/taxi-meett-toulouse/" },
];

export const locations: Location[] = [
  {
    slug: "",
    city: "Castanet-Tolosan",
    url: "/",
    title: "Taxi Castanet-Tolosan 24h/24 | Taxi by Atassi",
    description: "Taxi à Castanet-Tolosan disponible 24h/24 pour vos trajets privés et professionnels, transports conventionnés et transports scolaires.",
    heroTitle: "Votre taxi à Castanet-Tolosan",
    heroText: "Un service fiable, ponctuel et confortable pour vos déplacements dans le Sud-Est toulousain.",
    bookingText: "Indiquez-nous votre trajet au départ ou à destination de Castanet-Tolosan. Nous vous répondrons rapidement avec une prise en charge adaptée.",
    classicText: "À Castanet-Tolosan, Taxi by Atassi vous accompagne pour vos courses locales, vos rendez-vous à Toulouse et vos transferts vers les gares ou l’aéroport. Chaque trajet est organisé avec ponctualité, discrétion et attention.",
    medicalText: "Pour vos rendez-vous médicaux, notre taxi conventionné (VSL) assure vos déplacements depuis Castanet-Tolosan vers les hôpitaux, cliniques et centres de soins de l’agglomération, sur prescription médicale de transport.",
    schoolText: "Nous assurons également des transports scolaires encadrés depuis Castanet-Tolosan, en lien avec le Conseil départemental de la Haute-Garonne (CD31), pour les enfants et bénéficiaires concernés.",
    localEyebrow: "Votre taxi de proximité",
    localTitle: "Taxi à Castanet-Tolosan et dans le Sud-Est toulousain",
    localText: "Basé à Castanet-Tolosan, Taxi by Atassi connaît les déplacements du secteur et vous conduit sereinement vers Toulouse, les pôles d’activité, les gares et l’aéroport. Vous pouvez réserver à l’avance ou nous contacter pour une demande immédiate.",
    nearbySlugs: ["taxi-toulouse", "taxi-labege-innopole-diagora", "taxi-ramonville-saint-agne"],
  },
  {
    slug: "taxi-toulouse",
    city: "Toulouse",
    url: "/taxi-toulouse/",
    title: "Taxi Toulouse 24h/24 | Taxi by Atassi",
    description: "Réservez votre taxi à Toulouse pour un trajet privé ou professionnel, un transport médical conventionné ou un déplacement planifié.",
    heroTitle: "Réservez votre taxi à Toulouse",
    heroText: "Déplacez-vous sereinement dans Toulouse et ses environs, de jour comme de nuit.",
    bookingText: "Précisez votre point de départ, votre destination et l’horaire souhaité. Nous organisons votre course à Toulouse avec une réponse simple et rapide.",
    classicText: "Notre service de taxi classique répond à vos déplacements personnels ou professionnels à Toulouse et dans ses environs : trajets urbains, liaisons interurbaines, transferts vers les gares ou l’aéroport et rendez-vous ponctuels.",
    medicalText: "Conventionné par l’Assurance Maladie, Taxi by Atassi assure vos transports médicaux assis (VSL) depuis Toulouse vers les hôpitaux, cliniques, cabinets et centres de soins, sur prescription médicale de transport.",
    schoolText: "À Toulouse et aux alentours, nous accompagnons des enfants en situation de handicap et des bénéficiaires de dispositifs départementaux dans le cadre de transports scolaires planifiés et sécurisés.",
    localEyebrow: "Toulouse et ses environs",
    localTitle: "Vos déplacements à Toulouse en toute sérénité",
    localText: "Taxi by Atassi assure vos courses dans Toulouse, vos rendez-vous professionnels, vos sorties et vos correspondances avec Matabiau ou l’aéroport Toulouse-Blagnac. Votre trajet est préparé avec soin pour vous éviter toute précipitation.",
    nearbySlugs: ["", "taxi-blagnac", "taxi-gare-toulouse-matabiau", "taxi-hopital-rangueil-larrey", "taxi-meett-toulouse"],
  },
  {
    slug: "taxi-blagnac",
    city: "Aéroport Toulouse-Blagnac",
    url: "/taxi-blagnac/",
    title: "Taxi Aéroport Toulouse-Blagnac | Taxi by Atassi",
    description: "Réservez votre taxi pour l’aéroport Toulouse-Blagnac, avec une prise en charge ponctuelle vers Toulouse, Castanet-Tolosan et les environs.",
    heroTitle: "Votre taxi pour l’aéroport Toulouse-Blagnac",
    heroText: "Un transfert planifié, confortable et ponctuel pour votre départ comme pour votre arrivée.",
    bookingText: "Communiquez-nous votre horaire de départ ou d’arrivée et le lieu de prise en charge. Nous préparons votre transfert aéroport sans stress.",
    classicText: "Taxi by Atassi organise vos transferts entre l’aéroport Toulouse-Blagnac, Toulouse, Castanet-Tolosan et les communes voisines. Nous tenons compte de vos horaires et de vos bagages pour vous offrir un trajet confortable.",
    medicalText: "Notre service de taxi conventionné (VSL) reste disponible depuis le secteur de Blagnac pour vos rendez-vous médicaux, lorsque vous disposez d’une prescription médicale de transport.",
    schoolText: "Les transports scolaires et accompagnés peuvent également être organisés dans le secteur de Blagnac, avec des horaires suivis et une attention constante portée aux passagers.",
    localEyebrow: "Départs et arrivées",
    localTitle: "Transferts vers l’aéroport Toulouse-Blagnac",
    localText: "Pour un vol matinal, une arrivée tardive ou un déplacement professionnel, votre prise en charge est planifiée à l’avance. Nous vous conduisons vers l’aéroport ou votre prochaine destination avec ponctualité et sans détour inutile.",
    nearbySlugs: ["taxi-toulouse", "taxi-gare-toulouse-matabiau", "taxi-meett-toulouse"],
  },
  {
    slug: "taxi-gare-toulouse-matabiau",
    city: "Gare Toulouse-Matabiau",
    url: "/taxi-gare-toulouse-matabiau/",
    title: "Taxi Gare Toulouse-Matabiau 24h/24 | Taxi by Atassi",
    description: "Taxi pour la gare Toulouse-Matabiau : prise en charge ponctuelle, aide avec vos bagages et liaison vers Toulouse ou les environs.",
    heroTitle: "Votre taxi pour la gare Toulouse-Matabiau",
    heroText: "Rejoignez votre train ou votre destination dans de bonnes conditions, sans courir après le temps.",
    bookingText: "Indiquez votre horaire de train et l’adresse de prise en charge. Nous organisons votre arrivée à Matabiau ou votre retour depuis la gare.",
    classicText: "Pour vos départs et arrivées à la gare Toulouse-Matabiau, Taxi by Atassi vous conduit depuis Toulouse, Castanet-Tolosan et les communes environnantes. Le trajet est prévu selon votre horaire et le temps nécessaire à votre correspondance.",
    medicalText: "Si votre déplacement se poursuit vers un établissement de soins, notre taxi conventionné (VSL) peut assurer le trajet dans le cadre d’une prescription médicale de transport.",
    schoolText: "Nous proposons aussi des transports scolaires et accompagnés dans l’agglomération toulousaine, avec des prises en charge régulières et des horaires respectés.",
    localEyebrow: "Votre correspondance en taxi",
    localTitle: "Taxi au départ ou à l’arrivée de Toulouse-Matabiau",
    localText: "Un train tôt le matin, une arrivée en soirée ou des bagages à transporter ? Nous venons vous chercher à l’adresse convenue et vous déposons au plus près de votre destination, avec une organisation claire dès la réservation.",
    nearbySlugs: ["taxi-toulouse", "taxi-blagnac", "taxi-labege-innopole-diagora", "taxi-ramonville-saint-agne"],
  },
  {
    slug: "taxi-labege-innopole-diagora",
    city: "Labège – Innopole – Diagora",
    url: "/taxi-labege-innopole-diagora/",
    title: "Taxi Labège, Innopole et Diagora | Taxi by Atassi",
    description: "Taxi à Labège pour vos trajets vers Innopole, Diagora, Toulouse, Castanet-Tolosan, les gares et l’aéroport.",
    heroTitle: "Votre taxi à Labège, Innopole et Diagora",
    heroText: "Des trajets fluides pour vos rendez-vous professionnels, vos événements et vos déplacements quotidiens.",
    bookingText: "Indiquez-nous votre adresse à Labège, Innopole ou Diagora et l’heure souhaitée. Nous préparons votre course selon votre programme.",
    classicText: "Taxi by Atassi vous accompagne dans le secteur de Labège pour vos rendez-vous professionnels, vos journées à Innopole, vos événements à Diagora et vos liaisons avec Toulouse, les gares ou l’aéroport.",
    medicalText: "Depuis Labège et les communes proches, notre taxi conventionné (VSL) assure vos déplacements vers les établissements et centres de soins, sur présentation d’une prescription médicale de transport.",
    schoolText: "Nous organisons également des transports scolaires encadrés dans le secteur de Labège, en accordant une attention particulière à la régularité et au confort de chaque enfant.",
    localEyebrow: "Au cœur du Sud-Est toulousain",
    localTitle: "Taxi à Labège, Innopole et au centre Diagora",
    localText: "Que vous veniez travailler, participer à un événement ou rejoindre un autre quartier de l’agglomération, nous adaptons la prise en charge à votre horaire. La réservation reste simple, avec un interlocuteur disponible et attentif.",
    nearbySlugs: ["", "taxi-toulouse", "taxi-ramonville-saint-agne", "taxi-hopital-rangueil-larrey"],
  },
  {
    slug: "taxi-hopital-rangueil-larrey",
    city: "Hôpitaux Rangueil et Larrey",
    url: "/taxi-hopital-rangueil-larrey/",
    title: "Taxi Hôpital Rangueil et Larrey (VSL) | Taxi by Atassi",
    description: "Taxi conventionné pour vos rendez-vous aux hôpitaux Rangueil et Larrey, avec un accompagnement ponctuel et rassurant.",
    heroTitle: "Votre taxi pour Rangueil et Larrey",
    heroText: "Un accompagnement calme et ponctuel pour vos consultations, examens et soins programmés.",
    bookingText: "Précisez l’établissement, l’heure du rendez-vous et votre lieu de départ. Nous préparons votre transport avec l’attention nécessaire.",
    classicText: "Taxi by Atassi vous accompagne vers les hôpitaux Rangueil et Larrey pour une consultation, un examen, une visite ou l’accompagnement d’un proche. Votre horaire de rendez-vous guide toute l’organisation du trajet.",
    medicalText: "Conventionné par l’Assurance Maladie, notre taxi assure les transports médicaux assis (VSL) vers Rangueil et Larrey pour les patients disposant d’une prescription médicale de transport, avec une conduite souple et attentive.",
    schoolText: "Notre expérience de l’accompagnement s’étend aussi aux transports scolaires encadrés, réalisés avec patience, régularité et dans le respect des besoins de chaque passager.",
    localEyebrow: "Transport médical accompagné",
    localTitle: "Taxi conventionné vers Rangueil et Larrey",
    localText: "Un rendez-vous médical demande souvent de l’anticipation. Nous organisons votre aller et, si nécessaire, votre retour afin que vous puissiez vous concentrer sur l’essentiel, sans vous soucier du trajet.",
    nearbySlugs: ["taxi-toulouse", "taxi-ramonville-saint-agne", "taxi-labege-innopole-diagora", ""],
  },
  {
    slug: "taxi-ramonville-saint-agne",
    city: "Ramonville-Saint-Agne",
    url: "/taxi-ramonville-saint-agne/",
    title: "Taxi Ramonville-Saint-Agne et Métro | Taxi by Atassi",
    description: "Taxi à Ramonville-Saint-Agne et au métro Ramonville pour vos trajets vers Toulouse, Labège, Castanet-Tolosan et les environs.",
    heroTitle: "Votre taxi à Ramonville-Saint-Agne",
    heroText: "Une prise en charge pratique pour rejoindre le métro, Toulouse ou votre prochaine destination.",
    bookingText: "Donnez-nous votre adresse, votre destination et l’heure prévue. Nous organisons votre trajet à Ramonville avec simplicité.",
    classicText: "À Ramonville-Saint-Agne, Taxi by Atassi assure vos courses locales, vos liaisons avec le métro Ramonville et vos déplacements vers Toulouse, Labège ou Castanet-Tolosan, pour un besoin personnel comme professionnel.",
    medicalText: "Notre taxi conventionné (VSL) peut vous conduire depuis Ramonville vers vos consultations et centres de soins, dans le cadre d’une prescription médicale de transport.",
    schoolText: "Nous prenons également en charge des transports scolaires et accompagnés dans le secteur de Ramonville, avec des horaires réguliers et un service rassurant pour les familles.",
    localEyebrow: "Ramonville et le métro",
    localTitle: "Taxi à Ramonville-Saint-Agne et au métro Ramonville",
    localText: "Pour rejoindre une adresse depuis le métro, éviter une correspondance compliquée ou partir directement vers Toulouse et ses environs, nous adaptons la course à votre besoin réel et à votre horaire.",
    nearbySlugs: ["", "taxi-toulouse", "taxi-labege-innopole-diagora", "taxi-hopital-rangueil-larrey"],
  },
  {
    slug: "taxi-meett-toulouse",
    city: "MEETT – Parc des Expositions Toulouse",
    url: "/taxi-meett-toulouse/",
    title: "Taxi MEETT et Parc des Expositions Toulouse | Taxi by Atassi",
    description: "Réservez votre taxi pour le MEETT et le Parc des Expositions de Toulouse lors d’un salon, d’un congrès ou d’un événement.",
    heroTitle: "Votre taxi pour le MEETT Toulouse",
    heroText: "Arrivez à l’heure à votre salon, votre congrès ou votre événement, sans contrainte de stationnement.",
    bookingText: "Indiquez l’événement, l’horaire et votre lieu de départ. Nous organisons votre arrivée au MEETT et votre retour si vous le souhaitez.",
    classicText: "Taxi by Atassi assure vos trajets vers le MEETT et le Parc des Expositions de Toulouse depuis le centre-ville, l’aéroport, votre hôtel ou les communes environnantes. La prise en charge s’adapte à l’horaire de votre événement.",
    medicalText: "En dehors de vos déplacements événementiels, notre taxi conventionné (VSL) reste disponible dans l’agglomération pour vos transports médicaux prescrits vers les établissements de soins.",
    schoolText: "Notre service comprend aussi les transports scolaires encadrés en Haute-Garonne, avec une organisation régulière et une attention constante portée à la sécurité.",
    localEyebrow: "Salons, congrès et événements",
    localTitle: "Taxi vers le MEETT et le Parc des Expositions",
    localText: "Évitez la recherche de stationnement et les départs précipités les jours d’événement. Nous vous déposons au MEETT à l’heure convenue et pouvons anticiper votre trajet retour dès la réservation.",
    nearbySlugs: ["taxi-toulouse", "taxi-blagnac", "taxi-gare-toulouse-matabiau"],
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
