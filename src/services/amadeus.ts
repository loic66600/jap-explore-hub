import { supabase } from '@/integrations/supabase/client';

class AmadeusService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'https://test.api.amadeus.com/v1';
  }

  async searchFlights(
    originLocationCode: string,
    destinationLocationCode: string,
    departureDate: string,
    adults: string = "1"
  ) {
    try {
      console.log('Searching flights with params:', {
        originLocationCode,
        destinationLocationCode,
        departureDate,
        adults
      });
      
      const { data, error } = await supabase.functions.invoke('amadeus', {
        body: {
          action: 'searchFlights',
          params: {
            originLocationCode,
            destinationLocationCode,
            departureDate,
            adults
          }
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Search flights error:', error);
      throw error;
    }
  }

  async searchHotels(cityCode: string, checkIn: string, checkOut: string) {
    try {
      console.log('Searching hotels with params:', {
        cityCode,
        checkIn,
        checkOut
      });
      
      const { data, error } = await supabase.functions.invoke('amadeus', {
        body: {
          action: 'searchHotels',
          params: {
            cityCode,
            checkIn,
            checkOut
          }
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Search hotels error:', error);
      throw error;
    }
  }

  async searchActivities(latitude: string, longitude: string) {
    try {
      console.log('Searching activities with params:', {
        latitude,
        longitude
      });
      
      const { data, error } = await supabase.functions.invoke('amadeus', {
        body: {
          action: 'searchActivities',
          params: {
            latitude,
            longitude
          }
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Search activities error:', error);
      throw error;
    }
  }
}

export const amadeusService = new AmadeusService();