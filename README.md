Momentum Fitness Tracker

Momentum Fitness Tracker is a modern web app designed to help users plan workouts, track exercise history, monitor progress, and stay consistent. It features authentication, exercise search, workout logging, progress visualization, and customizable goals, all wrapped in a clean, friendly UI.

   Features

✅ User Authentication
Secure login and signup with Firebase Authentication.

✅ Dashboard Overview
View your workout stats, progress score, and quick navigation options.

✅ Exercise Search
Search exercises via API Ninjas and explore type, muscle group, and variations.

✅ Workout Plans
Create and manage personalized workout routines.

✅ Progress Tracking
Track your progress with charts and historical stats.

✅ Profile Management
Update your display name, age, goals, and workout days.

✅ Responsive UI
Designed with Tailwind CSS, optimized for both mobile and desktop.

🛠️ Tech Stack

Frontend

React (Vite)

React Router

Tailwind CSS

Backend & Storage

Firebase Authentication

Firestore Database

External API

API Ninjas (exercise data)

📂 Folder Structure (Key)
src/
 ├── assets/          # Background images / logos
 ├── components/      # Reusable UI components
 ├── context/         # Auth context provider
 ├── pages/           # Main screens (Dashboard, Profile, etc.)
 ├── firebaseConfig.js
 ├── App.jsx
 ├── main.jsx
 └── index.css

  Environment Variables (.env)

Create a .env file in the root (same level as vite.config.js) and include:

VITE_API_NINJAS_KEY=your_api_key
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...


✅ Restart your dev server after adding them.

▶️ Running the App Locally
npm install
npm run dev


Then visit:
http://localhost:5173

✅ Deployment Notes

The app uses:

Vite → optimized for hosting on Netlify, Vercel, or Firebase Hosting.

Make sure .env values are added to your deployment platform settings.

If deploying to Vercel/Netlify:

Connect GitHub Repo

Add environment variables

Build command: npm run build

Output folder: dist

📌 Future Enhancements

Social login (Google/Apple)

AI-based workout recommendations

Streak tracking & reminders

Calorie tracking & diet integration

👤 Author

Developed by Joy Kiama.