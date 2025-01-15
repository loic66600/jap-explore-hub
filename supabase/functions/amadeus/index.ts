import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const AMADEUS_API_KEY = Deno.env.get('AMADEUS_API_KEY')
const AMADEUS_API_SECRET = Deno.env.get('AMADEUS_API_SECRET')
const AMADEUS_BASE_URL = 'https://test.api.amadeus.com/v1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function getAmadeusToken() {
  const tokenResponse = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=client_credentials&client_id=${AMADEUS_API_KEY}&client_secret=${AMADEUS_API_SECRET}`,
  })

  if (!tokenResponse.ok) {
    throw new Error(`Authentication failed: ${tokenResponse.statusText}`)
  }

  const tokenData = await tokenResponse.json()
  return tokenData.access_token
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { action, params } = await req.json()

    // Get a fresh token for each request
    const token = await getAmadeusToken()
    console.log('Successfully obtained Amadeus token')

    if (action === 'authenticate') {
      return new Response(JSON.stringify({ access_token: token }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (action === 'searchFlights') {
      console.log('Searching flights with params:', params)
      
      const queryParams = new URLSearchParams({
        originLocationCode: params.originLocationCode,
        destinationLocationCode: params.destinationLocationCode,
        departureDate: params.departureDate,
        adults: params.adults || '1',
        max: '20',
        currencyCode: 'JPY'
      })

      const response = await fetch(`${AMADEUS_BASE_URL}/shopping/flight-offers?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        console.error('Flight search failed:', response.status, response.statusText)
        throw new Error(`Flight search failed: ${response.statusText}`)
      }

      const data = await response.json()
      console.log('Flight search response:', data)
      
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (action === 'searchHotels') {
      console.log('Searching hotels with params:', params)
      
      const hotelsResponse = await fetch(
        `${AMADEUS_BASE_URL}/reference-data/locations/hotels/by-city?cityCode=${params.cityCode}`, 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      )

      if (!hotelsResponse.ok) {
        console.error('Hotel search failed:', hotelsResponse.status, hotelsResponse.statusText)
        throw new Error(`Hotel search failed: ${hotelsResponse.statusText}`)
      }

      const hotelsData = await hotelsResponse.json()
      console.log('Hotels by city response:', hotelsData)

      if (hotelsData.data && hotelsData.data.length > 0) {
        const hotelIds = hotelsData.data.slice(0, 10).map((hotel: any) => hotel.hotelId)

        const offersResponse = await fetch(
          `${AMADEUS_BASE_URL}/shopping/hotel-offers?hotelIds=${hotelIds.join(',')}&checkInDate=${params.checkIn}&checkOutDate=${params.checkOut}&currency=JPY&roomQuantity=1`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        )

        if (!offersResponse.ok) {
          console.error('Hotel offers search failed:', offersResponse.status, offersResponse.statusText)
          throw new Error(`Hotel offers search failed: ${offersResponse.statusText}`)
        }

        const offersData = await offersResponse.json()
        console.log('Hotel offers response:', offersData)

        return new Response(JSON.stringify(offersData), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      return new Response(JSON.stringify({ data: [] }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (action === 'searchActivities') {
      console.log('Searching activities with params:', params)
      
      const response = await fetch(
        `${AMADEUS_BASE_URL}/shopping/activities?latitude=${params.latitude}&longitude=${params.longitude}&radius=20`, 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      )

      if (!response.ok) {
        console.error('Activities search failed:', response.status, response.statusText)
        throw new Error(`Activities search failed: ${response.statusText}`)
      }

      const data = await response.json()
      console.log('Activities search response:', data)
      
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in Amadeus function:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})