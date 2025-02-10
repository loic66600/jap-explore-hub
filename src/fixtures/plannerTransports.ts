
export const plannerTransports = [
  {
    id: "PT001",
    type: "JR Pass",
    name: "Japan Rail Pass 7 jours",
    coverage: "National",
    price: 280,
    validity: "7 jours",
    benefits: [
      "Accès illimité aux trains JR",
      "Incluant les Shinkansen",
      "Réservation de siège gratuite"
    ],
    restrictions: ["Activation nécessaire en gare", "Non valable sur les trains Nozomi"]
  },
  {
    id: "PT002",
    type: "Metro Pass",
    name: "Tokyo Metro 72h",
    coverage: "Tokyo",
    price: 40,
    validity: "72 heures",
    benefits: [
      "Accès illimité au métro de Tokyo",
      "Toutes les lignes incluses",
      "Application de navigation gratuite"
    ],
    restrictions: ["Valable uniquement sur le réseau Tokyo Metro"]
  },
  {
    id: "PT003",
    type: "Bus Pass",
    name: "Kyoto Bus Pass",
    coverage: "Kyoto",
    price: 25,
    validity: "48 heures",
    benefits: [
      "Accès illimité aux bus de Kyoto",
      "Plan des lignes inclus",
      "Arrêts annoncés en anglais"
    ],
    restrictions: ["Valable uniquement sur le réseau de bus de Kyoto"]
  }
];

