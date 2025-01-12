import { supabase } from '@/integrations/supabase/client';

class AmadeusService {
  private baseUrl: string;
  private accessToken: string | null = null;

  constructor() {
    this.baseUrl = 'https://test.api.amadeus.com/v1';
  }

  private async authenticate(): Promise<string> {
    try {
      const { data, error } = await supabase.functions.invoke('amadeus', {
        body: { action: 'authenticate' }
      });

      if (error) throw error;
      this.accessToken = data.access_token;
      return this.accessToken;
    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    }
  }

  private async ensureValidToken(): Promise<string> {
    if (!this.accessToken) {
      return this.authenticate();
    }
    return this.accessToken;
  }

  async searchFlights(params: {
    originLocationCode: string;
    destinationLocationCode: string;
    departureDate: string;
    adults?: number;
    max?: number;
  }) {
    try {
      const token = await this.ensureValidToken();
      
      const { data, error } = await supabase.functions.invoke('amadeus', {
        body: {
          action: 'searchFlights',
          params: params
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Search flights error:', error);
      throw error;
    }
  }
}

export default new AmadeusService();