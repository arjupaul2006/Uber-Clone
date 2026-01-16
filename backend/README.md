# Auth: POST /users/register

Description
- Create a new user account and return an auth token.

URL
- POST /users/register

Request body (JSON)
- fullname: object
  - firstname: string (required, min 3 chars)
  - lastname: string (required, min 3 chars)
- email: string (required, valid email, min 5 chars)
- password: string (required, min 6 chars)

Example request
```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "secret123"
}
```

Validation rules
- fullname.firstname: min length 3
- fullname.lastname: min length 3
- email: valid email format, min length 5
- password: min length 6

Responses / Status Codes
- 201 Created
  - Body: { "user": { /* user data (password excluded) */ }, "token": "<jwt>" }
- 400 Bad Request
  - Validation errors: { "errors": [ { "msg": "...", "param": "...", ... } ] }
- 409 Conflict
  - Email already exists (unique constraint) — implementation-dependent
- 500 Internal Server Error
  - Unexpected server error

Notes
- Passwords are hashed before storing.
- Returned `user` omits the password field.

# Auth: POST /users/login

Description
- Authenticate user with email and password, return an auth token.

URL
- POST /users/login

Request body (JSON)
- email: string (required, valid email, min 5 chars)
- password: string (required, min 6 chars)

Example request
```json
{
  "email": "jane.doe@example.com",
  "password": "secret123"
}
```

Validation rules
- email: valid email format, min length 5
- password: min length 6

Responses / Status Codes
- 200 OK
  - Body: { "user": { /* user data (password excluded) */ }, "token": "<jwt>" }
- 400 Bad Request
  - Validation errors: { "errors": [ { "msg": "...", "param": "...", ... } ] }
- 401 Unauthorized
  - "User not found" — email does not exist
  - "Invalid password" — password does not match
- 500 Internal Server Error
  - Unexpected server error

Notes
- Passwords are compared using bcrypt hashing for security.
- Returned `user` omits the password field.
- Token can be used for authenticated requests (typically in Authorization header).

# Auth: GET /users/profile

Description
- Retrieve the authenticated user's profile information.

URL
- GET /users/profile

Headers
- Authorization: Bearer <token> (required)

Responses / Status Codes
- 200 OK
  - Body: { "user": { /* user data (password excluded) */ } }
- 401 Unauthorized
  - "Unauthorized" — if the token is missing or invalid
- 500 Internal Server Error
  - Unexpected server error

Notes
- The token must be included in the Authorization header for authentication.

# Auth: POST /users/logout

Description
- Log out the user by clearing the authentication token and adding it to the blacklist.

URL
- POST /users/logout

Headers
- Authorization: Bearer <token> (required)

Responses / Status Codes
- 200 OK
  - Body: { "message": "User logged out successfully" }
- 401 Unauthorized
  - "Unauthorized" — if the token is missing or invalid
- 500 Internal Server Error
  - Unexpected server error

Notes
- The token will be added to a blacklist to prevent further use.
