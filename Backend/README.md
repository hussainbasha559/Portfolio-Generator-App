# 🗂️ Portfolio Generator App

A full-stack web application where users can **register**, **log in**, and **generate a personal portfolio** — all data saved in **MongoDB Atlas** and viewable via **MongoDB Compass**.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas + Mongoose |
| Auth | express-session + bcryptjs |
| Dev Tool | nodemon |
| Frontend | HTML, CSS, Vanilla JS |

---

## 📁 Project Structure

```
Backend/
│
├── Middleware/
│   ├── API.js              # Portfolio save/load API logic
│   ├── LoginAPI.js         # Register & Login API logic
│   └── userScheme.js       # Mongoose User schema (bcrypt password hashing)
│
├── node_modules/           # Installed packages (NOT pushed to GitHub)
│
├── .env                    # Environment variables (NOT pushed to GitHub)
├── Dashboard.html          # Dashboard page — Create Portfolio & Logout
├── db.js                   # MongoDB Atlas connection
├── index.js                # Express server — routes + middleware setup
├── LoginPage.html          # Register / Login page
├── package-lock.json
├── package.json
└── portfolio.html          # Portfolio form + live preview + download
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/portfolio-app.git
cd portfolio-app/Backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `Backend/` folder:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/portfolioDB?retryWrites=true&w=majority
SESSION_SECRET=your_super_secret_key_here
```

> 🔐 **Never push `.env` to GitHub** — it contains your Atlas credentials.

### 4. Set up MongoDB Atlas

1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a **free cluster**
3. **Database Access** → add a DB user (username + password)
4. **Network Access** → add your IP or allow all (`0.0.0.0/0`)
5. Click **Connect** → **Connect your application** → copy the URI into `MONGO_URI`

### 5. Connect MongoDB Compass

1. Open **MongoDB Compass**
2. Paste your `MONGO_URI` connection string
3. Click **Connect** — you will see your `portfolioDB` database and collections live

### 6. Run the app

```bash
# Development — auto-restarts with nodemon
npm run dev

# Production
npm start
```

Open your browser: **http://localhost:5000**

---

## 🔄 App Flow

```
http://localhost:5000
        │
        ▼
  LoginPage.html  ─── Register / Login form
        │
        ├── POST /register  →  Save user to MongoDB  →  Dashboard
        └── POST /login     →  Verify from MongoDB   →  Dashboard
                                        │
                                        ▼
                              Dashboard.html
                                  ├── Create Portfolio  →  portfolio.html
                                  └── Logout            →  LoginPage.html
                                              │
                                              ▼
                                      portfolio.html
                                          ├── Fill form (Skills, Projects,
                                          │   Experience, Education, Certs)
                                          ├── Generate live preview
                                          ├── Save to MongoDB
                                          └── Download as HTML file
```

---

## 🧩 Middleware Files Explained

### `Middleware/userScheme.js`
Mongoose schema for the **User** model:
- Fields: `name`, `email`, `password`, `timestamps`
- Auto-hashes password using **bcrypt** before saving (`pre('save')` hook)
- Has a `matchPassword()` method to verify login passwords

### `Middleware/LoginAPI.js`
Handles **Register** and **Login** route logic:
- `POST /register` — creates a new user, saves to MongoDB, starts session
- `POST /login` — finds user by email, compares hashed password, starts session

### `Middleware/API.js`
Handles **Portfolio** save and load route logic:
- `POST /portfolio/save` — saves portfolio data (skills, projects, education, certifications) to MongoDB linked to the logged-in user
- `GET /portfolio/load` — returns the user's saved portfolio as JSON

---

## 🌐 Routes (index.js)

| Method | Route | File Served / Action | Auth Required |
|---|---|---|---|
| GET | `/` | `LoginPage.html` | No |
| POST | `/register` | Save user → redirect to `/dashboard` | No |
| POST | `/login` | Verify user → redirect to `/dashboard` | No |
| GET | `/dashboard` | `Dashboard.html` | ✅ Yes |
| GET | `/portfolio-form` | `portfolio.html` | ✅ Yes |
| POST | `/portfolio/save` | Save portfolio to MongoDB | ✅ Yes |
| GET | `/portfolio/load` | Return portfolio JSON | ✅ Yes |
| GET | `/logout` | Destroy session → redirect to `/` | No |

---

## 🗄️ MongoDB Collections

Once you run the app and register, Atlas and Compass will show these collections inside `portfolioDB`:

| Collection | What it stores |
|---|---|
| `users` | name, email, hashed password, createdAt |
| `portfolios` | all portfolio sections linked to userId |
| `sessions` | active login sessions |

---

## 🔒 Security

- Passwords are **hashed with bcrypt** — plain text is never stored in the database
- Sessions use a **secret key** loaded from `.env`
- Protected routes check `req.session.userId` — unauthenticated users are redirected to login
- `.env` and `node_modules` are excluded from Git via `.gitignore`

---

## 📦 package.json Scripts

```json
"scripts": {
  "start": "node index.js",
  "dev":   "nodemon index.js"
}
```

---

## 🙈 .gitignore

```
node_modules/
.env
```

---

## 📸 Features

- ✅ Register and Login with MongoDB
- ✅ Passwords hashed with bcrypt
- ✅ Session-based authentication
- ✅ Dashboard with Create Portfolio and Logout buttons
- ✅ Portfolio form — Skills, Projects, Experience, Education, Certifications
- ✅ Live portfolio preview
- ✅ Download portfolio as a standalone HTML file

---

