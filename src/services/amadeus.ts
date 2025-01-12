class AmadeusService {
  private async makeRequest(endpoint: string, params?: Record<string, string>) {
    const url = new URL(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/amadeus`);
    url.searchParams.append('endpoint', endpoint);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) url.searchParams.append(key, value);
      });
    }

    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Amadeus API error: ${response.statusText}`);
    }

    return response.json();
  }

  async searchActivities(latitude: string, longitude: string) {
    return this.makeRequest('/shopping/activities', {
      latitude,
      longitude,
      radius: '20',
    });
  }

  async searchHotels(cityCode: string, checkInDate: string, checkOutDate: string) {
    return this.makeRequest('/shopping/hotel-offers', {
      cityCode,
      checkInDate,
      checkOutDate,
    });
  }

  async searchFlights(
    originLocationCode: string,
    destinationLocationCode: string,
    departureDate: string,
    adults: string = "1"
  ) {
    return this.makeRequest('/shopping/flight-offers', {
      originLocationCode,
      destinationLocationCode,
      departureDate,
      adults,
      max: '10',
    });
  }
}

export const amadeusService = new AmadeusService();