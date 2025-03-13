# Lead Management Application

## Overview

The Lead Management Application is a Next.js frontend application designed to facilitate the creation, retrieval, and management of leads. It features a public lead submission form for prospects and an internal lead management interface for authenticated users.

## Features

- **Public Lead Form**: Prospects can submit their information through a user-friendly form.
- **Internal Lead Management UI**: Authenticated users can view and manage submitted leads, including updating their statuses.
- **File Upload**: Users can upload their resumes/CVs as part of the lead submission process.
- **Responsive Design**: The application is designed to be fully responsive across various devices.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/lead-management-app.git
   ```

2. Navigate to the project directory:

   ```
   cd lead-management-app
   ```

3. Install the dependencies:

   ```
   npm install
   ```

### Running the Application

To start the development server, run:

```
npm run dev
```

The application will be available at `http://localhost:3000`.

### Folder Structure

- `src/components`: Contains React components for the application.
- `src/pages`: Contains the pages for the application, including API routes.
- `src/styles`: Contains global styles for the application.
- `src/utils`: Contains utility functions for API calls.
- `src/types`: Contains TypeScript interfaces and types.

## API Endpoints

The application includes mock API endpoints for handling lead data. The following endpoints are available:

- `POST /api/leads`: Create a new lead.
- `GET /api/leads`: Retrieve a list of leads.
- `PUT /api/leads/:id`: Update the status of a lead.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.