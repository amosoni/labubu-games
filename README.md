# Labubu Game 🦄

![Labubu Game](https://images.pexels.com/photos/4792728/pexels-photo-4792728.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop)

A fun, cute monster-themed online game aggregator for girls! Discover and play free HTML5 games like dress-up, makeup, simulations, and more, embedded seamlessly. Built with Next.js for fast performance, SEO, and scalability.

## ✨ Features

- **Game Aggregation**: Embed 100+ free games via iframes from Poki, Y8, etc.
- **Cute Theme**: Pastel designs with monster animations and "Blind Box" features
- **Social & Community**: Share games, upload screenshots, vote on designs
- **Mobile-First**: Responsive UI for phones, tablets, and desktops
- **i18n Ready**: Defaults to English with support for Spanish and French
- **SEO Optimized**: Dynamic metadata, sitemaps, and structured data
- **Auto-Updates**: Weekly scraping of new games via cron jobs
- **Security**: Sandboxed iframes and secure data handling

## 🚀 Tech Stack

- **Framework**: Next.js 15+ with App Router
- **Styling**: Tailwind CSS with custom cute theme
- **Database**: MongoDB with Mongoose
- **i18n**: next-intl for internationalization
- **Animation**: Framer Motion for smooth interactions
- **Icons**: Lucide React for consistent iconography
- **Deployment**: Optimized for Vercel

## 🎮 Game Categories

- 👗 **Dress-Up & Fashion**: Style cute monsters and characters
- 💄 **Makeup & Beauty**: Create stunning looks and makeovers
- 🏪 **Simulation**: Manage cafes, shops, and virtual worlds
- 🐾 **Pet Care**: Nurture and care for adorable creatures
- 🗺️ **Adventure**: Explore magical worlds and quests
- 🧩 **Puzzle**: Brain teasers and matching games
- 💕 **Romance**: Dating sims and love stories
- 👹 **Monster Care**: Customize and care for cute monsters

## 📱 Responsive Design

The application is designed with a mobile-first approach:
- **Mobile**: Optimized touch interfaces and single-column layouts
- **Tablet**: Adaptive grid systems and touch-friendly navigation
- **Desktop**: Full-featured experience with hover states and animations

## 🌍 Internationalization

Currently supports:
- 🇺🇸 **English** (Default)
- 🇪🇸 **Spanish** (Español)
- 🇫🇷 **French** (Français)

Easy to add more languages by creating new JSON files in `src/messages/`.

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd labubu-game
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your MongoDB connection string.

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Visit [http://localhost:3000/en](http://localhost:3000/en)

## 🔧 Development

### Adding New Games

Games can be added through:
1. **Manual API**: POST to `/api/games`
2. **Scraper Script**: Run `npm run scrape`
3. **Admin Interface**: (Coming soon)

### Customizing Theme

Edit `tailwind.config.ts` to modify:
- Color palette (primary, secondary, accent colors)
- Font families and sizes
- Animation speeds and effects
- Spacing and breakpoints

### Adding New Languages

1. Create new message file: `src/messages/[locale].json`
2. Add locale to `src/middleware.ts`
3. Update locale selector in navigation

## 📊 SEO & Performance

- **Dynamic Metadata**: Each page generates appropriate meta tags
- **Structured Data**: JSON-LD for games and organization
- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic with Next.js App Router
- **ISR & SSR**: Intelligent caching strategies

## 🔒 Security

- **Sandboxed Iframes**: All games run in restricted sandboxes
- **Input Validation**: Server-side validation for all user inputs
- **CORS Protection**: Configured for secure cross-origin requests
- **Environment Variables**: Sensitive data kept secure

## 🤖 Automated Updates

Weekly game scraping via Vercel Cron:
- Runs every Sunday at midnight UTC
- Discovers new games from partner sites
- Automatically categorizes and adds to database
- Triggers cache revalidation for fresh content

## 📈 Analytics & Monitoring

Ready for integration with:
- Google Analytics 4
- Vercel Analytics
- Performance monitoring tools
- Error tracking services

## 🎨 Design System

**Colors:**
- Primary: #FFB6C1 (Light Pink)
- Secondary: #98FB98 (Mint Green)  
- Accent: #F97316 (Orange)
- Success: #10B981
- Warning: #F59E0B
- Error: #EF4444

**Typography:**
- Primary Font: Poppins (Round, friendly)
- Font Weights: 300, 400, 500, 600, 700
- Responsive scaling with proper line heights

**Animations:**
- Subtle hover effects and micro-interactions
- Loading states with cute monster icons
- Smooth page transitions and element reveals

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Custom Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## 🤝 Contributing

We welcome contributions! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## 💖 Acknowledgments

- Inspired by the adorable Labubu characters
- Game content sourced from Poki, Y8, and CrazyGames
- Images from Pexels for placeholders
- Community feedback and suggestions

---

**Built with ❤️ for girls who love cute games!**

For questions or support, please open an issue on GitHub.