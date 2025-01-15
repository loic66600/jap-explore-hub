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
      },
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
            text: "Luxurious room with city view, 45m²",
          },
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
      },
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
            text: "Elegant room with panoramic view, 50m²",
          },
        },
      },
    ],
  },
];