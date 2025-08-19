# The Flex Assessment

A full-stack web application showcasing a Node.js (Express) backend and a Next.js (React) frontend.

## 🚀 Features

### ✅ Backend (Express)

- **REST API Endpoints**: Served under `/api` with mock data. Example: `GET /api/reviews?listingId=101` to fetch reviews by `listingId`.
- **Middleware**: Handles requests and responses.
- **Services & Utilities**: Structured, reusable business logic.
- **Testing**: Jest setup with sample test cases (`jest.config.js`).
- **Environment Configuration**: Uses `.env` for configuration.
- **Docker Support**: Includes Dockerfile for containerized deployment.

### ✅ Frontend (Next.js)

- **Built with Next.js App Router** (`/src/app`).
- **Global Styling**: Defined in `globals.css`.
- **Layout**: Configured in `layout.js`.
- **Pages**:
  - `/dashboard`: Displays the dashboard screen.
  - `/property/[listingId]`: Dynamic property page that fetches and displays reviews from the backend API.
  - `/api/reviews`: Frontend proxy to fetch data from the backend.
- **Error Handling**: Robust handling for dynamic routes.

### ✅ Full-Stack Integration

- Backend serves mock data via REST APIs.
- Frontend fetches data from the backend (`http://localhost:3000/api/reviews`).
- Dynamic property details displayed using the `[listingId]` route.

## 📂 Folder Structure

```
the-flex-assessment/
├── backend/                    # Express.js backend
│   ├── mock-data/              # Mock data for APIs
│   ├── src/
│   │   ├── middleware/         # Request/response middleware
│   │   ├── routes/             # API route definitions
│   │   ├── services/           # Business logic
│   │   ├── tests/              # Jest test cases
│   │   ├── utils/              # Helper functions
│   │   └── index.js            # Main entry point
│   ├── .env                    # Environment variables
│   ├── Dockerfile              # Docker configuration
│   ├── jest.config.js          # Jest configuration
│   ├── package.json
│   └── package-lock.json
├── frontend/                   # Next.js frontend
│   ├── public/                 # Static assets
│   ├── src/
│   │   └── app/
│   │       ├── api/reviews/    # API proxy route
│   │       ├── dashboard/      # Dashboard page
│   │       ├── property/[listingId]/  # Dynamic property page
│   │       ├── globals.css     # Global styles
│   │       ├── layout.js       # Layout configuration
│   │       └── page.js         # Home page
│   ├── package.json
│   └── package-lock.json
```

## ⚙️ Installation & Setup

### Testing

Run backend tests with Jest:
```bash
cd backend
npm test
```

### Docker

Build and run frontend + backend:
```bash
docker-compose up 
```

The dashboard will be accessible at `http://localhost:3000/dashboard``.

## 🔗 Example Usage

- **Dashboard**: Open `http://localhost:3000/dashboard` to view the dashboard.
- **Property Page**: Open `http://localhost:3000/property/101` to fetch and display reviews for `listingId=101`.
- **Backend API**: Test the endpoint directly:
  ```
  GET http://localhost:5000/api/reviews?listingId=101
  ```

## 📌 Tech Stack

- **Backend**: Node.js, Express, Jest, Docker
- **Frontend**: Next.js (React), CSS Modules
- **Other**: REST APIs, Dynamic Routing, Environment Variables