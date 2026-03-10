# Toronto Robotics — Site Design

**Date:** 2026-03-09
**Status:** Approved

## Overview

Convert the existing Triggerfishh Next.js codebase into Toronto Robotics — a clean editorial robot news and review site. Hosted on the CarapaceOS VPS (`torontorobotics.carapaceos.com`). OpenClaw (already running on the VPS) handles nightly article generation, writing directly to the database.

## Architecture

- **Framework:** Next.js 14 (existing codebase, stripped and rebuilt)
- **Hosting:** CarapaceOS VPS — Ubuntu 22.04, Nginx reverse proxy, PM2 process manager
- **Domain:** `torontorobotics.carapaceos.com` (DNS A record → 76.13.120.97 — already added)
- **Database:** Existing Drizzle ORM setup — extend with `articles` table
- **Content pipeline:** OpenClaw writes nightly articles to DB. No CMS.
- **Newsletter:** Deferred to v2

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Front page — hero article (OpenClaw-generated) + news feed (6 latest) |
| `/news` | Paginated list of all robot news articles |
| `/news/[slug]` | Individual article page |
| `/reviews` | Robot reviews (manually curated to start) |
| `/buy` | "How to buy a robot in Toronto" — pass-through links to top 3 manufacturers |
| `/about` | Short about page |

## Content Model

New `articles` table in the existing DB:

```
id             serial primary key
slug           text unique not null
title          text not null
summary        text not null
body           text not null  -- markdown
category       text not null  -- 'news' | 'review' | 'buy-guide'
published_at   timestamp not null
source_url     text
is_featured    boolean default false
created_at     timestamp default now()
```

Front page queries:
- Hero: `WHERE is_featured = true ORDER BY published_at DESC LIMIT 1`
- Feed: `WHERE category = 'news' ORDER BY published_at DESC LIMIT 6`

OpenClaw writes to this table nightly with `is_featured = true` on the article of the day (unfeaturing previous).

## Design System

- **Style:** Clean editorial (The Verge / Wired aesthetic)
- **Background:** White, text black
- **Accent colour:** `#E63329` (robot red)
- **Typography:** Inter (headlines bold and large, body comfortable reading size)
- **Images:** Large hero image per article
- **Dark mode:** Not in v1
- **Responsive:** Mobile-first

## Out of Scope (v1)

- Newsletter (deferred to v2)
- User accounts / comments
- Search
- Ad monetisation
