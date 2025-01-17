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
            aircraft: {
              code: "789",
              name: "Boeing 787-9"
            },
            operating: {
              carrierCode: "AF",
              name: "Air France"
            }
          },
        ],
      },
    ],
    price: {
      total: "850.00",
      currency: "EUR",
    },
    additionalInfo: {
      meal: "Repas inclus",
      baggage: "2 bagages en soute inclus",
      class: "Économique Premium",
      seatsAvailable: 12
    }
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
            aircraft: {
              code: "773",
              name: "Boeing 777-300ER"
            },
            operating: {
              carrierCode: "JL",
              name: "Japan Airlines"
            }
          },
        ],
      },
    ],
    price: {
      total: "920.00",
      currency: "EUR",
    },
    additionalInfo: {
      meal: "Repas japonais traditionnel",
      baggage: "2 bagages en soute inclus",
      class: "Business",
      seatsAvailable: 8
    }
  },
  {
    id: "3",
    itineraries: [
      {
        duration: "14H20",
        segments: [
          {
            departure: {
              iataCode: "CDG",
              terminal: "1",
              at: "2024-04-01T15:45:00",
            },
            arrival: {
              iataCode: "KIX",
              terminal: "1",
              at: "2024-04-02T12:05:00",
            },
            carrierCode: "NH",
            number: "216",
            aircraft: {
              code: "789",
              name: "Boeing 787-9"
            },
            operating: {
              carrierCode: "NH",
              name: "ANA"
            }
          },
        ],
      },
    ],
    price: {
      total: "780.00",
      currency: "EUR",
    },
    additionalInfo: {
      meal: "Menu international",
      baggage: "1 bagage en soute inclus",
      class: "Économique",
      seatsAvailable: 25
    }
  }
];