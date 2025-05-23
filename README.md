# DASHSYNC a Users Management App

This project is a user management web application built with React. It allows users to view, filter, edit, and delete user profiles. Authentication is required to access the users list.

## Features
- User authentication (login system)
- Email - eve.holt@reqres.in
- Password - cityslicka
- Fetch user data from an API
- Search and filter users by first name
- Edit and delete user functionality
- Pagination support
- Responsive design

## Installation

### Prerequisites
- Node.js (>=14.0.0)
- npm or yarn

### Steps to Run
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo-url.git
   cd your-repo-folder
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```
   The app will be available at `http://localhost:3000`.

## API Endpoint
This project uses `https://reqres.in/api/users` as a mock API for fetching user data.

## Assumptions & Considerations
- Authentication is based on token storage in `localStorage`.
- The API used does not persist changes (editing or deleting a user is for UI purposes only).
- Pagination is handled based on the API's response.

## Technologies Used
- React
- React Router
- Axios
- React Toastify
- Tailwind CSS

## License
This project is open-source and available under the MIT license.

