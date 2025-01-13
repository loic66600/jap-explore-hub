import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

const AMADEUS_API_KEY = Deno.env.get('AMADEUS_API_KEY')
const AMADEUS_API_SECRET = Deno.env.get('AMADEUS_API_SECRET')
const AMADEUS_BASE_URL = 'https://test.api.amadeus.com/v1'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { action, params } = await req.json()

    if (action === 'authenticate') {
      const tokenResponse = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=client_credentials&client_id=${AMADEUS_API_KEY}&client_secret=${AMADEUS_API_SECRET}`,
      })

      const tokenData = await tokenResponse.json()
      return new Response(JSON.stringify(tokenData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (action === 'searchFlights') {
      const queryParams = new URLSearchParams({
        originLocationCode: params.originLocationCode,
        destinationLocationCode: params.destinationLocationCode,
        departureDate: params.departureDate,
        adults: params.adults || '1',
      })

      const response = await fetch(`${AMADEUS_BASE_URL}/shopping/flight-offers?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${params.token}`,
        },
      })

      const data = await response.json()
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (action === 'searchHotels') {
      console.log('Searching hotels with params:', params);
      
      const queryParams = new URLSearchParams({
        cityCode: params.cityCode,
        checkInDate: params.checkIn,
        checkOutDate: params.checkOut,
      })

      const response = await fetch(`${AMADEUS_BASE_URL}/reference-data/locations/hotels/by-city?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${params.token}`,
        },
      })

      const data = await response.json()
      console.log('Hotel search response:', data);
      
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (action === 'searchActivities') {
      const queryParams = new URLSearchParams({
        latitude: params.latitude,
        longitude: params.longitude,
      })

      const response = await fetch(`${AMADEUS_BASE_URL}/shopping/activities?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${params.token}`,
        },
      })

      const data = await response.json()
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in Amadeus function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})