# AVN Outfits - Premium Men's Minimalist Shop

AVN Outfits is a high-end, minimalist e-commerce demo for a modern men's clothing brand. Built with Next.js 15, it features a clean aesthetic, seamless navigation, and a powerful "Admin Pro+" suite for localized store management.

![AVN Outfits Banner](https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80)

## ✨ Key Features

### 🛍️ Customer Experience
- **Premium Storefront**: Browse curated men's apparel with a "less is more" design philosophy.
- **Dynamic Filtering**: Instant category-based filtering using a modern badge-style interface.
- **Seamless Cart**: A session-persistent shopping cart powered by Zustand.
- **Mock Checkout**: A complete multi-step flow (Shipping → Payment → Success) for a realistic demo.

### 🛡️ Admin Pro+ (Management Suite)
- **Product Management**: Full CRUD operations with detailed image metadata tracking.
- **Canvas Compression Engine**: Automatic client-side image resizing and JPEG 70% compression to optimize LocalStorage usage.
- **DnD Category Controller**: Intuitive drag-and-drop category reordering using `@dnd-kit`.
- **Paginated Catalog**: High-performance product listing with a 6-item pagination limit and live search.
- **Interactive Feedback**: Comprehensive toast notification system for all administrative actions.

## 🛠️ Tech Stack

- **Core**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State & Persistence**: [Zustand](https://github.com/pmndrs/zustand) with LocalStorage Sync
- **Interactions**: [@dnd-kit](https://dndkit.com/) for Drag-and-Drop
- **Icons**: [Lucide React](https://lucide.dev/)
- **Performance**: Automated Client-side Image Optimization (Canvas API)

## 🚀 Getting Started

### Prerequisites
- Node.js 20.x or later
- npm / yarn / pnpm

### Installation

1. **Clone & Enter**
   ```bash
   git clone <repository-url>
   cd AVN-Outfits
   ```

2. **Setup Dependencies**
   ```bash
   npm install
   ```

3. **Launch Dev Server**
   ```bash
   npm run dev
   ```

4. **Access**
   Open [http://localhost:3000](http://localhost:3000). The Admin panel is located at `/admin`.

## 📁 Architecture

- `app/`: Next.js App Router (Store & Admin dashboard).
- `components/`: Pure UI components, layout structures, and admin modals.
- `store/`: Zustand state management with `avn-demo-storage` persistence logic.
- `lib/`: Standardized mock data and utility helpers.

---
Built with ❤️ by **AVN Team** for the AI for Web Bootcamp.
