# LuxeCarry

LuxeCarry is a fully functional e-commerce platform built with HTML, Tailwind CSS, and a Node.js/Express backend. It offers Google OAuth authentication, product browsing, a search feature, cart management, and more. The platform features a clean and responsive design for a seamless shopping experience.

## Features

- **Google OAuth Login**: Secure user authentication via Google.
- **Product Search**: Case-insensitive search functionality to find products quickly.
- **Add to Cart**: Add products to the cart and manage quantities.
- **Cart Management**: Update or remove items from the cart.
- **Responsive UI**: Tailwind CSS is used for a modern, mobile-friendly UI design.
- **Error Handling**: Flash messages for user notifications on success or errors.

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

License

This project is licensed under the MIT License - see the LICENSE file for details.
Acknowledgments![Screenshot from 2024-12-31 13-17-05](https://github.com/user-attachments/assets/96ad1dda-6a4f-4908-bcd3-8749c7751647)
![Screenshot from 2024-12-31 13-16-01](https://github.com/user-attachments/assets/54ad8830-0999-4dac-8b5f-5347b650c40b)
![Screenshot from 2024-12-31 13-15-46](https://github.com/user-attachments/assets/82781838-8f1d-47e2-bd9f-964e4d79df9c)
![Screenshot from 2024-12-31 13-15-39](https://github.com/user-attachments/assets/5c24c6c3-ce32-47e8-bd61-b996610ce4ae)
![Screenshot from 2024-12-31 13-15-24](https://github.com/user-attachments/assets/8992df89-a64e-463a-8d6f-2338a1b56412)
![Screenshot from 2024-12-31 13-14-08](https://github.com/user-attachments/assets/3c9e28c3-7cb9-4cd9-946f-7d1deb0a6c39)


    Tailwind CSS for a modern and responsive UI.![Screenshot from 2024-12-31 13-17-05](https://github.com/user-attachments/assets/083e7512-1fce-4523-bf95-b620a2d454bd)

    Google OAuth for authentication.
    nodemon for automatic server reload during development.

