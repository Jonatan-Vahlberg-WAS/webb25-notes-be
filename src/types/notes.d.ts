import type { Database } from "./database.types.js";

export type NoteTag = Database["public"]["Tables"]["note_tags"]["Row"]

export type Note = Database["public"]["Tables"]["notes"]["Row"]
