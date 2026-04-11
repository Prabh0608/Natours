# 🌿 Natours

A full-stack tour booking web application built with **Node.js**, **Express**, **MongoDB**, and **Pug**. Users can browse nature tours, create accounts, write reviews, and book tours — all through a clean, server-rendered UI backed by a well-structured REST API.

> 🚀 **Live Demo:** [Natours](https://natours-j4gt.onrender.com/)
>
> 📡 **API Docs:** [Postman Documentation](https://documenter.getpostman.com/view/51401476/2sBXijJBQq)

Deployed on **[Render](https://render.com)**.

---

## ✨ What It Does

- Browse tours with details like difficulty, duration, price, and ratings
- Sign up / log in with JWT-based authentication
- Role-based access — admins, lead guides, guides, and regular users each have different permissions
- Book a tour using Stripe (test mode — see below)
- Leave reviews and ratings on tours you've booked
- Upload a profile photo or tour images — processed and resized on the fly with Sharp
- Get a welcome email on signup, and a password reset link when needed
- Full REST API for all resources — tours, users, reviews, and bookings

---

## 💳 Test Payments (Stripe)

Stripe is integrated in **test mode**. No real money is involved. If you want to try booking a tour on the live demo, use the following test card details at checkout:

| Field | Value |
|---|---|
| Card Number | `4242 4242 4242 4242` |
| Expiry | Any future date (e.g. `12/28`) |
| CVC | Any 3 digits (e.g. `123`) |

This is a standard Stripe test card that simulates a successful payment. The integration is fully functional and can be switched to live Stripe keys for real-world use — no architectural changes needed.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Templating | Pug |
| Auth | JWT + bcryptjs |
| Payments | Stripe |
| Email | Nodemailer + Brevo |
| Image Processing | Sharp + Multer |
| Frontend Bundler | Parcel |
| Security | Helmet, express-rate-limit, express-mongo-sanitize, xss-clean, hpp |

---

## 📁 Project Structure

```
natours/
├── Routes/             # Express route definitions (tours, users, reviews, bookings)
├── controllers/        # Request handlers and core business logic
├── models/             # Mongoose schemas — Tour, User, Review, Booking
├── views/              # Pug templates for the server-rendered frontend
├── public/             # Static assets (CSS, images, bundled JS)
│   └── js/             # Client-side JS — bundled with Parcel
├── utils/              # Shared utilities: AppError, catchAsync, email sender, APIFeatures
├── dev-data/           # Sample data + script to seed the database
├── app.js              # Express app config — middleware stack, routes, error handling
├── server.js           # Entry point — connects to DB, starts the server
└── config.env          # Your environment variables (not committed to git)
```

---

## ⚙️ Running Locally

### Prerequisites

- Node.js v18+
- MongoDB (local instance or MongoDB Atlas)
- Stripe account (test keys are fine)
- Brevo or any SMTP provider for emails

### Steps

```bash
# Clone the repo
git clone https://github.com/Prabh0608/Natours.git
cd Natours

# Install dependencies
npm install

# Set up your environment variables
# Create a config.env file in the root — see the section below for what goes in it

# (Optional) Seed the database with sample tours and users
node dev-data/import-dev-data.js --import

# Start the dev server
npm run dev
```

The app will be running at `http://localhost:3000`.

---

## 🔑 Environment Variables

Create a `config.env` file in the root of the project:

```env
NODE_ENV=development
PORT=3000

# MongoDB
DATABASE=mongodb+srv://<username>:<password>@cluster.mongodb.net/natours
DATABASE_PASSWORD=your_mongodb_password

# JWT
JWT_SECRET=a_long_random_secret_string_at_least_32_characters
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

# Email (Brevo SMTP or any compatible provider)
EMAIL_FROM=your@email.com
BREVO_HOST=smtp-relay.brevo.com
BREVO_PORT=587
BREVO_LOGIN=your_brevo_login
BREVO_PASSWORD=your_brevo_smtp_password

# Stripe (use test keys for development)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm start` | Start the server with Node |
| `npm run dev` | Start with Nodemon — auto-restarts on file changes |
| `npm run start:prod` | Start in production mode |
| `npm run watch:js` | Watch and bundle client-side JS with Parcel |
| `npm run build:js` | Build and minify client-side JS for production |

---

## 🔌 API Reference

The API is fully documented on Postman — every endpoint, request body, query parameter, and example response is covered there.

📖 **[View Full API Documentation →](https://documenter.getpostman.com/view/51401476/2sBXijJBQq)**

> Base URL (local): `http://localhost:3000/api/v1`  
> Base URL (production): `your-api-base-url-here/api/v1`

The API covers four main resources — **Tours**, **Users**, **Reviews**, and **Bookings** — with endpoints ranging from public tour listings to admin-only user management. Not all endpoints are wired into the frontend UI; some are API-only and best explored through the Postman docs.

---

## 🔒 Security

Security wasn't an afterthought here — several layers are baked in:

- **Helmet** — Locks down HTTP headers out of the box
- **express-rate-limit** — Throttles repeated requests from the same IP to prevent brute-force attacks
- **express-mongo-sanitize** — Strips out any characters that could be used for NoSQL injection
- **xss-clean** — Sanitizes incoming data to block cross-site scripting
- **hpp** — Prevents HTTP parameter pollution in query strings
- **bcryptjs** — Passwords are hashed before storing, never saved as plain text
- **JWT** — Tokens are short-lived and signed, keeping sessions stateless and secure

---

## ☁️ Deployment

This project is deployed on **[Render](https://render.com)**. Render handles the Node.js server and connects to a MongoDB Atlas cluster in the cloud. To deploy your own instance, point Render to this repo, set all the environment variables listed above, and you're good to go.

---

## 👤 Author

**Prabhjot Singh Saini**  
[GitHub](https://github.com/Prabh0608)
