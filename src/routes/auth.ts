import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { supabase } from "../lib/supabase.js";

const auth = new Hono();

auth.post("/register", async (c) => {
  const sb = c.get("supabase")
  try {
    const { email, password, name } = await c.req.json();

    const { data, error } = await sb.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) {
      throw error;
    }
    return c.json({
      user: {
        email: data.user?.email,
        name: data.user?.user_metadata.name
      },
      message: "Registered successfully",
    });
  } catch (e) {
    console.log("error in registering: ", e);
    return c.json({
      message: "invalid credentials",
    });
  }
});


auth.post("/login", async (c) => {
  const sb = c.get("supabase")
  try {
    const { email, password } = await c.req.json();

    const { data, error } = await sb.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }
    return c.json({
      user: {
        email: data.user?.email,
        name: data.user?.user_metadata.name
      },
      message: "Success",
    });
  } catch (e) {
    console.log("error in registering: ", e);
    return c.json({
      message: "invalid credentials",
    });
  }
});


export default auth;
