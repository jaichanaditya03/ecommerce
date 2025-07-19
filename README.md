# 🛒 Marwadi-Commerce  Full-Stack Application

A complete e-commerce web application built with the **MERN Stack** (MongoDB, Express, React, Node). Supports secure payments with Stripe and sends order confirmation emails via Nodemailer.

## 🚀 Features
- 🛍️ Product Listing & Details
- 🛒 Add to Cart / Quantity Updates
- 🔑 Secure Authentication (JWT)
- 💳 Stripe Payment Integration (INR)
- 📧 Order Confirmation via Email (Nodemailer)
- 🔐 Protected Routes for Cart & Checkout
- 📊 Admin Product Management
- 💡 Responsive Design (Tailwind CSS)

## 🏗️ Tech Stack
| Technology   | Purpose        |
|--------------|----------------|
| React (Vite) | Frontend UI    |
| Tailwind CSS | Styling        |
| Node.js      | Backend Runtime|
| Express.js   | REST API       |
| MongoDB      | Database       |
| Stripe API   | Payment Gateway|
| Nodemailer   | Email Service  |
| JWT          | Authentication |

## 📂 Project Structure
````` 
root
│
├── backend
│ ├── controllers
│ ├── models
│ ├── routes
│ └── app.js
│
├── frontend
│ ├── src
│ │ ├── components
│ │ ├── pages
│ │ ├── api
│ │ └── App.jsx
│ └── index.html
````` 

 🛠️ Setup Instructions

```bash
--backend--
npm install
npm install nodemailer
npm start
--frontend--
npm install
npm install tailwindcss @tailwindcss/vite
npm run dev

🔑 Environment Variables
# .env (Backend)
MONGO_URI=your_mongodb_uri
JWT_SECRET=supersecret
STRIPE_SECRET_KEY=your_stripe_key
CLIENT_URL=http://localhost:5173
NODE_EMAIL=your_email@gmail.com
NODE_PASS=your_email_app_password

## 📸 Screenshots
### 🏠 Home Page  
![Home](https://raw.githubusercontent.com/jaichanaditya03/ecommerce/main/assets/screenshots/home.png)

### 🛒 Cart Page  
![Cart](https://raw.githubusercontent.com/jaichanaditya03/ecommerce/main/assets/screenshots/cart.png)

### ✅ Payment Success  
![Payment](https://raw.githubusercontent.com/jaichanaditya03/ecommerce/main/assets/screenshots/payment.png)

### 📧 Mail Received  
![Mail](https://raw.githubusercontent.com/jaichanaditya03/ecommerce/main/assets/screenshots/mailreceived.png)
