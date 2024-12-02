# Ecommerce-Application-Using-MERN-Stack

Running the Client-Side (Frontend)
Navigate to the client-side directory:

cd client
Install required dependencies:

npm install

Run the client-side application:

npm run dev

The application should now be running on http://localhost:3000.

Running the Backend/Administrator Side (Backend)
Navigate to the backend directory:

cd backend
Install required dependencies:

npm install

Run the backend server:
For backend (administrator side), you’ll typically use one of the following commands:

For Development Environment:

npm run dev
This command starts the backend in development mode (often using nodemon for automatic restarts).

For Production Environment:

npm run start

This will start the backend server in production mode.

Database Setup
Create a MongoDB database (either locally or on MongoDB Atlas) and update your .env files in both the frontend and backend with the correct database URL.
For Client-Side, add the REACT_APP_API_URL for connecting to your backend API.
For Backend, add the MONGO_URI for connecting to your MongoDB database.
Example of .env for Backend:

MONGO_URI=mongodb://localhost:27017/ecommerce
PORT=5000
JWT_SECRET=yourSecretKey
Additional Commands
To run tests:
npm test
For building the React app for production:
npm run build
Technologies Used
Frontend:

React.js
Redux (optional)
Axios for HTTP requests
Backend:

Node.js
Express.js
MongoDB (using Mongoose for data modeling)
JWT (JSON Web Token) for authentication
Features
User authentication (Login/Signup)
Admin Panel to manage orders and products
Product catalog and shopping cart
Order management for both users and admins
