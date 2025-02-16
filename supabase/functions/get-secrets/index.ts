
import { serve } from "https://deno.land/std@0.177.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  console.log('get-secrets function called')

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling CORS preflight request')
    return new Response(null, { 
      headers: corsHeaders,
      status: 204
    })
  }

  try {
    console.log('Parsing request body...')
    const { secrets } = await req.json()
    
    if (!secrets || !Array.isArray(secrets)) {
      console.error('Invalid secrets parameter:', secrets)
      throw new Error('Invalid secrets parameter')
    }

    console.log('Requested secrets:', secrets)
    
    const values: Record<string, string> = {}

    for (const secret of secrets) {
      const value = Deno.env.get(secret)
      if (!value) {
        console.warn(`Warning: Secret ${secret} not found`)
      }
      values[secret] = value || ''
    }

    console.log('Successfully retrieved secrets:', Object.keys(values))

    return new Response(
      JSON.stringify(values),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
        status: 200
      }
    )
  } catch (error) {
    console.error('Error in get-secrets function:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack
      }), 
      {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
        status: 400
      }
    )
  }
})
