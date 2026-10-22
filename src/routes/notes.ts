import { Hono } from "hono";

const notes = new Hono()

const noteSelect = `
id,
owner_id,
title,
content,
created_at,
tags:note_tags (
      ...tags (
        slug,
        name
      )
    )
`


notes.get("/", async (c) => {
    const sb = c.get("supabase")
    try {

        const {data, error} = await sb.from("notes").select(noteSelect)
        
        if(error) {
            throw error
        }
        return c.json(data)
    } catch (e) {
        console.warn("Error fetching notes", e)
        return c.json([])
    }
})

export default notes