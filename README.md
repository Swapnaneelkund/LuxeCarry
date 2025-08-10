# LuxeCarry

LuxeCarry is a fully functional e-commerce platform built with HTML, Tailwind CSS, and a Node.js/Express backend. It offers Google OAuth authentication, product browsing, a search feature, cart management, and more. The platform features a clean and responsive design for a seamless shopping experience.A Loom video is added at end

#DEMO EMAIL AND PASSWORD TO TEST THE FEATURE:
Demo Login: demo@example.com | Password: pass123
## LIVE DEMO:
https://luxecarry.onrender.com/
## Features

- **Google OAuth Login**: Secure user authentication via Google.
- **Product Search**: Case-insensitive search functionality to find products quickly.
- **Add to Cart**: Add products to the cart and manage quantities.
- **Cart Management**: Update or remove items from the cart.
- **Responsive UI**: Tailwind CSS is used for a modern, mobile-friendly UI design.
- **Error Handling**: Flash messages for user notifications on success or errors.
- Intrgrated Cloudinary,multer and stripe

## Tech Stack

- **Backend**:
  - Node.js with Express.js
  - MongoDB with Mongoose
  - Google OAuth for authentication
  - Joi for data validation
  - `nodemon` for automatic server restarts during development
- **Frontend**:
  - HTML
  - Tailwind CSS for responsive design

## Setup

### Prerequisites

Ensure the following tools are installed on your machine:

- Node.js (version 16 or later)
- MongoDB (or MongoDB Atlas for a cloud database)
- A Google OAuth client ID (for authentication)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Swapnaneelkund/LuxeCarry.git
   cd LuxeCarry


npm install

Configure environment variables:

    Create a .env file in the backend directory and add the following keys:

        GOOGLE_CLIENT_ID=your_google_client_id
        GOOGLE_CLIENT_SECRET=your_google_client_secret
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret

    Replace your_google_client_id, your_google_client_secret, your_mongodb_connection_string, and your_jwt_secret with the actual values for your project.

Running the Project

    To start the backend with nodemon for automatic reloading:

    In the backend directory, run:

    npm start

    nodemon will automatically monitor changes in the backend files and restart the server as needed. The backend server will be available at http://localhost:5000.

    The frontend (HTML and Tailwind CSS) files are already static and don't need a separate development server. You can open the HTML files in your browser directly or serve them using a static file server if needed.

Accessing the App

Once the backend is running, you can access the app by visiting:

    Frontend: Open the HTML files directly in your browser.
    Backend API: http://localhost:5000

Features Walkthrough

    Login: Use Google OAuth to log in securely.
    Shop: Browse products, filter by search, and view details.
    Cart: Add products to the cart, update quantities, and remove items.
    Checkout: View cart total and proceed with the checkout (payment integration can be added later).

Contributing

If you'd like to contribute to LuxeCarry, follow these steps:

    Fork the repository.
    Create a new branch (git checkout -b feature-name).
    Make your changes.
    Commit your changes (git commit -m 'Add feature').
    Push to the branch (git push origin feature-name).
    Open a pull request.
![Screenshot from 2024-12-31 13-16-01](https://github.com/user-attachments/assets/d7523130-9b50-4d6a-9ada-4ee89267b375)
![Screenshot from 2024-12-31 13-15-46](https://github.com/user-attachments/assets/bf789bf8-7c58-49eb-bba2-10c40853fd45)
![Screenshot from 2024-12-31 13-15-39](https://github.com/user-attachments/assets/30e8c2c9-94fc-49aa-bd30-4dde8f9b8293)
![Screenshot from 2024-12-31 13-15-24](https://github.com/user-attachments/assets/2d6c6376-6af7-430d-a3d9-f1d7546565ed)
![Screenshot from 2024-12-31 13-14-08](https://github.com/user-attachments/assets/06ec57e9-536d-4543-bf01-2a18705f84c5)
![Screenshot from 2024-12-31 18-54-21](https://github.com/user-attachments/assets/caacb3df-d922-477c-8153-1684a9a82edf)
![Screenshot from 2024-12-31 18-54-08](https://github.com/user-attachments/assets/e6653151-78c0-4ee9-9033-4f456586970d)
![Screenshot from 2024-12-31 18-53-48](https://github.com/user-attachments/assets/62a111bb-2f11-4081-8f0e-d92bcea77f3b)

    Tailwind CSS for a modern and responsive UI.![Screenshot from 2024-12-31 13-17-05](https://github.com/user-attachments/assets/083e7512-1fce-4523-bf95-b620a2d454bd)

    Google OAuth for authentication.
    nodemon for automatic server reload during development.
LOOM VIDEO:


https://github.com/user-attachments/assets/4568515d-6dc5-4f61-85b8-7d1da790f789

