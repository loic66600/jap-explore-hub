export const mockHotels = [
  {
    id: "HT001",
    hotel: {
      name: "Park Hyatt Tokyo",
      rating: "4.8",
      hotelDistance: {
        distance: 0.5,
      },
      address: {
        cityName: "Tokyo",
        line1: "3-7-1-2 Nishi Shinjuku",
        postalCode: "163-1055"
      },
      images: [
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        "https://images.unsplash.com/photo-1582719508461-905c673771fd"
      ],
      amenities: [
        "Piscine",
        "Spa",
        "Restaurant étoilé",
        "Vue panoramique",
        "Salle de sport"
      ],
      description: "Situé dans les étages supérieurs de Shinjuku Park Tower, offrant une vue imprenable sur Tokyo et le Mont Fuji."
    },
    offers: [
      {
        id: "OF001",
        checkInDate: "2024-04-01",
        checkOutDate: "2024-04-05",
        price: {
          total: "450.00",
          currency: "EUR",
        },
        room: {
          type: "Deluxe King",
          description: {
            text: "Chambre luxueuse avec vue sur la ville, 45m², lit king-size et salle de bain en marbre",
          },
          bedType: "1 King",
          views: ["Ville", "Mont Fuji"]
        },
      },
    ],
  },
  {
    id: "HT002",
    hotel: {
      name: "Mandarin Oriental Tokyo",
      rating: "4.9",
      hotelDistance: {
        distance: 0.3,
      },
      address: {
        cityName: "Tokyo",
        line1: "2-1-1 Nihonbashi Muromachi",
        postalCode: "103-8328"
      },
      images: [
        "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        "https://images.unsplash.com/photo-1473177104440-ffee2f376098"
      ],
      amenities: [
        "Spa de luxe",
        "Restaurants étoilés",
        "Bar panoramique",
        "Service en chambre 24/7",
        "Concierge"
      ],
      description: "Un sanctuaire de luxe offrant une expérience japonaise authentique avec des vues spectaculaires sur la ville."
    },
    offers: [
      {
        id: "OF002",
        checkInDate: "2024-04-01",
        checkOutDate: "2024-04-05",
        price: {
          total: "520.00",
          currency: "EUR",
        },
        room: {
          type: "Premier Room",
          description: {
            text: "Chambre élégante avec vue panoramique, 50m², design japonais contemporain",
          },
          bedType: "1 King ou 2 Doubles",
          views: ["Baie de Tokyo", "Skyline"]
        },
      },
    ],
  },
  {
    id: "HT003",
    hotel: {
      name: "Aman Tokyo",
      rating: "5.0",
      hotelDistance: {
        distance: 0.8,
      },
      address: {
        cityName: "Tokyo",
        line1: "The Otemachi Tower, 1-5-6 Otemachi",
        postalCode: "100-0004"
      },
      images: [
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
        "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
        "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151"
      ],
      amenities: [
        "Piscine intérieure",
        "Spa traditionnel",
        "Restaurant gastronomique",
        "Jardin zen",
        "Yoga"
      ],
      description: "Un havre de paix urbain alliant luxe contemporain et esthétique japonaise traditionnelle."
    },
    offers: [
      {
        id: "OF003",
        checkInDate: "2024-04-01",
        checkOutDate: "2024-04-05",
        price: {
          total: "680.00",
          currency: "EUR",
        },
        room: {
          type: "Deluxe Suite",
          description: {
            text: "Suite spacieuse de 80m² avec séjour séparé et bain traditionnel furo",
          },
          bedType: "1 King",
          views: ["Palais Impérial", "Ville"]
        },
      },
    ],
  }
];