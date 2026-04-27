# Team Sync Dashboard

Team Sync Dashboard is a SaaS tool designed for remote teams to find the best overlapping working hours for meetings. It eliminates timezone confusion for distributed teams across the globe.

## 🚀 Features

- **Add Team Member System**: Add members with automatic timezone detection and custom working hours.
- **Team List Dashboard**: Clean card layout displaying member details and local time.
- **Timezone Conversion Engine**: Logic to convert all working hours to UTC and detect overlaps.
- **Overlap Visualization**: A 24-hour timeline chart highlighting shared availability.
- **Best Meeting Time Generator**: Suggestions for the best meeting time or optimal compromises.
- **Export Feature**: Export team schedules as CSV.

## 🛠️ Tech Stack

- **React** (Vite)
- **Tailwind CSS**
- **Lucide React** (Icons)
- **Luxon** (Time manipulation)

## 📦 Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/team-sync-dashboard.git
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

- `src/components`: UI components (Header, Cards, Charts, etc.)
- `src/utils`: Core logic for timezone conversion and overlap calculation.
- `src/data`: Sample data for the demo.
- `src/styles`: Global CSS and Tailwind configuration.

## 🌍 Sample Data

The dashboard comes pre-loaded with a demo team:
- **Ali** (Pakistan UTC+5)
- **John** (UK UTC+0)
- **Sarah** (USA UTC-5)
