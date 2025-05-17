# nookhouse - iProject

nookhouse is a modern web-based e-commerce application that allows users to browse, purchase, and manage household products with ease. The app supports authentication, shopping cart, product management for admins, and a responsive, mobile-friendly user experience.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Environment Configuration](#environment-configuration)
- [Running the Project](#running-the-project)
- [Main Features](#main-features)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Authentication**: Login/register with email/password & Google OAuth.
- **Product Management**: Admins can add, edit, and delete products.
- **Shopping Cart**: Users can add, update, and remove products from the cart.
- **Checkout**: Checkout process with stock and quantity updates.
- **Search & Filter**: Search products by name, category, color, and sort by price.
- **User Profile**: Update user profile and profile picture.
- **Dark/Light Mode**: Supports dark and light themes.
- **Responsive**: Optimized for desktop and mobile devices.

## Tech Stack

- **Frontend**: React, Redux Toolkit, React Router DOM, Tailwind CSS, Vite
- **Backend & Database**: Firebase (Authentication, Firestore)
- **UI/UX**: Tailwind CSS, SweetAlert2, Lucide React Icons

## Project Structure

```
client/
  ├── public/
  ├── src/
  │   ├── app/           # Redux store & slices
  │   ├── assets/        # Images & static assets
  │   ├── components/    # UI components
  │   ├── config/        # Firebase configuration
  │   ├── context/       # Context API (Theme, Auth)
  │   ├── hooks/         # Custom hooks
  │   ├── layout/        # Main & admin layouts
  │   ├── pages/         # Application pages
  │   ├── router/        # App routing
  │   ├── services/      # Validation & helpers
  │   └── main.jsx       # React entry point
  ├── .env.template      # Environment variable template
  ├── package.json
  └── ...
```

## Installation & Setup

1. **Clone the repository**
    ```sh
    git clone https://github.com/jeremydezekiel/iproject.git
    cd iproject/client
    ```

2. **Install dependencies**
    ```sh
    npm install
    ```

## Environment Configuration

1. Copy `.env.template` to `.env`:
    ```sh
    cp .env.template .env
    ```
2. Fill in your Firebase project credentials:
    ```
    VITE_API_KEY=...
    VITE_AUTH_DOMAIN=...
    VITE_PROJECT_ID=...
    VITE_STORAGE_BUCKET=...
    VITE_MESSAGING_SENDER_ID=...
    VITE_APP_ID=...
    ```

## Running the Project

- **Development**
    ```sh
    npm run dev
    ```
- **Build for Production**
    ```sh
    npm run build
    ```
- **Preview Production Build**
    ```sh
    npm run preview
    ```

## Main Features

- **User**
  - Register & login (email/password, Google)
  - Browse, search, filter, and sort products
  - Add products to cart, update quantity, remove products
  - Checkout & view transaction history
  - Update profile & profile picture

- **Admin**
  - Admin dashboard
  - CRUD products (add, edit, delete)
  - View product list & details

- **Other**
  - Form input validation
  - SweetAlert2 for notifications
  - Dark/light mode toggle

## Screenshots

> Add screenshots of your application here to showcase the main page, product page, cart, etc.

## Contributing

Contributions are welcome! Please fork this repo, create a new branch, and submit a pull request.

## License

MIT License

---
