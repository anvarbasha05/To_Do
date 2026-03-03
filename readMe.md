# ReadMe
---

## 
- **Runtime:** Node.js
- **Framework:** Express.js
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Middleware-based Schema Validation
- **Real-time:** WebSockets (`ws`)

---

## Authentication

This API uses **Bearer Token** authentication. 

1. **Sign Up**: Register with `username`, `email`, and `password`.
2. **Login**: Provide `email` and `password` to receive a JWT.
3. **Usage**: For all protected routes, include the token in the request header:
   - **Key**: `Authorization`
   - **Value**: `Bearer <your_token>`

---

## API Reference

### 1. Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/signup` | Register a new user |
| `POST` | `/login` | Authenticate user & return JWT |

### 2. To-Do Management (Protected)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/create` | Create a new task |
| `GET` | `/get` | Retrieve all tasks |
| `GET` | `/get_by_id/:id` | Get details of a specific task |
| `PATCH` | `/update_by_id/:id` | Update an existing task |
| `DELETE` | `/delete_by_id/:id` | Delete a task |

---

## Real-time Notifications (WebSockets)

The system supports real-time updates via WebSockets. To connect, pass the JWT generated during login as a query parameter.

**Connection URL:**
`ws://localhost:3000?token=YOUR_JWT_TOKEN`

> **Note:** The server validates the token upon connection. If the token is invalid or expired, the connection will be terminated.

---

### ENV VARIABLES
- MONGO_URI=mongodb://localhost:27017/notes
- PORT = 3000
- CRYPTO_SECRET_KEY=6f9d8a7b1c2e3f4g5h6i7j8k9l0m1n2o
- JWT_SECRET=s0m3r@nd0mJwTKey!2026



### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install