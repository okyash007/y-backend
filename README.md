# Y-Backend

A TypeScript Node.js/Express backend application with MongoDB integration.

## Features

- **TypeScript**: Full type safety and modern JavaScript features
- **Express.js**: Fast, unopinionated web framework
- **MongoDB**: Database integration with Mongoose ODM
- **Device Fingerprinting**: Track unique devices and users
- **Middleware**: Response time tracking, error handling, CORS support
- **Modular Architecture**: Clean separation of concerns

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB instance
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/your-database
   PORT=8080
   NODE_ENV=development
   ```

### Development

```bash
# Start development server with hot reload
npm run dev

# Build TypeScript to JavaScript
npm run build

# Start production server
npm start

# Clean build directory
npm run clean
```

## Project Structure

```
src/
├── config/          # Database and configuration files
├── controllers/     # Request handlers
├── middlewares/     # Express middlewares
├── models/         # Mongoose models and schemas
├── routes/         # API route definitions
├── types/          # TypeScript type definitions
├── utils/          # Utility functions and classes
└── index.ts        # Application entry point
```

## API Endpoints

### User Routes (`/user`)
- `GET /user/auth` - User authentication endpoint
- `POST /user/identify` - User identification endpoint

### Blog Routes (`/blog`)
- `POST /blog/create` - Create a new blog post
- `GET /blog/:slug` - Get blog post by slug

### Device Routes (`/device`)
- `POST /device` - Register/create device fingerprint

### System Routes
- `GET /health` - Health check endpoint
- `GET /fp` - Get device fingerprint information

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `PORT` | Server port (default: 8080) | No |
| `NODE_ENV` | Environment (development/production) | No |

## TypeScript Features

- Strict type checking enabled
- Custom type definitions for Express extensions
- Mongoose model interfaces
- Standardized API response types
- Async error handling with proper typing

## Contributing

1. Follow TypeScript best practices
2. Ensure all types are properly defined
3. Run `npm run build` to check for compilation errors
4. Test endpoints before submitting changes

## License

ISC
