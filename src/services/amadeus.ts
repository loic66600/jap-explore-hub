import { supabase } from "@/integrations/supabase/client";

class AmadeusService {
  private token: string | null = null;
  private tokenExpiration: Date | null = null;

  private async getToken(): Promise<string> {
    if (this.token && this.tokenExpiration && this.tokenExpiration > new Date()) {
      return this.token;
    }

    const { data: { AMADEUS_API_KEY, AMADEUS_API_SECRET } } = await supabase
      .functions.invoke('get-secrets', {
        body: { secrets: ['AMADEUS_API_KEY', 'AMADEUS_API_SECRET'] }
      });

    const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: AMADEUS_API_KEY,
        client_secret: AMADEUS_API_SECRET,
      }),
    });

    const data = await response.json();
    this.token = data.access_token;
    this.tokenExpiration = new Date(Date.now() + data.expires_in * 1000);
    return this.token;
  }

  private async makeRequest(endpoint: string, params?: Record<string, string>) {
    const token = await this.getToken();
    const url = new URL(`https://test.api.amadeus.com/v1${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${token}`,
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