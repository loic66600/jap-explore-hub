import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, params } = await req.json();
    console.log('Received request:', { action, params });

    // Validate required environment variables
    if (!Deno.env.get('AMADEUS_API_KEY') || !Deno.env.get('AMADEUS_API_SECRET')) {
      console.error('Missing Amadeus API credentials');
      return new Response(
        JSON.stringify({ error: 'Missing Amadeus API credentials' }), 
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    // Get a fresh token for each request
    const tokenResponse = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${Deno.env.get('AMADEUS_API_KEY')}&client_secret=${Deno.env.get('AMADEUS_API_SECRET')}`,
    });

    if (!tokenResponse.ok) {
      console.error('Failed to get Amadeus token:', await tokenResponse.text());
      return new Response(
        JSON.stringify({ error: 'Failed to authenticate with Amadeus API' }), 
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    const { access_token } = await tokenResponse.json();

    if (action === 'searchFlights') {
      // Validate required parameters
      if (!params?.originLocationCode || !params?.destinationLocationCode || !params?.departureDate) {
        console.error('Missing required parameters:', params);
        return new Response(
          JSON.stringify({ 
            error: 'Missing required flight search parameters',
            missingParams: {
              originLocationCode: !params?.originLocationCode,
              destinationLocationCode: !params?.destinationLocationCode,
              departureDate: !params?.departureDate
            }
          }), 
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        );
      }

      console.log('Searching flights with params:', params);
      
      const queryParams = new URLSearchParams({
        originLocationCode: params.originLocationCode,
        destinationLocationCode: params.destinationLocationCode,
        departureDate: params.departureDate,
        adults: params.adults || '1',
        max: '20',
        currencyCode: 'EUR'
      });

      const response = await fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Flight search failed:', response.status, errorText);
        return new Response(
          JSON.stringify({ error: `Flight search failed: ${response.statusText}`, details: errorText }), 
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: response.status }
        );
      }

      const data = await response.json();
      console.log('Flight search successful');
      
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      });
    } else if (action === 'searchHotels') {
      // Validate required parameters for hotel search
      if (!params?.cityCode || !params?.checkIn || !params?.checkOut) {
        console.error('Missing required hotel search parameters:', params);
        return new Response(
          JSON.stringify({ 
            error: 'Missing required hotel search parameters',
            missingParams: {
              cityCode: !params?.cityCode,
              checkIn: !params?.checkIn,
              checkOut: !params?.checkOut
            }
          }), 
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        );
      }

      console.log('Searching hotels with params:', params);

      const queryParams = new URLSearchParams({
        cityCode: params.cityCode,
        checkInDate: params.checkIn,
        checkOutDate: params.checkOut,
        radius: '5',
        radiusUnit: 'KM',
        ratings: '3,4,5',
        priceRange: '50-500',
        currency: 'EUR',
      });

      const response = await fetch(`https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Hotel search failed:', response.status, errorText);
        return new Response(
          JSON.stringify({ error: `Hotel search failed: ${response.statusText}`, details: errorText }), 
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: response.status }
        );
      }

      const data = await response.json();
      console.log('Hotel search successful');

      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      });
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in Amadeus function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});