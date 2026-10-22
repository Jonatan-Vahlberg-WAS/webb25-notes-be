import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'
import type { Context, Next } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { createServerClient } from "@supabase/ssr";
import type { Database } from '../types/database.types.js'

const url = process.env.SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_PUBLISHABLE_KEY

if (!url || !key) {
  throw new Error('Missing SUPABASE_URL or a Supabase key')
}

export function createSupabaseForRequest(c: Context) {
  return createServerClient<Database>(url!, key!, {
    cookies: {
      getAll() {
        const cookies = getCookie(c);

        return Object.entries(cookies).map(([name, value]) => ({
          name,
          value
        }));
      },

      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          setCookie(c, name, value, {
            domain: options.domain,
            expires: options.expires,
            maxAge: options.maxAge,
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/"
          });
        });
      }
    }
  });
}