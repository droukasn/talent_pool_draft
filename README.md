# Talent Pool Draft - Admin Experts Table

This project displays experts from the Supabase `experts` table.

## Main Features

- Fetches and displays `website_title` and `tags_sectors` from the `experts` table.
- Click any expert tile for more details.
- Built with Next.js (app directory), TypeScript, and Supabase.

## Setup

1. Set environment variables in Vercel or `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. Deploy on Vercel: [talentpooldraft.vercel.app](https://talentpooldraft.vercel.app)

## Development

- Run locally: `npm run dev` or `yarn dev`
- All data comes from the Supabase `experts` table.
