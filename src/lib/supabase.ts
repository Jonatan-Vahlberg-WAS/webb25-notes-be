import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const url = process.env.SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_PUBLISHABLE_KEY

if (!url || !key) {
  throw new Error('Missing SUPABASE_URL or a Supabase key')
}

export const supabase = createClient(url, key)
