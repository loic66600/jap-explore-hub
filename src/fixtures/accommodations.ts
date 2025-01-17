export const mockAccommodations = [
  {
    id: 1,
    name: "Ryokan Gion Hatanaka",
    type: "Ryokan Traditionnel",
    price: "35000",
    rating: 4.8,
    totalReviews: 245,
    images: [
      "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=2000&q=80"
    ],
    description: "Situé dans le quartier historique de Gion à Kyoto, ce ryokan traditionnel offre une expérience authentique avec des bains onsen privés et des repas kaiseki.",
    history: "Construit en 1930, le Ryokan Gion Hatanaka perpétue la tradition de l'hospitalité japonaise depuis quatre générations.",
    address: {
      full: "505 Gionmachi Minamigawa, Higashiyama-ku, Kyoto 605-0074",
      distance: {
        station: "10 minutes à pied de la station Gion-Shijo",
        attractions: [
          "5 minutes du temple Kenninji",
          "8 minutes du sanctuaire Yasaka"
        ]
      }
    },
    amenities: [
      "Onsen privé",
      "Wifi gratuit",
      "Petit-déjeuner traditionnel",
      "Service en chambre",
      "Jardin zen"
    ],
    rooms: [
      {
        type: "Chambre Deluxe avec Onsen",
        description: "Chambre traditionnelle de 45m² avec tatamis, futons et bain onsen privé",
        price: "45000",
        images: [
          "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=2000&q=80",
          "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=2000&q=80"
        ]
      },
      {
        type: "Suite Jardin",
        description: "Suite de 60m² avec vue sur le jardin japonais et bain onsen privé",
        price: "65000",
        images: [
          "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?auto=format&fit=crop&w=2000&q=80",
          "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=2000&q=80"
        ]
      }
    ],
    policies: {
      checkIn: "15:00",
      checkOut: "11:00",
      cancellation: "Annulation gratuite jusqu'à 7 jours avant l'arrivée"
    },
    reviews: [
      {
        author: "Sophie D.",
        rating: 5,
        comment: "Une expérience inoubliable dans un ryokan authentique. Le service est impeccable et les repas kaiseki sont extraordinaires.",
        date: "2024-01-15"
      },
      {
        author: "Marc L.",
        rating: 4.5,
        comment: "Superbe ryokan traditionnel. L'onsen privé est un vrai plus. Seul petit bémol, le prix élevé.",
        date: "2023-12-20"
      }
    ]
  },
  {
    id: 2,
    name: "Park Hyatt Tokyo",
    type: "Hôtel de Luxe",
    price: "55000",
    rating: 4.9,
    totalReviews: 523,
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=2000&q=80"
    ],
    description: "Occupant les étages supérieurs du Shinjuku Park Tower, cet hôtel de luxe offre une vue imprenable sur Tokyo et le mont Fuji.",
    history: "Rendu célèbre par le film Lost in Translation, le Park Hyatt Tokyo est une icône de l'hospitalité de luxe depuis 1994.",
    address: {
      full: "3-7-1-2 Nishi Shinjuku, Shinjuku-ku, Tokyo 163-1055",
      distance: {
        station: "12 minutes à pied de la station Shinjuku",
        attractions: [
          "5 minutes du jardin national Shinjuku Gyoen",
          "15 minutes de la mairie de Tokyo"
        ]
      }
    },
    amenities: [
      "Piscine intérieure",
      "Spa",
      "Wifi gratuit",
      "Restaurant étoilé",
      "Salle de sport",
      "Club lounge",
      "Service en chambre 24/7"
    ],
    rooms: [
      {
        type: "Chambre Park Deluxe",
        description: "Chambre luxueuse de 55m² avec vue panoramique sur la ville",
        price: "75000",
        images: [
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=80",
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=2000&q=80"
        ]
      },
      {
        type: "Suite Park",
        description: "Suite de 85m² avec salon séparé et vue sur le mont Fuji",
        price: "120000",
        images: [
          "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=80",
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=2000&q=80"
        ]
      }
    ],
    policies: {
      checkIn: "15:00",
      checkOut: "12:00",
      cancellation: "Annulation gratuite jusqu'à 48 heures avant l'arrivée"
    },
    reviews: [
      {
        author: "Jean P.",
        rating: 5,
        comment: "Un service exceptionnel et une vue à couper le souffle sur Tokyo. Le petit-déjeuner au 52ème étage est inoubliable.",
        date: "2024-02-01"
      },
      {
        author: "Emma S.",
        rating: 4.8,
        comment: "Luxe et raffinement à la japonaise. La piscine au 47ème étage est spectaculaire.",
        date: "2024-01-25"
      }
    ]
  },
  {
    id: 3,
    name: "9 Hours Shinjuku",
    type: "Hôtel Capsule",
    price: "4000",
    rating: 4.2,
    totalReviews: 892,
    images: [
      "https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1590490359538-d0204e7b0c68?auto=format&fit=crop&w=2000&q=80"
    ],
    description: "Une expérience unique dans un hôtel capsule moderne et minimaliste, parfait pour les voyageurs solo.",
    address: {
      full: "1-4-1 Kabukicho, Shinjuku-ku, Tokyo 160-0021",
      distance: {
        station: "3 minutes à pied de la station Shinjuku",
        attractions: [
          "5 minutes du quartier de Kabukicho",
          "10 minutes de Godzilla Head"
        ]
      }
    },
    amenities: [
      "Wifi gratuit",
      "Douches communes",
      "Casiers",
      "Pyjamas fournis",
      "Produits de toilette"
    ],
    rooms: [
      {
        type: "Capsule Standard",
        description: "Capsule individuelle avec TV et prise USB",
        price: "4000",
        images: [
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=2000&q=80",
          "https://images.unsplash.com/photo-1590490359538-d0204e7b0c68?auto=format&fit=crop&w=2000&q=80"
        ]
      }
    ],
    policies: {
      checkIn: "14:00",
      checkOut: "10:00",
      cancellation: "Annulation gratuite jusqu'à 24 heures avant l'arrivée"
    },
    reviews: [
      {
        author: "Thomas B.",
        rating: 4,
        comment: "Propre, efficace et bien situé. Parfait pour une nuit à petit budget à Tokyo.",
        date: "2024-01-30"
      },
      {
        author: "Julie M.",
        rating: 4.5,
        comment: "Une expérience unique ! Les capsules sont confortables et l'établissement est très propre.",
        date: "2024-01-10"
      }
    ]
  }
];