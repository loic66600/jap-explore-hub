
export const plannerItems = [
  {
    id: "PI001",
    type: "flight",
    details: {
      origin: "Paris CDG",
      destination: "Tokyo HND",
      departureDate: "2024-06-15",
      returnDate: "2024-06-30",
      price: 850,
      airline: "Air France",
      duration: "11h30",
      class: "Économique"
    }
  },
  {
    id: "PI002",
    type: "accommodation",
    details: {
      name: "Park Hyatt Tokyo",
      location: "Shinjuku, Tokyo",
      checkIn: "2024-06-15",
      checkOut: "2024-06-18",
      price: 450,
      rating: 5,
      amenities: ["Spa", "Piscine", "Restaurant", "Vue sur la ville"]
    }
  },
  {
    id: "PI003",
    type: "activity",
    details: {
      name: "Visite du Temple Senso-ji",
      location: "Asakusa, Tokyo",
      date: "2024-06-16",
      duration: "2h",
      price: 0,
      type: "Culture",
      description: "Découverte du plus ancien temple bouddhiste de Tokyo",
      includes: ["Guide audio", "Plan du temple"]
    }
  },
  {
    id: "PI004",
    type: "transport",
    details: {
      name: "Japan Rail Pass 7 jours",
      coverage: "National",
      startDate: "2024-06-15",
      endDate: "2024-06-22",
      price: 280,
      type: "JR Pass",
      benefits: [
        "Accès illimité aux trains JR",
        "Incluant les Shinkansen",
        "Réservation de siège gratuite"
      ]
    }
  }
];

// Types correspondant à la structure de la base de données
export interface PlannerItem {
  id: string;
  type: 'flight' | 'accommodation' | 'activity' | 'transport';
  details: any;
}

export interface Itinerary {
  id?: string;
  user_id: string;
  name: string;
  start_date: string;
  end_date: string;
  total_budget: number;
  items: string[];
  created_at?: string;
}
