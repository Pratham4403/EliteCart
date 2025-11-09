# 🛒 EliteCart

**EliteCart** is a full-stack **e-commerce platform** that allows users to browse products, add them to their cart, and securely complete purchases. It features an intuitive **admin panel** for managing products and orders, along with integrated **payment gateway** functionality.

🔗 **Live Demo:** [elite-cart-1nhl.vercel.app](https://elite-cart-1nhl.vercel.app)

---

## 🚀 Features

- **User Authentication** – Secure login and registration system
- **Product Catalog** – Browse and filter products
- **Shopping Cart** – Add/remove items and adjust quantities
- **Order Management** – View and manage past orders
- **Admin Dashboard** – Manage products, categories, and view order analytics
- **Payment Integration** – Secure payment gateway integration
- **Responsive UI** – Optimized for both desktop and mobile devices

---

## 🗂️ Project Structure

```

EliteCart/
│
├── backend/       # Node.js + Express API (Auth, Products, Orders, etc.)
├── frontend/      # React app for user interface
├── admin/         # Admin panel for product and order management
└── README.md

````

---

## 🛠️ Tech Stack

| Layer               | Technologies                          |
|---------------------|---------------------------------------|
| **Frontend**        | React, CSS                            |
| **Admin Panel**     | React                                 |
| **Backend**         | Node.js, Express                      |
| **Database**        | MongoDB                               |
| **Payment Gateway** | Stripe    |
| **Deployment**      | Vercel  |

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Pratham4403/EliteCart.git
cd EliteCart
````

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the **backend** directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PAYMENT_API_KEY=your_payment_gateway_api_key
```

Run the backend server:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

Create a `.env` file in the **frontend** directory:

```env
REACT_APP_API_URL=http://localhost:5000
```

---

### 4️⃣ Admin Panel Setup

```bash
cd ../admin
npm install
npm start
```

Create a `.env` file in the **admin** directory:

```env
REACT_APP_API_URL=http://localhost:5000
```

---

## 📊 Deployment

* **Frontend:** Deployed on Vercel → [Live Link](https://elite-cart-1nhl.vercel.app)
* **Backend:** (Specify the deployment platform and URL)
* **Admin Panel:** (Specify the deployment platform and URL)

Ensure that the API URLs in the `.env` files are updated accordingly before deployment.

---

## 🛣️ Roadmap

* [ ] Implement user reviews and ratings for products
* [ ] Add product search functionality
* [ ] Integrate additional payment gateways
* [ ] Implement email notifications for order updates
* [ ] Add unit and integration tests

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/my-feature`
3. Make your changes and commit them: `git commit -m "Added new feature"`
4. Push to your fork: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 📬 Contact

Created by **Pratham**
Find me on [GitHub](https://github.com/Pratham4403) and feel free to raise issues or reach out.

Enjoy building and shopping with EliteCart! 🛍️


 
```
