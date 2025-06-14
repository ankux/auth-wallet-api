


## Project Structure

```
affinsys-proj/
├── config/                 # MongoDB connection setup
├── controllers/            # Business logic for auth & transactions
├── middleware/             # Basic Auth middleware
├── models/                 # Mongoose models
├── routes/                 # API endpoints
├── .env                    # Environment variables
├── server.js               # Main server file
└── package.json
```

---

## Project setup

### 1. Clone the Repo

```bash
git clone https://github.com/ankux/auth-wallet-api.git
cd auth-wallet-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/walletDB
```

### 4. Start the Server

```bash
node server.js
```

The server will run at: [http://localhost:5000](http://localhost:5000)

---

## API Endpoints

### 🔑 Auth Routes

| Method | Endpoint    | Description         |
|--------|-------------|---------------------|
| POST   | `/register` | Register a new user |

**Sample Request Body:**
```json
{
  "username": "your_username",
  "password": "your_password"
}
```

---

### 💳 Transaction Routes (Requires Basic Auth)

| Method | Endpoint  | Description              |
|--------|-----------|--------------------------|
| POST   | `/fund`   | Credit funds             |
| POST   | `/pay`    | Debit funds              |
| GET    | `/bal`    | Get current balance      |
| GET    | `/bal?currency=USD`    | Get USD conversion      |
| GET    | `/stmt`   | Get transaction history  |

#### Authorization:
Use **Basic Auth** in Postman (or any client):

- **Username:** Registered username
- **Password:** Registered password

---

## Example Requests

### Register

```http
POST /register
```

```json
{
  "username": "john123",
  "password": "pass456"
}
```

### Fund account

```http
POST /fund
Authorization: Basic Auth
```

```json
{
  "amt": 100
}
```

### Pay another user

```http
POST /pay
Authorization: Basic Auth
```

```json
{
  "to": "dhruv",
  "amt": 100
}
```

---

## Notes

- All passwords are hashed using **bcrypt**
- User balances and transactions are stored in MongoDB
- Only authenticated users can access transaction routes

---

