import type { Skill } from "@/lib/skills";

export type SkillCopy = {
  seoTitle: string;
  seoDescription: string;
  lead: string;
  body: string;
  points: string[];
  forWho: string;
  area: string;
};

export const skillCopy: Record<"fr" | "nl", Record<Skill["id"], SkillCopy>> = {
  fr: {
    garnissage: {
      seoTitle: "Garnissage de fauteuils et canapés à Chièvres",
      seoDescription:
        "Rembourrage et rénovation de sièges à Chièvres, près d’Ath. Atelier garnissage de l’ETA Le Moulin de la Hunelle.",
      lead: "L’atelier garnissage du Moulin rénove fauteuils, canapés et chaises : un siège fatigué redevient confortable, sans tout racheter.",
      body: "À Chièvres, l’équipe de l’ETA reprend le rembourrage, les sangles, la mousse et le tissu. Particuliers comme hôtels ou collectivités y déposent un meuble à rénover. Le travail se fait sur place, dans un atelier de l’Entreprise de Travail Adapté, avec un devis selon l’état du siège et le tissu choisi.",
      points: [
        "Fauteuils, canapés, chaises de salle à manger",
        "Remplacement de mousse, sangles et tissus",
        "Devis selon l’état du meuble",
        "Atelier à Chièvres, parking sur place",
      ],
      forWho: "Particuliers, hôtels, restaurants, administrations.",
      area: "Chièvres, Ath, Belœil, Lens, Brugelette et le Hainaut.",
    },
    confection: {
      seoTitle: "Confection, couture et broderie à Chièvres",
      seoDescription:
        "Couture, retouches et broderie à Chièvres. Atelier confection de l’ETA Le Moulin de la Hunelle, pour particuliers et entreprises.",
      lead: "L’atelier confection coud, retouche et brode : vêtements, linge, marquage textile pour les entreprises.",
      body: "Le Moulin de la Hunelle dispose d’un atelier de confection et de broderie. On y fait des retouches du quotidien comme des séries pour des sociétés. Certaines prestations s’adressent aussi à des maisons plus exigeantes. Le fil conducteur reste le même : un travail soigné, local, réalisé par l’équipe de l’ETA.",
      points: [
        "Retouches et confection sur mesure",
        "Broderie et marquage textile",
        "Petites séries pour entreprises",
        "Accueil à Chièvres, sur rendez-vous",
      ],
      forWho: "Particuliers, commerces, entreprises, collectivités.",
      area: "Région d’Ath et de Chièvres, Province de Hainaut.",
    },
    blanchisserie: {
      seoTitle: "Blanchisserie et repassage à Chièvres",
      seoDescription:
        "Repassage et blanchisserie à Chièvres, notamment via titres-services. Service de l’ETA Le Moulin de la Hunelle.",
      lead: "Le service de blanchisserie et de repassage soulage le quotidien : linge soigné, sans machine à gérer chez soi.",
      body: "L’ETA propose un service de repassage, notamment accessible via titres-services. Le linge est pris en charge par l’atelier du Moulin, à Chièvres. C’est un service de proximité, pensé pour les particuliers de la région — y compris les personnes âgées qui préfèrent passer par le téléphone.",
      points: [
        "Repassage du linge de maison et des vêtements",
        "Titres-services selon les conditions en vigueur",
        "Service local, à Chièvres",
        "Inscription par téléphone ou formulaire",
      ],
      forWho: "Particuliers, notamment seniors et familles.",
      area: "Chièvres et communes voisines (Ath, Belœil, Lens, Brugelette).",
    },
    menuiserie: {
      seoTitle: "Menuiserie à Chièvres — petits travaux bois",
      seoDescription:
        "Atelier menuiserie de l’ETA Le Moulin de la Hunelle à Chièvres : fabrication et petits travaux de bois pour la maison ou l’entreprise.",
      lead: "L’atelier menuiserie fabrique et répare : petits meubles, aménagements, travaux de bois utiles au quotidien.",
      body: "Au Moulin, la menuiserie reste un métier de l’ETA. On y réalise des pièces simples, des réparations et des petits aménagements, pour un particulier comme pour une société. Le bois se travaille à Chièvres, avec un interlocuteur unique et un devis selon le projet.",
      points: [
        "Petits meubles et réparations",
        "Aménagements sur mesure simples",
        "Pour la maison ou l’entreprise",
        "Devis après description du besoin",
      ],
      forWho: "Particuliers, entreprises, associations.",
      area: "Chièvres, Ath et le Centre-Hainaut.",
    },
    peinture: {
      seoTitle: "Peinture intérieure, extérieure et cabine à Chièvres",
      seoDescription:
        "Atelier peinture de l’ETA Le Moulin de la Hunelle : intérieur, extérieur et cabine, à Chièvres près d’Ath.",
      lead: "L’atelier peinture couvre l’intérieur, l’extérieur et le travail en cabine, pour des pièces ou des séries.",
      body: "Le Moulin dispose d’un atelier peinture, y compris en cabine. Particuliers et entreprises y confient des objets, des éléments de mobilier ou des lots à peindre. Le service s’inscrit dans les métiers de l’ETA : un travail local, à Chièvres, avec un devis selon le support et le volume.",
      points: [
        "Peinture intérieure et extérieure",
        "Travail en cabine",
        "Pièces unitaires ou petites séries",
        "Devis selon support et quantité",
      ],
      forWho: "Particuliers, artisans, entreprises.",
      area: "Chièvres et région d’Ath.",
    },
    conditionnement: {
      seoTitle: "Conditionnement et co-packing à Chièvres",
      seoDescription:
        "Conditionnement manuel et semi-industriel, co-packing à Chièvres. Atelier de l’ETA Le Moulin de la Hunelle pour les entreprises.",
      lead: "L’atelier conditionnement aide les entreprises à emballer, assembler et préparer des lots, à taille humaine.",
      body: "Le Moulin propose du conditionnement manuel et semi-industriel : mise sous sachet, assemblage, co-packing. C’est un service pensé pour les sociétés du Hainaut qui cherchent un partenaire de proximité, capable d’absorber des séries sans usine démesurée. L’ETA assure le travail dans ses ateliers de Chièvres.",
      points: [
        "Co-packing et mise sous sachet",
        "Assemblage de lots",
        "Volumes adaptés aux PME",
        "Un interlocuteur à Chièvres",
      ],
      forWho: "Entreprises, producteurs, administrations.",
      area: "Hainaut, avec un atelier à Chièvres.",
    },
    jardins: {
      seoTitle: "Parcs et jardins à Chièvres — entretien d’espaces verts",
      seoDescription:
        "Entretien de parcs et jardins, horticulture et cours d’eau à Chièvres. Équipe espaces verts de l’ETA Le Moulin de la Hunelle.",
      lead: "L’équipe parcs et jardins entretient pelouses, haies, massifs et abords — pour un particulier comme pour une commune.",
      body: "Les espaces verts font partie des métiers historiques du Moulin. Tonte, taille, horticulture, entretien de cours d’eau ou de plantes invasives : l’équipe intervient dans la région de Chièvres et d’Ath. C’est un service de l’ETA, utile aux ménages, aux entreprises et aux pouvoirs publics.",
      points: [
        "Entretien de jardins et parcs",
        "Taille, tonte, horticulture",
        "Cours d’eau et plantes invasives",
        "Devis selon la surface et la fréquence",
      ],
      forWho: "Particuliers, entreprises, communes.",
      area: "Chièvres, Ath, Belœil et communes voisines.",
    },
    abattoir: {
      seoTitle: "Abattoir de proximité à Chièvres",
      seoDescription:
        "Activité d’abattoir de proximité à Chièvres, pour les professionnels. Service agro-alimentaire de l’ETA Le Moulin de la Hunelle.",
      lead: "L’abattoir du Moulin s’adresse aux professionnels du secteur, dans une logique de circuit court.",
      body: "Le Moulin de la Hunelle accueille une activité d’abattoir de proximité. Elle concerne les professionnels de la filière, pas le grand public du restaurant. Pour une demande précise, le plus simple est d’écrire ou d’appeler : l’équipe oriente vers le bon interlocuteur de l’ETA.",
      points: [
        "Service destiné aux professionnels",
        "Proximité, à Chièvres",
        "Demande à formuler par téléphone ou e-mail",
        "Activité distincte du restaurant du midi",
      ],
      forWho: "Professionnels de la filière agro-alimentaire.",
      area: "Chièvres et région.",
    },
  },
  nl: {
    garnissage: {
      seoTitle: "Stoffeerwerk van zetels en sofa’s in Chièvres",
      seoDescription:
        "Herstofferen en restaureren van zitmeubelen in Chièvres, bij Ath. Atelier van ETA Le Moulin de la Hunelle.",
      lead: "Het stoffeeratelier van de Molen pakt zetels, sofa’s en stoelen weer op: comfort zonder alles nieuw te kopen.",
      body: "In Chièvres herstelt het ETA-team vulling, riemen, schuim en stof. Particulieren, hotels of overheden brengen er een meubel naartoe. Het werk gebeurt ter plaatse, met een offerte volgens de staat van het stuk en de gekozen stof.",
      points: [
        "Zetels, sofa’s, eetkamerstoelen",
        "Schuim, riemen en stoffen vervangen",
        "Offerte volgens de staat van het meubel",
        "Atelier in Chièvres, parking ter plaatse",
      ],
      forWho: "Particulieren, hotels, restaurants, overheden.",
      area: "Chièvres, Ath, Belœil, Lens, Brugelette en Henegouwen.",
    },
    confection: {
      seoTitle: "Confectie, naaiwerk en borduurwerk in Chièvres",
      seoDescription:
        "Naaiwerk, retouches en borduurwerk in Chièvres. Confectieatelier van ETA Le Moulin de la Hunelle.",
      lead: "Het confectieatelier naait, retoucheert en borduurt: kleding, linnen, textielmarkering voor bedrijven.",
      body: "De Molen heeft een atelier voor confectie en borduurwerk. Dagelijks retouchewerk én reeksen voor bedrijven. De rode draad blijft lokaal, verzorgd werk door het ETA-team in Chièvres.",
      points: [
        "Retouches en confectie",
        "Borduurwerk en textielmarkering",
        "Kleine reeksen voor bedrijven",
        "Onthaal in Chièvres, op afspraak",
      ],
      forWho: "Particulieren, winkels, bedrijven, overheden.",
      area: "Regio Ath en Chièvres, provincie Henegouwen.",
    },
    blanchisserie: {
      seoTitle: "Wasserij en strijkdienst in Chièvres",
      seoDescription:
        "Strijken en wasserij in Chièvres, onder meer via dienstencheques. Dienst van ETA Le Moulin de la Hunelle.",
      lead: "De strijk- en wasserijdienst neemt het linnen over: verzorgd, zonder machine thuis.",
      body: "De ETA biedt een strijkdienst, onder meer via dienstencheques. Het linnen wordt in Chièvres behandeld. Een nabije dienst, ook voor ouderen die liever bellen.",
      points: [
        "Strijken van huis- en lichaamslinnen",
        "Dienstencheques volgens de geldende regels",
        "Lokale dienst in Chièvres",
        "Inschrijven per telefoon of formulier",
      ],
      forWho: "Particulieren, vooral senioren en gezinnen.",
      area: "Chièvres en buurgemeenten.",
    },
    menuiserie: {
      seoTitle: "Schrijnwerkerij in Chièvres",
      seoDescription:
        "Schrijnwerkerij van ETA Le Moulin de la Hunelle in Chièvres: kleine houtwerken voor huis of bedrijf.",
      lead: "Het schrijnwerkerijatelier maakt en herstelt: kleine meubels, nuttige houtwerken.",
      body: "In de Molen blijft schrijnwerkerij een ETA-vak. Eenvoudige stukken, herstellingen en kleine inrichtingen, voor particulier of bedrijf, met een offerte in Chièvres.",
      points: [
        "Kleine meubels en herstellingen",
        "Eenvoudige maatwerkinrichting",
        "Voor huis of bedrijf",
        "Offerte na beschrijving van de vraag",
      ],
      forWho: "Particulieren, bedrijven, verenigingen.",
      area: "Chièvres, Ath en Centrum-Henegouwen.",
    },
    peinture: {
      seoTitle: "Schilderwerk in Chièvres",
      seoDescription:
        "Schilderatelier van ETA Le Moulin de la Hunelle: binnen, buiten en spuitcabine, in Chièvres.",
      lead: "Het schilderatelier dekt binnen, buiten en cabinewerk, voor stukken of reeksen.",
      body: "De Molen heeft een schilderatelier, ook met cabine. Particulieren en bedrijven brengen er stukken of loten naartoe. Lokaal werk in Chièvres, met offerte volgens drager en volume.",
      points: [
        "Binnen- en buitenschilderwerk",
        "Werk in cabine",
        "Enkele stukken of kleine reeksen",
        "Offerte volgens drager en hoeveelheid",
      ],
      forWho: "Particulieren, ambachtslui, bedrijven.",
      area: "Chièvres en regio Ath.",
    },
    conditionnement: {
      seoTitle: "Verpakking en co-packing in Chièvres",
      seoDescription:
        "Manuele en semi-industriële verpakking, co-packing in Chièvres. Atelier van ETA Le Moulin de la Hunelle.",
      lead: "Het verpakkingsatelier helpt bedrijven om loten in te pakken en samen te stellen.",
      body: "De Molen biedt manuele en semi-industriële verpakking: zakken, assemblage, co-packing. Een partner op mensenmaat voor kmo’s in Henegouwen, in Chièvres.",
      points: [
        "Co-packing en inzaken",
        "Assemblage van loten",
        "Volumes voor kmo’s",
        "Eén aanspreekpunt in Chièvres",
      ],
      forWho: "Bedrijven, producenten, overheden.",
      area: "Henegouwen, atelier in Chièvres.",
    },
    jardins: {
      seoTitle: "Parken en tuinen in Chièvres",
      seoDescription:
        "Onderhoud van parken en tuinen, horticultuur in Chièvres. Groenploeg van ETA Le Moulin de la Hunelle.",
      lead: "Het team parken en tuinen onderhoudt gazons, hagen en borders — voor particulier of gemeente.",
      body: "Groenonderhoud hoort bij de Molen: maaien, snoeien, horticultuur, waterlopen of invasieve planten. De ploeg werkt in de regio Chièvres en Ath, voor gezinnen, bedrijven en overheden.",
      points: [
        "Onderhoud van tuinen en parken",
        "Snoeien, maaien, horticultuur",
        "Waterlopen en invasieve planten",
        "Offerte volgens oppervlakte en frequentie",
      ],
      forWho: "Particulieren, bedrijven, gemeenten.",
      area: "Chièvres, Ath, Belœil en buurgemeenten.",
    },
    abattoir: {
      seoTitle: "Nabij slachthuis in Chièvres",
      seoDescription:
        "Slachthuisactiviteit van nabijheid in Chièvres, voor professionals. Agrovoeding van ETA Le Moulin de la Hunelle.",
      lead: "Het slachthuis van de Molen richt zich tot professionals, in korte keten.",
      body: "De Molen huisvest een slachthuis van nabijheid, voor de vakketen, niet voor het lunchrestaurant. Voor een concrete vraag: bellen of mailen, het team verwijst door.",
      points: [
        "Dienst voor professionals",
        "Nabijheid in Chièvres",
        "Vraag per telefoon of e-mail",
        "Los van het lunchrestaurant",
      ],
      forWho: "Professionals uit de agrovoedingsketen.",
      area: "Chièvres en omgeving.",
    },
  }
};
