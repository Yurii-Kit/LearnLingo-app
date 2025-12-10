# LearnLingo

LearnLingo is a web application for finding and booking online language teachers. Users can browse through a list of qualified teachers, filter them by language, student level, and price, and book trial lessons.

![React](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Firebase](https://img.shields.io/badge/Firebase-12.6-orange)
![Vite](https://img.shields.io/badge/Vite-7.2-purple)

## 🌟 Features

- **User Authentication**: Register, login, and manage your account with Firebase Authentication
- **Teacher Catalog**: Browse a comprehensive list of language teachers with detailed profiles
- **Smart Filtering**: Filter teachers by:
  - Teaching language
  - Student knowledge level
  - Price per hour
- **Favorites System**: Save your favorite teachers to a personal list (for registered users)
- **Teacher Details**: View detailed information about each teacher including:
  - Experience and qualifications
  - Student reviews and ratings
  - Lesson information and conditions
- **Book Trial Lesson**: Easily book a trial lesson with any teacher through a convenient form
- **Responsive Design**: Desktop-optimized interface with modern UI

## 🛠️ Technologies

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Forms**: React Hook Form + Yup validation
- **Backend Services**: Firebase (Authentication + Realtime Database)
- **Styling**: CSS Modules
- **Notifications**: React Hot Toast
- **UI Components**: React Select, React Icons

## 📄 Pages

| Page          | Description                                                         |
| ------------- | ------------------------------------------------------------------- |
| **Home**      | Landing page with company benefits and call-to-action               |
| **Teachers**  | Catalog of all teachers with filtering and "Load More" pagination   |
| **Favorites** | Private page with saved favorite teachers (requires authentication) |

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Yurii-Kit/LearnLingo-app.git
cd LearnLingo-app
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_DATABASE_URL=your_database_url
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── assets/          # Static assets (images, icons)
├── components/      # Reusable UI components
├── firebase/        # Firebase configuration
├── lib/
│   ├── hooks/       # Custom React hooks
│   ├── services/    # API and data services
│   └── store/       # Zustand state management
├── pages/           # Page components
└── types/           # TypeScript type definitions
```

## 🔐 Authentication

The app uses Firebase Authentication for user management:

- Email/password registration and login
- Persistent sessions
- Protected routes for authenticated users

## 📚 Database

Teacher data is stored in Firebase Realtime Database with the following structure:

- `name`, `surname` - Teacher's full name
- `languages` - Languages they teach
- `levels` - Student levels they work with
- `rating` - Teacher rating
- `reviews` - Student reviews
- `price_per_hour` - Lesson price
- `lessons_done` - Number of completed lessons
- `avatar_url` - Profile picture
- `lesson_info` - Lesson description
- `conditions` - Teaching conditions
- `experience` - Teaching experience

## 🔗 Links

- [Live Demo](https://learnlingo-app.vercel.app)
- [Design Mockup](https://www.figma.com/file/dewf5jVviSTuWMMyU3d8Mc/Learn-Lingo)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ by [Yurii Kit](https://github.com/Yurii-Kit)
