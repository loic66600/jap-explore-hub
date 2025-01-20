export const plannerItems = [
  {
    id: "PI001",
    type: "flight",
    details: {
      origin: "CDG",
      destination: "HND",
      departureDate: "2024-06-15",
      returnDate: "2024-06-30",
      price: 850,
      airline: "Air France",
      duration: "11h30",
      stops: 0
    }
  },
  {
    id: "PI002",
    type: "flight",
    details: {
      origin: "CDG",
      destination: "NRT",
      departureDate: "2024-06-16",
      returnDate: "2024-07-01",
      price: 920,
      airline: "JAL",
      duration: "12h45",
      stops: 1
    }
  },
  {
    id: "PI003",
    type: "hotel",
    details: {
      name: "Park Hyatt Tokyo",
      location: "Shinjuku",
      checkIn: "2024-06-15",
      checkOut: "2024-06-18",
      price: 450,
      rating: 5,
      amenities: ["Spa", "Piscine", "Restaurant", "Vue sur la ville"]
    }
  },
  {
    id: "PI004",
    type: "hotel",
    details: {
      name: "Mandarin Oriental Kyoto",
      location: "Kyoto",
      checkIn: "2024-06-18",
      checkOut: "2024-06-21",
      price: 520,
      rating: 5,
      amenities: ["Spa", "Jardin japonais", "Restaurant étoilé"]
    }
  },
  {
    id: "PI005",
    type: "activity",
    details: {
      name: "Visite du Temple Senso-ji",
      location: "Asakusa, Tokyo",
      date: "2024-06-16",
      duration: "2h",
      price: 0,
      type: "Culture"
    }
  },
  {
    id: "PI006",
    type: "activity",
    details: {
      name: "Cours de cuisine japonaise",
      location: "Shibuya, Tokyo",
      date: "2024-06-17",
      duration: "3h",
      price: 75,
      type: "Gastronomie"
    }
  }
];