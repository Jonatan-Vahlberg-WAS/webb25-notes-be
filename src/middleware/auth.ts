import type { Context, Next } from "hono";
import { HTTPException } from "hono/http-exception";
import { createSupabaseForRequest } from "../lib/supabase.js";

async function _setSupabaseContext(c: Context): Promise<void> {
  const existingClient = c.get("supabase");

  if (existingClient) {
    return;
  }

  const supabase = createSupabaseForRequest(c);

  c.set("supabase", supabase);

  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  c.set("user", error ? null : user);
}

export async function optionalAuth(c: Context, next: Next) {
  await _setSupabaseContext(c);
  await next();
}

export async function requireAuth(c: Context, next: Next) {
  await _setSupabaseContext(c);

  const user = c.get("user");

  if (!user) {
    throw new HTTPException(401, {
      message: "unauthorized"
    });
  }

  await next();
}
