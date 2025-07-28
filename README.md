# Full-Stack Notes Application

A complete full-stack web application built with Next.js, featuring user authentication, CRUD operations, and AI-powered insights.

## 🚀 Features

- **User Authentication**: JWT-based registration and login system
- **Notes Management**: Full CRUD operations for personal notes
- **AI Insights**: Google AI Studio integration for note analysis
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Secure API**: Protected routes with JWT authentication
- **Database**: PostgreSQL with Prisma ORM
- **Type Safety**: Full TypeScript implementation

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Node.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **AI Integration**: Google AI Studio (Gemini)
- **Testing**: Jest
- **Deployment**: Vercel-ready

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

## 🔧 Installation & Setup

### 1. Clone and Install Dependencies

\`\`\`bash
# Clone the repository
git clone <your-repo-url>
cd fullstack-notes-app

# Install dependencies
npm install
\`\`\`

### 2. Environment Configuration

Create a `.env.local` file in the root directory:

\`\`\`env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/notes_app?schema=public"

# JWT Secret (generate a secure random string)
JWT_SECRET="your-super-secure-jwt-secret-key-here"

# Google AI Studio API Key (get from https://makersuite.google.com/app/apikey)
GOOGLE_AI_STUDIO_API_KEY="your-google-ai-studio-api-key-here"
\`\`\`

### 3. Database Setup

\`\`\`bash
# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Alternative: Run migrations (for production)
npm run db:migrate
\`\`\`

### 4. Google AI Studio Setup

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add the API key to your `.env.local` file

### 5. Run the Application

\`\`\`bash
# Development mode
npm run dev

# Production build
npm run build
npm start
\`\`\`

The application will be available at `http://localhost:3000`

## 📁 Project Structure

\`\`\`
fullstack-notes-app/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── notes/         # Notes CRUD endpoints
│   │   └── ai/            # AI insights endpoint
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── auth-provider.tsx  # Authentication context
│   ├── notes-manager.tsx  # Notes management component
│   └── ai-insights.tsx    # AI insights component
├── lib/                   # Utility functions
├── prisma/               # Database schema and migrations
├── __tests__/            # Test files
└── scripts/              # Database initialization scripts
\`\`\`

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Notes (Protected)
- `GET /api/notes` - Get all user notes
- `POST /api/notes` - Create new note
- `PUT /api/notes/[id]` - Update note
- `DELETE /api/notes/[id]` - Delete note

### AI Features (Protected)
- `POST /api/ai/insights` - Generate AI insights from notes

## 🧪 Testing

\`\`\`bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
\`\`\`

## 🚀 Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `GOOGLE_AI_STUDIO_API_KEY`
4. Deploy!

### Database Deployment

For production, consider using:
- **Vercel Postgres**: Integrated PostgreSQL solution
- **Supabase**: Open-source Firebase alternative
- **PlanetScale**: MySQL-compatible serverless database
- **Railway**: Simple database hosting

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Input validation and sanitization
- CORS protection
- SQL injection prevention (Prisma ORM)

## 🎨 UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/) components:
- Button, Input, Textarea
- Card, Dialog, Badge
- Avatar, Separator, Toast
- And more...

## 🤖 AI Integration

The application integrates with Google AI Studio (Gemini) to provide:
- Note analysis and insights
- Pattern recognition in notes
- Productivity suggestions
- Theme identification

## 📝 Usage

1. **Register**: Create a new account
2. **Login**: Sign in to your account
3. **Create Notes**: Add your thoughts and ideas
4. **Manage Notes**: Edit, delete, and organize your notes
5. **AI Insights**: Generate AI-powered insights from your notes

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify your `DATABASE_URL` is correct
   - Ensure PostgreSQL is running
   - Check database credentials

2. **JWT Token Issues**
   - Ensure `JWT_SECRET` is set in environment variables
   - Check token expiration (default: 7 days)

3. **AI Insights Not Working**
   - Verify `GOOGLE_AI_STUDIO_API_KEY` is valid
   - Check API quota and billing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Prisma](https://prisma.io/) - Database ORM
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Google AI Studio](https://makersuite.google.com/) - AI integration
