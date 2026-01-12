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
