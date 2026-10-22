import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { requireAuth } from '../middleware/auth.js'

const tags = new Hono()

const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)

const createTagSchema = z.object({
  slug: slugSchema,
  name: z.string().trim().min(1),
})

const updateTagSchema = z.object({
  name: z.string().trim().min(1),
})

tags.get('/', async (c) => {
  const sb = c.get("supabase")
  const { data, error } = await sb
    .from('tags')
    .select('slug, name, created_at')
    .order('name')

  if (error) return c.json({ error: error.message }, 500)
  return c.json(data)
})

tags.get('/:slug', async (c) => {
  const slug = c.req.param('slug')
  const sb = c.get("supabase")
  const { data, error } = await sb
    .from('tags')
    .select('slug, name, created_at')
    .eq('slug', slug)
    .maybeSingle()

  if (error) return c.json({ error: error.message }, 500)
  if (!data) return c.json({ error: 'Tag not found' }, 404)
  return c.json(data)
})

tags.post('/', requireAuth,  zValidator('json', createTagSchema), async (c) => {
  const body = c.req.valid('json')
  const sb = c.get("supabase")
  const { data, error } = await sb
    .from('tags')
    .insert(body)
    .select('slug, name, created_at')
    .single()

  if (error?.code === '23505') return c.json({ error: 'Tag already exists' }, 409)
  if (error) return c.json({ error: error.message }, 500)
  return c.json(data, 201)
})

tags.patch('/:slug', requireAuth, zValidator('json', updateTagSchema), async (c) => {
  const slug = c.req.param('slug')
  const { name } = c.req.valid('json')
  const sb = c.get("supabase")
  const { data, error } = await sb
    .from('tags')
    .update({ name })
    .eq('slug', slug)
    .select('slug, name, created_at')
    .maybeSingle()

  if (error) return c.json({ error: error.message }, 500)
  if (!data) return c.json({ error: 'Tag not found' }, 404)
  return c.json(data)
})

tags.delete('/:slug', requireAuth,  async (c) => {
  const slug = c.req.param('slug')
  const sb = c.get("supabase")
  const { data, error } = await sb
    .from('tags')
    .delete()
    .eq('slug', slug)
    .select('slug')
    .maybeSingle()

  if (error?.code === '23503') {
    return c.json({ error: 'Tag is used by a note' }, 409)
  }
  if (error) return c.json({ error: error.message }, 500)
  if (!data) return c.json({ error: 'Tag not found' }, 404)
  return c.body(null, 204)
})

export default tags
