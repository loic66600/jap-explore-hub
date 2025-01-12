import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const endpoint = url.searchParams.get('endpoint') || ''
    const params = Object.fromEntries(url.searchParams)
    delete params.endpoint

    // Get Amadeus token
    const tokenResponse = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: Deno.env.get('AMADEUS_API_KEY') || '',
        client_secret: Deno.env.get('AMADEUS_API_SECRET') || '',
      }),
    })

    const { access_token } = await tokenResponse.json()

    // Make request to Amadeus API
    const apiResponse = await fetch(`https://test.api.amadeus.com/v1${endpoint}?${new URLSearchParams(params)}`, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
      },
    })

    const data = await apiResponse.json()
    console.log('Amadeus API response:', data)

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in Amadeus function:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})