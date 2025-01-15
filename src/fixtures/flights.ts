export const mockFlights = [
  {
    id: "1",
    itineraries: [
      {
        duration: "12H30",
        segments: [
          {
            departure: {
              iataCode: "CDG",
              terminal: "2E",
              at: "2024-04-01T10:00:00",
            },
            arrival: {
              iataCode: "HND",
              terminal: "3",
              at: "2024-04-02T05:30:00",
            },
            carrierCode: "AF",
            number: "276",
          },
        ],
      },
    ],
    price: {
      total: "850.00",
      currency: "EUR",
    },
  },
  {
    id: "2",
    itineraries: [
      {
        duration: "13H45",
        segments: [
          {
            departure: {
              iataCode: "CDG",
              terminal: "1",
              at: "2024-04-01T13:30:00",
            },
            arrival: {
              iataCode: "NRT",
              terminal: "2",
              at: "2024-04-02T09:15:00",
            },
            carrierCode: "JL",
            number: "416",
          },
        ],
      },
    ],
    price: {
      total: "920.00",
      currency: "EUR",
    },
  },
];