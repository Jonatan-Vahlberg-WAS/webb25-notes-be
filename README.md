```
npm install
npm run dev
```

```
open http://localhost:3000
```

# Instructions

- [x] Create DB models
- [x] Skapa types (hämta från databasen)
- [x] Skapa authentifcation 
    - [x] (Register med email, password, name)
    - [x] (Login email, password)
- [x] Skapa middleware
- [ ] Skapa och activera RLS och policies
- [ ] Skapa router
- [ ] Skapa validering?


```
npx supabase gen types typescript --project-id "$PROJECT_ID" --schema public > src/types/database.types.d.ts
```