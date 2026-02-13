## Project Structure

```bash
app/
│── layout.tsx          # Root layout
│── page.tsx            # Home page
│── globals.css
│
│── (auth)/             # Route group (no URL impact)
│   ├── login/
│   │   └── page.tsx
│   └── register/
│       └── page.tsx
│
│── dashboard/
│   ├── layout.tsx      # Dashboard layout
│   ├── page.tsx
│   ├── loading.tsx
│   ├── error.tsx
│
│── api/                # Route handlers (backend)
│   └── users/route.ts
│
components/             # UI-only components
│── ui/
│── forms/
│
features/               # Business logic (IMPORTANT)
│── auth/
│── billing/
│── user/
│
lib/                    # Core logic
│── db.ts
│── auth.ts
│── fetcher.ts
│
hooks/
types/
config/
```