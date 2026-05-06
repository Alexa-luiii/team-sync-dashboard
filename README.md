# Team Sync Dashboard

Team Sync Dashboard is a professional SaaS tool designed for remote teams to find the best overlapping working hours for meetings. It eliminates timezone confusion for distributed teams across the globe.

## 🚀 Features

- **Animated Splash Screen**: Professional 5-second animated entrance.
- **Add Team Member System**: Add members with automatic timezone detection and custom working hours.
- **User Timezone Switcher**: Auto-detects your timezone and allows manual override for reference.
- **Team List Dashboard**: Clean card layout displaying member details and LIVE local time.
- **Timezone Conversion Engine**: Robust logic handling UTC offsets and midnight-wrap overlaps.
- **Overlap Visualization**: A 24-hour timeline chart highlighting shared availability.
- **Best Meeting Time Generator**: Suggestions for the best meeting time or optimal compromises.
- **Export Feature**: Export team schedules as professional CSV and PDF reports.

## 🛠️ Tech Stack

- **React** (Vite)
- **Tailwind CSS**
- **Lucide React** (Icons)
- **Luxon** (Time manipulation)
- **jsPDF** (Report generation)

## 📦 Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Alexa-luiii/team-sync-dashboard.git
   cd team-sync-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 📂 Project Structure

All source files are located in the `src/` directory. The project is structured for direct deployment from the repository root.

- `src/components`: UI components (SplashScreen, Header, Cards, etc.)
- `src/utils`: Core logic for timezone conversion, overlap calculations, and country data.
- `src/pages`: Main application pages.
- `src/styles`: Global CSS and Tailwind configurations.
- `public/`: Static assets (SVG logo and favicon).
