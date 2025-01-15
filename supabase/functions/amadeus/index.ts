import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

async function getAmadeusToken() {
  try {
    console.log('Getting Amadeus token...')
    const tokenResponse = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${Deno.env.get('AMADEUS_API_KEY')}&client_secret=${Deno.env.get('AMADEUS_API_SECRET')}`,
    })

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text()
      console.error('Token request failed:', tokenResponse.status, errorText)
      throw new Error(`Authentication failed: ${tokenResponse.statusText}`)
    }

    const tokenData = await tokenResponse.json()
    console.log('Successfully obtained Amadeus token')
    return tokenData.access_token
  } catch (error) {
    console.error('Error getting Amadeus token:', error)
    throw error
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      headers: corsHeaders,
      status: 204
    })
  }

  try {
    const { action, params } = await req.json()
    console.log('Received request:', { action, params })

    // Validate required environment variables
    if (!Deno.env.get('AMADEUS_API_KEY') || !Deno.env.get('AMADEUS_API_SECRET')) {
      console.error('Missing Amadeus API credentials')
      return new Response(
        JSON.stringify({ error: 'Missing Amadeus API credentials' }), 
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    // Get a fresh token for each request
    const token = await getAmadeusToken()

    if (action === 'searchFlights') {
      // Validate required parameters
      if (!params?.originLocationCode || !params?.destinationLocationCode || !params?.departureDate) {
        console.error('Missing required parameters:', params)
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
        )
      }

      console.log('Searching flights with params:', params)
      
      const queryParams = new URLSearchParams({
        originLocationCode: params.originLocationCode,
        destinationLocationCode: params.destinationLocationCode,
        departureDate: params.departureDate,
        adults: params.adults || '1',
        max: '20',
        currencyCode: 'EUR'
      })

      const response = await fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Flight search failed:', response.status, errorText)
        return new Response(
          JSON.stringify({ error: `Flight search failed: ${response.statusText}`, details: errorText }), 
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: response.status }
        )
      }

      const data = await response.json()
      console.log('Flight search successful')
      
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      })
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Error in Amadeus function:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})