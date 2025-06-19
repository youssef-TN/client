# PLANNING.md

## Project Overview
A modern inventory management web app for small business, inspired by ZOHO Inventory. Initial focus: inventory management. Future: sales, purchases, and reporting.

## Tech Stack
- React (TanStack Router)
- Tailwind CSS v4 (with tailwind-clamp)
- shadcn/ui for UI components
- Vitest for testing
- Zod for API validation
- TanStack Query for data fetching
- TanStack Store for state management

## Features & Roadmap

### 1. Inventory Management (Phase 1)
- View, search, and filter inventory items
- Add, edit, and delete items
- Track item fields: **id, name, cost, price, category, quantity**
- Customizable columns and sorting
- Bulk selection and actions
- (Current focus: expand item model and update UI/API for these fields)

### 2. Sales & Purchases Management (Phase 2)
- Record sales and purchase transactions
- Update inventory based on transactions
- View transaction history

### 3. Reports (Phase 3)
- Inventory valuation and movement reports
- Sales and purchase summaries
- Export to CSV/PDF

## Architecture & Structure
- `src/routes/` — Page-level routes (inventory, sales, reports)
- `src/components/` — Reusable UI components (shadcn/ui)
- `src/apis/` — API calls and Zod validation
- `src/hooks/` — Custom React hooks
- `src/types/` — TypeScript types and Zod schemas
- `src/tests/` — Unit tests (mirroring main app structure)

## Conventions
- All files < 500 lines; split into modules if needed
- Use Tailwind v4 for all styling
- Use shadcn/ui for all UI components
- All API data validated with Zod
- All new features must have Vitest unit tests
- Update documentation as features are added

---

*This plan will be updated as each feature is completed.* 