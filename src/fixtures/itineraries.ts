export const mockItineraries = [
  {
    id: "IT001",
    title: "Week-end à Tokyo",
    duration: "3 jours",
    totalBudget: 1500,
    items: [
      {
        day: 1,
        activities: [
          {
            time: "10:00",
            activity: "Visite du marché de Tsukiji",
            duration: "2h",
            cost: 0,
          },
          {
            time: "14:00",
            activity: "Temple Senso-ji",
            duration: "1h30",
            cost: 0,
          },
        ],
      },
      {
        day: 2,
        activities: [
          {
            time: "09:00",
            activity: "Tour de Tokyo",
            duration: "2h",
            cost: 30,
          },
          {
            time: "15:00",
            activity: "Quartier d'Akihabara",
            duration: "3h",
            cost: 20,
          },
        ],
      },
    ],
  },
  {
    id: "IT002",
    title: "Découverte de Kyoto",
    duration: "4 jours",
    totalBudget: 2000,
    items: [
      {
        day: 1,
        activities: [
          {
            time: "09:00",
            activity: "Temple Kinkaku-ji",
            duration: "2h",
            cost: 40,
          },
          {
            time: "14:00",
            activity: "Château de Nijo",
            duration: "2h30",
            cost: 25,
          },
        ],
      },
      {
        day: 2,
        activities: [
          {
            time: "10:00",
            activity: "Forêt de bambous d'Arashiyama",
            duration: "3h",
            cost: 0,
          },
          {
            time: "15:00",
            activity: "Temple Ryoan-ji",
            duration: "1h30",
            cost: 15,
          },
        ],
      },
    ],
  },
];